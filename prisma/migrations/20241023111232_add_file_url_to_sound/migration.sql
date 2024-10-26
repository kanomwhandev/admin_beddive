/*
  Warnings:

  - Added the required column `fileUrl` to the `Sound` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sound" ADD COLUMN     "fileUrl" TEXT NOT NULL,
ALTER COLUMN "duration" DROP NOT NULL;
