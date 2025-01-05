const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userHasRoleSchema = new Schema(
  {
    userId : {
        type : Schema.Types.ObjectId
    },
    roleId : {
        type : Schema.Types.ObjectId
    },
    roleName : {
        type : String
    },
    createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
  },
  {
    timestamps: true,
  }
);
const UserHasRoles = model("UserHasRoles", userHasRoleSchema);
module.exports = UserHasRoles;
