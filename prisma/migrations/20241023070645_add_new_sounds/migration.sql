-- DropForeignKey
ALTER TABLE "Sound" DROP CONSTRAINT "Sound_albumId_fkey";

-- AlterTable
ALTER TABLE "Sound" ALTER COLUMN "albumId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Sound" ADD CONSTRAINT "Sound_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;
