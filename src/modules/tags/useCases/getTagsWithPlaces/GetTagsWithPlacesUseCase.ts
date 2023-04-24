import { prisma } from '../../../../database/prismaClient';
import extractCoordsFromPointString from '../../../../utils/extractCoordsFromPointString';

interface IGetTagsWithPlacesUseCase {
  location?: {
    latitude: number;
    longitude: number;
  };
}

export class GetTagsWithPlacesUseCase {
  async execute({ location }: IGetTagsWithPlacesUseCase) {
    try {

      let latitude = location ? location.latitude : 0;
      let longitude = location ? location.longitude : 0;

      const pointText = `SRID=4326;POINT(${latitude} ${longitude})`;

      const places: any[] = await prisma.$queryRaw`
        select
          x.uuid,
          x.name,
          x.slogan,
          x.description,
          x.localization_description,
          x.opening_hours_description,
          x.cost_description,
          x.cpfcnpj,
          x.corporate_name,
          x.person_type,
          x.instagram_deep_link,
          x.whatsapp_url_deep_link,
          x.parental_recomendations,
          x.url_place,
          x.url_shop,
          x.is_free,
          x.has_wifi,
          x.has_parking,
          x.has_accessibility,
          x.is_pet_friendly,
          x.has_kid_caregiver,
          x.is_active,
          x.rate,
          ST_AsText(x.location) as location,
          case when x.place_campaign_investment is not null then x.place_campaign_investment else 0 end as place_campaign_investment,
          ST_Distance(ST_Transform(ST_GeomFromText(${pointText}), 3857), ST_Transform(x.location, 3857)) as distance_meters,
          json_agg(distinct
            jsonb_build_object(
              'uuid', x.tag_uuid,
              'description', x.tag_description,
              'priority', x.tag_priority
            )
          ) filter (where x.tag_uuid is not null) as place_tags,
          json_agg(distinct
            jsonb_build_object(
              'uuid', x.category_uuid,
              'description', x.category_description,
              'icon_name', x.category_icon_name,
              'icon_family', x.category_icon_family,
              'parent', 
                case when x.category_parent_uuid is not null then 
                  jsonb_build_object(
                    'uuid', x.category_parent_uuid,
                    'description', x.category_parent_description,
                    'icon_name', x.category_parent_icon_name,
                    'icon_family', x.category_parent_icon_family)
                else null end
            )
          ) filter (where x.category_uuid is not null) as place_categories,
          json_agg(distinct
            jsonb_build_object(
              'uuid', x.place_detail_uuid,
              'name', x.place_detail_name,
              'description', x.place_detail_description,
              'priority', x.place_detail_priority,
              'is_active', x.place_detail_is_active
            )
          ) filter (where x.place_detail_uuid is not null) as place_details,
          json_agg(distinct
            jsonb_build_object(
              'uuid', x.place_age_group_uuid,
              'description', x.place_age_group_description,
              'start_age', x.place_age_group_start_age,
              'end_age', x.place_age_group_end_age
            )
          ) filter (where x.place_age_group_uuid is not null) as place_age_groups,
          json_agg(distinct
            jsonb_build_object(
              'uuid', x.place_image_uuid,
              'url', x.place_image_url,
              'priority', x.place_image_priority
            )
          ) filter (where x.place_image_uuid is not null) as place_images
        from
          (select
              t.uuid as tag_uuid,
              t.description as tag_description,
              t.priority as tag_priority,
              c.uuid as category_uuid,
              c.description as category_description,
              c.icon_name as category_icon_name,
              c.icon_family as category_icon_family,
              c.parent_uuid as category_parent_uuid,
              c2.description as category_parent_description,
              c2.icon_name as category_parent_icon_name,
              c2.icon_family as category_parent_icon_family,
              pd.uuid as place_detail_uuid,
              pd.name as place_detail_name,
              pd.description as place_detail_description,
              pd.priority as place_detail_priority,
              pd.is_active as place_detail_is_active,
              ag.uuid as place_age_group_uuid,
              ag.description as place_age_group_description,
              ag.start_age as place_age_group_start_age,
              ag.end_age as place_age_group_end_age,
              pi.uuid as place_image_uuid,
              pi.url as place_image_url,
              pi.priority as place_image_priority,
              p.uuid,
              p.name,
              p.slogan,
              p.description,
              p.localization_description,
              p.opening_hours_description,
              p.cost_description,
              p.cpfcnpj,
              p.corporate_name,
              p.person_type,
              p.instagram_deep_link,
              p.whatsapp_url_deep_link,
              p.parental_recomendations,
              p.url_place,
              p.url_shop,
              p.is_free,
              p.has_wifi,
              p.has_parking,
              p.has_accessibility,
              p.is_pet_friendly,
              p.has_kid_caregiver,
              p.is_active,
              p.rate,
              p.location,
              (select sum(pc.daily_investment) from place_campaigns pc where pc.place_uuid = p.uuid and pc.is_active and now() between pc.start_date and pc.end_date) as place_campaign_investment
          from places p
          left join "_PlaceToTag" ptt on ptt."A" = p.uuid
          left join tags t on t.uuid = ptt."B"
          left join "_CategoryToPlace" ctp on ctp."B" = p.uuid
          left join categories c on c.uuid = ctp."A"
          left join categories c2 on c2.uuid = c.parent_uuid
          left join place_details pd on pd.place_uuid = p.uuid and pd.is_active
          left join "_AgeGroupToPlace" agtp on agtp."B" = p.uuid
          left join age_groups ag on ag.uuid = agtp."A" and ag.is_active
          left join place_images pi on pi.place_uuid = p.uuid
          where t.is_active and p.is_active
          ) x
        group by
          x.uuid,
          x.name,
          x.slogan,
          x.description,
          x.localization_description,
          x.opening_hours_description,
          x.cost_description,
          x.cpfcnpj,
          x.corporate_name,
          x.person_type,
          x.instagram_deep_link,
          x.whatsapp_url_deep_link,
          x.parental_recomendations,
          x.url_place,
          x.url_shop,
          x.is_free,
          x.has_wifi,
          x.has_parking,
          x.has_accessibility,
          x.is_pet_friendly,
          x.has_kid_caregiver,
          x.is_active,
          x.rate,
          location,
          place_campaign_investment,
          distance_meters
      `;

      const authors = await prisma.author.findMany({
        where: {
          is_active: true,
        },
        include: {
          articles: {
            include: {
              images: {
                orderBy: {
                  priority: 'asc',
                },
              },
            },
          },
          author_tags: true
        },
        orderBy: {
          priority: 'asc',
        }
      });

      let tags: any[] = await prisma.tag.findMany();

      tags = tags.map((tag: any) => {
        return {
          ...tag,
          authors: authors
            .filter((author: any) => author.author_tags.some((at: any) => at.uuid === tag.uuid)),
          places: places
            .filter((place: any) => place.place_tags.some((pt: any) => pt.uuid === tag.uuid))
            .map((place: any) => {
              let location: any = null;
              if (place.location) {
                const coords = extractCoordsFromPointString(place.location);
                if (coords) {
                  const [latitude, longitude] = coords;
                  location = {
                    latitude,
                    longitude
                  };
                }
              }
              return {
                ...place,
                location,
                is_sponsored: place.place_campaign_investment > 0,
                place_age_groups: place.place_age_groups?.sort((a: any, b: any) => a.start_age - b.start_age),
                place_details: place.place_details?.sort((a: any, b: any) => a.priority - b.priority),
                place_images: place.place_images?.sort((a: any, b: any) => a.priority - b.priority)
              };
            })
            .sort((a: any, b: any) => b.place_campaign_investment - a.place_campaign_investment 
              || a.distance_meters - b.distance_meters)
        }
      });

      const retorno: any[] = tags.filter(tag => tag.places?.length || tag.authors?.length)
        .sort((a: any, b: any) => a.priority - b.priority);

      return retorno;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
