import mongoose from "mongoose";
import ConferenceModel from "./conference.model.js";
import AuthorModel from "./author.model.js";

const abstractSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    abstract: {
      type: String,
      required: true,
    },

    keywords: {
      type: [String],
      default: [],
    },

    presenter_information: {
      presenter_name: {
        type: String,
        required: true,
      },
      presenter_email: {
        type: String,
        required: true,
      },
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },

    paket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Paket",
    },

    author: {
      type: String,
    },

    co_authors: [
      {
        type: String,
      },
    ],

    conference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conference",
    },

    file: {
      type: String,
      required: true,
    },

    topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },

    subtopics: [
      {
        type: String,
      },
    ],

    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],

    rewards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reward",
      },
    ],

    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
    },

    sub_topics: [
      {
        type: String,
      },
    ],
  },

  {
    timestamps: true,
  }
);

abstractSchema.pre("save", async function (next) {
  const abstract = this;
  // get or create author
  const author = await AuthorModel.findOneAndUpdate(
    { user: abstract.user },
    { user: abstract.user },
    { upsert: true, new: true }
  );

  author.countOfPendingPapers += 1;
  await author.save();
  const conference = await ConferenceModel.findById(abstract.conference);
  conference.abstract.push(abstract._id);

  await conference.save();
  next();
});

abstractSchema.pre("remove", async function (next) {
  const abstract = this;
  const author = await AuthorModel.findOneAndUpdate(
    { user: abstract.user },
    { user: abstract.user },
    { upsert: true, new: true }
  );

  author.countOfPendingPapers -= 1;

  await author.save();

  const conference = await ConferenceModel.findById(abstract.conference);
  conference.abstract = conference.abstract.filter(
    (abstract_id) => abstract_id.toString() !== abstract._id.toString()
  );
  await conference.save();
  next();
});

const Abstract = mongoose.model("Abstract", abstractSchema);

export default Abstract;
