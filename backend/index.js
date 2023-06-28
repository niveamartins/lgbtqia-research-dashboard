import { fastify } from "fastify";
import path from 'path';
import AutoLoad from 'fastify-autoload';
import { fileURLToPath } from 'url';
import dotenv from "dotenv";

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = fastify({
  logger: true
})

server.register(AutoLoad, {
  dir: path.join(__dirname, 'routes')
});

const start = async () => {
  try {
    await server.listen({ port: 3000 })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()