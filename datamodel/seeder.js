const Listes = require('./listes')
const Articles = require('./articles')
//const UserAccount = require('./useraccount')
const UserAccountService = require('./useraccount')
const PartageService = require('./partage')



module.exports = (listesService, articlesServices, userAccountService, partageService) => {
    return new Promise(async (resolve, reject) => {
            try {
                await userAccountService.dao.db.query("CREATE TABLE useraccount(id SERIAL PRIMARY KEY, displayname TEXT NOT NULL, login TEXT NOT NULL, challenge TEXT NOT NULL)")
                await listesService.dao.db.query("CREATE TABLE listes (id SERIAL PRIMARY KEY, namelistes TEXT, date DATE, archived BOOLEAN, deleted BOOLEAN, useraccount_id INTEGER REFERENCES useraccount(id))")
                await partageService.dao.db.query("CREATE TABLE partage (id SERIAL PRIMARY KEY, logAdmin TEXT NOT NULL, logUser TEXT NOT NULL, modifier BOOLEAN, liste_id INTEGER REFERENCES listes(id))")
                await articlesServices.dao.db.query("CREATE TABLE articles (id SERIAL PRIMARY KEY, articles TEXT, quantite NUMERIC, checked BOOLEAN, list_id INTEGER REFERENCES listes(id))")
                // autres CREATE TABLE...
               /*      for (let i = 0; i < 5; i++) {
                         const user = "user" + i
                         const useraccount_id = await  userAccountService.dao.insert(new UserAccount(user, user + "@example.com", "azerty")
                         ))
                         const listes_id =  await listesService.dao.insert(new Listes("listes" + i,
                             new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)), true, false, useraccount.id))
                         for (let j = 0; j < 5; j++){
                                 await   articlesServices.dao.insert(new Articles("articles"+j, 2+j, true, listes_id))
                         }
                     }
                 }*/
               // partageService.insert("user1", "user2", true, 1)
                //listesService.insert("klo", 2021-12-12, false, false, 1)
                userAccountService.insert("user1", "user1@example.com", "azerty")
                userAccountService.insert("user2", "user2@example.com", "azerty")
                userAccountService.insert("user3", "user3@example.com", "azerty")
                //listesService.insert("klo", 2021-12-12, false, false, 1)


            }



            catch (e) {
                if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                    resolve()
                } else {
                    console.log(e)
                    reject(e)
                }
                return
            }

            resolve()
        }
    )
}