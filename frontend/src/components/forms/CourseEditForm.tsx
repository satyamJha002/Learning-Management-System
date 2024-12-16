"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditCourse = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [course, setCourse] = useState({
    title: "",
    description: "",
    duration: "",
    instructor: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const storedRole = localStorage.getItem("role");
    if (!storedRole || storedRole !== "admin") {
      router.push("/login");
      return;
    }

    const fetchCourse = async () => {
      try {
        if (!id) return;
        const response = await fetch(
          `https://learning-management-system-lac.vercel.app/api/admin/courses/${id}`,
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
          setCourse({
            title: data.course?.title || "",
            description: data.course?.description || "",
            duration: data.course?.duration || "",
            instructor: data.course?.instructor || "",
          });
        } else {
          console.error(data.message);
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    if (id) fetchCourse();
  }, [id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://learning-management-system-lac.vercel.app/api/admin/courses/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(course),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Course updated successfully!");
        router.push("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error updating course:", error);
      alert("An error occurred.");
    }
  };
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Edit Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={course?.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <input
            type="text"
            name="description"
            value={course?.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Duration</label>
          <input
            type="text"
            name="duration"
            value={course?.duration}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Instructor Name</label>
          <input
            type="text"
            name="instructor"
            value={course?.instructor}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded"
          >
            Edit Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;
