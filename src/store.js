const jobs = new Map();        // jobId -> job
const executions = new Map(); // jobId -> [executions]

function addJob(job) {
  jobs.set(job.id, job);
  executions.set(job.id, []);
}

function getJob(jobId) {
  return jobs.get(jobId);
}

function getAllJobs() {
  return Array.from(jobs.values());
}

function addExecution(jobId, execution) {
  if (!executions.has(jobId)) executions.set(jobId, []);
  executions.get(jobId).unshift(execution);
  executions.get(jobId).splice(5); // keep last 5
}

function getExecutions(jobId) {
  return executions.get(jobId) || [];
}
function updateJob(jobId, updatedFields) {
  const job = jobs.get(jobId);
  if (!job) return null;

  Object.assign(job, updatedFields);
  return job;
}


module.exports = {
  addJob,
  getJob,
  getAllJobs,
  addExecution,
  getExecutions,
  updateJob
};

