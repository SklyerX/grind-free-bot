const Schema = require("../../models/account");

module.exports = (req, res) => {
    const { Username, Password, NewPassword } = req.body;

    if(!Username || !Password || !NewPassword) return res.status(400).send({
        success: false,
        message: "Missing one or more of the required fields!"
    });

    Schema.findOne({ Username, Password }, async(err, data) => {
        if(err) return res.status(500).send({
            success: false,
            message: "Internal DB Error"
        });
        if(!data) {
            res.status(404).send({
                success: false,
                message: "No account was found with these credentials"
            });
        } else {
            data.Password = NewPassword;
            data.save();

            res.status(200).send({
                success: true,
                message: "Successfully changed the password of this user!"
            })
        }
    })
}