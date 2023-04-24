-- CreateEnum
CREATE TYPE "LoginProvider" AS ENUM ('LOCAL', 'GOOGLE', 'FACEBOOK');

-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "IconFamilies" AS ENUM ('Feather', 'Octicons', 'MaterialIcons', 'MaterialCommunityIcons', 'FontAwesome', 'FontAwesome5', 'FontAwesome5Brands', 'Fontisto', 'Foundation', 'Ionicons', 'AntDesign', 'Entypo', 'EvilIcons', 'SimpleLineIcons', 'Zocial');

-- CreateEnum
CREATE TYPE "PersonType" AS ENUM ('fisica', 'juridica');

-- CreateTable
CREATE TABLE "users" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "accept_send_location" BOOLEAN NOT NULL DEFAULT false,
    "birthdate" TIMESTAMP(3),
    "genre" "Genre",
    "postalcode" TEXT,
    "address" TEXT,
    "address_number" TEXT,
    "address_complement" TEXT,
    "district" TEXT,
    "city" TEXT,
    "state" TEXT,
    "phone" TEXT,
    "place_distance" INTEGER,
    "place_rating" DECIMAL(65,30),
    "login_provider" "LoginProvider" NOT NULL DEFAULT E'LOCAL',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "users_places_wishlists" (
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "place_uuid" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_places_wishlists_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "user_event_wishlists" (
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "event_uuid" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_event_wishlists_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "categories" (
    "uuid" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon_name" TEXT,
    "icon_family" "IconFamilies",
    "parent_uuid" TEXT,
    "created_user_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_user_uuid" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "announcements" (
    "uuid" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "action_url" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "priority" INTEGER NOT NULL,
    "seconds_display_time" INTEGER NOT NULL,
    "advertiser_uuid" TEXT NOT NULL,
    "created_user_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_user_uuid" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "announcements_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "advertisers" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "person_type" "PersonType" NOT NULL,
    "cpfcnpj" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "address_number" TEXT NOT NULL,
    "address_complement" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_user_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_user_uuid" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "advertisers_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "age_groups" (
    "uuid" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "start_age" INTEGER NOT NULL,
    "end_age" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_user_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_user_uuid" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "age_groups_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "owners" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "person_type" "PersonType" NOT NULL,
    "cpfcpnj" TEXT NOT NULL,
    "postalcode" TEXT,
    "address" TEXT,
    "address_number" TEXT,
    "address_complement" TEXT,
    "district" TEXT,
    "city" TEXT,
    "state" TEXT,
    "phone" TEXT NOT NULL,
    "url" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_user_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_user_uuid" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "owners_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "places" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "localization_description" TEXT NOT NULL,
    "opening_hours_description" TEXT NOT NULL,
    "cost_description" TEXT NOT NULL,
    "parental_recomendations" TEXT,
    "url_place" TEXT,
    "url_shop" TEXT,
    "is_free" BOOLEAN NOT NULL DEFAULT false,
    "has_wifi" BOOLEAN NOT NULL DEFAULT false,
    "has_parking" BOOLEAN NOT NULL DEFAULT false,
    "has_accessibility" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "owner_uuid" TEXT NOT NULL,
    "created_user_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_user_uuid" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "places_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "place_details" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "place_uuid" TEXT NOT NULL,
    "created_user_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_user_uuid" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "place_details_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "tags" (
    "uuid" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_user_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_user_uuid" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "place_users_ratings" (
    "uuid" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "user_uuid" TEXT NOT NULL,
    "place_uuid" TEXT NOT NULL,
    "created_user_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_user_uuid" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "place_users_ratings_pkey" PRIMARY KEY ("uuid","user_uuid","place_uuid")
);

-- CreateTable
CREATE TABLE "events" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "cost_description" TEXT NOT NULL,
    "localization_description" TEXT NOT NULL,
    "parental_recomendations" TEXT,
    "url_shop" TEXT,
    "url_place" TEXT,
    "is_free" BOOLEAN NOT NULL DEFAULT false,
    "place_uuid" TEXT NOT NULL,
    "owner_uuid" TEXT,
    "created_user_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_user_uuid" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "events_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "event_schedules" (
    "uuid" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "event_uuid" TEXT NOT NULL,
    "created_user_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_user_uuid" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_schedules_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "event_images" (
    "uuid" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "event_uuid" TEXT NOT NULL,
    "created_user_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_user_uuid" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_images_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "articles" (
    "uuid" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "author_uuid" TEXT NOT NULL,
    "created_user_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_user_uuid" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "article_images" (
    "uuid" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "article_uuid" TEXT NOT NULL,
    "created_user_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_user_uuid" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "article_images_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "authors" (
    "uuid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "created_user_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_user_uuid" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "authors_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "place_suggetions" (
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "observation" TEXT NOT NULL,
    "visualized" BOOLEAN NOT NULL DEFAULT false,
    "created_user_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_user_uuid" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "place_suggetions_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "announcement_suggetions" (
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT,
    "name" TEXT NOT NULL,
    "company_responsible" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "visualized" BOOLEAN NOT NULL DEFAULT false,
    "created_user_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_user_uuid" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "announcement_suggetions_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "place_images" (
    "uuid" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "place_uuid" TEXT NOT NULL,
    "created_user_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_user_uuid" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "place_images_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "_CategoryToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToPlace" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToEvent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AgeGroupToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AgeGroupToEvent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AgeGroupToPlace" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PlaceToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "event_schedules_date_key" ON "event_schedules"("date");

-- CreateIndex
CREATE UNIQUE INDEX "event_images_url_key" ON "event_images"("url");

-- CreateIndex
CREATE UNIQUE INDEX "articles_url_key" ON "articles"("url");

-- CreateIndex
CREATE UNIQUE INDEX "article_images_url_key" ON "article_images"("url");

-- CreateIndex
CREATE UNIQUE INDEX "authors_email_key" ON "authors"("email");

-- CreateIndex
CREATE UNIQUE INDEX "place_images_url_key" ON "place_images"("url");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToUser_AB_unique" ON "_CategoryToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToUser_B_index" ON "_CategoryToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToPlace_AB_unique" ON "_CategoryToPlace"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToPlace_B_index" ON "_CategoryToPlace"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToEvent_AB_unique" ON "_CategoryToEvent"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToEvent_B_index" ON "_CategoryToEvent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AgeGroupToUser_AB_unique" ON "_AgeGroupToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_AgeGroupToUser_B_index" ON "_AgeGroupToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AgeGroupToEvent_AB_unique" ON "_AgeGroupToEvent"("A", "B");

-- CreateIndex
CREATE INDEX "_AgeGroupToEvent_B_index" ON "_AgeGroupToEvent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AgeGroupToPlace_AB_unique" ON "_AgeGroupToPlace"("A", "B");

-- CreateIndex
CREATE INDEX "_AgeGroupToPlace_B_index" ON "_AgeGroupToPlace"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PlaceToTag_AB_unique" ON "_PlaceToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_PlaceToTag_B_index" ON "_PlaceToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToTag_AB_unique" ON "_EventToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToTag_B_index" ON "_EventToTag"("B");

-- AddForeignKey
ALTER TABLE "users_places_wishlists" ADD CONSTRAINT "users_places_wishlists_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_places_wishlists" ADD CONSTRAINT "users_places_wishlists_place_uuid_fkey" FOREIGN KEY ("place_uuid") REFERENCES "places"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_event_wishlists" ADD CONSTRAINT "user_event_wishlists_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_event_wishlists" ADD CONSTRAINT "user_event_wishlists_event_uuid_fkey" FOREIGN KEY ("event_uuid") REFERENCES "events"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_created_user_uuid_fkey" FOREIGN KEY ("created_user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_updated_user_uuid_fkey" FOREIGN KEY ("updated_user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_uuid_fkey" FOREIGN KEY ("parent_uuid") REFERENCES "categories"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "announcements" ADD CONSTRAINT "announcements_created_user_uuid_fkey" FOREIGN KEY ("created_user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "announcements" ADD CONSTRAINT "announcements_updated_user_uuid_fkey" FOREIGN KEY ("updated_user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "announcements" ADD CONSTRAINT "announcements_advertiser_uuid_fkey" FOREIGN KEY ("advertiser_uuid") REFERENCES "advertisers"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "advertisers" ADD CONSTRAINT "advertisers_created_user_uuid_fkey" FOREIGN KEY ("created_user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "advertisers" ADD CONSTRAINT "advertisers_updated_user_uuid_fkey" FOREIGN KEY ("updated_user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "age_groups" ADD CONSTRAINT "age_groups_created_user_uuid_fkey" FOREIGN KEY ("created_user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "age_groups" ADD CONSTRAINT "age_groups_updated_user_uuid_fkey" FOREIGN KEY ("updated_user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "owners" ADD CONSTRAINT "owners_created_user_uuid_fkey" FOREIGN KEY ("created_user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "owners" ADD CONSTRAINT "owners_updated_user_uuid_fkey" FOREIGN KEY ("updated_user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "places" ADD CONSTRAINT "places_created_user_uuid_fkey" FOREIGN KEY ("created_user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "places" ADD CONSTRAINT "places_updated_user_uuid_fkey" FOREIGN KEY ("updated_user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "places" ADD CONSTRAINT "places_owner_uuid_fkey" FOREIGN KEY ("owner_uuid") REFERENCES "owners"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "place_details" ADD CONSTRAINT "place_details_created_user_uuid_fkey" FOREIGN KEY ("created_user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "place_details" ADD CONSTRAINT "place_details_updated_user_uuid_fkey" FOREIGN KEY ("updated_user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "place_details" ADD CONSTRAINT "place_details_place_uuid_fkey" FOREIGN KEY ("place_uuid") REFERENCES "places"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_created_user_uuid_fkey" FOREIGN KEY ("created_user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_updated_user_uuid_fkey" FOREIGN KEY ("updated_user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "place_users_ratings" ADD CONSTRAINT "place_users_ratings_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "place_users_ratings" ADD CONSTRAINT "place_users_ratings_created_user_uuid_fkey" FOREIGN KEY ("created_user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "place_users_ratings" ADD CONSTRAINT "place_users_ratings_updated_user_uuid_fkey" FOREIGN KEY ("updated_user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "place_users_ratings" ADD CONSTRAINT "place_users_ratings_place_uuid_fkey" FOREIGN KEY ("place_uuid") REFERENCES "places"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_created_user_uuid_fkey" FOREIGN KEY ("created_user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_updated_user_uuid_fkey" FOREIGN KEY ("updated_user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_owner_uuid_fkey" FOREIGN KEY ("owner_uuid") REFERENCES "owners"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_place_uuid_fkey" FOREIGN KEY ("place_uuid") REFERENCES "places"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_schedules" ADD CONSTRAINT "event_schedules_created_user_uuid_fkey" FOREIGN KEY ("created_user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_schedules" ADD CONSTRAINT "event_schedules_updated_user_uuid_fkey" FOREIGN KEY ("updated_user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_schedules" ADD CONSTRAINT "event_schedules_event_uuid_fkey" FOREIGN KEY ("event_uuid") REFERENCES "events"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_images" ADD CONSTRAINT "event_images_created_user_uuid_fkey" FOREIGN KEY ("created_user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_images" ADD CONSTRAINT "event_images_updated_user_uuid_fkey" FOREIGN KEY ("updated_user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_images" ADD CONSTRAINT "event_images_event_uuid_fkey" FOREIGN KEY ("event_uuid") REFERENCES "events"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_created_user_uuid_fkey" FOREIGN KEY ("created_user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_updated_user_uuid_fkey" FOREIGN KEY ("updated_user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_author_uuid_fkey" FOREIGN KEY ("author_uuid") REFERENCES "authors"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_images" ADD CONSTRAINT "article_images_created_user_uuid_fkey" FOREIGN KEY ("created_user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_images" ADD CONSTRAINT "article_images_updated_user_uuid_fkey" FOREIGN KEY ("updated_user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_images" ADD CONSTRAINT "article_images_article_uuid_fkey" FOREIGN KEY ("article_uuid") REFERENCES "articles"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authors" ADD CONSTRAINT "authors_created_user_uuid_fkey" FOREIGN KEY ("created_user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authors" ADD CONSTRAINT "authors_updated_user_uuid_fkey" FOREIGN KEY ("updated_user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "place_suggetions" ADD CONSTRAINT "place_suggetions_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "place_suggetions" ADD CONSTRAINT "place_suggetions_created_user_uuid_fkey" FOREIGN KEY ("created_user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "place_suggetions" ADD CONSTRAINT "place_suggetions_updated_user_uuid_fkey" FOREIGN KEY ("updated_user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "announcement_suggetions" ADD CONSTRAINT "announcement_suggetions_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "announcement_suggetions" ADD CONSTRAINT "announcement_suggetions_created_user_uuid_fkey" FOREIGN KEY ("created_user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "announcement_suggetions" ADD CONSTRAINT "announcement_suggetions_updated_user_uuid_fkey" FOREIGN KEY ("updated_user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "place_images" ADD CONSTRAINT "place_images_created_user_uuid_fkey" FOREIGN KEY ("created_user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "place_images" ADD CONSTRAINT "place_images_updated_user_uuid_fkey" FOREIGN KEY ("updated_user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "place_images" ADD CONSTRAINT "place_images_place_uuid_fkey" FOREIGN KEY ("place_uuid") REFERENCES "places"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToUser" ADD CONSTRAINT "_CategoryToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToUser" ADD CONSTRAINT "_CategoryToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToPlace" ADD CONSTRAINT "_CategoryToPlace_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToPlace" ADD CONSTRAINT "_CategoryToPlace_B_fkey" FOREIGN KEY ("B") REFERENCES "places"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToEvent" ADD CONSTRAINT "_CategoryToEvent_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToEvent" ADD CONSTRAINT "_CategoryToEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "events"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AgeGroupToUser" ADD CONSTRAINT "_AgeGroupToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "age_groups"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AgeGroupToUser" ADD CONSTRAINT "_AgeGroupToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AgeGroupToEvent" ADD CONSTRAINT "_AgeGroupToEvent_A_fkey" FOREIGN KEY ("A") REFERENCES "age_groups"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AgeGroupToEvent" ADD CONSTRAINT "_AgeGroupToEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "events"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AgeGroupToPlace" ADD CONSTRAINT "_AgeGroupToPlace_A_fkey" FOREIGN KEY ("A") REFERENCES "age_groups"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AgeGroupToPlace" ADD CONSTRAINT "_AgeGroupToPlace_B_fkey" FOREIGN KEY ("B") REFERENCES "places"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaceToTag" ADD CONSTRAINT "_PlaceToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "places"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaceToTag" ADD CONSTRAINT "_PlaceToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToTag" ADD CONSTRAINT "_EventToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "events"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToTag" ADD CONSTRAINT "_EventToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
