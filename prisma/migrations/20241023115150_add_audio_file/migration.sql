/*
  Warnings:

  - Added the required column `audioFile` to the `Sound` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sound" ADD COLUMN     "audioFile" TEXT NOT NULL;
