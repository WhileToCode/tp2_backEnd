const BaseDAO = require('./basedao')

module.exports = class partageDAO extends BaseDAO {
    constructor(db) {
        super(db, "partage")
    }

    insert(partage) {
        return new Promise((resolve, reject) =>
            this.db.query("INSERT INTO partage(logAdmin,logUser,modifier, liste_id) VALUES ($1,$2,$3,$4) RETURNING id",
                [partage.logAdmin, partage.logUser, partage.modifier, partage.liste_id])
                .then(res => resolve(res.rows[0].id)
                ))
            .catch(e => reject(e))
    }

    getByLogin() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM useraccount WHERE login=$1", [login])
                .then(res => resolve(res.rows[0]))
                .catch(e => reject(e)))
    }

}