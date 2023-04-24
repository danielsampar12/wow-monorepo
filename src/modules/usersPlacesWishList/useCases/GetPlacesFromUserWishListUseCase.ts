import { prisma } from '../../../database/prismaClient';
import { CustomError } from '../../../utils/CustomError';

interface IGetPlacesFromUserWishListUseCase {
  user_uuid: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export class GetPlacesFromUserWishListUseCase {
  async execute({ user_uuid, location }: IGetPlacesFromUserWishListUseCase) {
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
          case when x.place_campaign_investment is not null then x.place_campaign_investment else 0 end as place_campaign_investment,
          ST_Distance(ST_Transform(ST_GeomFromText(${pointText}), 3857), ST_Transform(x.location, 3857)) as distance_meters,
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
              'uuid', x.place_category_uuid,
              'description', x.place_category_description,
              'icon_name', x.place_category_icon_name,
              'icon_family', x.place_category_icon_family,
              'parent_uuid', x.place_category_parent_uuid
            )
          ) filter (where x.place_category_uuid is not null) as place_categories,
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
              pd.uuid as place_detail_uuid,
              pd.name as place_detail_name,
              pd.description as place_detail_description,
              pd.priority as place_detail_priority,
              pd.is_active as place_detail_is_active,
              c.uuid as place_category_uuid,
              c.description as place_category_description,
              c.icon_name as place_category_icon_name,
              c.icon_family as place_category_icon_family,
              c.parent_uuid as place_category_parent_uuid,
              pi2.uuid as place_image_uuid,
              pi2.url as place_image_url,
              pi2.priority as place_image_priority,
              (select sum(pc.daily_investment) from place_campaigns pc where pc.place_uuid = p.uuid and pc.is_active and now() between pc.start_date and pc.end_date) as place_campaign_investment
          from	places p
              left join place_details pd on pd.place_uuid = p.uuid
              left join place_images pi2 on pi2.place_uuid = p.uuid
              left join "_CategoryToPlace" ctp on ctp."B" = p.uuid
              left join categories c on c.uuid = ctp."A"
              left join users_places_wishlists upw on upw.place_uuid = p.uuid
          where p.is_active and upw.user_uuid = ${user_uuid} and upw.is_active
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
