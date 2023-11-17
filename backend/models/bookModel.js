const mongoose = require("mongoose");
const key = require("./keys.json");
try {
    mongoose.connect(key.driver);
} catch (error) {
    console.log(error);
}
const bookSchema = mongoose.Schema(
    {
        title: String,
        author: String,
        year: Date,
        publisher: String,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Book", bookSchema);
