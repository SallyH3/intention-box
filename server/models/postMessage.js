import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  tags: [String],
});

let PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;