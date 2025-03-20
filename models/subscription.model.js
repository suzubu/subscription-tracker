import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: [0, "Price must be greater than $0"],
      max: [1000, "Price must be less than $1000"],
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP", "CAD"],
      default: "CAD",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekkly", "monthly", "yearly"],
    },
    category: {
      type: String,
      enum: [
        "sports",
        "news",
        "entertainment",
        "lifestyle",
        "technology",
        "finance",
        "politics",
        "other",
      ],
      required: [true, 'Choose subscription category']
    },
    payment: {
        type: String,
        required: [true, 'Select form of payment'],
        trim: true,
    },
    status: {
        type: String,
        enum:['active', 'cancel', 'expired'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: [true, 'Select start date of subscription'],
        validate: {
            validator: (value) => value < new Date(),
            message: 'Start date must be in the past'
        }
    },
    renewalDate: {
        type: Date,
        required: [true, 'Select renwal date of subscription'],
        validate: {
            validator: function(value) {value > this.startDate},
            message: 'Renewal date must be after start date'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }

  },
  { timestamps: true }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
