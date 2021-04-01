const ArticlesDao = require("../datamodel/articlesDAO")
module.exports = class ArticlesService {
    constructor(db) {
        this.dao = new ArticlesDao(db)
    }
    isValid(article){
        article.articles= article.articles.trim()
        if(article.articles === "")return false
        if (article.quantite === null) return false
        return true
    }

}

