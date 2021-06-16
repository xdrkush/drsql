/* Welcome
 * ******* */

// Import des fonctions
const { insertInto } = require('./insert')
const { deleteByID, deleteAll } = require('./delete')
const { updateOne } = require('./update')
const { joinWithID } = require('./join')
const { selectAll, selectAllById, selectAllByKey, selectOneByID } = require('./select')

exports.sql = {
    // Insert
    insertInto,

    // Delete
    deleteByID, deleteAll,

    // Update
    updateOne,

    // Join
    joinWithID,

    // Select
    selectAll, selectAllById, selectAllByKey, selectOneByID
}