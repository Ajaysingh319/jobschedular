## jobschedular

High-throughput job scheduler with cron-based execution and retries.

## System Design

The system is designed as a modular backend service with clear separation of responsibilities:

API Layer (server.js)
Handles job creation, modification, and execution history queries.

Scheduler (scheduler.js)
Manages cron-based scheduling using node-cron.
Ensures that jobs are correctly scheduled and rescheduled when modified.

Worker (worker.js)
Executes scheduled jobs by making HTTP POST requests to external APIs and records execution results.

Store (store.js)
Maintains in-memory storage for job metadata and the last five execution records per job.

This modular design makes the system easy to extend and reason about.

## Architecture Diagram
Client / API Call
        |
        v
+------------------+
|  Express Server  |
|  (server.js)     |
+------------------+
        |
        v
+------------------+
|  Job Scheduler   |
| (scheduler.js)   |
|  node-cron       |
+------------------+
        |
        v
+------------------+
|     Worker       |
|  (worker.js)     |
|  HTTP Executor   |
+------------------+
        |
        v
+------------------+
| Execution Store  |
|   (store.js)     |
|  In-Memory Data  |
+------------------+

## Data Flow

A job is created via the API or predefined demo configuration.

Job metadata (jobId, schedule, API endpoint) is stored in memory.

The scheduler registers the job using a cron expression.

At the scheduled time, the scheduler triggers the worker.

The worker executes an HTTP POST request to the configured API.

Execution results (timestamp, status, duration) are stored.

Users can fetch the last five executions of a job using the API.

## API Design
Health Check

GET /health
Returns service health status.

Create Job

POST /jobs

Request body:

{
  "schedule": "*/10 * * * * *",
  "api": "https://example.com/api"
}


Response:

{
  "jobId": "generated-job-id"
}

Modify Job

PUT /jobs/:id
Updates the schedule or API endpoint of an existing job and reschedules it.

Get Job Executions

GET /jobs/:id/executions
Returns the last five execution records for a job.

## Setup Instructions

Ensure Node.js (v18 or above) and npm are installed on your system.

Clone the GitHub repository to your local machine.

Navigate to the project directory.

Install the required dependencies using:

npm install

## Steps to Run the Assignment Locally

Start the server:

node src/server.js


The server will start on:

http://localhost:3000


Jobs can be created or modified using the provided API endpoints.

Job executions will run automatically based on the configured cron schedules.

## Sample Dataset

Since this is a job scheduling system, the sample dataset consists of:

Sample job configurations (jobId, cron schedule, API endpoint)

Generated execution records (timestamp, HTTP status, execution duration)

A demo job is preconfigured to demonstrate scheduler behavior and execution tracking.

## Assumptions

The application runs in a single-node environment.

In-memory storage is sufficient for this assignment.

Jobs follow at-least-once execution semantics.

Cron expressions may include seconds.

External API availability is assumed during execution.

## Dependencies

express – REST API framework

node-cron – job scheduling

axios – HTTP API calls

uuid – unique job ID generation