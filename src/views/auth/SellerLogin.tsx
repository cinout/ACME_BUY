import FormInput from "@/views/shared_components/form/FormInput";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/images/company_logo.png";
import SignInOptionButton from "../shared_components/SignInOptionButton";
import { useForm } from "react-hook-form";
import {
  FormSellerLoginProps,
  sellerLogin,
} from "@/redux/reducers/authReducer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import LoadingIndicator from "../shared_components/LoadingIndicator";
import toast from "react-hot-toast";
import { useState } from "react";
import { RoleEnum } from "@/utils/enums";
import { GoArrowRight } from "react-icons/go";

export default function SellerLogin() {
  const dispatch = useAppDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const { role } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [didSubmit, setDidSubmit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormSellerLoginProps>();

  function onSubmit(data: FormSellerLoginProps) {
    setShowLoader(true);
    setDidSubmit(true);
    dispatch(
      sellerLogin(data) // TODO: update signupMethod for Google/Facebook login
    )
      .unwrap()
      .then(() => {
        reset(); // reset form values
        setShowLoader(false);
        void navigate("/seller/dashboard", { replace: true });
      })
      .catch((e) => {
        setShowLoader(false);
        toast.error(e); // show error
      });
  }

  return (
    <div className="bg-gradient-to-tr from-aqua-forest-100 to-sky-200 flex justify-center items-center min-w-full min-h-full relative">
      <Link className="absolute top-4 left-4 w-48" to="/">
        <img src={logo} className="w-full" />
      </Link>
      {role === RoleEnum.Seller && !didSubmit ? (
        <div className="flex flex-col items-center gap-y-6">
          <div className="text-sky-700 text-lg">
            You are already logged in as a <b>seller</b>.
          </div>

          <Link
            className="border-b border-sky-700 text-sky-950 px-1 flex items-center gap-x-2"
            to={"/seller/dashboard"}
            replace
          >
            Dashboard <GoArrowRight className="inline" />
          </Link>
        </div>
      ) : (
        <div className="w-[21.875rem] max-w-full text-white bg-sky-400 rounded-lg p-6 shadow-xl">
          <div className="text-xl font-light mb-1 text-shadow-dark flex justify-center">
            Seller Log In
          </div>

          {/* Form */}

          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              additionalStyleWrapper="my-4"
              placeholder="Your Email"
              type="email"
              registration={register("email", {
                required: "Required",
              })}
              error={errors.email}
              additionalStyleInput="w-full"
            />
            <FormInput
              additionalStyleWrapper="my-4"
              type="password"
              placeholder="Your Password"
              registration={register("password", {
                required: "Required",
              })}
              error={errors.password}
              additionalStyleInput="w-full"
            />

            <button
              className="bg-sky-600 rounded-md p-1 w-full mt-4 font-black block hover:bg-sky-900 transition duration-200"
              disabled={showLoader}
            >
              {showLoader ? <LoadingIndicator /> : "Log In"}
            </button>
          </form>

          <hr className="mt-8 mb-3" />

          {/* Sign In*/}
          {/* TODO: provide real sign in options for Gmail and Facebook */}
          <div className="flex flex-col justify-center items-center text-sm mb-3">
            <div> Don&apos;t have an account?</div>
            <div>
              <Link to="/signup/seller" className="underline">
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
        </div>
      )}
    </div>
  );
}
