"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AddCourse = () => {
  const [role, setRole] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (!storedRole || storedRole !== "admin") {
      setError(
        "You do not have access to this page. Please log in as an admin."
      );
      return;
    } else {
      setRole(storedRole);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const courseData = {
      title: formData.get("title")?.toString(),
      description: formData.get("description")?.toString(),
      duration: formData.get("duration")?.toString(),
      instructor: formData.get("instructor")?.toString(),
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/admin/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(courseData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Course added successfully!");
        router.push("/dashboard");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while adding the course.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/login");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Add Course</h1>
      {error ? (
        <div className="font-bold  font-mono text-3xl flex flex-col justify-center items-center h-[100vh]">
          {error}
          <button
            onClick={handleLogout}
            className="bg-red-500 pt-4 text-white px-4 py-2 rounded mb-4 inline-block"
          >
            Log Out
          </button>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Title</label>
              <input
                type="text"
                name="title"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Description</label>
              <input
                type="text"
                name="description"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Duration</label>
              <input
                type="text"
                name="duration"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Instructor Name</label>
              <input
                type="text"
                name="instructor"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded"
              >
                Save Course
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default AddCourse;
