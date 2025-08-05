import { Link } from 'react-router-dom';

const NoMatch: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h2 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h2>
      <p className="text-gray-700 mb-6">
        Sorry, the page you're looking for doesn't exist. Let's get you back to exploring wildlife!
      </p>
      <Link
        to="/"
        className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default NoMatch;