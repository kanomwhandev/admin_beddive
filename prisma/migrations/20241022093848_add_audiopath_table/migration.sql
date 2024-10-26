/*
  Warnings:

  - You are about to drop the column `brainwave` on the `Sound` table. All the data in the column will be lost.
  - You are about to drop the column `music` on the `Sound` table. All the data in the column will be lost.
  - You are about to drop the column `soundFile1` on the `Sound` table. All the data in the column will be lost.
  - You are about to drop the column `soundFile2` on the `Sound` table. All the data in the column will be lost.
  - Added the required column `adminId` to the `Sound` table without a default value. This is not possible if the table is not empty.
  - Added the required column `audioPath` to the `Sound` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sound" DROP COLUMN "brainwave",
DROP COLUMN "music",
DROP COLUMN "soundFile1",
DROP COLUMN "soundFile2",
ADD COLUMN     "adminId" INTEGER NOT NULL,
ADD COLUMN     "audioPath" TEXT NOT NULL,
ADD COLUMN     "coverImage" TEXT;

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "Sound" ADD CONSTRAINT "Sound_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
