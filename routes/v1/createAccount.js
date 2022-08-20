const crypto = require('crypto');
const Schema = require("../../models/account");

module.exports = (req, res) => {
    // console.log(require('crypto').randomBytes(64).toString("hex"));

    const { Username, Password, Email } = req.body;

    if(!Username || !Password || !Email) return res.status(400).send({
        success: false,
        message: "The request was failed because one or more of the required params are not given"
    });

    const key = crypto.randomBytes(19).toString("hex");
    const generateCodes = (len) => {
        return Math.random().toString(36).substring(2, len+2)
    }

    const codes = [];

    let times = 8;

    for(let i = 0; i < times; i++) {
        let value = generateCodes(8);
        codes.push(value);
    }

    Schema.findOne({ Username }, async(err, data) => {
        if(err) return res.status(500).send({
            success: false,
            message: "Internal server error with the database"
        });
        if(!data) {
            new Schema({
                Username,
                Key: key,
                Email,
                Password,
                Verified: false,
                BackupCodes: codes,
                Theme: "dark",
                NotifyLogin: false,
                UseCodes: false,
                Cookie: undefined
            }).save();
            res.send({
                success: true,
                message: "Successfully created data for this user",
                data: {
                    username: Username,
                    password: Password,
                    email: Email,
                    key,
                    BackupCodes: codes,
                    Theme: "dark",
                    NotifyLogin: false,
                    UseCodes: false,
                    Cookie: undefined
                }
            })
        } else {
            res.send({
                success: false,
                message: "This username has been taken by another user!"
            })
        }
    })

    // res.send({
    //     key: hashedKey
    // })
}