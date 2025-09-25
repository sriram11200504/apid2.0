const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { number } = require("zod");
const { ref } = require("process");
// This is a working code and executed too. function calls removed to that the execution is prevented.
// code left here just to see how to perform operations and to check schema too.
dotenv.config({ path: "config.env" });

const db = process.env.DATABASE_URL;

async function connectDB() {
    const _k = await mongoose.connect(db).then(() => console.log("Connected"));
    const conn = mongoose.connection;
}

connectDB();
//Students details already inserted

const studentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, 
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  year: {
    type: Number,
    enum: [1, 2, 3, 4], 
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  stay: {
    type: String,
    enum: ["hostel", "dayscholar", "pg-hostel"],
    required: true,
  },
  hostelName: {
    type: String, // optional if dayscholar
  },
  password: {
    type: String,
    required: true,
  },
});


const Student = mongoose.model("Student", StudentSchema);
const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // the author of the post
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  section: {
    type: String,
    enum: ["sad", "like", "shock", "angry", "hope", "inspire"], 
    required: true, // category of post
  },
  reactions: {
    sad: { type: Number, default: 0 },
    like: { type: Number, default: 0 },
    shock: { type: Number, default: 0 },
    angry: { type: Number, default: 0 },
    hope: { type: Number, default: 0 },
    inspire: { type: Number, default: 0 },
  },
  comments: [commentSchema], // nested comments
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);






const commentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  text: { type: String, required: true },
  parentComment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null },
  time: { type: Date, default: Date.now }
});

const Comment = mongoose.model("Comment", commentSchema);




