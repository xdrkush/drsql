
// Update One
// ex: updateOne('table', {name: 'Bruno', age: 20}).then().catch()
exports.updateOne = (table, body, id) => {
    const set = []
    Object.entries(body).forEach(kv => set.push(` ${kv[0]} = '${kv[1]}'`))
    
    return new Promise(async (resolve, reject) => {
        let sql = `UPDATE ${ table } 
                     SET ${ set.toString() }
                   WHERE id = '${id}';`;

        await db.query(sql, (err, data) => {
            if (err) reject(err);
            resolve(data)
        })
    })
}
