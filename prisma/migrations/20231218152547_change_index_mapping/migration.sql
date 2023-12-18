-- RenameIndex
ALTER TABLE `campaign_category_bridge` RENAME INDEX `categoryId` TO `category_id`;

-- RenameIndex
ALTER TABLE `campaign_donation_history_bridge` RENAME INDEX `donationHistoryId` TO `donation_history_id`;

-- RenameIndex
ALTER TABLE `campaigns` RENAME INDEX `campaignTypeId` TO `campaign_type_id`;

-- RenameIndex
ALTER TABLE `campaigns` RENAME INDEX `metricId` TO `metric_id`;

-- RenameIndex
ALTER TABLE `donors` RENAME INDEX `userId` TO `user_id`;

-- RenameIndex
ALTER TABLE `fundraisers` RENAME INDEX `userId` TO `user_id`;
