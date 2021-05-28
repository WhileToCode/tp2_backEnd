const BaseDAO = require('./basedao')

module.exports = class ListesDAO extends BaseDAO{
    constructor(db) {
        super(db, "listes", "articles")
    }

    insert(liste) {
        return new Promise((resolve, reject) =>
            this.db.query("INSERT INTO listes(namelistes, date, archived, deleted) VALUES ($1,$2,$3,$4) RETURNING id",
                [liste.namelistes, liste.date, liste.archived, liste.deleted])
                .then(res => resolve(res.rows[0].id)
                ))
                .catch(e => reject(e))
    }

    delete(id) {
        this.db.query(`DELETE FROM articles WHERE list_id=$1`, [id])
        return this.db.query(`DELETE FROM ${this.tablename} WHERE id=$1`, [id])
    }

    getAll() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM listes ORDER BY namelistes, date")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    update(liste) {
        return this.db.query("UPDATE listes SET namelistes=$2,date=$3,archived=$4, deleted=$5 WHERE id=$1",
            [liste.id, liste.namelistes, liste.date, liste.archived, liste.deleted])
    }
}