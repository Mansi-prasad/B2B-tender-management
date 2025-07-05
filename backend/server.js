const express = require("express");
const dotenv = require("dotenv");
const companyRoutes = require("./routes/companyRoutes");
const tenderRoutes = require("./routes/tenderRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const searchRoute = require("./routes/searchRoutes");
dotenv.config();
const cors = require("cors");
const app = express();
app.use(cors());
require("dotenv").config();
app.use(express.json());

// Routes
app.use("/api/company", companyRoutes);
app.use("/api/tenders", tenderRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/search", searchRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
