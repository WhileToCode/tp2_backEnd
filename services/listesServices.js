const ListesDAO = require("../datamodel/listesDAO")
module.exports = class ListesServices {
    constructor(db) {
        this.dao = new ListesDAO(db)
    }
    isValid(listes){
        listes.nameListes= listes.nameListes.trim()
        if(listes.nameListes === "")return false
        if (list.date != null) {
            if (list.date instanceof String) {
                list.date = new Date(list.date)
            }
            if (list.date >= new Date()) return false
        }
        return true
    }

}