/*
  Warnings:

  - You are about to drop the column `audioPath` on the `Sound` table. All the data in the column will be lost.
  - Added the required column `brainMusicFile` to the `Sound` table without a default value. This is not possible if the table is not empty.
  - Added the required column `musicFile` to the `Sound` table without a default value. This is not possible if the table is not empty.
  - Added the required column `natureFile1` to the `Sound` table without a default value. This is not possible if the table is not empty.
  - Added the required column `natureFile2` to the `Sound` table without a default value. This is not possible if the table is not empty.
  - Added the required column `natureFile3` to the `Sound` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sound" DROP COLUMN "audioPath",
ADD COLUMN     "brainMusicFile" TEXT NOT NULL,
ADD COLUMN     "musicFile" TEXT NOT NULL,
ADD COLUMN     "natureFile1" TEXT NOT NULL,
ADD COLUMN     "natureFile2" TEXT NOT NULL,
ADD COLUMN     "natureFile3" TEXT NOT NULL;
