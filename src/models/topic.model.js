// Assuming Mongoose schema
import mongoose from 'mongoose';

const subtopicSchema = new mongoose.Schema({
  name: String,
  description: String
});

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  subtopics: [subtopicSchema]
});

const TopicModel = mongoose.model('Topic', topicSchema);

export default TopicModel;
