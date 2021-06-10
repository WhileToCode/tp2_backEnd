const PartageDAO = require("../datamodel/partageDao")
module.exports = class PartageServices {
    constructor(db) {
        this.dao = new PartageDAO(db)
    }
    isValid(partage){
        // listes.nameListes= listes.nameListes.trim()
        if(partage.loguser === ""){return false}

        return true
    }

}