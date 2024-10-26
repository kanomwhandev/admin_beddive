/*
  Warnings:

  - You are about to drop the column `adminId` on the `Sound` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sound" DROP CONSTRAINT "Sound_adminId_fkey";

-- AlterTable
ALTER TABLE "Sound" DROP COLUMN "adminId";

-- DropTable
DROP TABLE "Admin";
