module.exports = (app, svc) => {
    app.get("/listes", async (req, res) => {
        res.json(await svc.dao.getAll())
    })

    app.get("/listes/:id", async (req, res) => {
        try {
            const listes = await svc.dao.getById(req.params.id)
            if (listes === undefined) {
                return res.status(404).end()
            }
            return res.json(listes)
        } catch (e) { res.status(400).end() }
    })

    app.post("/listes", (req, res) => {
        const listes = req.body
        if (!svc.isValid(listes))  {
            return res.status(400).end()
        }
        svc.dao.insert(listes)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })

    app.delete("/listes/:id", async (req, res) => {
        const listes = await svc.dao.getById(req.params.id)
        if (listes === undefined) {
            return res.status(404).end()
        }
        svc.dao.delete(req.params.id)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })

    app.put("/listes", async (req, res) => {
        const listes = req.body
        console.log(listes)
        if ((listes.id === undefined) || (listes.id == null) || (!svc.isValid(listes))){
            return res.status(400).end()
        }
        if (await svc.dao.getById(listes.id) === undefined) {
            return res.status(404).end()
        }
        svc.dao.update(listes)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
}