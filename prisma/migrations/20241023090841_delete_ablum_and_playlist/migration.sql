/*
  Warnings:

  - You are about to drop the `Album` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Playlist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AlbumToSound` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PlaylistToSound` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AlbumToSound" DROP CONSTRAINT "_AlbumToSound_A_fkey";

-- DropForeignKey
ALTER TABLE "_AlbumToSound" DROP CONSTRAINT "_AlbumToSound_B_fkey";

-- DropForeignKey
ALTER TABLE "_PlaylistToSound" DROP CONSTRAINT "_PlaylistToSound_A_fkey";

-- DropForeignKey
ALTER TABLE "_PlaylistToSound" DROP CONSTRAINT "_PlaylistToSound_B_fkey";

-- DropTable
DROP TABLE "Album";

-- DropTable
DROP TABLE "Playlist";

-- DropTable
DROP TABLE "_AlbumToSound";

-- DropTable
DROP TABLE "_PlaylistToSound";
