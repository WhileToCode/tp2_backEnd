const BaseDAO = require('./basedao')

module.exports = class ArticlesDAO extends BaseDAO {
    constructor(db) {
        super(db, "articles")
    }

    insert(article) {
        return new Promise(((resolve, reject) => {
            this.db.query(`INSERT INTO articles(articles,quantite,checked, list_id) VALUES ($1,$2,$3,$4) RETURNING id`,
                [article.articles, article.quantite, article.checked, article.list_id])
                .then(res => resolve(res.rows[0].id))
                .catch(err => reject(err))
        }))
    }

    /* return this.db.query("INSERT INTO articles(articles, quantite, checked, list_id) VALUES ($1,$2,$3,$4)",
         [article.articles, article.quantite, article.checked, article.list_id])*/

    getAll() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM articles ORDER BY list_id, articles")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    delete(id) {
        return this.db.query(`DELETE FROM ${this.tablename} WHERE id=$1`, [id])
    }

    getByPropertyNameAndValue(propertyName, value){
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT * FROM ${this.tablename} WHERE ${propertyName}=$1 ORDER BY id`, [ value ])
                .then(res => resolve(res.rows) )
                .catch(e => reject(e)))
    }

    update(article) {
        return this.db.query("UPDATE articles SET articles=$2, quantite=$3, checked=$4, list_id=$5 WHERE id=$1",
            [article.id, article.articles, article.quantite, article.checked, article.list_id])
    }
}