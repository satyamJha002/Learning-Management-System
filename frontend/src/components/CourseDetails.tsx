"use client";

import { useParams, useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

interface Course {
  _id: string;
  title: string;
  description: string;
  duration: string;
  instructor: string;
}

const CourseDetails = () => {
  const [course, setCourse] = useState<Course | null>(null);
  const params = useParams();
  const [isEnrolled, setIsEnrolled] = useState([]);

  const id = params?.id;
  console.log(id);

  const router = useRouter();
  const fetchCourseById = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/user/courses/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log(data.course);

      if (response.ok) {
        setCourse(data.course);
      } else {
        alert("Failed to load course");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const storedRole = localStorage.getItem("role");

    if (!storedRole || (storedRole !== "user" && storedRole !== "admin")) {
      alert("Invalid role, redirecting to login.");
      router.push("/login");
    } else if (storedRole === "user") {
      fetchCourseById();
    }
  }, [id, router]);

  if (!course) {
    return <p>Loading course details...</p>;
  }

  const handleEnrolled = async () => {
    console.log(isEnrolled);
  };

  return (
    <div className="container mx-auto p-6">
      <Fragment>
        <h1 className="text-2xl font-semibold mb-4">{course.title}</h1>
        <p className="text-gray-600 mb-2">{course.description}</p>
        <p className="mb-2">Duration: {course.duration}</p>
        <p className="mb-4">Instructor: {course.instructor}</p>
        <button
          onClick={handleEnrolled}
          className="bg-blue-500 text-white px-6 py-2 rounded"
        >
          Enroll
        </button>
      </Fragment>
    </div>
  );
};

export default CourseDetails;
