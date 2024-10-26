-- CreateTable
CREATE TABLE "Sound" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "soundFile1" TEXT NOT NULL,
    "soundFile2" TEXT NOT NULL,
    "brainwave" TEXT NOT NULL,
    "music" TEXT NOT NULL,
    "albumId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sound_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Album" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Playlist" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlaylistToSound" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PlaylistToSound_AB_unique" ON "_PlaylistToSound"("A", "B");

-- CreateIndex
CREATE INDEX "_PlaylistToSound_B_index" ON "_PlaylistToSound"("B");

-- AddForeignKey
ALTER TABLE "Sound" ADD CONSTRAINT "Sound_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaylistToSound" ADD CONSTRAINT "_PlaylistToSound_A_fkey" FOREIGN KEY ("A") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaylistToSound" ADD CONSTRAINT "_PlaylistToSound_B_fkey" FOREIGN KEY ("B") REFERENCES "Sound"("id") ON DELETE CASCADE ON UPDATE CASCADE;
