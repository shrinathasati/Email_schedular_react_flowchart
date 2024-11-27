// const Agenda = require("agenda");
// const nodemailer = require("nodemailer");

// const agenda = new Agenda({
//   db: { address: "mongodb://127.0.0.1:27017/emailScheduler" },
// });

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// agenda.define("send email", async (job) => {
//   const { emailBody, subject, emailAddress } = job.attrs.data;

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: emailAddress,
//     subject,
//     text: emailBody,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log(`Email sent to ${emailAddress}`);
//   } catch (err) {
//     console.error("Error sending email:", err);
//   }
// });

// (async function () {
//   await agenda.start();
// })();

// module.exports = agenda;

// require("dotenv").config(); // Load environment variables from .env
// const Agenda = require("agenda");

// // Initialize Agenda with MongoDB connection string from .env
// const agenda = new Agenda({
//   db: {
//     address: process.env.MONGO_URI, // MongoDB Atlas URI
//     collection: "agendaJobs", // Collection name for storing jobs
//   },
//   processEvery: "30 seconds", // Optional: How often to check for jobs (default is 5 seconds)
//   useUnifiedTopology: true,  // Use the new MongoDB driver
// });

// // Define a sample job (e.g., sending an email)
// agenda.define("send email", async (job) => {
//   const { email, subject, body } = job.attrs.data;

//   // Logic for sending email (using Nodemailer or any other email service)
//   console.log(`Sending email to ${email} with subject: ${subject}`);
// });

// // Start the Agenda instance
// (async function () {
//   try {
//     await agenda.start();
//     console.log("Agenda has started successfully.");
//   } catch (err) {
//     console.error("Error starting Agenda:", err);
//   }
// })();

// // Export agenda instance for use in other parts of the app
// module.exports = agenda;


// Method 2

// const Agenda = require("agenda");
// const nodemailer = require("nodemailer");
// require("dotenv").config();

// // Initialize Agenda
// const agenda = new Agenda({
//   db: { address: process.env.MONGO_URI, collection: "agendaJobs" },
//   processEvery: "30 seconds",
//   useUnifiedTopology: true,
// });

// // Nodemailer Configuration
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // Define "send email" job
// agenda.define("send email", async (job) => {
//   const { emailAddress, subject, emailBody } = job.attrs.data;

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: emailAddress,
//     subject,
//     text: emailBody,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log(`Email sent to ${emailAddress}`);
//   } catch (err) {
//     console.error("Error sending email:", err);
//   }
// });

// // Start Agenda
// (async function () {
//   try {
//     await agenda.start();
//     console.log("Agenda started successfully");
//   } catch (err) {
//     console.error("Error starting Agenda:", err);
//   }
// })();

// module.exports = agenda;



require("dotenv").config(); // Load environment variables from .env
const Agenda = require("agenda");
const nodemailer = require("nodemailer");

// Initialize Agenda with MongoDB connection string from .env
const agenda = new Agenda({
  db: {
    address: process.env.MONGO_URI, // MongoDB Atlas URI
    collection: "agendaJobs", // Collection name for storing jobs
  },
  processEvery: "30 seconds", // Optional: How often to check for jobs (default is 5 seconds)
  useUnifiedTopology: true,  // Use the new MongoDB driver
});

// Nodemailer transport configuration
const transporter = nodemailer.createTransport({
  service: "gmail", // You can use other email services like "outlook", "yahoo", etc.
  auth: {
    user: process.env.EMAIL_USER,  // Your email address
    pass: process.env.EMAIL_PASS,  // Your email password or app-specific password
  },
});

// Define the Agenda job for sending an email
agenda.define("send email", async (job) => {
  const { emailBody, subject, emailAddress } = job.attrs.data;

  const mailOptions = {
    from: process.env.EMAIL_USER, // Your email address
    to: emailAddress,             // Recipient email address
    subject: subject,             // Subject of the email
    text: emailBody,              // Body of the email
  };

  try {
    // Send the email using Nodemailer
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${emailAddress} with subject: ${subject}`);
  } catch (err) {
    console.error("Error sending email:", err);
  }
});

// Start the Agenda instance
(async function () {
  try {
    await agenda.start();
    console.log("Agenda has started successfully.");
  } catch (err) {
    console.error("Error starting Agenda:", err);
  }
})();

// Export agenda instance for use in other parts of the app
module.exports = agenda;
