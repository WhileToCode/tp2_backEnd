const BaseDAO = require('./basedao')

module.exports = class partageDAO extends BaseDAO {
    constructor(db) {
        super(db, "partage")
    }

    insert(partage) {
        return new Promise((resolve, reject) =>
            this.db.query("INSERT INTO partage(logadmin,loguser,modifier, liste_id) VALUES ($1,$2,$3,$4) RETURNING id",
                [partage.logadmin, partage.loguser, partage.modifier, partage.liste_id])
                .then(res => resolve(res.rows[0].id)
                ))
            .catch(e => reject(e))
    }

    getBylistid(liste_id) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM partage WHERE liste_id=$1", [liste_id])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    getAllPartage() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM partage ORDER BY id")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    delete(id) {
        return this.db.query(`DELETE FROM ${this.tablename} WHERE id=$1`, [id])
    }
}