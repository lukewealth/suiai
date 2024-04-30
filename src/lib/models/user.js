import mongoose from 'mongoose';
/**
 * Represents a Mongoose model for the User.
 * @typedef {import('mongoose').Model<User & import('mongoose').Document>} UserModelType
 * @typedef {Object} User
 * @property {string} email - User's email address.
 * @property {string} _id - User's id.
 * @property {string} password - User's name.
 * @property {Date} createdAt - Timestamp of when the User was created.
 * @property {Date} updatedAt - Timestamp of when the User was last updated.
 */

/**
 * Mongoose schema for User.
 * @type {mongoose.Schema}
 */
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
     // required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * User Model for MongoDB.
 * @type {UserModelType}
 */
export const UserModel = mongoose.models.User ?? mongoose.model('User', UserSchema);