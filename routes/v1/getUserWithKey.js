const Schema = require("../../models/account");

module.exports = (req, res) => {
    const { Key } = req.body;

    if(!Key) return res.status(400).send({
        success: false,
        message: "Missing one or more of the required fields!"
    });

    Schema.findOne({ Key }, async(err, data) => {
        if(err) return res.status(500).send({
            success: false,
            message: "Internal DB Error"
        });
        if(!data) {
            res.status(404).send({
                success: false,
                message: "No account was found with this key"
            });
        } else {
            res.send({
                success: true,
                data: {
                    Username: data.Username,
                    Theme: data.Theme,
                    Codes: data.BackupCodes,
                    NotifyLogin: data.NotifyLogin,
                    UseCodes: data.UseCodes
                }
            })
        }
    })
}