// Delete One
// ex: deleteById('table', id).then().catch
exports.deleteByID = (table, id) => {
    return new Promise((resolve, reject) => {
        // SQL pour delete un users à partir de son id
        let sql = `DELETE FROM ${ table }  WHERE id = ${ id }`;
        db.query(sql, function (err, data, fields) {
            if (err) reject(err);
            resolve(data)
        })
    })
}

// Delete All
// ex: deleteAll('table').then().catch()
exports.deleteAll = (table) => {
    return new Promise((resolve, reject) => {
        let sql = `DELETE FROM ${ table }`;
        db.query(sql, function (err, data, fields) {
            if (err) reject(err);
            resolve(data)
        })
    })
}
