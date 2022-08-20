const { model, Schema } = require("mongoose");

module.exports = model("xyz", new Schema({
    Username: String,
    Password: String,
    Key: String,
    Email: String,
    Verified: Boolean,
    BackupCodes: Array,
    Theme: String,
    NotifyLogin: Boolean,
    UseCodes: Boolean,
    Cookie: String
}))