export default async function (fastify, opts) {
    fastify.get('/get-filtered/:type', async function (request, reply) {
        const connection = await fastify.mysql.getConnection()
        let query = `SELECT * FROM ${request.params.type}`
        if(request.params.type === 'answerQuestions') {
            query += ` INNER JOIN Types AS t ON t.type_id = AnswerQuestions.type_id
            INNER JOIN Answers AS ans ON ans.answer_id = AnswerQuestions.answer_id`
        }
        const names = Object.keys(request.query)
        if (names.length > 0) {
            let count = 0
            query = query + ' WHERE '
            for (let item in names) {
                query += `${names[item]} = ${request.query[names[item]]}`
                count+=1
                if(count < names.length) {
                    query += ` AND `
                } else {
                    query += ';'
                }
            }
        }

        console.log(query)
        const [rows, fields] = await connection.query(
           query,
        )
        connection.release()
        return rows
       
    })
  }