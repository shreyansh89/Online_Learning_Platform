const express = require('express');

const router = express.Router();

const courseController = require('../controllers/courseController');

const { protect, adminOnly } = require('../middleware/authMiddleware');





router.get("/AllCourses" , courseController.getAllCourses);
router.post("/createCourse" , protect, adminOnly, courseController.createCourse);

router.get("/fineOne/:id" , courseController.getCourseById);
router.delete("/deleteCourse/:id" ,protect, adminOnly, courseController.deleteCourse);
router.put("/updateCourse/:id" , protect, adminOnly, courseController.updateCourse);


module.exports = router;