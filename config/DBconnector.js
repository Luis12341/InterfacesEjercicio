const mongoose = require("mongoose");
const {DB} = require("./configVars");

const connectDB = async () => {
    try {
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log("DB connected");
    } catch (error) {
        console.log("Ha ocurrido un error");
        console.log(error.message);
        process.exit();
    }
};

module.exports = connectDB;