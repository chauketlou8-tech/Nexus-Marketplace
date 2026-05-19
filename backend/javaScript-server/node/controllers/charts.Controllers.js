const asyncHandler = require("../middleware/asyncHandler");
const { CustomError } = require("../errors/CustomError");
const { readFile, writeFile } = require('fs/promises');
const path = require("path");

const salesFilePath = path.join(__dirname, "../public/salesTrend.json");
const popularFilePath = path.join(__dirname, "../public/popularItems.json");

const months = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
};

const updateSalesData = asyncHandler(async (req, res, next) => {
    const { revenue } = req.body;

    if (typeof revenue !== "number") {
        return next(new CustomError("Revenue must be a number", 400));
    }

    const data = await readFile(salesFilePath, "utf-8");
    const salesData = JSON.parse(data);

    const currentMonth = new Date().getMonth();

    salesData.forEach((item) => {
        if (item.month === months[currentMonth]) {
            item.revenue = revenue;
        }
    });

    await writeFile(salesFilePath, JSON.stringify(salesData, null, 2));

    return res.status(200).json({ message: "Revenue updated successfully", salesData });
});

const updateSubscriptionData = asyncHandler(async (req, res) => {
    const { subscriptions } = req.body;

    if(!subscriptions.length) {
        return res.status(400).json({ message: "Subscription empty" });
    }

    const data = await readFile(subscriptionsFilePath, "utf-8");
    const subscriptionsData = JSON.parse(data);

    let currentMonth = new Date().getMonth();

    //for January
    if (currentMonth === 0) {
        const newData = [];

        subscriptionsData.forEach((item) => {
            let newObj = {
                "month": item.month,
                "basic": item.month === "January" ? subscriptions.filter((item) => item.name === "Basic").length : "N/A",
                "standard": item.month === "January" ? subscriptions.filter((item) => item.name === "Standard").length : "N/A",
                "premium": item.month === "January" ? subscriptions.filter((item) => item.name === "Premium").length : "N/A"
            }

            newData.push(newObj);
        });

        await writeFile(subscriptionsFilePath, JSON.stringify(newData, null, 2));
        return res.status(200).json({ msg: "subscriptionsData", data: newData});
    }

    //for other months
    currentMonth = months[currentMonth];

    const newData = [];

    subscriptionsData.forEach((item) => {
        let newObj = {
            "month": item.month,
            "basic": item.month === currentMonth  ? subscriptions.filter((item) => item.name === "Basic").length : item.basic,
            "standard": item.month === currentMonth  ? subscriptions.filter((item) => item.name === "Standard").length : item.standard,
            "premium": item.month === currentMonth  ? subscriptions.filter((item) => item.name === "Premium").length : item.premium
        }

        newData.push(newObj);
    });

    await writeFile(subscriptionsFilePath, JSON.stringify(newData, null, 2));
    res.status(200).json({msg: "success", data: newData});

});

const getRevenue = asyncHandler(async (req, res) => {
    const data = await readFile(revenueFilePath, "utf-8");
    const growthData = JSON.parse(data);
    res.status(200).json(growthData);
});

const getGrowthData = asyncHandler(async (req, res) => {
    const data = await readFile(growthFilePath, "utf-8");
    const growthData = JSON.parse(data);
    res.status(200).json(growthData);
});

const getSubscriptions = asyncHandler(async (req, res) => {
    const data = await readFile(subscriptionsFilePath, "utf-8");
    const subscriptionsData = JSON.parse(data);
    res.status(200).json(subscriptionsData);
});

const numWeeksInMonth = (year = new Date().getFullYear(), month = new Date().getMonth()) => {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    return Math.ceil((firstDay + totalDays) / 7);
};

function isNewTimeAgo(date) {
    const now = new Date();
    const seconds = Math.floor((now - new Date(date)) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);

    return months <= 1;

}

const weekOfMonth = () => {
    const today = new Date();
    return Math.ceil(today.getDate() / 7);
}

module.exports = { updateRevenue, getRevenue, updateGrowthData, getGrowthData, updateSubscriptionData, getSubscriptions };