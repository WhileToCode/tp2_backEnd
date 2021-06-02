module.exports = (app, svc, jwt) => {
    app.post("/partage", jwt.validateJWT, async (req, res) => {
        const partage = req.body
        if (!svc.isValid(partage))  {
            return res.status(400).end()
        }
        svc.dao.insert(partage)
            .then(_ => {
                res.status(200).end()
            })
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })

}