"use client";

import { useEffect, useState } from "react";

interface Course {
  _id: string;
  title: string;
  description: string;
  duration: string;
  instructor: string;
}

const MyEnrolledCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEnrolledCourses = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/user/enrolled-courses",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setCourses(data.courses);
      } else {
        alert(data.message || "Failed to fetch enrolled courses");
      }
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!courses.length) {
    return <div>No enrolled courses found.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">My Enrolled Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="border p-4 rounded shadow-sm hover:shadow-lg"
          >
            <h2 className="text-xl font-bold">{course.title}</h2>
            <p className="text-gray-600">{course.description}</p>
            <p>Duration: {course.duration}</p>
            <p>Instructor: {course.instructor}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEnrolledCourses;
