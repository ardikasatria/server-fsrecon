import mongoose from "mongoose";

const model = mongoose.model;
const Schema = mongoose.Schema;

const profile_imgs_collections_list = ["shapes"];

const profile_imgs_name_list = [
  "ellipse",
  "ellipseFilled",
  "line",
  "polygon",
  "polygonFilled",
  "rectangle",
  "rectangleFilled",
];

const UserSchema = Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    username: {
      type: String,
      minlength: [3, "Username must be 3 letters long"],
      unique: true,
    },
    fullname: {
      type: String,
      lowercase: true,
      required: true,
      minlength: [3, "fullname must be 3 letters long"],
    },
    password: {
      type: String,
      required: [true, "A user must have a password"],
      minlength: 6,
      select: false,
    },

    profile_img: {
      type: String,
      // get a random profile image from dicebear

      default: () => {
        return `https://api.dicebear.com/9.x/${
          profile_imgs_collections_list[
            Math.floor(Math.random() * profile_imgs_collections_list.length)
          ]
        }/svg?seed=${
          profile_imgs_name_list[
            Math.floor(Math.random() * profile_imgs_name_list.length)
          ]
        }`;
      },
    },

    social_links: {
      youtube: {
        type: String,
        default: "",
      },
      linkedin: {
        type: String,
        default: "",
      },

      instagram: {
        type: String,
        default: "",
      },
      facebook: {
        type: String,
        default: "",
      },
      twitter: {
        type: String,
        default: "",
      },
      github: {
        type: String,
        default: "",
      },
      website: {
        type: String,
        default: "",
      },
    },
    personal_info: {
      googleShId: {
        type: String,
        default: "",
      },

      orcidId: {
        type: String,
        default: "",
      },

      country: {
        type: String,
        default: "",
      },
      state: {
        type: String,
        default: "",
      },
      city: {
        type: String,
        default: "",
      },
      organization: {
        type: String,
        default: "",
      },
      position: {
        type: String,
        default: "",
      },
      degree: {
        type: String,
        default: "",
      },
      phone: {
        type: String,
        default: "",
      },
      bio: {
        type: String,
        default: "",
      },
    },
    //use author foreign key to link to author schema
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: false,
    },
    // use review foreign key to link to review schema
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reviewer",
      required: false,
    },
    editor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Editor",
      required: false,
    },

    role: {
      type: String,
      enum: ["member", "admin", "reviewer", "editor"],
      default: "member",
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.index(
  {
    fullname: "text",
    username: "text",
    email: "text",
    "personal_info.bio": "text",
  },
  {
    weights: {
      fullname: 5,
      username: 3,
      email: 2,
      "personal_info.bio": 1,
    },
  }
);

const UserModel = model("users", UserSchema);
UserModel.createIndexes();
export default UserModel;
