import mongoose from "mongoose";

const bookHotelSchema = new mongoose.Schema(
  {
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    checkInDate: {
      type: Date,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },

    roomType: {
      type: String,
      required: true,
    },

    roomCount: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
  },
  {
    timestamps: true,
  }
);

export const BookHotelModel = mongoose.model("BookHotel", bookHotelSchema);

export default BookHotelModel;
