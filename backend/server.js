// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const agenda = require("./utils/agenda");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());
// require("dotenv").config();

// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB Atlas Connected"))
//   .catch((err) => console.log("Error connecting to MongoDB Atlas:", err));



// app.post("/schedule-email", async (req, res) => {
//   const { time, emailBody, subject, emailAddress } = req.body;

//   if (!time || !emailBody || !subject || !emailAddress) {
//     return res.status(400).send("All fields are required!");
//   }

//   const job = await agenda.schedule(new Date(time), "send email", {
//     emailBody,
//     subject,
//     emailAddress,
//   });

//   res.send(`Email scheduled with ID: ${job.attrs._id}`);
// });

// app.listen(5000, () => console.log("Server running on port 5000"));


// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const agenda = require("./utils/agenda");

// require("dotenv").config();

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB Atlas Connected"))
//   .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));

// // Schedule Email Route
// app.post("/schedule-email", async (req, res) => {
//   try {
//     const { time, emailBody, subject, emailAddress } = req.body;

//     if (!time || !emailBody || !subject || !emailAddress) {
//       return res.status(400).json({ error: "All fields are required!" });
//     }

//     const job = await agenda.schedule(new Date(time), "send email", {
//       emailBody,
//       subject,
//       emailAddress,
//     });

//     res.status(200).json({
//       message: "Email scheduled successfully",
//       jobId: job.attrs._id,
//     });
//   } catch (err) {
//     console.error("Error scheduling email:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Test Endpoint
// app.get("/test", (req, res) => {
//   res.status(200).json({ message: "Backend is working!" });
// });

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const agenda = require("./utils/agenda");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));

// Schedule Email Route
app.post("/schedule-email", async (req, res) => {
  try {
    const { time, emailBody, subject, emailAddress } = req.body;

    if (!time || !emailBody || !subject || !emailAddress) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const job = await agenda.schedule(new Date(time), "send email", {
      emailBody,
      subject,
      emailAddress,
    });

    res.status(200).json({
      message: "Email scheduled successfully",
      jobId: job.attrs._id,
    });
  } catch (err) {
    console.error("Error scheduling email:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Test Endpoint
app.get("/test", (req, res) => {
  res.status(200).json({ message: "Backend is working!" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
