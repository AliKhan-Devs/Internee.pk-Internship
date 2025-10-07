import cluster from 'cluster'
import os from 'os'
import app from './app.js'

const numCPUs = os.cpus().length
const PORT = process.env.PORT || 5000

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`)
  console.log(`Starting ${numCPUs} worker processes...\n`)

  // Fork workers for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  // Restart worker if it crashes
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`)
    cluster.fork()
  })
} else {
  // Workers share the same TCP connection
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} running on port ${PORT}`)
  })
}
