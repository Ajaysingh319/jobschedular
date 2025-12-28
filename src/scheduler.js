const cron = require("node-cron");
const { executeJob } = require("./worker");

// store cron tasks by jobId
const tasks = new Map();

function scheduleJob(job) {
  // stop existing task if any
  if (tasks.has(job.id)) {
    tasks.get(job.id).stop();
  }

  const task = cron.schedule(job.schedule, () => {
    executeJob(job);
  });

  tasks.set(job.id, task);
}

module.exports = { scheduleJob };
