export default async function (fastify, opts) {
    fastify.get('/get/:type', async function (request, reply) {
        const connection = await fastify.mysql.getConnection()
        const [rows, fields] = await connection.query(
            `SELECT * FROM ${request.params.type}`,
        )
        connection.release()
        return rows
       
    })
  }