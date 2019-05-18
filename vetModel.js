var mongoose = require ("mongoose");

var Schema = mongoose.Schema;

var vetStatusSchema = new Schema ({
    status: String,
    time : { type: Number, default: (new Date()).getTime() } 

});

var vetStatus = mongoose.model("vetStatus", vetStatusSchema);

module.exports = vetStatus;
