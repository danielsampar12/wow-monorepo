-- AlterTable
ALTER TABLE "authors" ADD COLUMN     "priority" INTEGER;

-- CreateTable
CREATE TABLE "_AuthorToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AuthorToTag_AB_unique" ON "_AuthorToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_AuthorToTag_B_index" ON "_AuthorToTag"("B");

-- AddForeignKey
ALTER TABLE "_AuthorToTag" ADD CONSTRAINT "_AuthorToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "authors"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToTag" ADD CONSTRAINT "_AuthorToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
