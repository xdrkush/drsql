# drsql
Librairy Mysql, in progress !!

(Cette librairy peux ne pas plaire à tout le monde !!, je suis faignant et j'en ai besoin donc si sa peux vous plaire n'hésiter pas à faire un tour sur le github, et vous pouvez m'en faire un retour)

(Attention la librairy ne check pas le type de data que vous envoyer, a vous de bien checker le type avant de le passer dans le module)

Cette librairy à pour objectif de moduler les requete SQL avec MySQL, MariaDB, ...

# Comment sa fonctionne ?

Ici on demande d'insérer dans la table 'users' notre { ...req.body } itérer (insertInto('users', { ...req.body }))
Et ensuite de récupérer tout les éléments dans la table 'users' (selectAll('users'))
!!! Attention vous auriez peux etre besoin de reconstruire votre objet avant de l'envoyer suivant les cas.

```
// SQL pour creer un users
    insertInto('users', { ...req.body }).then(() => {
        selectAll('users').then(data => {
            res.json({
                status: 200,
                listUser: data,
                message: "Add Users successfully"
            })
        })
    }).catch(err => console.log(err))
```

et le module va ce charger de traiter l'objet.
!!! Attention il faut bien que votre DB soit creer en fonction de ce que vous envoyer !

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

notre req.body de la requete http (post):
```
{
  name: 'bruno',
  email: 'bru@no.fr',
  mobile: '0606060610'
}
```

Notre controller:
```
// Method Post
exports.post = async (req, res) => {
    console.log('Controller POST USER: ', req.body)

    // SQL pour creer un users
    insertInto('users', { ...req.body }).then(() => {
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

Voici un tuto de comment il est utiliser avec express:
  - https://github.com/xdrkush/tuto-drsql
