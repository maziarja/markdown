"use client";

import Link from "next/link";
import { FaExclamationCircle } from "react-icons/fa";

type ErrorPage = {
  error: string;
};

const ErrorPage = ({ error }: ErrorPage) => {
  return (
    <section className="col-span-2 min-h-screen flex-grow bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="m-4 mb-4 rounded-md border bg-white px-6 py-24 shadow-md md:m-0">
          <div className="flex justify-center">
            <FaExclamationCircle className="fa-5x text-8xl text-yellow-400" />
          </div>
          <div className="text-center">
            <h1 className="mt-4 mb-2 text-3xl font-bold">
              Something went wrong
            </h1>
            <p className="mb-10 text-xl text-gray-500">{error.toString()}</p>
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
export default ErrorPage;
