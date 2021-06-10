module.exports = (app, svc, jwt) => {
    app.post("/partage", jwt.validateJWT, async (req, res) => {
        const partage = req.body
        if (!svc.isValid(partage))  {
            return res.status(400).end()
        }
        partage.logadmin = req.user.displayname
        svc.dao.insert(partage)
            .then(_ => {
                res.status(200).end()
            })
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })

    app.get("/partage", jwt.validateJWT, async (req, res) => {
        res.json(await svc.dao.getAllPartage(req.partage))
    })

    app.get("/partage/:id", jwt.validateJWT, async (req, res) => {
        res.json(await svc.dao.getBylistid(req.params.id))
    })

    app.delete("/partage/:id", async (req, res) => {
        const partages = await svc.dao.getById(req.params.id)
        if (partages === undefined) {
            return res.status(404).end()
        }
        svc.dao.delete(req.params.id)
            .then(_ => {
                res.status(200).end()
            })
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })

}