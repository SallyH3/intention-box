import mongoose from 'mongoose';

const intentionSchema = mongoose.Schema({
  title: String,
  message: String,
  tags: [String],
});

let IntentionModel = mongoose.model('IntentionModel', intentionSchema);

export default IntentionModel;