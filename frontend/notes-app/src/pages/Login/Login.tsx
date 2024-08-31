/* eslint-disable @typescript-eslint/no-unused-vars */
import Navbar from "../../components/Navbar/Navbar";
import { InfoLogin } from "../../types/typeInfo";
import { useState } from "react";
import { validateEmail } from "../../utils/helper";
const Login = () => {
  const [info, setInfo] = useState<InfoLogin>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (info.email === "" || info.password === "") {
      setError("Please fill all the fields");
      return;
    }
    if (validateEmail(info.email) === false) {
      setError("Please enter a valid email");
      return;
    } 
    setError("");
    // login api 
  };
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleLogin}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <h1 className="text-2xl font-medium text-center mb-4">Login</h1>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="input-box"
                id="email"
                type="text"
                placeholder="Email"
                onChange={(e) => {
                  setInfo({ ...info, email: e.target.value });
                }}
                value={info.email}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="input-box"
                id="password"
                type="password"
                placeholder="******************"
                onChange={(e) => {
                  setInfo({ ...info, password: e.target.value });
                }}
                value={info.password}
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
            <button className="btn-primary" type="button">
              Sign In
            </button>

            <p className="text-center mt-4">
              Don't have an account?{" "}
              <a className="text-blue-500 hover:text-blue-800" href="/signup">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
