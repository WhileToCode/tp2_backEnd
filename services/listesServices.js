const ListesDAO = require("../datamodel/listesDAO")
module.exports = class ListesServices {
    constructor(db) {
        this.dao = new ListesDAO(db)
    }
    isValid(listes){
       // listes.nameListes= listes.nameListes.trim()
        if(listes.namelistes === "")return false
        if (listes.date != null) {
            if (listes.date instanceof String) {
                listes.date = new Date(listes.date)
            }
            if (listes.date >= new Date()) return false
        }
        return true
    }

}