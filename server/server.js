const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectDB = require("./db/index.js");
const weatherRoutes = require("./routes/weather.js");
const userRoutes = require("./routes/user.routes.js");
const favoriteRoutes = require("./routes/favorite.routes.js");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Weather Dashboard API is running", status: "ok" });
});

app.use("/api/weather", weatherRoutes);
app.use("/api/users", userRoutes);
app.use("/api/favorites", favoriteRoutes);

const PORT = process.env.PORT || 5000;

connectDB()
.then(() => {
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
})
.catch((err) =>{
    console.log("MongoDB connection failed !!!", err);
})
