import { prisma } from "../../../../database/prismaClient";
import { CustomError } from "../../../../utils/CustomError";
import extractCoordsFromPointString from "../../../../utils/extractCoordsFromPointString";

type ISearchUseCase = {
    search: string;
    location?: {
      latitude: number;
      longitude: number;
    };
};

export class SearchUseCase {
    async execute(data: ISearchUseCase) {
        try {
            const { search, location } = data;
            const searchTerm = `%${search}%`;

            let latitude = location ? location.latitude : 0;
            let longitude = location ? location.longitude : 0;

            const pointText = `SRID=4326;POINT(${latitude} ${longitude})`;

            const result: any[] = await prisma.$queryRaw`
                select x.tipo_registro
                    ,x.uuid
                    ,x.name
                    ,x.slogan
                    ,x.duration
                    ,x.description
                    ,x.cost_description
                    ,x.localization_description
                    ,x.opening_hours_description
                    ,x.parental_recomendations
                    ,x.cpfcnpj
                    ,x.instagram_deep_link
                    ,x.whatsapp_url_deep_link
                    ,x.url_place
                    ,x.url_shop
                    ,x.is_free
                    ,x.has_wifi
                    ,x.has_parking
                    ,x.has_accessibility
                    ,x.is_pet_friendly
                    ,x.has_kid_caregiver
                    ,x.is_active
                    ,x.rate
                    ,x.owner_uuid
                    ,x.place_uuid
                    ,x.url
                    ,x.title
                    ,x.text
                    ,x.author_uuid
                    ,x.publishment_date
                    ,ST_AsText(x.location) as location
                    ,case when x.place_campaign_investment is not null then x.place_campaign_investment else 0 end as place_campaign_investment
                    ,ST_Distance(ST_Transform(ST_GeomFromText(${pointText}), 3857), ST_Transform(x.location, 3857)) as distance_meters
                    ,json_agg(distinct
                        jsonb_build_object(
                            'uuid', x.place_image_uuid, 
                            'url', x.place_image_url, 
                            'priority', x.place_image_priority
                        )
                    ) filter (where x.place_image_uuid is not null) as place_images
                    ,json_agg(distinct
                        jsonb_build_object(
                            'uuid', x.article_image_uuid, 
                            'url', x.article_image_url, 
                            'priority', x.article_image_priority
                        )
                    ) filter (where x.article_image_uuid is not null) as article_images
                    ,json_agg(distinct
                        jsonb_build_object(
                            'uuid', x.event_image_uuid, 
                            'url', x.event_image_url
                        )
                    ) filter (where x.event_image_uuid is not null) as event_images
                    ,json_agg(distinct
                        jsonb_build_object(
                            'uuid', x.place_detail_uuid, 
                            'name', x.place_detail_name, 
                            'description', x.place_detail_description,
                            'priority', x.place_detail_priority
                        )
                    ) filter (where x.place_detail_uuid is not null) as place_details
                    ,json_agg(distinct
                        jsonb_build_object(
                            'uuid', x.event_detail_uuid, 
                            'name', x.event_detail_name, 
                            'description', x.event_detail_description,
                            'priority', x.event_detail_priority
                        )
                    ) filter (where x.event_detail_uuid is not null) as event_details
                    ,json_agg(distinct
                        jsonb_build_object(
                            'uuid', x.place_category_uuid, 
                            'description', x.place_category_description
                        )
                    ) filter (where x.place_category_uuid is not null) as place_categories
                    ,json_agg(distinct
                        jsonb_build_object(
                            'uuid', x.event_category_uuid, 
                            'description', x.event_category_description
                        )
                    ) filter (where x.event_category_uuid is not null) as event_categories
                    ,json_agg(distinct
                        jsonb_build_object(
                            'uuid', x.place_tag_uuid, 
                            'description', x.place_tag_description,
                            'priority', x.place_tag_priority
                        )
                    ) filter (where x.place_tag_uuid is not null) as place_tags
                    ,json_agg(distinct
                        jsonb_build_object(
                            'uuid', x.event_tag_uuid, 
                            'description', x.event_tag_description,
                            'priority', x.event_tag_priority
                        )
                    ) filter (where x.event_tag_uuid is not null) as event_tags
                    ,json_agg(distinct
                        jsonb_build_object(
                            'uuid', x.place_age_group_uuid, 
                            'description', x.place_age_group_description,
                            'start_age', x.place_age_group_start_age,
                            'end_age', x.place_age_group_end_age
                        )
                    ) filter (where x.place_age_group_uuid is not null) as place_age_groups
                    ,json_agg(distinct
                        jsonb_build_object(
                            'uuid', x.place_user_rating_uuid, 
                            'rating', x.place_user_rating_rating,
                            'description', x.place_user_rating_description
                        )
                    ) filter (where x.place_user_rating_uuid is not null) as place_users_ratings
                    ,json_agg(distinct
                        jsonb_build_object(
                            'uuid', x.event_schedule_uuid, 
                            'date', x.event_schedule_date
                        )
                    ) filter (where x.event_schedule_uuid is not null) as event_schedules
                    ,json_agg(distinct
                        jsonb_build_object(
                            'uuid', x.article_author_uuid, 
                            'email', x.article_author_email,
                            'name', x.article_author_name,
                            'phone', x.article_author_phone,
                            'image_url', x.article_author_image_url,
                            'description', x.article_author_description,
                            'theme', x.article_author_theme,
                            'instagram_deep_link', x.article_author_instagram_deep_link,
                            'website_url', x.article_author_website_url
                        )
                    ) filter (where x.article_author_uuid is not null) as article_authors
                from 
                    (
                        select distinct 'ESTABELECIMENTO' tipo_registro
                            ,p.uuid as uuid
                            ,p.name as name
                            ,p.slogan as slogan
                            ,null::int as duration
                            ,p.description
                            ,p.cost_description
                            ,p.localization_description
                            ,p.opening_hours_description
                            ,p.parental_recomendations
                            ,p.cpfcnpj
                            ,p.instagram_deep_link
                            ,p.whatsapp_url_deep_link
                            ,p.url_place
                            ,p.url_shop
                            ,p.is_free
                            ,p.has_wifi
                            ,p.has_parking
                            ,p.has_accessibility
                            ,p.is_pet_friendly
                            ,p.has_kid_caregiver
                            ,p.is_active
                            ,p.rate
                            ,p.owner_uuid
                            ,p.location
                            ,(select sum(pc.daily_investment) from place_campaigns pc where pc.place_uuid = p.uuid and pc.is_active and now() between pc.start_date and pc.end_date) as place_campaign_investment
                            ,null as place_uuid
                            ,null as url
                            ,null as title
                            ,null as text
                            ,null as author_uuid
                            ,null::timestamp as publishment_date
                            ,pi.uuid as place_image_uuid
                            ,pi.url as place_image_url
                            ,pi.priority as place_image_priority
                            ,pd.uuid as place_detail_uuid
                            ,pd.name as place_detail_name
                            ,pd.description as place_detail_description
                            ,pd.priority as place_detail_priority
                            ,c2.uuid as place_category_uuid
                            ,c2.description as place_category_description
                            ,t.uuid as place_tag_uuid
                            ,t.description as place_tag_description
                            ,t.priority as place_tag_priority
                            ,ag.uuid as place_age_group_uuid
                            ,ag.description as place_age_group_description
                            ,ag.start_age as place_age_group_start_age
                            ,ag.end_age as place_age_group_end_age
                            ,pur.uuid as place_user_rating_uuid
                            ,pur.rating as place_user_rating_rating
                            ,pur.description as place_user_rating_description
                            ,null as event_schedule_uuid
                            ,null::timestamp as event_schedule_date
                            ,null as event_image_uuid
                            ,null as event_image_url
                            ,null as event_tag_uuid
                            ,null as event_tag_description
                            ,null::int as event_tag_priority
                            ,null as event_category_uuid
                            ,null as event_category_description
                            ,null as event_detail_uuid
                            ,null as event_detail_name
                            ,null as event_detail_description
                            ,null::int as event_detail_priority
                            ,null as article_author_uuid
                            ,null as article_author_email
                            ,null as article_author_name
                            ,null as article_author_phone
                            ,null as article_author_image_url
                            ,null as article_author_description
                            ,null as article_author_theme
                            ,null as article_author_instagram_deep_link
                            ,null as article_author_website_url
                            ,null as article_image_uuid
                            ,null as article_image_url
                            ,null::int as article_image_priority
                        from places p
                        left join place_details pd
                            on pd.place_uuid = p.uuid
                        and pd.is_active
                        left join "_AgeGroupToPlace" agtp
                            on agtp."B" = p.uuid
                        left join age_groups ag
                            on ag.uuid = agtp."A"
                        and ag.is_active
                        left join "_CategoryToPlace" ctp
                            on ctp."B" = p.uuid
                        left join categories c2
                            on c2.uuid = ctp."A"
                        left join place_images pi
                            on pi.place_uuid = p.uuid
                        left join "_PlaceToTag" ptt
                            on ptt."A" = p.uuid
                        left join tags t
                            on t.uuid = ptt."B"
                        and t.is_active
                        left join place_users_ratings pur
                            on pur.place_uuid = p.uuid
                        and pur.is_active
                        where p.is_active
                        and (upper(p."name") like upper(${searchTerm})
                            or upper(p.description) like upper(${searchTerm})
                            or upper(p.localization_description) like upper(${searchTerm})
                            or upper(p.opening_hours_description) like upper(${searchTerm})
                            or upper(p.cost_description) like upper(${searchTerm})
                            or upper(p.parental_recomendations) like upper(${searchTerm})
                            or case when p.is_free then upper('gratuito, gratis, de graça') else '' end like upper(${searchTerm})
                            or case when p.has_wifi then upper('wifi, internet') else '' end like upper(${searchTerm})
                            or case when p.has_parking then upper('estacionamento, valet') else '' end like upper(${searchTerm})
                            or case when p.has_accessibility then upper('acessível, acessibilidade, cadeirante, deficiência') else '' end like upper(${searchTerm})
                            or case when p.has_kid_caregiver then upper('monitor, cuidador, monitora, cuidadora') else '' end like upper(${searchTerm})
                            or case when p.is_pet_friendly then upper('pet, cachorro, animal de estimação') else '' end like upper(${searchTerm})
                            or upper(p.slogan) like upper(${searchTerm})
                            or upper(pd."name") like upper(${searchTerm})    
                            or upper(pd.description) like upper(${searchTerm})    
                            or upper(ag.description) like upper(${searchTerm})
                            or upper(c2.description) like upper(${searchTerm}))
                        union
                        select distinct 'EVENTO' tipo_registro
                            ,e2.uuid
                            ,e2.name
                            ,null
                            ,e2.duration
                            ,e2.description
                            ,e2.cost_description
                            ,e2.localization_description
                            ,null
                            ,e2.parental_recomendations
                            ,null
                            ,null
                            ,null
                            ,e2.url_place
                            ,e2.url_shop
                            ,e2.is_free
                            ,e2.has_wifi
                            ,e2.has_parking
                            ,e2.has_accessibility
                            ,e2.is_pet_friendly
                            ,e2.has_kid_caregiver
                            ,null::boolean
                            ,null::numeric
                            ,e2.owner_uuid
                            ,e2.location
                            ,(select sum(pc.daily_investment) from place_campaigns pc where pc.place_uuid = p.uuid and pc.is_active and now() between pc.start_date and pc.end_date)
                            ,e2.place_uuid
                            ,null
                            ,null
                            ,null
                            ,null
                            ,null::timestamp
                            ,pi.uuid
                            ,pi.url
                            ,pi.priority
                            ,null
                            ,null
                            ,null
                            ,null::int
                            ,null
                            ,null
                            ,null
                            ,null
                            ,null::int
                            ,null
                            ,null
                            ,null::int
                            ,null::int
                            ,null
                            ,null::int
                            ,null
                            ,es.uuid
                            ,es.date
                            ,ei.uuid
                            ,ei.url
                            ,t.uuid
                            ,t.description
                            ,t.priority
                            ,c2.uuid
                            ,c2.description
                            ,ed.uuid
                            ,ed.name
                            ,ed.description
                            ,ed.priority
                            ,null
                            ,null
                            ,null
                            ,null
                            ,null
                            ,null
                            ,null
                            ,null
                            ,null
                            ,null
                            ,null
                            ,null::int
                        from events e2
                        left join places p
                            on p.uuid = place_uuid
                        left join place_images pi
                            on pi.place_uuid = p.uuid
                        left join event_images ei
                            on ei.event_uuid = e2.uuid
                        left join owners o2  
                            on o2.uuid = e2.owner_uuid
                        left join event_schedules es   
                            on es.event_uuid  = e2.uuid
                        left join event_details ed
                            on ed.event_uuid = e2.uuid
                        and ed.is_active
                        left join "_EventToTag" ett
                            on ett."A" = e2.uuid
                        left join tags t
                            on t.uuid = ett."B"
                        and t.is_active
                        left join "_AgeGroupToEvent" agte
                            on agte."B" = e2.uuid
                        left join age_groups ag
                            on ag.uuid = agte."A"
                        and ag.is_active
                        left join "_CategoryToEvent" cte
                            on cte."B" = e2.uuid
                        left join categories c2
                            on c2.uuid = cte."A"  
                        where es.date >= now()
                            and (upper(e2."name") like upper(${searchTerm})
                                or upper(e2.description) like upper(${searchTerm})
                                or upper(e2.localization_description) like upper(${searchTerm})
                                or upper(e2.cost_description) like upper(${searchTerm})
                                or upper(e2.parental_recomendations) like upper(${searchTerm})
                                or case when e2.is_free then upper('gratuito, gratis, de graça') else '' end like upper(${searchTerm})
                                or case when e2.has_wifi then upper('wifi, internet') else '' end like upper(${searchTerm})
                                or case when e2.has_parking then upper('estacionamento, valet') else '' end like upper(${searchTerm})
                                or case when e2.has_accessibility then upper('acessível, acessibilidade, cadeirante, deficiência') else '' end like upper(${searchTerm})
                                or case when e2.has_kid_caregiver then upper('monitor, cuidador, monitora, cuidadora') else '' end like upper(${searchTerm})
                                or case when e2.is_pet_friendly then upper('pet, cachorro, animal de estimação') else '' end like upper(${searchTerm})
                                or upper(ed."name") like upper(${searchTerm})
                                or upper(ed.description) like upper(${searchTerm})
                                or upper(ag.description) like upper(${searchTerm})
                                or upper(c2.description) like upper(${searchTerm})   
                                or upper(o2."name") like upper(${searchTerm})  
                                or to_char(es."date",'dd/mm/yyyy hh24:mi:ss') like upper(${searchTerm}))
                        union
                        select distinct 'ARTIGO' tipo_registro
                            ,a2.uuid as uuid
                            ,null
                            ,null
                            ,null::int
                            ,null
                            ,null
                            ,null
                            ,null
                            ,null
                            ,null
                            ,null
                            ,null
                            ,null
                            ,null
                            ,null::boolean
                            ,null::boolean
                            ,null::boolean
                            ,null::boolean
                            ,null::boolean
                            ,null::boolean
                            ,null::boolean
                            ,null::numeric
                            ,null
                            ,null::geometry
                            ,null::float
                            ,null
                            ,a2.url
                            ,a2.title
                            ,a2.text
                            ,a2.author_uuid
                            ,a2.publishment_date
                            ,null
                            ,null
                            ,null::int
                            ,null
                            ,null
                            ,null
                            ,null::int
                            ,null
                            ,null
                            ,null
                            ,null
                            ,null::int
                            ,null
                            ,null
                            ,null::int
                            ,null::int
                            ,null
                            ,null::int
                            ,null
                            ,null
                            ,null::timestamp
                            ,null
                            ,null
                            ,null
                            ,null
                            ,null::int
                            ,null
                            ,null
                            ,null
                            ,null
                            ,null
                            ,null::int
                            ,a3.uuid
                            ,a3.email
                            ,a3.name
                            ,a3.phone
                            ,a3.image_url
                            ,a3.description
                            ,a3.theme
                            ,a3.instagram_deep_link
                            ,a3.website_url
                            ,ai.uuid
                            ,ai.url
                            ,ai.priority
                        from articles a2
                        left join authors a3
                            on a3.uuid = a2.author_uuid
                        left join article_images ai
                            on ai.article_uuid = a2.uuid
                        where upper(a2.title) like upper(${searchTerm})
                            or upper(a2."text") like upper(${searchTerm})
                            or upper(a3."name") like upper(${searchTerm})
                            or upper(a3.description) like upper(${searchTerm})
                            or upper(a3.theme) like upper(${searchTerm})
                    ) as x
                group by x.tipo_registro
                    ,x.uuid
                    ,x.name
                    ,x.slogan
                    ,x.duration
                    ,x.description
                    ,x.cost_description
                    ,x.localization_description
                    ,x.opening_hours_description
                    ,x.parental_recomendations
                    ,x.cpfcnpj
                    ,x.instagram_deep_link
                    ,x.whatsapp_url_deep_link
                    ,x.url_place
                    ,x.url_shop
                    ,x.is_free
                    ,x.has_wifi
                    ,x.has_parking
                    ,x.has_accessibility
                    ,x.is_pet_friendly
                    ,x.has_kid_caregiver
                    ,x.is_active
                    ,x.rate
                    ,x.owner_uuid
                    ,x.place_uuid
                    ,x.url
                    ,x.title
                    ,x.text
                    ,x.author_uuid
                    ,x.publishment_date
                    ,x.place_campaign_investment
                    ,x.location
                order by
                    x.tipo_registro desc,
                    place_campaign_investment desc,
                    distance_meters
            `;

            const retorno: any[] = result.map(c => {
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
                if (c.tipo_registro === 'ESTABELECIMENTO') {
                    return {
                        tipo_registro: c.tipo_registro,
                        uuid: c.uuid,
                        name: c.name,
                        slogan: c.slogan,
                        description: c.description,
                        cost_description: c.cost_description,
                        localization_description: c.localization_description,
                        opening_hours_description: c.opening_hours_description,
                        parental_recomendations: c.parental_recomendations,
                        cpfcnpj: c.cpfcnpj,
                        instagram_deep_link: c.instagram_deep_link,
                        whatsapp_url_deep_link: c.whatsapp_url_deep_link,
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
                        is_sponsored: c.place_campaign_investment > 0,
                        distance_meters: location ? c.distance_meters : 0,
                        place_images: c.place_images ? c.place_images.sort((a: any, b: any) => a.priority - b.priority) : [],
                        place_details: c.place_details ? c.place_details.sort((a: any, b: any) => a.priority - b.priority) : [],
                        place_categories: c.place_categories ?? [],
                        place_tags: c.place_tags ? c.place_tags.sort((a: any, b: any) => a.priority - b.priority) : [],
                        place_age_groups: c.place_age_groups ? c.place_age_groups.sort((a: any, b: any) => a.start_age - b.start_age) : [],
                        place_users_ratings: c.place_users_ratings ?? []
                    };
                } else if (c.tipo_registro === 'EVENTO') {
                    return {
                        tipo_registro: c.tipo_registro,
                        uuid: c.uuid,
                        name: c.name,
                        duration: c.duration,
                        description: c.description,
                        cost_description: c.cost_description,
                        localization_description: c.localization_description,
                        parental_recomendations: c.parental_recomendations,
                        url_place: c.url_place,
                        url_shop: c.url_shop,
                        is_free: c.is_free,
                        has_wifi: c.has_wifi,
                        has_parking: c.has_parking,
                        has_accessibility: c.has_accessibility,
                        is_pet_friendly: c.is_pet_friendly,
                        has_kid_caregiver: c.has_kid_caregiver,
                        owner_uuid: c.owner_uuid,
                        place_uuid: c.place_uuid,
                        location: locationObj,
                        is_sponsored: c.place_campaign_investment > 0,
                        distance_meters: location ? c.distance_meters : 0,
                        place_images: c.place_images ? c.place_images.sort((a: any, b: any) => a.priority - b.priority) : [],
                        event_images: c.event_images ?? [],
                        event_tags: c.event_tags ? c.event_tags.sort((a: any, b: any) => a.priority - b.priority) : [],
                        event_categories: c.event_categories ?? [],
                        event_details: c.event_details ? c.event_details.sort((a: any, b: any) => a.priority - b.priority) : [],
                        event_schedules: c.event_schedules ?? []
                    };
                } else if (c.tipo_registro === 'ARTIGO') {
                    return {
                        tipo_registro: c.tipo_registro,
                        uuid: c.uuid,
                        url: c.url,
                        title: c.title,
                        text: c.text,
                        author_uuid: c.author_uuid,
                        publishment_date: c.publishment_date,
                        article_authors: c.article_authors ?? [],
                        article_images: c.article_images? c.article_images.sort((a: any, b: any) => a.priority - b.priority) : []
                    };
                }
            });

            return retorno;

        } catch (error: any) {
            throw new CustomError(error.message, error.status || 500);
        }
    }
}