export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header Section */}
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-3xl font-bold text-center">
          Learning Management System
        </h1>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-10 px-6">
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Welcome to the LMS!</h2>
          <p className="text-gray-700">
            Explore our platform to manage courses and enhance your learning
            journey.
          </p>
        </section>

        {/* Buttons and Navigation */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User View Buttons */}
          <div className="bg-white shadow-md rounded-md p-6">
            <h3 className="text-xl font-medium mb-4">User Options</h3>
            <div className="space-y-4">
              <a
                href="/user/enrolled-courses"
                className="block w-full bg-blue-500 text-white py-2 text-center rounded hover:bg-blue-600"
              >
                My Enrolled Courses
              </a>
              <a
                href="/user/course-catalog"
                className="block w-full bg-green-500 text-white py-2 text-center rounded hover:bg-green-600"
              >
                Browse Courses
              </a>
            </div>
          </div>

          {/* Admin View Buttons */}
          <div className="bg-white shadow-md rounded-md p-6">
            <h3 className="text-xl font-medium mb-4">Admin Options</h3>
            <div className="space-y-4">
              <a
                href="/dashboard"
                className="block w-full bg-purple-500 text-white py-2 text-center rounded hover:bg-purple-600"
              >
                Admin Dashboard
              </a>
              <a
                href="/course-forms"
                className="block w-full bg-indigo-500 text-white py-2 text-center rounded hover:bg-indigo-600"
              >
                Add Course
              </a>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-white shadow-md rounded-md p-6">
            <h3 className="text-xl font-medium mb-4">Other Features</h3>
            <div className="space-y-4">
              <a
                href="/contact-support"
                className="block w-full bg-red-500 text-white py-2 text-center rounded hover:bg-red-600"
              >
                Contact Support
              </a>
              <a
                href="/about"
                className="block w-full bg-gray-500 text-white py-2 text-center rounded hover:bg-gray-600"
              >
                About Us
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center py-4">
        <p>&copy; 2024 Learning Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}
