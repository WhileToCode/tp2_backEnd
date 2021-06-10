module.exports = (app, svc, jwt) => {
    app.post('/useraccount/authenticate', (req, res) => {
        const { login, password } = req.body
        if ((login === undefined) || (password === undefined)) {
            res.status(400).end()
            return
        }
        svc.validatePassword(login, password)
            .then(authenticated => {
                if (!authenticated) {
                    res.status(401).end()
                    return
                }
                res.json({'token': jwt.generateJWT(login)})
            })
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })

    app.post("/useraccount",  async (req, res) => {
        const useraccount = req.body
        svc.insert(useraccount.displayname, useraccount.login, useraccount.challenge)
            .then(_ => {
                res.status(200).end()
            })
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })

    app.get("/useraccount/:displayUser", async (req, res) => {
        try{
        const User = await svc.dao.getByDisplayName(req.params.displayUser)

        if (User === undefined) {
            return res.status(404).end()
        }
        return res.json(User)
    } catch (e) { res.status(400).end()}
    })

    app.get("/useraccount", async (req, res) => {
        try{
            const allUser = await svc.dao.getByAllUser()

            if (allUser === undefined) {
                return res.status(404).end()
            }
            return res.json(allUser)
        } catch (e) { res.status(400).end()}
    })

    app.get("/useraccount/notpartage/:id", async (req, res) => {
        try{
            const notPartage = await svc.dao.getNotpartage(req.params.id)

            if (notPartage === undefined) {
                return res.status(404).end()
            }
            return res.json(notPartage)
        } catch (e) {
            console.log(e)
            res.status(400).end()}
    })

    app.get("/useraccount/login/:login", async (req, res) => {
        try{
            const User = await svc.dao.getByLogin(req.params.login)

            if (User === undefined) {
                return res.status(404).end()
            }
            return res.json(User)
        } catch (e) { res.status(400).end()}
    })
}