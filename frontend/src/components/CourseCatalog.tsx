"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Course {
  _id: string;
  title: string;
  description: string;
  duration: string;
  instructor: string;
}

const CourseCatalog = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const router = useRouter();

  const fetchCourse = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/courses`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setCourses(data.courses);
      } else {
        alert(data.message || "Error come to fetch all the courses");
      }
    } catch (error: any) {
      console.log(error.message);
      alert(error.message || "Server error");
    }
  };

  useEffect(() => {
    const storedRole = localStorage.getItem("role");

    if (!storedRole || (storedRole !== "user" && storedRole !== "admin")) {
      alert("Invalid role, redirecting to login.");
      router.push("/login");
    } else if (storedRole === "user") {
      fetchCourse();
    }
  }, [router]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Course Catalog</h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            router.push("/login");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white p-6 border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              {course.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {course.description.length > 100
                ? `${course.description.substring(0, 100)}...`
                : course.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Duration: {course.duration}
              </span>
              <Link href={`/user/course-details/${course._id}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCatalog;
