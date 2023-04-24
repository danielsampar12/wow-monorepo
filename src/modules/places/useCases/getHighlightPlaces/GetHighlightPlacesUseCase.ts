import { prisma } from '../../../../database/prismaClient';

import { CustomError } from '../../../../utils/CustomError';

interface IGetHighlightPlacesUseCase {
  user_uuid: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export class GetHighlightPlacesUseCase {
  async execute({ user_uuid, location }: IGetHighlightPlacesUseCase) {
    try {
      if (!user_uuid) throw new CustomError('Missing user uuid', 400);

      let latitude = location ? location.latitude : 0;
      let longitude = location ? location.longitude : 0;

      const pointText = `SRID=4326;POINT(${latitude} ${longitude})`;

      const retorno: any = await prisma.$queryRaw`
      	select x.uuid,
              x.name,
              x.slogan,
              x.description,
              x.localization_description,
              x.opening_hours_description,
              x.cost_description,
              x.parental_recomendations,
              x.url_place,
              x.url_shop,
              x.is_free,
              x.has_wifi,
              x.has_parking,
              x.has_accessibility,
              x.place_distance,
              case when x.place_campaign_investment is not null then x.place_campaign_investment else 0 end as place_campaign_investment,
              ST_Distance(ST_Transform(ST_GeomFromText(${pointText}), 3857), ST_Transform(x.location, 3857)) as distance_meters,
              jsonb_agg(distinct
                jsonb_build_object(
                  'uuid', x.place_detail_uuid,
                  'name', x.place_detail_name,
                  'description', x.place_detail_description
                )
              ) filter (where x.place_detail_uuid is not null) as place_details,
              json_agg(distinct
                jsonb_build_object(
                  'uuid', x.place_image_uuid, 
                  'url', x.url, 
                  'priority', x.priority
                )
              ) filter (where x.place_image_uuid is not null) as place_images,
              jsonb_agg(distinct
                jsonb_build_object(
                  'uuid', x.place_category_uuid, 
                  'description', x.place_category_description, 
                  'icon_name', x.place_category_icon_name, 
                  'icon_family', x.place_category_icon_family,
                  'parent', 
                    jsonb_build_object(
                  		'uuid', x.place_category_parent_uuid,
                  		'description',
                  			(
                  				select
									c4.description                  				
                  				from 
                  					categories c4
                  				where
                  					c4.uuid = x.place_category_parent_uuid
                  			)
                  	)
                )
              ) filter (where x.place_category_uuid is not null) as place_categories,
              jsonb_agg(distinct
                jsonb_build_object(
                  'uuid', x.place_tag_uuid,
                  'description', x.place_tag_description
                )
              ) filter (where x.place_tag_uuid is not null) as place_tags,
              jsonb_agg(distinct
                jsonb_build_object(
                  'uuid', x.place_age_group_uuid,
                  'description', x.place_age_group_description
                )
              ) filter (where x.place_age_group_uuid is not null) as place_age_groups
        from
          (select p.uuid,
                  p.name,
                  p.slogan,
                  p.description,
                  p.localization_description,
                  p.opening_hours_description,
                  p.cost_description,
                  p.parental_recomendations,
                  p.url_place,
                  p.url_shop,
                  p.is_free,
                  p.has_wifi,
                  p.has_parking,
                  p.has_accessibility,
                  p.location,
                  pi2.uuid place_image_uuid,
                  pi2.url,
                  pi2.priority,
                  pd.uuid place_detail_uuid,
                  pd.name place_detail_name,
                  pd.description place_detail_description,
                  u.place_distance,
                  (
                    select
                		c3.uuid          	
                    from
                      categories c3
                    where
                      c3.uuid = ctp."A"
                  ) as place_category_uuid,
                  (
                    select
		                c3.description          	
                    from
                      categories c3
                    where
                      c3.uuid = ctp."A"
                  ) as place_category_description,
                  (
                    select
                c3.icon_name          	
                    from
                      categories c3
                    where
                      c3.uuid = ctp."A"
                  ) as place_category_icon_name,
                  (
                    select
                c3.icon_family         	
                    from
                      categories c3
                    where
                      c3.uuid = ctp."A"
                  ) as place_category_icon_family,
                  (
                  	select
                  		c3.parent_uuid
                  	   from
                      categories c3
                    where
                      c3.uuid = ctp."A"
                  ) as place_category_parent_uuid,
                  (
                    select
                t.uuid
                    from
                      tags t
                    where
                      t.uuid = ptt."B"
                      and t.is_active = true
                    order by
                      t.priority
                  ) as place_tag_uuid,
                  (
                    select
                t.description
                    from
                      tags t
                    where
                      t.uuid = ptt."B"
                      and t.is_active = true
                    order by
                      t.priority
                  ) as place_tag_description,
                  (
                    select
                ag.uuid
                    from
                      age_groups ag 
                    where
                      ag.uuid = agtp."A"
                      and ag.is_active = true
                    order by
                      ag.start_age asc
                  ) as place_age_group_uuid,
                  (
                    select
                ag.description
                    from
                      age_groups ag 
                    where
                      ag.uuid = agtp."A"
                      and ag.is_active = true
                    order by
                      ag.start_age asc
                  ) as place_age_group_description,
                  (
                    select
                sum(pc.daily_investment)
                    from
                      place_campaigns pc
                    where
                      pc.place_uuid = p.uuid
                      and pc.is_active
                      and now() between pc.start_date and pc.end_date
                  ) as place_campaign_investment
          from places p
          left join place_images pi2 on pi2.place_uuid = p.uuid
          left join place_details pd on pd.place_uuid = p.uuid
          left join "_PlaceToTag" ptt on ptt."A" = p.uuid
          left join "_CategoryToPlace" ctp on ctp."B" = p.uuid
          left join "_AgeGroupToPlace" agtp on agtp."B" = p.uuid
          left join users u on u.uuid = ${user_uuid}
          where p.is_active
            and exists
              (select 1
                from "_CategoryToPlace" ctp
                where ctp."B" = p.uuid
                  and ctp."A" IN
                    (select c2.uuid
                    from categories c
                    left join categories c2 on c2.parent_uuid = c.uuid
                    or c2.uuid = c.uuid
                    inner join "_CategoryToUser" ctu on ctu."A" = c.uuid
                    where ctu."B" = ${user_uuid} ) )
            and exists
              (select 1
                from "_AgeGroupToPlace" agtp
                inner join "_AgeGroupToUser" agtu on agtu."A" = agtp."A"
                where agtp."B" = p.uuid
                  and agtu."B" = ${user_uuid} )
          ) x
        where x.place_campaign_investment is not null
          and ST_Distance(ST_Transform(ST_GeomFromText(${pointText}), 3857), ST_Transform(x.location, 3857)) <= (x.place_distance * 1000)
        group by x.uuid,
                x.name,
                x.slogan,
                x.description,
                x.localization_description,
                x.opening_hours_description,
                x.cost_description,
                x.parental_recomendations,
                x.url_place,
                x.url_shop,
                x.is_free,
                x.has_wifi,
                x.has_parking,
                x.has_accessibility,
                x.place_campaign_investment,
                x.location,
                x.place_distance
        order by place_campaign_investment desc,
                 distance_meters
      `;

      return retorno.map((c: any) => {
        return {
          ...c,
          is_sponsored: c.place_campaign_investment > 0,
          distance_meters: location ? c.distance_meters : 0
        };
      });
    } catch (error: any) {
      throw new CustomError(error.message, error.status || 500);
    }
  }
}
