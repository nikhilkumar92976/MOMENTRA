const mongoose = require('mongoose');

const connectDatabase = async()=>{
    try{
        mongoose.connect(process.env.DATABASE_URL)
        console.log("DataBase connect sucessfully!");
    }
    catch(err){
        console.error("Mongodb connection faield :", err.massage);
        process.exit(1);
    }
}
module.exports = connectDatabase;