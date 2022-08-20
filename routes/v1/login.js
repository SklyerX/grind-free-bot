const Schema = require("../../models/account");

module.exports = (req, res) => {
    const { Username, Password, Cookie } = req.body;

    if(!Username || !Password) return res.status(400).send({
        success: false,
        message: 'No username or no password was given!'
    });

    Schema.findOne({ Username, Password }, async(err, data) => {
        if(err) res.status(500).send({
            success: false,
            message: 'Internal sever error occured in the db'
        });
        if(!data) {
            res.status(404).send({
                success: false,
                message: "Invalid Username or Password"
            })
        } else {
            data.Cookie = Cookie;
            data.save();
            
            res.send({
                success: true,
                message: 'Account is valid!',
                data: {
                    username: data.Username,
                    Password: data.Password
                }
            })
        }
    })
}