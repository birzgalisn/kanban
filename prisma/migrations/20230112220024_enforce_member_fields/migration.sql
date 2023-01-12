/*
  Warnings:

  - Made the column `userId` on table `Member` required. This step will fail if there are existing NULL values in that column.
  - Made the column `workspaceId` on table `Member` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Member` MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `workspaceId` VARCHAR(191) NOT NULL;
