/*
  Warnings:

  - You are about to drop the column `folderId` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Folder` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Folder` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Folder` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Folder` table. All the data in the column will be lost.
  - Added the required column `filename` to the `Folder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_folderId_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_userId_fkey";

-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_userId_fkey";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "folderId",
DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "createdAt",
DROP COLUMN "name",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "filename" TEXT NOT NULL;
