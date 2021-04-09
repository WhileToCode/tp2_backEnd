const Listes = require('./listes')
const Articles = require('./articles')



module.exports = (listesService, articlesServices) => {
    return new Promise(async (resolve, reject) => {
            try {
                await listesService.dao.db.query("CREATE TABLE listes (id SERIAL PRIMARY KEY, namelistes TEXT, date DATE, archived BOOLEAN)")
                await articlesServices.dao.db.query("CREATE TABLE articles (id SERIAL PRIMARY KEY, articles TEXT, quantite NUMERIC, checked BOOLEAN, list_id INTEGER REFERENCES listes(id))")
                // autres CREATE TABLE...
                for (let i = 0; i < 5; i++) {
                    const listes_id =  await listesService.dao.insert(new Listes("listes" + i,
                        new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)), true))
                    for (let j = 0; j < 5; j++){
                            await   articlesServices.dao.insert(new Articles("articles"+j, 2+j, true, listes_id))
                    }
                }
            }

            catch (e) {
                if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                    resolve()
                } else {
                    reject(e)
                }
                return
            }

            resolve()
        }
    )
}