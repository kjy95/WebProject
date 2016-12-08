var mongoose = require('mongoose'),
    moment = require('moment'),
    Schema = mongoose.Schema;

var schema = new Schema({
  post: {type: Schema.Types.ObjectId, required: true, trim: true},
  Pnum: {type: String, required: true, trim: true},
  content: {type: String, required: true, trim: true},
  createdAt: {type: Date, default: Date.now},
  reserve: {type: String, required: true, trim: true}
}, {
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});

var Reservation  = mongoose.model('Reservation ', schema);

module.exports = Reservation;