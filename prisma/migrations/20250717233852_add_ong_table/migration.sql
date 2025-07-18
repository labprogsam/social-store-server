-- CreateTable
CREATE TABLE "ONG" (
    "id_bd" SERIAL NOT NULL,
    "id" INTEGER,
    "name" TEXT,
    "description" TEXT,
    "is_formalized" BOOLEAN,
    "start_year" INTEGER,
    "contact_phone" TEXT,
    "instagram_link" TEXT,
    "x_link" TEXT,
    "facebook_link" TEXT,
    "pix_qr_code_link" TEXT,
    "gallery_images_url" TEXT,
    "skills" TEXT,
    "causes" TEXT,
    "sustainable_development_goals" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ONG_pkey" PRIMARY KEY ("id_bd")
);

-- CreateIndex
CREATE UNIQUE INDEX "ONG_id_key" ON "ONG"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ONG_name_key" ON "ONG"("name");
