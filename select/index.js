// Select All
// ex: selectAll('table').then().catch()
exports.selectAll = (table) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM ${table}`;
        db.query(sql, (err, data) => {
            if (err) reject(err);
            resolve(data)
        })
    })
}

// Select By Id
// ex: selectById('table', id).then().catch()
exports.selectAllById = (table, id) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM ${table} WHERE id = ${id}`;
        db.query(sql, (err, data) => {
            if (err) reject(err);
            resolve(data[0])
        })
    })
}

// Select By One
// ex: selectByKey('table', {name: 'bruno'}).then().catch()
exports.selectAllByKey = (table, params) => {
    const set = []
    Object.entries(params).forEach(kv => set.push(` ${kv[0]} = '${kv[1]}'`))

    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM ${table} WHERE ${set.toString()}`;
        db.query(sql, (err, data) => {
            if (err) reject(err);
            resolve(data)
        })
    })
}

// Select One By Id
// ex: selectOneById('table', 'books.author_id', id).then().catch()
exports.selectOneByID = (table, value, id) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT ${ value }
                   FROM ${ table }
                   WHERE id = ${ id } ;`;

        db.query(sql, (err, data) => {
            if (err) reject(err);
            resolve(data[0])
        })
    })
}
