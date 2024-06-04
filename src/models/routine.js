import mongoose from 'mongoose';

const { Schema } = mongoose;

const routineSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: String,
  description: String,
  activities: [
    {
      title: { type: String, required: true },
      duration: Number,
      startTime: String,
      notes: String
    }
  ],
  frequency: String,
  isActive: { type: Boolean, default: true }
});

const Routine = mongoose.model('Routine', routineSchema);

export default Routine;
