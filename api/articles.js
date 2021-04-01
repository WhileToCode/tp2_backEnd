module.exports = (app, svc) => {
    app.get("/articles/listes/:list_id",async (req, res) => {
        res.json(await svc.dao.getByPropertyNameAndValue("list_id", req.params.list_id))
    })

    app.get("/articles", async (req, res) => {
        res.json(await svc.dao.getById(req.list_id))
    })

    app.get("/articles/:id", async (req, res) => {
        try {
            const articles = await svc.dao.getById(req.params.id)
            if (articles === undefined) {
                return res.status(404).end()
            }
            return res.json(articles)
        } catch (e) { res.status(400).end() }
    })
    app.post("/articles", (req, res) => {
        const articles = req.body
        if (!svc.isValid(articles))  {
            return res.status(400).end()
        }
        svc.dao.insert(articles)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })

    app.delete("/articles/:id", async (req, res) => {
        const articles = await svc.dao.getById(req.params.id)
        if (articles === undefined) {
            return res.status(404).end()
        }
        svc.dao.delete(req.params.id)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })

    app.put("/articles", async (req, res) => {
        const articles = req.body
        if ((articles.id === undefined) || (articles.id == null) (!svc.isValid(articles))){
            return res.status(400).end()
        }
        if (await svc.dao.getById(articles.id) === undefined) {
            return res.status(404).end()
        }
        svc.dao.update(articles)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
}