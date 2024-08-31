import { Link } from "react-router-dom";
import bgPrimary from "../../gallery/bg-primary.png";

const Welcome = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to Notes App</h1>
      <img src={bgPrimary} alt="Notes App" className="w-1/3 h-1/3" />
      <div className="flex justify-center items-center w-fit">
        <Link to="/login" className="btn-primary px-4 mx-4">
          Login
        </Link>
        <Link to="/signup" className="btn-primary px-4 mx-4 bg-teal-500 h-fit">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
