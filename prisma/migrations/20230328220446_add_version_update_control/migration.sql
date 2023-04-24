-- CreateTable
CREATE TABLE "version_update_control" (
    "uuid" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "is_mandatory" BOOLEAN NOT NULL,
    "release_date" TIMESTAMP(3),

    CONSTRAINT "version_update_control_pkey" PRIMARY KEY ("uuid")
);
