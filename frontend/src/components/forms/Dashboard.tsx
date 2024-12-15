"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Courses {
  _id: string;
  title: string;
  description: string;
  duration: string;
  instructor: string;
}

const Dashboard = () => {
  const [courses, setCourses] = useState<Courses[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState("user");

  const router = useRouter();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Items per page

  useEffect(() => {
    const token = localStorage.getItem("token");

    const userRole = localStorage.getItem("role");
    setRole(userRole || "user");

    if (userRole !== "admin") {
      setError(
        "You do not have access to this page. Please log in as an admin."
      );

      return;
    }
    const getCourses = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/courses`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        console.log(data);

        if (response.ok) {
          setCourses(data.courses);
        } else {
          alert(data.message || "Failed to fetch courses");
        }
      } catch (error: any) {
        setError(error.message);
        console.log(error.message);
      }
    };
    getCourses();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/login");
  };

  if (error) {
    return (
      <div className="font-bold font-mono text-3xl flex flex-col justify-center items-center h-[100vh]">
        {error}
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
        >
          Log Out
        </button>

        <Link href="/">
          <button className="mt-4 bg-red-500 text-white py-2 px-4 rounded">
            Home
          </button>
        </Link>
      </div>
    );
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = courses.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(courses.length / itemsPerPage);

  const handleDelete = async (_id: string) => {
    if (confirm("Are you sure you want to delete course")) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:5000/api/admin/courses/${_id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();
        console.log(result);

        if (response.ok) {
          alert("Course is deleted successfully");
          setCourses((prevCourses) =>
            prevCourses.filter((course) => course._id !== _id)
          );
        } else {
          alert(result.message || "Failed to delete course");
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred while deleting the course.");
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
      <div className="flex gap-5">
        <Link href="/course-forms">
          <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
            Add New Course
          </button>
        </Link>
        <Link href="/">
          <button className="bg-red-500 text-white px-4 py-2 rounded mb-4 inline-block">
            Go Back
          </button>
        </Link>
      </div>

      <table className="min-w-full bg-white border border-gray-300 rounded-lg mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-7 py-3 border-b text-left">Title</th>
            <th className="px-7 py-3 border-b text-left">Description</th>
            <th className="px-7 py-3 border-b text-left">Duration</th>
            <th className="px-7 py-3 border-b text-left">Instructor Name</th>
            <th className="px-7 py-3 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCourses.map((course) => (
            <tr key={course._id}>
              <td className="px-7  border-b text-left">{course.title}</td>
              <td className="px-7 py-3 border-b text-left">
                {course.description}
              </td>
              <td className="px-7 py-3 border-b text-left">
                {course.duration}
              </td>
              <td className="px-7 py-3 border-b text-left">
                {course.instructor}
              </td>
              <td className="px-7 py-3 border-b text-left">
                <Link href={`/course-forms/${course._id}`}>
                  <button className="text-blue-500 mr-2 px-4 py-2 rounded-lg border border-blue-500 hover:bg-blue-500 hover:text-white transition duration-200 ease-in-out">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(course._id)}
                  className="text-red-500 mr-2 px-4 py-2 rounded-lg border border-red-500 hover:bg-red-500 hover:text-white transition duration-200 ease-in-out"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <nav>
          <ul className="flex space-x-2">
            <li>
              <button
                className={`px-4 py-2 rounded-md ${
                  currentPage === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 text-white"
                }`}
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li key={index}>
                <button
                  className={`px-4 py-2 rounded-md ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                className={`px-4 py-2 rounded-md ${
                  currentPage === totalPages
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 text-white"
                }`}
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Dashboard;
