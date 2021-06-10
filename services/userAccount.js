const bcrypt = require('bcrypt')
const UserAccountDAO = require('../datamodel/useraccountdao')
const UserAccount = require('../datamodel/useraccount')

module.exports = class UserAccountService {
    constructor(db) {
        this.dao = new UserAccountDAO(db)
    }

    insert(displayname, login, password) {
        this.mail()
        return this.dao.insert(new UserAccount(displayname, login, this.hashPassword(password)))
    }

    async validatePassword(login, password) {
        const user = await this.dao.getByLogin(login.trim())
        return this.comparePassword(password, user.challenge)
    }

    comparePassword(password, hash) {
        return bcrypt.compareSync(password, hash)
    }

    hashPassword(password) {
        return bcrypt.hashSync(password, 10)  // 10 : cost factor -> + élevé = hash + sûr
    }

    async mail() {
        const nodemailer = require('nodemailer');

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            // port: 587,
            secure: false,
            //service: 'gmail',
            auth: {
                user: "loulesimed@gmail.com",
                pass: "sRNK9BZo"
            }
        });

        const mailOptions = {
            from: 'loulesimed@gmail.com',
            to: 'salcedo.laurent@zohomail.eu',
            subject: 'Sending Email using Node.js',
            text: 'http://localhost:63342/frontEnd_tp2/login.html?_ijt=cbd5bfkojto6cqsa7g689ghuus'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}