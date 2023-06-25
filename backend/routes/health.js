export default async function (fastify, opts) {
  fastify.get('/health', async function (request, reply) {
    return { status: "server is up!" }
  })
}