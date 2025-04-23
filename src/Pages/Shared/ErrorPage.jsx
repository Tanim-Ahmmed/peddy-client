import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col">
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-9xl font-bold text-indigo-600 mb-4">404</h1>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Page not found
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Sorry, we couldn't find the page you're looking for.
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    );
};

export default ErrorPage;