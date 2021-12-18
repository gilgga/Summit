// const emailValidator = require("deep-email-validator");
const exportedMethods = {
    password(password) {
        if (!password || typeof password !== "string" || password.trim().length === 0) {
            return false;
        }
        //Should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long 
        if (password.length < 8) {
            return false;
        }
        var localF = /\d/;
        if (localF.test(password) === false) {
            return false;
        }
        var hasUpper = false;
        for (let i = 0; i < password.length; i++) {
            if (password[i] === password[i].toUpperCase() && password[i] !== password[i].toLowerCase()) {
                hasUpper = true;
            }
        }
        if (hasUpper === false) {
            return false;
        }

        let passwordPattern = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/;
        return password.match(passwordPattern) != null;
    },
    async email(email) {
        if (!email || typeof email !== "string" || email.trim().length === 0) {
            return false;
        }
        //Checks if email is of valid format
        let emailPattern = /^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        if (!email.match(emailPattern)) {
            return false;
        }
        // //Check if the email is valid, double check if it works
        // const isValid = await emailValidator.validate(email);
        // return isValid.valid;
        return true;
    }
};

module.exports = exportedMethods;