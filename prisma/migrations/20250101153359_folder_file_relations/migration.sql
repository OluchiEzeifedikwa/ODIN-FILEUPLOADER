-- AlterTable
ALTER TABLE "File" ADD COLUMN     "folderId" TEXT NOT NULL DEFAULT 'some-default-folder-id';

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
