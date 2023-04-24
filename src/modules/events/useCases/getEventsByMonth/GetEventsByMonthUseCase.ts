import { Event } from '@prisma/client';

import {
  endOfMonth,
  getHours,
  getMinutes,
  getDate,
  startOfDay,
} from 'date-fns';

import { prisma } from '../../../../database/prismaClient';
import extractCoordsFromPointString from '../../../../utils/extractCoordsFromPointString';

interface IGetEventsUseCase {
  date: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

interface Month {
  [day: number]: {
    [schedule: string]: {
      events: Event[];
    };
  };
}

export class GetEventsUseCase {
  async execute({ date, location }: IGetEventsUseCase) {
    try {
      let latitude = location ? location.latitude : 0;
      let longitude = location ? location.longitude : 0;

      const pointText = `SRID=4326;POINT(${latitude} ${longitude})`;

      const result: any[] = await prisma.$queryRaw`
        select
          x.event_schedule_uuid,
          x.event_schedule_date,
          jsonb_build_object(
            'uuid', x.uuid,
            'name', x.name,
            'duration', x.duration,
            'cost_description', x.cost_description,
            'created_at', x.created_at,
            'created_user_uuid', x.created_user_uuid,
            'description', x.description,
            'has_accessibility', x.has_accessibility,
            'has_kid_caregiver', x.has_kid_caregiver,
            'has_parking', x.has_parking,
            'has_wifi', x.has_wifi,
            'is_free', x.is_free,
            'is_pet_friendly', x.is_pet_friendly,
            'localization_description', x.localization_description,
            'owner_uuid', x.owner_uuid,
            'parental_recomendations', x.parental_recomendations,
            'place_uuid', x.place_uuid,
            'updated_at', x.updated_at,
            'updated_user_uuid', x.updated_user_uuid,
            'url_place', x.url_place,
            'url_shop', x.url_shop,
            'rate', x.rate,
            'location', ST_AsText(x.location),
            'place',
              jsonb_build_object(
                'uuid', x.event_place_uuid,
                'name', x.event_place_name,
                'slogan', x.event_place_slogan,
                'description', x.event_place_description,
                'localization_description', x.event_place_localization_description,
                'opening_hours_description', x.event_place_opening_hours_description,
                'cost_description', x.event_place_cost_description,
                'cpfcnpj', x.event_place_cpfcnpj,
                'corporate_name', x.event_place_corporate_name,
                'person_type', x.event_place_person_type,
                'instagram_deep_link', x.event_place_instagram_deep_link,
                'whatsapp_url_deep_link', x.event_place_whatsapp_url_deep_link,
                'parental_recomendations', x.event_place_parental_recomendations,
                'url_place', x.event_place_url_place,
                'url_shop', x.event_place_url_shop,
                'is_free', x.event_place_is_free,
                'has_wifi', x.event_place_has_wifi,
                'has_parking', x.event_place_has_parking,
                'has_accessibility', x.event_place_has_accessibility,
                'is_pet_friendly', x.event_place_is_pet_friendly,
                'has_kid_caregiver', x.event_place_has_kid_caregiver,
                'is_active', x.event_place_is_active,
                'rate', x.event_place_rate
              ),
            'owner',
              jsonb_build_object(
                'uuid', x.event_owner_uuid,
                'address', x.event_owner_address,
                'address_complement', x.event_owner_address_complement,
                'address_number', x.event_owner_address_number,
                'city', x.event_owner_city,
                'cpfcnpj', x.event_owner_cpfcnpj,
                'district', x.event_owner_district,
                'email', x.event_owner_email,
                'is_active', x.event_owner_is_active,
                'name', x.event_owner_name,
                'person_type', x.event_owner_person_type,
                'phone', x.event_owner_phone,
                'postalcode', x.event_owner_postalcode,
                'state', x.event_owner_state,
                'url', x.event_owner_url
              )
          ) as event,
          json_agg(distinct
            jsonb_build_object(
              'uuid', x.event_image_uuid,
              'url', x.event_image_url
            )
          ) filter (where x.event_image_uuid is not null) as event_images,
          json_agg(distinct
            jsonb_build_object(
              'uuid', x.place_image_uuid,
              'url', x.place_image_url,
              'priority', x.place_image_priority
            )
          ) filter (where x.place_image_uuid is not null) as place_images,
          json_agg(distinct
            jsonb_build_object(
              'uuid', x.event_tag_uuid,
              'description', x.event_tag_description
            )
          ) filter (where x.event_tag_uuid is not null) as event_tags,
          ST_Distance(ST_Transform(ST_GeomFromText(${pointText}), 3857), ST_Transform(x.location, 3857)) as distance_meters
        from
          (select e.uuid,
              e.name,
              e.duration,
              e.cost_description,
              e.created_at,
              e.created_user_uuid,
              e.description,
              e.has_accessibility,
              e.has_kid_caregiver,
              e.has_parking,
              e.has_wifi,
              e.is_free,
              e.is_pet_friendly,
              e.localization_description,
              e.owner_uuid,
              e.parental_recomendations,
              e.place_uuid,
              e.updated_at,
              e.updated_user_uuid,
              e.url_place,
              e.url_shop,
              e.rate,
              e.location,
              p.uuid event_place_uuid,
              p.name event_place_name,
              p.slogan event_place_slogan,
              p.description event_place_description,
              p.localization_description event_place_localization_description,
              p.opening_hours_description event_place_opening_hours_description,
              p.cost_description event_place_cost_description,
              p.cpfcnpj event_place_cpfcnpj,
              p.corporate_name event_place_corporate_name,
              p.person_type event_place_person_type,
              p.instagram_deep_link event_place_instagram_deep_link,
              p.whatsapp_url_deep_link event_place_whatsapp_url_deep_link,
              p.parental_recomendations event_place_parental_recomendations,
              p.url_place event_place_url_place,
              p.url_shop event_place_url_shop,
              p.is_free event_place_is_free,
              p.has_wifi event_place_has_wifi,
              p.has_parking event_place_has_parking,
              p.has_accessibility event_place_has_accessibility,
              p.is_pet_friendly event_place_is_pet_friendly,
              p.has_kid_caregiver event_place_has_kid_caregiver,
              p.is_active event_place_is_active,
              p.rate event_place_rate,
              pi2.uuid place_image_uuid,
              pi2.url place_image_url,
              pi2.priority place_image_priority,
              o.uuid event_owner_uuid,
              o.address event_owner_address,
              o.address_complement event_owner_address_complement,
              o.address_number event_owner_address_number,
              o.city event_owner_city,
              o.cpfcnpj event_owner_cpfcnpj,
              o.district event_owner_district,
              o.email event_owner_email,
              o.is_active event_owner_is_active,
              o.name event_owner_name,
              o.person_type event_owner_person_type,
              o.phone event_owner_phone,
              o.postalcode event_owner_postalcode,
              o.state event_owner_state,
              o.url event_owner_url,
              es.uuid event_schedule_uuid,
              es.date event_schedule_date,
              ei.uuid event_image_uuid,
              ei.url event_image_url,
              t.uuid event_tag_uuid,
              t.description event_tag_description
          from events e
              left join event_images ei on ei.event_uuid = e.uuid
              left join event_schedules es on es.event_uuid = e.uuid
              left join "_EventToTag" ett on ett."A" = e.uuid
              left join tags t on t.uuid = ett."B"
              left join places p on p.uuid = e.place_uuid
              left join place_images pi2 on pi2.place_uuid = p.uuid
              left join owners o on o.uuid = e.owner_uuid
          where es.date >= ${startOfDay(new Date(date))} and es.date <= ${endOfMonth(new Date(date))}
          ) x
        group by
          x.event_schedule_uuid,
          x.event_schedule_date,
          x.location,
          event
        order by x.event_schedule_date, distance_meters
      `;

      const retorno: any[] = result.map(c => {
        let locationObj = undefined;
        if (c.event.location) {
            const coords = extractCoordsFromPointString(c.event.location);
            if (coords) {
                const [latitude, longitude] = coords;
                locationObj = {
                    latitude,
                    longitude
                };
            }
        }
        return {
          uuid: c.event_schedule_uuid,
          date: c.event_schedule_date,
          event: {
            ...c.event,
            location: locationObj,
            distance_meters: location ? c.distance_meters : 0,
            place: c.event.place.uuid ? {...c.event.place, place_images: c.place_images} : null,
            owner: c.event.owner.uuid ? c.event.owner : null,
            event_images: c.event_images ?? [],
            event_tags: c.event_tags ?? []
          }
        }
      });

      return retorno.reduce((acc, { date, event }) => {
        const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
        const day = getDate(utcDate);
        const hours = getHours(utcDate);
        const minutes = getMinutes(utcDate);

        const schedule = `${hours === 0 ? '00' : hours.toString().length === 1 ? '0' + hours : hours}:${
          minutes === 0 ? '00' : minutes
        }`;

        return {
          ...acc,
          [day]: {
            ...acc[day],
            [schedule]: {
              events: acc[day]?.[schedule]
                ? [...acc[day][schedule].events, event]
                : [event],
            },
          },
        };
      }, {} as Month);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
