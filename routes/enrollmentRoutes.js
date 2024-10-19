const express = require('express');

const router = express.Router();

const enrollmentController = require('../controllers/enrollmentController');

const { protect } = require('../middleware/authMiddleware');




router.post('/courses/:id/enroll', protect, enrollmentController.enrollInCourse);
router.post('/courses/:courseId/lessons/:lessonId/complete', protect, enrollmentController.completeLesson);
router.get('/progress', protect, enrollmentController.getUserProgress);

module.exports = router;