-- CreateTable
CREATE TABLE `campaign_category_bridge` (
    `campaign_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,

    INDEX `categoryId`(`category_id`),
    PRIMARY KEY (`campaign_id`, `category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `campaign_donation_history_bridge` (
    `campaign_id` INTEGER NOT NULL,
    `donation_history_id` INTEGER NOT NULL,

    INDEX `donationHistoryId`(`donation_history_id`),
    PRIMARY KEY (`campaign_id`, `donation_history_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `campaign_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NULL,
    `isActive` BOOLEAN NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `campaigns` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(500) NOT NULL,
    `description` TEXT NULL,
    `fundraiser_id` INTEGER NOT NULL,
    `start_date` DATE NULL,
    `end_date` DATE NULL,
    `goal` INTEGER NULL,
    `funds_raised` INTEGER NULL,
    `status` ENUM('active', 'expired', 'completed', 'canceled') NULL,
    `campaign_image` VARCHAR(800) NULL,
    `paybill_number` MEDIUMINT NULL,
    `privacy_setting` ENUM('public', 'private') NULL,
    `verification_status` BOOLEAN NULL,
    `created_at` DATE NULL,
    `updated_at` DATE NULL,
    `metric_id` INTEGER NOT NULL,
    `campaign_type_id` INTEGER NOT NULL,

    INDEX `campaignTypeId`(`campaign_type_id`),
    INDEX `metricId`(`metric_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `donation_histories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `donor_id` INTEGER NOT NULL,
    `donation_date` DATE NULL,
    `amount` MEDIUMINT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `donors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,

    INDEX `userId`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fundraisers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `profile_picture` VARCHAR(1000) NULL,
    `dob` DATE NOT NULL,
    `id_number` MEDIUMINT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `userId`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `metrics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `donor_count` MEDIUMINT NULL,
    `total_funds_raised` MEDIUMINT NULL,
    `max_donation` MEDIUMINT NULL,
    `min_donation` MEDIUMINT NULL,
    `donation_frequency` MEDIUMINT NULL,
    `progress` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(200) NOT NULL,
    `last_name` VARCHAR(200) NOT NULL,
    `user_name` VARCHAR(200) NOT NULL,
    `password` VARCHAR(300) NOT NULL,
    `email` VARCHAR(300) NOT NULL,
    `address` VARCHAR(300) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `campaign_category_bridge` ADD CONSTRAINT `campaign_category_bridge_ibfk_1` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `campaign_category_bridge` ADD CONSTRAINT `campaign_category_bridge_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `campaign_donation_history_bridge` ADD CONSTRAINT `campaign_donation_history_bridge_ibfk_1` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `campaign_donation_history_bridge` ADD CONSTRAINT `campaign_donation_history_bridge_ibfk_2` FOREIGN KEY (`donation_history_id`) REFERENCES `donation_histories`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `campaigns` ADD CONSTRAINT `campaigns_ibfk_1` FOREIGN KEY (`campaign_type_id`) REFERENCES `campaign_types`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `campaigns` ADD CONSTRAINT `campaigns_ibfk_2` FOREIGN KEY (`metric_id`) REFERENCES `metrics`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `donors` ADD CONSTRAINT `donors_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `fundraisers` ADD CONSTRAINT `fundraisers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

