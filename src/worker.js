const axios = require("axios");
const { addExecution } = require("./store");

async function executeJob(job) {
  console.log("Executing job:", job.id);
  const start = Date.now();
  try {
    const res = await axios.post(job.api);
    addExecution(job.id, {
      time: new Date().toISOString(),
      status: res.status,
      durationMs: Date.now() - start
    });
  } catch (err) {
    addExecution(job.id, {
      time: new Date().toISOString(),
      status: err.response?.status || 500,
      durationMs: Date.now() - start
    });
  }
}

module.exports = { executeJob };
