-- DropIndex
DROP INDEX "articles_url_key";

-- AlterTable
ALTER TABLE "articles" ALTER COLUMN "url" DROP NOT NULL;
