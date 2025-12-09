// import mongoose from "mongoose";

// const eventSchema = new mongoose.Schema(
//   {
//     eventImage: {
//       // type: String,
      
//         url: {
//     type: String,
//     required: true
//   },
//   public_id: {
//     type: String,
//     required: true
//   }
//       // required: true,
//     },
//     eventName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     location: {
//       type: String,
//       required: true,
//     }, 
//     registrationStartDate: {
//       type: Date,
//       required: true,
//     },
//     registrationEndDate: {
//       type: Date,
//       required: true,
//     },
//     eventDate: {
//       type: Date,
//       required: true,
//     },
//     registerLink: {
//       type: String,
//       required: true,
//     },
//     mode: {
//       type: String,
//       enum: ["online", "offline"],
//       required: true,
//     },
//     paymentType: {
//       type: String,
//       enum: ["Free", "Paid"],
//       required: true,
//     },
//     eventDescription :{
//       type : String ,
//     },
//     AdditionalInfo :{
//       type : String,
//     },
//     club: { type: mongoose.Schema.Types.ObjectId, ref: "ClubAdmins", required: true },


//   },
//   {
//     timestamps: true,
//   }
// );

// const Event = mongoose.model("Events", eventSchema);
// export default Event;



import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    eventImage: {
      url: {
        type: String,
        required: true
      },
      public_id: {
        type: String,
        required: true
      }
    },
    eventName: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    registrationStartDate: {
      type: Date,
      required: true,
    },
    registrationEndDate: {
      type: Date,
      required: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    registerLink: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      enum: ["online", "offline"],
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["Free", "Paid"],
      required: true,
    },
    eventDescription: {
      type: String,
    },
    AdditionalInfo: {
      type: String,
    },
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClubAdmins",
      required: true,
    },

    eventType: {
      type: String,
      enum: ["hackathon", "ideathon", "workshop", "competition"],
      default: "competition",
    }

  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Events", eventSchema);
export default Event;
