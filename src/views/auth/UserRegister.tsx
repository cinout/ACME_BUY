import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import {
  FormInput,
  SignInOptionButton,
} from "@/views/shared_components/FormInput";
import { useState } from "react";
import logo from "@/assets/images/company_logo.png";

export default function Register() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });

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
        <div className="text-lg font-black">Sign Up with ACME BUY</div>
        <div className="text-sm mb-6">
          Register now to start shopping with us.
        </div>

        {/* Form */}
        {/* // TODO: add validation to the field values */}
        <form onSubmit={handleSubmit}>
          <FormInput
            fieldName="Name"
            fieldId="name"
            required={true}
            placeholder="Your Name"
            value={user.name}
            handleChange={onUserChange}
          />
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
            placeholder="Create Password"
            value={user.password}
            handleChange={onUserChange}
          />

          {/* Checkbox to terms and conditions */}
          <div className="flex items-center mt-8">
            <input
              type="checkbox"
              name="agreement"
              id="agreement"
              className="w-6 h-6 mr-4 "
              required={true}
            />
            <label htmlFor="agreement" className="text-sm">
              {`By ticking this box, I agree to ACME BUY's privacy policy & terms.`}
              {/* TODO: add link to some random template privacy policy & terms  */}
            </label>
          </div>

          <button className="bg-sky-600 rounded-md p-1 w-full mt-4 font-black block hover:bg-sky-900 transition duration-200">
            Sign Up
          </button>

          <hr className="mt-8 mb-3" />

          {/* Sign In*/}
          {/* TODO: provide real sign in options for Gmail and Facebook */}
          <div className="flex items-center justify-around text-sm mb-3">
            Already have an account? Sign in with:
          </div>

          <div className="flex flex-col items-center">
            <Link to="/login" className="mb-2 w-72">
              <SignInOptionButton additionalStyle="bg-slate-100 w-full">
                ACME BUY Account
              </SignInOptionButton>
            </Link>

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
