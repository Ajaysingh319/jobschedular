const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { addJob, getExecutions, updateJob } = require("./store");
const { scheduleJob } = require("./scheduler");

const app = express();
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// Create Job API
app.post("/jobs", (req, res) => {
  const { schedule, api } = req.body;

  const job = {
    id: uuidv4(),
    schedule,
    api,
    type: "AT_LEAST_ONCE"
  };

  addJob(job);
  scheduleJob(job);

  res.json({ jobId: job.id });
});

// ---------------- MODIFY JOB API ----------------
app.put("/jobs/:id", (req, res) => {
  const { schedule, api } = req.body;
  const jobId = req.params.id;

  const updatedJob = updateJob(jobId, { schedule, api });

  if (!updatedJob) {
    return res.status(404).json({ error: "Job not found" });
  }

  // stop old schedule & start new one
  scheduleJob(updatedJob);

  res.json({
    message: "Job updated successfully",
    jobId: updatedJob.id
  });
});
// ------------------------------------------------

// Get last 5 executions of a job
app.get("/jobs/:id/executions", (req, res) => {
  res.json(getExecutions(req.params.id));
});

// ---------------- DEMO JOB (AUTO-RUN) ----------------
const demoJob = {
  id: "demo-job",
  schedule: "*/10 * * * * *", // every 10 seconds
  api: "https://httpbin.org/post",
  type: "AT_LEAST_ONCE"
};

addJob(demoJob);
scheduleJob(demoJob);
console.log("Demo job scheduled every 10 seconds");
// ----------------------------------------------------

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
