import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <section className="col-span-2 min-h-screen flex-grow bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="m-4 mb-4 rounded-md border bg-white px-6 py-24 shadow-md md:m-0">
          <div className="flex justify-center">
            <FaExclamationTriangle className="fa-5x text-8xl text-yellow-400" />
          </div>
          <div className="text-center">
            <h1 className="text-heading-m mt-4 mb-2">Page Not Found</h1>
            <p className="text-heading-s mb-10 text-gray-500">
              The page you are looking for does not exist.
            </p>
            <Link
              href="/"
              className="bg-purple rounded-lg px-6 py-4 font-bold text-white"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
      <div className="flex-grow"></div>
    </section>
  );
};
export default NotFoundPage;
