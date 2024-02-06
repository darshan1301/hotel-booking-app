import { Link, useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();
  console.log(error);

  return (
    <div className="mx-4 mt-2">
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>

      <Link
        className=" const className = 'text-sm hover:underline'; text-blue-500 hover:text-blue-600"
        to="/"
      >
        &larr; Go back
      </Link>
    </div>
  );
}

export default Error;
