const Course = require('../models/courseModel');

module.exports.createCourse = async (req, res) => {
    try {
        const { title, description, lessons } = req.body;
        const course = await Course.create({ title, description, lessons });
        res.status(201).json(course);
    } 
    catch (error) {
        res.status(400).json({ error: 'Failed to create course' });
    }
};

module.exports.getAllCourses = async (req, res) => {
    const courses = await Course.find();
    res.status(200).json(courses);
};

module.exports.getCourseById = async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.status(200).json(course);
};

module.exports.updateCourse = async (req, res) => {
    const { title, description, lessons } = req.body;
    const course = await Course.findByIdAndUpdate(req.params.id, { title, description, lessons }, { new: true });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.status(200).json(course);
};

module.exports.deleteCourse = async (req, res) => {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.status(200).json({ message: 'Course deleted' });
};