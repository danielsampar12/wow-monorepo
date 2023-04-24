-- DropIndex
DROP INDEX "place_images_url_key";

-- AlterTable
ALTER TABLE "owners" DROP COLUMN "cpnj",
ADD COLUMN     "cpfcnpj" TEXT;
