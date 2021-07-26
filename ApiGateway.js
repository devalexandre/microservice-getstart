const polka = require('polka');
const { json } = require('@polka/parse');
const cpuCount = require('os').cpus().length;
const cluster = require('cluster');
const logger = require('pino')({
  prettyPrint: { colorize: true },
});

const PORT = 3000 || process.env.PORT;
// Code to run if we're in the master process
if (cluster.isPrimary) {
  // Count the machine's CPUs

  // Create a worker for each CPU
  for (let i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }

// Code to run if we're in a worker process
} else {
  polka()
    .use(json())
    .post('/sendmail', async () => 'enviando email')
    .listen(PORT, () => {
      logger.info('Worker Cluster %d running!', cluster.worker.id);
      logger.info(`Server UP in http://localhost:${PORT}`);
    });
}
