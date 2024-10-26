/*
  Warnings:

  - You are about to drop the column `author` on the `Sound` table. All the data in the column will be lost.
  - You are about to drop the column `fileUrl` on the `Sound` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Sound` table. All the data in the column will be lost.
  - Added the required column `duration` to the `Sound` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileName` to the `Sound` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filePath` to the `Sound` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileSize` to the `Sound` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Sound" DROP CONSTRAINT "Sound_categoryId_fkey";

-- AlterTable
ALTER TABLE "Sound" DROP COLUMN "author",
DROP COLUMN "fileUrl",
DROP COLUMN "imageUrl",
ADD COLUMN     "duration" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fileName" TEXT NOT NULL,
ADD COLUMN     "filePath" TEXT NOT NULL,
ADD COLUMN     "fileSize" INTEGER NOT NULL,
ALTER COLUMN "categoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Sound" ADD CONSTRAINT "Sound_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
