module.exports = (app, svc, jwt) => {
    app.get("/listes", jwt.validateJWT, async (req, res) => {
        res.json(await svc.dao.getAll(req.user))
    })

    app.get("/listes/:id", jwt.validateJWT, async (req, res) => {
        try {
            const listes = await svc.dao.getById(req.params.id)
            if (listes === undefined) {
                return res.status(404).end()
            }
            return res.json(listes)
        } catch (e) { res.status(400).end() }
    })

    app.post("/listes", jwt.validateJWT, async (req, res) => {
        const listes = req.body
        if (!svc.isValid(listes))  {
            return res.status(400).end()
        }
        listes.useraccount_id = req.user.id
        svc.dao.insert(listes)
            .then(_ => {
                res.status(200).end()
            })
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })

    app.delete("/listes/:id", jwt.validateJWT, async (req, res) => {
        const listes = await svc.dao.getById(req.params.id)
        if (listes === undefined) {
            return res.status(404).end()
        }
        listes.useraccount_id = req.user.id
        svc.dao.delete(req.params.id)
            .then(_ => {
                res.status(200).end()
            })
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })

    app.put("/listes", jwt.validateJWT, async (req, res) => {
        const listes = req.body
        if ((listes.id === undefined) || (listes.id == null) || (!svc.isValid(listes))){
            return res.status(400).end()
        }
        if (await svc.dao.getById(listes.id) === undefined) {
            return res.status(404).end()
        }
        listes.useraccount_id = req.user.id
        svc.dao.update(listes)
            .then(_ => {
                res.status(200).end()
            })
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
}