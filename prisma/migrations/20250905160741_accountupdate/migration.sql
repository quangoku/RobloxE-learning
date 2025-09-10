-- AlterTable
ALTER TABLE `Account` ADD COLUMN `id_token` TEXT NULL,
    ADD COLUMN `scope` VARCHAR(191) NULL,
    ADD COLUMN `token_type` VARCHAR(191) NULL,
    MODIFY `expires_at` INTEGER NULL;
