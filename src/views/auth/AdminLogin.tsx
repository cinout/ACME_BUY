import { FormInput } from "@/views/shared_components/FormInput";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { admin_login, clearToastMsg } from "@/redux/reducers/authReducer";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import logo from "@/assets/images/company_logo.png";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const dispatch = useAppDispatch();
  const { showLoader, errorMessage, successMessage } = useAppSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  const [user, setUser] = useState({ email: "", password: "" });

  function onUserChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: actually do something...
    dispatch(admin_login(user))
      .then(() => {
        // Do something?
      })
      .catch((e) => console.log(e)); //TODO: update this
  }

  // TODO: should I put them in useEffect?
  if (errorMessage) {
    toast.error(errorMessage);
    dispatch(clearToastMsg());
  }
  if (successMessage) {
    toast.success(successMessage);
    dispatch(clearToastMsg());
    void navigate("/"); // Safely navigate without awaiting the promise, since React Router generally ensures navigation reliability.
  }

  return (
    <div className="bg-gradient-to-tr from-aqua-forest-800 to-sky-800 flex justify-center items-center min-w-full min-h-full">
      <div className="w-[21.875rem] max-w-full text-slate-900 bg-aqua-forest-200 rounded-lg p-6 shadow-xl">
        {/* Header */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-4/5" />
        </div>
        <div className="text-lg font-black mb-1">Admin Log In</div>
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
            additionalStyle="bg-aqua-forest-800 text-aqua-forest-200 placeholder:text-zinc-800"
          />
          <FormInput
            fieldName="Password"
            fieldId="password"
            required={true}
            placeholder="Your Password"
            value={user.password}
            handleChange={onUserChange}
            additionalStyle="bg-aqua-forest-800 text-aqua-forest-200 placeholder:text-zinc-800"
          />

          <button
            disabled={showLoader}
            className="bg-aqua-forest-600 rounded-md p-1 w-full h-8 mt-10 font-black block hover:bg-aqua-forest-500 transition duration-200"
          >
            {showLoader ? (
              <BeatLoader
                cssOverride={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                color="white"
              />
            ) : (
              "Log In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
