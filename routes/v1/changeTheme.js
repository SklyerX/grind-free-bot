const Schema = require("../../models/account");

module.exports = (req, res) => {
    const { Key, Theme } = req.body;

    if(!Key || !Theme) return res.status(400).send({
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
            data.Theme = Theme;
            data.save();

            res.status(200).send({
                success: true,
                message: "Successfully changed the theme of this user!"
            })
        }
    })
}