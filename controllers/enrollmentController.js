const User = require('../models/userModel');
const Course = require('../models/courseModel');

module.exports.enrollInCourse = async (req, res) => {
    const user = await User.findById(req.user.id);
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    const isEnrolled = user.enrolledCourses.some((enrollment) => enrollment.courseId.equals(course._id));
    if (isEnrolled) return res.status(400).json({ message: 'Already enrolled in this course' });

    user.enrolledCourses.push({ courseId: course._id, progress: [] });
    await user.save();
    res.status(200).json({ message: 'Enrolled successfully' });
};

module.exports.completeLesson = async (req, res) => {
    const user = await User.findById(req.user.id);
    const courseId = req.params.courseId;
    const lessonId = req.params.lessonId;

    const enrollment = user.enrolledCourses.find((enroll) => enroll.courseId.equals(courseId));
    if (!enrollment) return res.status(400).json({ message: 'Not enrolled in this course' });

    if (!enrollment.progress.includes(lessonId)) {
        enrollment.progress.push(lessonId);
    }

    await user.save();
    res.status(200).json({ message: 'Lesson completed' });
};

module.exports.getUserProgress = async (req, res) => {
    const user = await User.findById(req.user.id).populate('enrolledCourses.courseId');
    res.status(200).json(user.enrolledCourses);
};