import { prisma } from '../../../../database/prismaClient';
import { CustomError } from '../../../../utils/CustomError';
import extractCoordsFromPointString from '../../../../utils/extractCoordsFromPointString';

interface IGetPlacesByCategoryUseCase {
  categoryUuid: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export class GetPlacesByCategoryUseCase {
  async execute({ categoryUuid, location }: IGetPlacesByCategoryUseCase) {
    try {
      if (!categoryUuid) throw new CustomError('Missing category uuid', 400);

      let latitude = location ? location.latitude : 0;
      let longitude = location ? location.longitude : 0;

      const pointText = `SRID=4326;POINT(${latitude} ${longitude})`;

      const result: any[] = await prisma.$queryRaw`
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
          x.owner_uuid,
          ST_AsText(x.location) as location,
          case when x.place_campaign_investment is not null then x.place_campaign_investment else 0 end as place_campaign_investment,
          ST_Distance(ST_Transform(ST_GeomFromText(${pointText}), 3857), ST_Transform(x.location, 3857)) as distance_meters,
          json_agg(distinct
            jsonb_build_object(
              'uuid', x.place_tag_uuid,
              'description', x.place_tag_description,
              'priority', x.place_tag_priority,
              'is_active', x.place_tag_is_active
            )
          ) filter (where x.place_tag_uuid is not null) as place_tags,
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
              'end_age', x.place_age_group_end_age,
              'is_active', x.place_age_group_is_active
            )
          ) filter (where x.place_age_group_uuid is not null) as place_age_groups,
          json_agg(distinct
            jsonb_build_object(
              'uuid', x.place_category_uuid,
              'description', x.place_category_description,
              'icon_name', x.place_category_icon_name,
              'icon_family', x.place_category_icon_family,
              'parent_uuid', x.place_category_parent_uuid
            )
          ) filter (where x.place_category_uuid is not null) as place_categories,
          json_agg(distinct
            jsonb_build_object(
              'uuid', x.place_user_rating_uuid,
              'rating', x.place_user_rating,
              'description', x.place_user_rating_description,
              'is_active', x.place_user_rating_is_active
            )
          ) filter (where x.place_user_rating_uuid is not null) as place_users_ratings,
          json_agg(distinct
            jsonb_build_object(
              'uuid', x.place_image_uuid,
              'url', place_image_url,
              'priority', x.place_image_priority
            )
          ) filter (where x.place_image_uuid is not null) as place_images
        from
          (select	p.uuid,
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
              p.owner_uuid,
              p.location,
              t.uuid as place_tag_uuid,
              t.description as place_tag_description,
              t.priority as place_tag_priority,
              t.is_active as place_tag_is_active,
              pd.uuid as place_detail_uuid,
              pd.name as place_detail_name,
              pd.description as place_detail_description,
              pd.priority as place_detail_priority,
              pd.is_active as place_detail_is_active,
              ag.uuid as place_age_group_uuid,
              ag.description as place_age_group_description,
              ag.start_age as place_age_group_start_age,
              ag.end_age as place_age_group_end_age,
              ag.is_active as place_age_group_is_active,
              c.uuid as place_category_uuid,
              c.description as place_category_description,
              c.icon_name as place_category_icon_name,
              c.icon_family as place_category_icon_family,
              c.parent_uuid as place_category_parent_uuid,
              pur.uuid as place_user_rating_uuid,
              pur.rating as place_user_rating,
              pur.description as place_user_rating_description,
              pur.is_active as place_user_rating_is_active,
              pi2.uuid as place_image_uuid,
              pi2.url as place_image_url,
              pi2.priority as place_image_priority,
              (select sum(pc.daily_investment) from place_campaigns pc where pc.place_uuid = p.uuid and pc.is_active and now() between pc.start_date and pc.end_date) as place_campaign_investment
          from	places p
              left join place_details pd on pd.place_uuid = p.uuid
              left join place_users_ratings pur on pur.place_uuid = p.uuid
              left join place_images pi2 on pi2.place_uuid = p.uuid
              left join "_PlaceToTag" ptt on ptt."A" = p.uuid
              left join tags t on t.uuid = ptt."B"
              left join "_AgeGroupToPlace" agtp on agtp."B" = p.uuid
              left join age_groups ag on ag.uuid = agtp."A"
              left join "_CategoryToPlace" ctp on ctp."B" = p.uuid
              left join categories c on c.uuid = ctp."A"
          where	p.is_active
          and c.uuid = ${categoryUuid} or c.parent_uuid = ${categoryUuid}
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
          x.owner_uuid,
          x.place_campaign_investment,
          x.location
        order by 
          place_campaign_investment desc,
          distance_meters
      `;

      const retorno = result.map(c => {
        let locationObj = undefined;
        if (c.location) {
            const coords = extractCoordsFromPointString(c.location);
            if (coords) {
                const [latitude, longitude] = coords;
                locationObj = {
                    latitude,
                    longitude
                };
            }
        }
        return {
          uuid: c.uuid,
          name: c.name,
          slogan: c.slogan,
          description: c.description,
          localization_description: c.localization_description,
          opening_hours_description: c.opening_hours_description,
          cost_description: c.cost_description,
          cpfcnpj: c.cpfcnpj,
          corporate_name: c.corporate_name,
          person_type: c.person_type,
          instagram_deep_link: c.instagram_deep_link,
          whatsapp_url_deep_link: c.whatsapp_url_deep_link,
          parental_recomendations: c.parental_recomendations,
          url_place: c.url_place,
          url_shop: c.url_shop,
          is_free: c.is_free,
          has_wifi: c.has_wifi,
          has_parking: c.has_parking,
          has_accessibility: c.has_accessibility,
          is_pet_friendly: c.is_pet_friendly,
          has_kid_caregiver: c.has_kid_caregiver,
          is_active: c.is_active,
          rate: c.rate,
          owner_uuid: c.owner_uuid,
          location: locationObj,
          distance_meters: location ? c.distance_meters : 0,
          is_sponsored: c.place_campaign_investment > 0,
          place_tags: c.place_tags ?? [],
          place_details: c.place_details ?? [],
          place_age_groups: c.place_age_groups ?? [],
          place_categories: c.place_categories ?? [],
          place_users_ratings: c.place_users_ratings ?? [],
          place_images: c.place_images ? c.place_images.sort((a: any, b: any) => a.priority - b.priority) : [],
        }
      });

      return retorno;
    } catch (error: any) {
      throw new CustomError(error.message, error.status || 500);
    }
  }
}
