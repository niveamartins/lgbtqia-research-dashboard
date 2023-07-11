

async function selectAllFrom(table) {
    let results = await connection.query(
            `SELECT * FROM ${table}`
        )

    return results
}

async function filterAllAnsQuestion(filters) {
    let query = `SELECT DISTINCT *
    FROM AnswerQuestions AS aq
    INNER JOIN Answers AS ans ON ans.answer_id = aq.answer_id
    INNER JOIN Questions AS q ON q.question_id = aq.question_id
    INNER JOIN Categories AS c ON c.category_id = q.category_id
    INNER JOIN Types AS t ON t.type_id = aq.type_id
    HAVING q.category_id=${filters.category_id}`
    
    if(filters.type_id) {
        if (filters.type_id.length === 1) {
            query += ` AND aq.type_id = ${filters.type_id[0]}`
        } else {
            for(let type in filters.type_id) {
                if (type == 0) {
                    query += ` AND aq.type_id = ${filters.type_id[0]}`
                } else {
                    query += ` OR aq.type_id = ${filters.type_id[type]}`
                }
            }
        }
    }

    if(filters.answer_id) {
        if (filters.answer_id.length === 1) {
            query += ` AND aq.answer_id = ${filters.answer_id[0]}`
        } else {
            for(let answer in filters.answer_id) {
                if (answer == 0) {
                    query += ` AND aq.answer_id = ${filters.answer_id[0]}`
                } else {
                    query += ` OR aq.answer_id = ${filters.answer_id[answer]}`
                }
            }
        }
    }

    if(filters.question_id) {
        if (filters.question_id.length === 1) {
            query += ` AND aq.question_id = ${filters.question_id[0]}`
        } else {
            for(let question in filters.question_id) {
                if (question == 0) {
                    query += ` AND aq.question_id = ${filters.question_id[0]}`
                } else {
                    query += ` OR aq.question_id = ${filters.question_id[question]}`
                }
            }
        }
    }

    if(filters.country_id) {
        if (filters.country_id.length === 1) {
            query += ` AND aq.country_id = ${filters.country_id[0]}`
        } else {
            for(let country in filters.country_id) {
                if (country == 0) {
                    query += ` AND aq.country_id = ${filters.country_id[0]}`
                } else {
                    query += ` OR aq.country_id = ${filters.country_id[country]}`
                }
            }
        }
    }

    query += ';'
    connection.query(query, 
        function (error, results, fields) {
        if (error) throw error;
        return results;
      });
}

export {selectAllFrom, filterAllAnsQuestion}