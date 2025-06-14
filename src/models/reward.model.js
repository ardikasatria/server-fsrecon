import mongoose from "mongoose";

const RewardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  points: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  conference: {
    type: String,
    required: true,
  },
});

const Reward = mongoose.model("Reward", RewardSchema);

export default Reward;
