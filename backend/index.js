import { fastify } from "fastify";
import path from 'path';
import AutoLoad from 'fastify-autoload';
import MySQL from '@fastify/mysql';
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
import cors from '@fastify/cors'

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = fastify({
  logger: true
})

server.register(MySQL, {
  promise: true,
  connectionString: `mysql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`
})

await server.register(cors, { 
  origin: (origin, cb) => {
    const hostname = new URL(origin).hostname
    if(hostname === "localhost"){
      //  Request from localhost will pass
      cb(null, true)
      return
    }
    // Generate an error on other origins, disabling access
    cb(new Error("Not allowed"), false)
  }
})

server.register(AutoLoad, {
  dir: path.join(__dirname, 'routes')
});

const start = async () => {
  try {
    await server.listen({ port: 8081 })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()