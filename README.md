# drsql

# Install
```
npm i drsql
```
Import module:
```
const { sql } = require('drsql')
```

# Info

Librairy Mysql, in progress !!

(Cette librairy peux ne pas plaire à tout le monde !!, je suis faignant et j'en ai besoin donc si sa peux vous plaire n'hésiter pas à faire un tour sur le github, et vous pouvez m'en faire un retour)

(Attention la librairy ne check pas le type de data que vous envoyer, a vous de bien checker le type avant de le passer dans le module)

Cette librairy à pour objectif de moduler les requete SQL avec MySQL, MariaDB, ...

In Progress !

repo github:
  - https://github.com/xdrkush/drsql

# Option

Select:
```
sql.selectAll('table')
sql.selectAllById('table', id)
sql.selectAllByKey('table', { name: 'bruno' })
sql.selectOneById('table', 'books.author_id', id)
```

Insert:
```
sql.insertInto('table', {name: 'bruno', age: 19})
```

Delete:
```
sql.deleteById('table', id)
sql.deleteAll('table')
```

Join:
```
sql.joinWithID('table1', 'table2', 'users.id', 'books.author_id', 2)
```

Update:
```
sql.updateOne('table', {name: 'Bruno', age: 20})
```

# Comment sa fonctionne ?

Ici on demande d'insérer dans la table 'users' notre { ...req.body } itérer ( insertInto('users', { ...req.body }) )
Et ensuite de récupérer tout les éléments dans la table 'users' ( selectAll('users') )
!!! Attention vous auriez peux etre besoin de reconstruire votre objet avant de l'envoyer suivant les cas.

Synchrone :
```
// SQL pour creer un users
sql.insertInto('users', { ...req.body }).then(() => {
    // SQL pour rechercher tout les users d'une table avec toutes les key: value
    sql.selectAll('users').then(data => {
        res.json({
            status: 200,
            listUser: data,
            message: "Add Users successfully"
        })
    }).catch(err => console.log(err))
}).catch(err => console.log(err))
```

Asynchrone :
```
// SQL pour creer un users
await sql.insertInto('users', { ...req.body })

res.json({
    status: 200,
    listUser: await sql.selectAll('users'),
    message: "Add Users successfully"
})
```

et le module va ce charger de traiter l'objet.
!!! Attention il faut bien que votre DB soit creer en fonction de ce que vous envoyer !

Exemple du module ( sq.insertInto() ):
```
exports.insertInto = (table, body) => {
    const key = [], val = []
    Object.entries(body).forEach(kv => key.push(kv[0]), val.push(kv[1]) )

    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO ${table} ( ${key.toString() } ) values(?)`;
        db.query(sql, [val], (err, data) => {
            if (err) reject(err);
            resolve(data)
        })
    })
}
```

# Exemple

À partir de ce script SQL:
```
CREATE TABLE  `users` (
`id` INT AUTO_INCREMENT PRIMARY KEY ,
`name` VARCHAR( 100 ) NOT NULL ,
`email` VARCHAR( 100 ) NOT NULL ,
`mobile` VARCHAR( 100 ) NOT NULL
) ENGINE = INNODB;
```

Notre req.body de la requete http (post):
```
{
  name: 'bruno',
  email: 'bru@no.fr',
  mobile: '0606060610'
}
```

Notre controller:
Synchron:
```
// Method Post
exports.post = (req, res) => {
    console.log('Controller POST USER: ', req.body)

    // SQL pour creer un users
    insertInto('users', { ...req.body }).then(() => {
        // SQL pour rechercher tout les users d'une table avec toutes les key: value
        selectAll('users').then(data => {
            res.json({
                status: 200,
                listUser: data,
                message: "Add Users successfully"
            })
        })
    }).catch(err => console.log(err))
}
```
Asynchron:
```
// Method Post
exports.post = async (req, res) => {
    console.log('Controller POST USER: ', req.body)

    // SQL pour creer un users
    await insertInto('users', { ...req.body })

    // On charge notre SQL directement dans la réponse
    res.json({
        status: 200,
        listUser: await selectAll('users'),
        message: "Add Users successfully"
    })
}
```

Voici un tuto de comment il est utiliser avec express:
  Synchrone:
  - https://github.com/xdrkush/tuto-drsql
  Asynchrone:
  - https://github.com/xdrkush/tuto-drsql/tree/async

Peace'

In Progress !