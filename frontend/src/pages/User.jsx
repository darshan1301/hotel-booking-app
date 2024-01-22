import { Link } from "react-router-dom";

const User = () => {
  return (
    <div>
      <h3>User Details</h3>
      <p>
        <Link to="/signup">Signup</Link>
      </p>
      <p>
        <Link to="/login">login</Link>
      </p>
    </div>
  );
};

export default User;
