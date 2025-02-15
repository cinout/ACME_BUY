import FormInput from "@/views/shared_components/form/FormInput";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import logo from "@/assets/images/company_logo.png";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import LoadingIndicator from "../shared_components/LoadingIndicator";
import { adminLogin, FormAdminLoginProps } from "@/redux/reducers/authReducer";
import { useState } from "react";
import { RoleEnum } from "@/utils/enums";
import { iconGoRightWithoutCircle } from "@/utils/icons";

export default function AdminLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { role } = useAppSelector((state) => state.auth);
  const [didSubmit, setDidSubmit] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormAdminLoginProps>();

  function onSubmit(data: FormAdminLoginProps) {
    setShowLoader(true);
    setDidSubmit(true);
    dispatch(
      adminLogin(data) // TODO: update signupMethod for Google/Facebook login
    )
      .unwrap()
      .then(() => {
        setShowLoader(false);
        // reset(); // reset form values
        void navigate("/admin/dashboard", { replace: true });
      })
      .catch((e) => {
        setShowLoader(false);
        toast.error(e); // show error
      });
  }

  return (
    <div className="bg-gradient-to-tr from-aqua-forest-800 to-sky-800 flex justify-center items-center min-w-full min-h-full relative font-arsenal-spaced-1">
      <Link className="absolute top-4 left-4 h-10" to="/">
        <img src={logo} className="h-full" />
      </Link>
      {role === RoleEnum.Admin && !didSubmit ? (
        <div className="flex flex-col items-center gap-y-6">
          <div className="text-aqua-forest-200 text-lg">
            You are already logged in as an <b>admin</b>.
          </div>

          <Link
            className="border-b border-aqua-forest-300 text-aqua-forest-100 px-1 flex items-center gap-x-2"
            to={"/admin/dashboard"}
            replace
          >
            Dashboard {iconGoRightWithoutCircle("inline")}
          </Link>
        </div>
      ) : (
        <div className="w-[21.875rem] max-w-full text-slate-900 bg-aqua-forest-200 rounded-lg p-6 shadow-xl">
          <div className="text-xl font-light mb-1 text-shadow-dark flex justify-center">
            Admin Log In
          </div>
          {/* Form */}
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              placeholder="Your Email"
              type="email"
              registration={register("email", {
                required: "Required",
              })}
              error={errors.email}
              additionalStyleWrapper="my-4"
              additionalStyleInput="bg-aqua-forest-800 text-aqua-forest-200 placeholder:text-zinc-800 w-full"
            />
            <FormInput
              type="password"
              placeholder="Your Password"
              registration={register("password", {
                required: "Required",
              })}
              error={errors.password}
              additionalStyleWrapper="my-4"
              additionalStyleInput="bg-aqua-forest-800 text-aqua-forest-200 placeholder:text-zinc-800 w-full"
            />

            <button
              disabled={showLoader}
              className="bg-aqua-forest-600 rounded-md p-1 w-full h-8 mt-10 font-black block hover:bg-aqua-forest-500 transition duration-200"
            >
              {showLoader ? <LoadingIndicator /> : "Log In"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
