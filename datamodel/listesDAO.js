const BaseDAO = require('./basedao')

module.exports = class ListesDAO extends BaseDAO{
    constructor(db) {
        super(db, "listes")
    }
    insert(liste) {
        return new Promise((resolve, reject) =>
            this.db.query("INSERT INTO listes(nameListes, date, archived) VALUES ($1,$2,$3) RETURNING id",
                [liste.nameListes, liste.date, liste.archived])
                .then(res => resolve(res.rows[0].id)
                ))
                .catch(e => reject(e))
    }
    getAll() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM listes ORDER BY nameListes, date")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    update(liste) {
        return this.db.query("UPDATE listes SET nameListes= $2,date=$3,archived=$4 WHERE id=$1",
            [liste.id, liste.nameListes, liste.date, liste.archived])
    }
}