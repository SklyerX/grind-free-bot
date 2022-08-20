const Schema = require("../../models/account");

module.exports = (req, res) => {
    const { Cookie } = req.body;

    if(!Cookie) return res.status(403).send({
        success: false,
        message: 'The required field is missing!'
    });

    Schema.findOne({ Cookie }, async(err, data) => {
        if(err) res.status(500).send({
            success: false,
            message: "Internal DB Error"
        });
        if(!data) {
            res.status(404).send({
                success: false,
                message: 'No data was found that matched this cookie!'
            });
        } else {
            res.send({
                success: true,
                data: {
                    key: data.Key,
                    Username: data.Username
                }
            })
        }
    })
}