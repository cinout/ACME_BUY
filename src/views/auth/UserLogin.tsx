import {
  FormInput,
  SignInOptionButton,
} from "@/views/shared_components/FormInput";
import { useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "@/assets/images/company_logo.png";

// TODO: add ACME Buy logo
export default function UserLogin() {
  const [user, setUser] = useState({ email: "", password: "" });

  function onUserChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: actually do something...
  }

  return (
    <div className="bg-gradient-to-tr from-aqua-forest-100 to-sky-200 flex justify-center items-center min-w-full min-h-full">
      <div className="w-[21.875rem] max-w-full text-white bg-sky-500 rounded-lg p-6 shadow-xl">
        {/* Header */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-4/5" />
        </div>

        <div className="text-lg font-black mb-1">Log In</div>
        {/* Form */}
        {/* // TODO: add validation to the field values */}
        <form onSubmit={handleSubmit}>
          <FormInput
            fieldName="Email"
            fieldId="email"
            required={true}
            placeholder="Your Email"
            value={user.email}
            handleChange={onUserChange}
          />
          <FormInput
            fieldName="Password"
            fieldId="password"
            required={true}
            placeholder="Your Password"
            value={user.password}
            handleChange={onUserChange}
          />

          <button className="bg-sky-600 rounded-md p-1 w-full mt-4 font-black block hover:bg-sky-900 transition duration-200">
            Log In
          </button>

          <hr className="mt-8 mb-3" />

          {/* Sign In*/}
          {/* TODO: provide real sign in options for Gmail and Facebook */}
          <div className="flex flex-col justify-center items-center text-sm mb-3">
            <div> Don&apos;t have an account?</div>
            <div>
              <Link to="/register" className="underline">
                Create one
              </Link>{" "}
              now, or sign in with:
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex justify-between w-72">
              <SignInOptionButton additionalStyle="bg-[#EA4335] w-32">
                <FaGoogle className="inline mr-2" /> Google
              </SignInOptionButton>
              <SignInOptionButton additionalStyle="bg-[#1877F2] w-32">
                <FaFacebook className="inline mr-2" /> Facebook
              </SignInOptionButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
