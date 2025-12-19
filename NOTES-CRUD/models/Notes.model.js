import mongoose from "mongoose";

const NotesSchema=new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: String,
    required: true
  }
},{
  timestamps: true
})


const Notes=mongoose.model('notes',NotesSchema)
export default Notes
