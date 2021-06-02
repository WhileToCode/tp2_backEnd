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

    app.get("/useraccount/:displayUser", async (req, res) => {
        try{
        const User = await svc.dao.getByDisplayName(req.params.displayUser)

        if (User === undefined) {
            return res.status(404).end()
        }
        return res.json(allUser)
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
}