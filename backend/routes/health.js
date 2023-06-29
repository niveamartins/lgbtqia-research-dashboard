import { filterAllAnsQuestion } from "../repository/functions.js"

export default async function (fastify, opts) {
  fastify.get('/health', async function (request, reply) {
    filterAllAnsQuestion({
      category_id: 4,
      type_id: [2,3],
      country_id: [0,1]
    })
    return { status: "server is up!" }
  })
}