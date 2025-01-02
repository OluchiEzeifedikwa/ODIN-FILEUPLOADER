/*
  Warnings:

  - You are about to drop the column `filename` on the `Folder` table. All the data in the column will be lost.
  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `foldername` to the `Folder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "filename",
ADD COLUMN     "foldername" TEXT NOT NULL;

-- DropTable
DROP TABLE "File";
