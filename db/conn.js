const mongoose = require("mongoose");

const DB = 'mongodb+srv://root:root@cluster0.b7zgitx.mongodb.net/JS_Tiger?retryWrites=true&w=majority'

mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log("Connection start"))
.catch((error)=> console.log(error.message))