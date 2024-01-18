const notificationModel = require("../models/notificationModel");

const notificationController = {
  get: async (req, res) => {
    try {
      const notifications = await notificationModel.findOne({
        userId: req.user._id,
      });
      return res.status(200).json({
        success: true,
        notifications,
      });
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  },
  push: async (req, res) => {
    try {
      const userNotification = await notificationModel.findOne({
        userId: req.user._id,
      });
      if (!userNotification) {
        await notificationModel.create({
          userId: req.body.userId,
          notifications: [
            {
              title: "Ứng tuyển thành công",
              body: "Chúng tôi đã gửi CV đến doanh nghiệp",
              companyName: req.body.companyName,
              createdAt: new Date(),
            },
          ],
        });
      } else {
        userNotification.notifications.push({
          title: "Ứng tuyển thành công",
          body: "Chúng tôi đã gửi CV đến doanh nghiệp",
          companyName: req.body.companyName,
        });
        await userNotification.save();
      }
      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error,
      });
    }
  },
  deleteNotification: async (req, res) => {
    try {
      await notificationModel.deleteOne({
        _id: req.params.id,
      });
      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  },

  updateSeen: async (req, res) => {
    try {
      const notification = await notificationModel.findByIdAndUpdate(
        req.params.id,
        {
          seen: true,
        }
      );
      if (!notification) return res.status(404).json("Notification not found");
      return res.status(200).json(notification);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = notificationController;
