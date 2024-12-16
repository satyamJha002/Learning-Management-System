import Course from "../models/courses.js";

export const addCourse = async (req, res) => {
  try {
    const { title, description, duration, instructor } = req.body;
    ``;
    if (!title || !description || !duration || !instructor) {
      return res.status(400).json({ message: "All details must be filled" });
    }

    const existData = await Course.findOne({ title });

    if (existData) {
      return res
        .status(409)
        .json({ message: "This Data is already exist in database" });
      s;
    }

    const newCourse = new Course({ title, description, duration, instructor });

    await newCourse.save();

    res.status(200).json({ message: "Successfull", newCourse });
  } catch (error) {
    res.status(500).json({ message: "Server is not responding" });
    console.log(error);
  }
};

export const getCourses = async (req, res) => {
  try {
    const getAllCourse = await Course.find();
    res.status(200).json({ message: "Successfull", courses: getAllCourse });
  } catch (error) {
    res.status(500).json({ message: "Server is not responding" });
    console.log(error);
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, duration, instructor } = req.body;

    const courseId = await Course.findById(id);

    if (!courseId) {
      return res.status(404).json({ message: "Course not found" });
    }

    const updateFields = { title, description, duration, instructor };

    for (const [key, value] of Object.entries(updateFields)) {
      if (value) {
        courseId[key] = value;
      }
    }

    await courseId.save();

    return res
      .status(200)
      .json({ message: "Successfully updated", course: courseId });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(error);
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const courseId = await Course.findById(id);

    if (!courseId) {
      return res.status(404).json({ message: "Course not found" });
    }

    const deleteCourse = await Course.findByIdAndDelete(id);

    res
      .status(200)
      .json({ message: "Successfully deleted", course: deleteCourse });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while deleting the course" });
    console.log(error);
  }
};

export const getSingleCourse = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({
      message: "Course retrieved successfully",
      course,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error occurred while fetching the course",
    });
  }
};
