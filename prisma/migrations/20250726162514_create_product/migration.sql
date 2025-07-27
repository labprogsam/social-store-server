/*
  Warnings:

  - The primary key for the `ONG` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_bd` on the `ONG` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[external_id]` on the table `ONG` will be added. If there are existing duplicate values, this will fail.
  - Made the column `id` on table `ONG` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `specification` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_ongId_fkey";

-- DropIndex
DROP INDEX "ONG_id_key";

-- AlterTable
CREATE SEQUENCE ong_id_seq;
ALTER TABLE "ONG" DROP CONSTRAINT "ONG_pkey",
DROP COLUMN "id_bd",
ADD COLUMN     "banner" TEXT,
ADD COLUMN     "external_id" INTEGER,
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "whatsapp" TEXT,
ALTER COLUMN "id" SET NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('ong_id_seq'),
ADD CONSTRAINT "ONG_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE ong_id_seq OWNED BY "ONG"."id";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "specification" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoriesToProduct" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CategoriesToProduct_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categories_value_key" ON "Categories"("value");

-- CreateIndex
CREATE INDEX "_CategoriesToProduct_B_index" ON "_CategoriesToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "ONG_external_id_key" ON "ONG"("external_id");

-- CreateIndex
CREATE INDEX "Product_ongId_idx" ON "Product"("ongId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_ongId_fkey" FOREIGN KEY ("ongId") REFERENCES "ONG"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriesToProduct" ADD CONSTRAINT "_CategoriesToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriesToProduct" ADD CONSTRAINT "_CategoriesToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
