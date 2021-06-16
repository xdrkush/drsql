// Join With ID
// ex: join('table1', 'table2', 'users.id', 'books.author_id', 2).then().catch()
exports.joinWithID = (table1, table2, j1, j2, id) => {
    return new Promise(async (resolve, reject) => {
        let sql = `SELECT *
                   FROM ${ table1 }
                   LEFT OUTER JOIN ${ table2 }
                   ON ${ j1 } = ${ j2 }
                   WHERE ${ j1 } = ${ id } ;`;

        await db.query(sql, function (err, data, fields) {
            if (err) reject(err);
            resolve(data)
        })
    })
}