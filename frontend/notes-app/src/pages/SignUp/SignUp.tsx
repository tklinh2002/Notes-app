import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { InfoSignUp } from "../../types/typeInfo";

const SignUp = () => {
  const [info, setInfo] = useState<InfoSignUp>({
    email: "",
    password: "",
    fullName: "",
    rePassword: "",
  });
  const [error, setError] = useState<string>("");
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // sign up api
    if (info.password !== info.rePassword) {
      setError("Password and Re-Password do not match");
      return;
    }
    setError("");
    console.log(info);
  };
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSignUp}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <h1 className="text-2xl font-medium text-center mb-4">Sign Up</h1>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="full-name"
              >
                Full name
              </label>
              <input
                className="input-box"
                id="full-name"
                type="full-name"
                placeholder="Full Name"
                value={info.fullName}
                onChange={(e) => setInfo({ ...info, fullName: e.target.value })}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="input-box"
                id="email"
                type="email"
                placeholder="Email"
                value={info.email}
                onChange={(e) => setInfo({ ...info, email: e.target.value })}
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
                value={info.password}
                onChange={(e) => setInfo({ ...info, password: e.target.value })}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Re-Password
              </label>
              <input
                className="input-box"
                id="password"
                type="password"
                placeholder="******************"
                value={info.rePassword}
                onChange={(e) => setInfo({ ...info, rePassword: e.target.value })}
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
            <button className="btn-primary" type="button">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
