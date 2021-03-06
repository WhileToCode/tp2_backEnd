const BaseDAO = require('./basedao')

module.exports = class UserAccountDAO extends BaseDAO {
    constructor(db) {
        super(db, "useraccount")
    }

    insert(useraccount) {
        return new Promise((resolve, reject) =>
            this.db.query("INSERT INTO useraccount(displayname,login,challenge) VALUES ($1,$2,$3) RETURNING id",
                [useraccount.displayname, useraccount.login, useraccount.challenge])
                .then(res => resolve(res.rows[0].id)
                )
            .catch(e => reject(e)))
    }

    getByLogin(login) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM useraccount WHERE login=$1", [login])
                .then(res => resolve(res.rows[0]))
                .catch(e => reject(e)))
    }

    getByDisplayName(displayName) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM useraccount WHERE displayName=$1", [displayName])
                .then(res => resolve(res.rows[0]))
                .catch(e => reject(e)))
    }

    getByAllUser() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM useraccount ORDER BY id")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    getNotpartage(liste_id) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT displayname  FROM useraccount WHERE id NOT IN (SELECT useraccount.id FROM useraccount, partage WHERE useraccount.displayname = partage.loguser AND liste_id=$1)", [liste_id])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    getwithoutUser(displayname) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM useraccount WHERE displayname!=")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
}