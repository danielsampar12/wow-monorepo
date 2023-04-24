-- AlterTable
ALTER TABLE "places" ADD COLUMN     "has_kid_caregiver" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "instagram_deep_link" TEXT,
ADD COLUMN     "is_pet_friendly" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "whatsapp_url_deep_link" TEXT;
