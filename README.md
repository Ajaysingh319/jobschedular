# jobschedular
High-throughput job scheduler with cron-based execution and retries

## Setup Instructions
1. Ensure Node.js (v18 or above) and npm are installed on your system.
2. Clone the GitHub repository to your local machine.
3. Navigate to the project directory.
4. Install the required dependencies using:
   ```bash
   npm install

## Steps to Run the Assignment Locally

1. Start the server by running:

node src/server.js


2. The server will start on http://localhost:3000
.

3. Jobs can be created using the /jobs API endpoint.

4. Job executions will run automatically based on the provided cron schedule

## Assumptions

The application runs on a single-node environment.

In-memory storage is sufficient for this assignment.

Jobs follow at-least-once execution semantics.

Cron expressions may include seconds.

## Dependencies

express – REST API framework

node-cron – job scheduling

axios – HTTP API calls

uuid – unique job IDs