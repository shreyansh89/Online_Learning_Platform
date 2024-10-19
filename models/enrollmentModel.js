const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  course: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course', 
    required: true 
  },
  progress: [{
    lessonId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Lesson' 
    },
    completedAt: {
      type: Date,
      default: Date.now
    }
  }],
  enrolledAt: {
    type: Date,
    default: Date.now
  }
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
module.exports = Enrollment;