const Schema = require("../../models/account");

module.exports = (req, res) => {
    const { key } = req.body;

    if(!key) return res.status(400).send({
        success: false,
        message: 'No key has been provided!'
    });

    Schema.findOne({ Key: key }, async(err, data) => {
        if(err) res.status(500).send({
            success: false,
            message: 'Internal sever error occured in the db'
        });
        if(!data) {
            res.status(403).send({
                success: false,
                message: "Invalid authentication token"
            })
        } else {
            res.send({
                success: true,
                message: 'Key is valid!',
                data: {
                    username: data.Username
                }
            })
        }
    })
}