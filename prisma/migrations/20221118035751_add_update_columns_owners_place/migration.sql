-- AlterTable
ALTER TABLE "owners"
RENAME COLUMN "cpfcpnj" TO "cnpj";

ALTER TABLE "owners"
ALTER COLUMN "cnpj" DROP NOT NULL,
ALTER COLUMN "person_type" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL;

-- AlterTable
ALTER TABLE "places" ADD COLUMN     "corporate_name" TEXT,
ADD COLUMN     "person_type" "PersonType";
