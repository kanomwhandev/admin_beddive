/*
  Warnings:

  - You are about to drop the column `albumId` on the `Sound` table. All the data in the column will be lost.
  - You are about to drop the column `brainMusicFile` on the `Sound` table. All the data in the column will be lost.
  - You are about to drop the column `coverImage` on the `Sound` table. All the data in the column will be lost.
  - You are about to drop the column `musicFile` on the `Sound` table. All the data in the column will be lost.
  - You are about to drop the column `natureFile1` on the `Sound` table. All the data in the column will be lost.
  - You are about to drop the column `natureFile2` on the `Sound` table. All the data in the column will be lost.
  - You are about to drop the column `natureFile3` on the `Sound` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Sound` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileUrl` to the `Sound` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SoundCategory" AS ENUM ('MUSIC', 'NATURE', 'BRAINWAVE');

-- DropForeignKey
ALTER TABLE "Sound" DROP CONSTRAINT "Sound_albumId_fkey";

-- AlterTable
ALTER TABLE "Sound" DROP COLUMN "albumId",
DROP COLUMN "brainMusicFile",
DROP COLUMN "coverImage",
DROP COLUMN "musicFile",
DROP COLUMN "natureFile1",
DROP COLUMN "natureFile2",
DROP COLUMN "natureFile3",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "fileUrl" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_AlbumToSound" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AlbumToSound_AB_unique" ON "_AlbumToSound"("A", "B");

-- CreateIndex
CREATE INDEX "_AlbumToSound_B_index" ON "_AlbumToSound"("B");

-- AddForeignKey
ALTER TABLE "Sound" ADD CONSTRAINT "Sound_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumToSound" ADD CONSTRAINT "_AlbumToSound_A_fkey" FOREIGN KEY ("A") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumToSound" ADD CONSTRAINT "_AlbumToSound_B_fkey" FOREIGN KEY ("B") REFERENCES "Sound"("id") ON DELETE CASCADE ON UPDATE CASCADE;
