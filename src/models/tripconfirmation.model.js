import mongoose from "mongoose";
import ConferenceModel from "./conference.model";

const TripConfirmationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },

    trip: {
      type: String,
      required: true,
    },

    isConfirmed: {
      type: Boolean,
      default: false,
    },

    allergies: {
      type: [String],
      default: [],
    },

    specialNeeds: {
      type: [String],
      default: [],
    },
    conference: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Conference",
    },
  },
  {
    timestamps: true,
  }
);

TripConfirmationSchema.pre("save", async function (next) {
  const trip = this;
  const conference = await ConferenceModel.findById(trip.conference);
  conference.tripConfirmations.push(trip._id);
  await conference.save();
  next();
});

TripConfirmationSchema.pre("remove", async function (next) {
  const trip = this;
  const conference = await ConferenceModel.findById(trip.conference);
  conference.tripConfirmations = conference.tripConfirmations.filter(
    (id) => id.toString() !== trip._id.toString()
  );
  await conference.save();
  next();
});

export const TripConfirmationModel = mongoose.model(
  "TripConfirmation",
  TripConfirmationSchema
);

export default TripConfirmationModel;
