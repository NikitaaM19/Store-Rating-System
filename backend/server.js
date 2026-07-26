const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const { sequelize } = require("./models");

app.use(cors());
app.use(express.json());


const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const ownerRoutes = require("./routes/ownerRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/owner", ownerRoutes);


app.get("/", (req, res) => {
  res.json({ message: "API Running " });
});

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(() => {
  console.log("DB Connected ");
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});