import mongoose from "mongoose";
import ConferenceModel from "./conference.model.js";
const paketSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    earlyprice: {
      type: Number,
      required: true,
    },
    regularprice: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    features: {
      type: [String],
      required: true,
    },
    conference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conference",
    },
  },
  {
    timestamps: true,
  }
);

paketSchema.pre("save", async function (next) {
  const paket = this;
  const conference = await ConferenceModel.findById(paket.conference);

  conference.paket.push(paket._id);
  await conference.save();
  next();
});

paketSchema.pre("remove", async function (next) {
  const paket = this;
  const conference = await ConferenceModel.findById(paket.conference);

  conference.paket = conference.paket.filter(
    (id) => id.toString() !== paket._id.toString()
  );
  await conference.save();
  next();
});

const Paket = mongoose.model("Paket", paketSchema);

export default Paket;
