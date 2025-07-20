/*
  Warnings:

  - You are about to drop the column `samuel` on the `ONG` table. All the data in the column will be lost.
  - Added the required column `ongId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "ongId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_ongId_fkey" FOREIGN KEY ("ongId") REFERENCES "ONG"("id_bd") ON DELETE RESTRICT ON UPDATE CASCADE;
