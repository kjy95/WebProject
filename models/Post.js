var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  title: {type: String, required: true, trim: true},
  category: {type: String, required: true, trim: true},
   email: {type: String, required: true,  trim: true},
  password: {type: String},
  read: {type: Number, default: 0, required: true, trim: true},
  content: {type: String, required: true, trim: true},
  createdAt: {type: Date, default: Date.now}
}, {
  toJSON: { virtuals: true,
    transform: function(task) {
      return {
        id: post._id.toString(),
        category: post.category,
        content: post.content,
        priority: post.priority,
        deadline: (task.deadline) ? moment(task.deadline).format('YYYY-MM-DD') : "N/A",
        done: post.done
      };
    }},
  toObject: {virtuals: true}
});
     
var Post = mongoose.model('Post', schema);

module.exports = Post;
