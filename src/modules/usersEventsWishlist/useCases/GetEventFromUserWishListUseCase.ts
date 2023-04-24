import { prisma } from '../../../database/prismaClient';
import { CustomError } from '../../../utils/CustomError';

interface IGetEventFromUserWishListUseCase {
  user_uuid: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export class GetEventFromUserWishListUseCase {
  async execute({ user_uuid, location }: IGetEventFromUserWishListUseCase) {
    try {
      if (!user_uuid) {
        throw new CustomError('Missing user uuid', 400);
      }

      let latitude = location ? location.latitude : 0;
      let longitude = location ? location.longitude : 0;

      const pointText = `SRID=4326;POINT(${latitude} ${longitude})`;

      const retorno: any[] = await prisma.$queryRaw`
        select
          x.uuid,
          x.name,
          x.duration,
          x.description,
          x.cost_description,
          x.localization_description,
          x.parental_recomendations,
          x.url_shop,
          x.url_place,
          x.is_free,
          x.place_uuid,
          x.owner_uuid,
          x.has_accessibility,
          x.has_kid_caregiver,
          x.has_parking,
          x.has_wifi,
          x.is_pet_friendly,
          case when x.place_campaign_investment is not null then x.place_campaign_investment else 0 end as place_campaign_investment,
          ST_Distance(ST_Transform(ST_GeomFromText(${pointText}), 3857), ST_Transform(x.location, 3857)) as distance_meters,
          jsonb_build_object(
            'name', x.place_name,
            'slogan', x.place_slogan,
            'description', x.place_description,
            'localization_description', x.place_localization_description,
            'opening_hours_description', x.place_opening_hours_description,
            'cost_description', x.place_cost_description,
            'cpfcnpj', x.place_cpfcnpj,
            'corporate_name', x.place_corporate_name,
            'person_type', x.place_person_type,
            'instagram_deep_link', x.place_instagram_deep_link,
            'whatsapp_url_deep_link', x.place_whatsapp_url_deep_link,
            'parental_recomendations', x.place_parental_recomendations,
            'url_place', x.place_url_place,
            'url_shop', x.place_url_shop,
            'is_free', x.place_is_free,
            'has_wifi', x.place_has_wifi,
            'has_parking', x.place_has_parking,
            'has_accessibility', x.place_has_accessibility,
            'is_pet_friendly', x.place_is_pet_friendly,
            'has_kid_caregiver', x.place_has_kid_caregiver,
            'is_active', x.place_is_active,
            'rate', x.place_rate,
            'place_images',
            json_agg(distinct
              jsonb_build_object(
                'uuid', x.place_image_uuid,
                'url', place_image_url,
                'priority', x.place_image_priority
              )
            ) filter (where x.place_image_uuid is not null)
          ) as place,
          json_agg(distinct
            jsonb_build_object(
              'uuid', x.event_schedule_uuid,
              'date', x.event_schedule_date
            )
          ) filter (where x.event_schedule_uuid is not null) as schedules,
          json_agg(distinct
            jsonb_build_object(
              'uuid', x.event_image_uuid,
              'url', x.event_image_url
            )
          ) filter (where x.event_image_uuid is not null) as event_images,
          json_agg(distinct
            jsonb_build_object(
              'uuid', x.event_category_uuid,
              'description', x.event_category_description
            )
          ) filter (where x.event_category_uuid is not null) as event_categories,
          json_agg(distinct
            jsonb_build_object(
              'uuid', x.event_tag_uuid,
              'description', x.event_tag_description
            )
          ) filter (where x.event_tag_uuid is not null) as event_tags
        from
          (select e.uuid,
                  e.name,
                  e.duration,
                  e.description,
                  e.cost_description,
                  e.localization_description,
                  e.parental_recomendations,
                  e.url_shop,
                  e.url_place,
                  e.is_free,
                  e.place_uuid,
                  e.owner_uuid,
                  e.has_accessibility,
                  e.has_kid_caregiver,
                  e.has_parking,
                  e.has_wifi,
                  e.is_pet_friendly,
                  e.location,
                  p.name as place_name,
                  p.slogan as place_slogan,
                  p.description as place_description,
                  p.localization_description as place_localization_description,
                  p.opening_hours_description as place_opening_hours_description,
                  p.cost_description as place_cost_description,
                  p.cpfcnpj as place_cpfcnpj,
                  p.corporate_name as place_corporate_name,
                  p.person_type as place_person_type,
                  p.instagram_deep_link as place_instagram_deep_link,
                  p.whatsapp_url_deep_link as place_whatsapp_url_deep_link,
                  p.parental_recomendations as place_parental_recomendations,
                  p.url_place as place_url_place,
                  p.url_shop as place_url_shop,
                  p.is_free as place_is_free,
                  p.has_wifi as place_has_wifi,
                  p.has_parking as place_has_parking,
                  p.has_accessibility as place_has_accessibility,
                  p.is_pet_friendly as place_is_pet_friendly,
                  p.has_kid_caregiver as place_has_kid_caregiver,
                  p.is_active as place_is_active,
                  p.rate as place_rate,
                  pi2.uuid as place_image_uuid,
                  pi2.url as place_image_url,
                  pi2.priority as place_image_priority,
                  es.uuid as event_schedule_uuid,
                  es.date as event_schedule_date,
                  ei.uuid as event_image_uuid,
                  ei.url as event_image_url,
                  c.uuid as event_category_uuid,
                  c.description as event_category_description,
                  t.uuid as event_tag_uuid,
                  t.description as event_tag_description,
                  (select sum(pc.daily_investment) from place_campaigns pc where pc.place_uuid = e.place_uuid and pc.is_active and now() between pc.start_date and pc.end_date) as place_campaign_investment
            from events e
            left join places p on p.uuid = e.place_uuid
            left join place_images pi2 on pi2.place_uuid = e.place_uuid
            left join event_schedules es on es.event_uuid = e.uuid
            left join event_images ei on ei.event_uuid = e.uuid
            left join "_CategoryToEvent" cte on cte."B" = e.uuid
            left join categories c on c.uuid = cte."A"
            left join "_EventToTag" ett on ett."A" = e.uuid
            left join tags t on t.uuid = ett."B"
            left join user_event_wishlists uew on uew.event_uuid = e.uuid
        where uew.user_uuid = ${user_uuid} and uew.is_active
        ) x
        group by
          x.uuid,
          x.name,
          x.duration,
          x.description,
          x.cost_description,
          x.localization_description,
          x.parental_recomendations,
          x.url_shop,
          x.url_place,
          x.is_free,
          x.place_uuid,
          x.owner_uuid,
          x.has_accessibility,
          x.has_kid_caregiver,
          x.has_parking,
          x.has_wifi,
          x.is_pet_friendly,
          x.location,
          x.place_name,
          x.place_slogan,
          x.place_description,
          x.place_localization_description,
          x.place_opening_hours_description,
          x.place_cost_description,
          x.place_cpfcnpj,
          x.place_corporate_name,
          x.place_person_type,
          x.place_instagram_deep_link,
          x.place_whatsapp_url_deep_link,
          x.place_parental_recomendations,
          x.place_url_place,
          x.place_url_shop,
          x.place_is_free,
          x.place_has_wifi,
          x.place_has_parking,
          x.place_has_accessibility,
          x.place_is_pet_friendly,
          x.place_has_kid_caregiver,
          x.place_is_active,
          x.place_rate,
          place_campaign_investment
        order by
          place_campaign_investment desc,
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
