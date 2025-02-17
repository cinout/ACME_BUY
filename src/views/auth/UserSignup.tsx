import { Link, useNavigate } from "react-router-dom";
import FormInput from "@/views/shared_components/form/FormInput";
import logo from "@/assets/images/company_logo.png";
import SignInOptionButton from "../shared_components/SignInOptionButton";
import { useForm } from "react-hook-form";
import {
  VALID_EMAIL,
  VALID_NAME_PERSON,
  VALID_NAME_PERSON_ERROR_MSG,
} from "@/utils/strings";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import LoadingIndicator from "../shared_components/LoadingIndicator";
import { FormUserSignupProps, userSignup } from "@/redux/reducers/authReducer";
import { RoleEnum, UserSignupMethodEnum } from "@/utils/enums";
import toast from "react-hot-toast";
import { styleFormErrorMessage } from "@/utils/styles";
import { useState } from "react";
import {
  iconFacebook,
  iconGoogle,
  iconGoRightWithoutCircle,
} from "@/utils/icons";

export default function UserSignup() {
  const dispatch = useAppDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();
  const { role } = useAppSelector((state) => state.auth);
  const [didSubmit, setDidSubmit] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormUserSignupProps>();

  function onSubmit(data: FormUserSignupProps) {
    setShowLoader(true);
    setDidSubmit(true);
    dispatch(
      userSignup({ ...data, signupMethod: UserSignupMethodEnum.Default }) // TODO: update signupMethod for Google/Facebook login
    )
      .unwrap()
      .then(() => {
        // reset(); // reset form values
        setShowLoader(false);
        void navigate("/user/dashboard", { replace: true });
      })
      .catch((e) => {
        setShowLoader(false);
        toast.error(e); // show error
      });
  }

  return (
    <div className="bg-gradient-to-tr from-aqua-forest-100 to-sky-200 flex justify-center items-center min-w-full min-h-full relative font-arsenal-spaced-1">
      <Link className="absolute top-4 left-4 h-10" to="/">
        <img src={logo} className="h-full" />
      </Link>
      {role && !didSubmit ? (
        <div className="flex flex-col items-center gap-y-6">
          <div className="text-sky-700 text-lg">You are already logged in.</div>

          <Link
            className="border-b border-sky-700 text-sky-950 px-1 flex items-center gap-x-2"
            to={role === RoleEnum.User ? "/user/dashboard" : "/admin/dashboard"}
            replace
          >
            Dashboard {iconGoRightWithoutCircle("inline")}
          </Link>
        </div>
      ) : (
        <div className="w-[21.875rem] max-w-full text-white bg-sky-400 rounded-lg p-6 shadow-xl">
          <div className="text-xl font-light mb-1 text-shadow-dark text-center">
            Sign Up
          </div>
          <div className="text-sm mb-4 text-center">
            Register now and become our member.
          </div>

          {/* Form */}
          {/* // TODO: add validation to the field values */}
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              placeholder="Your First Name"
              label="First Name"
              registration={register("firstname", {
                required: "Required",
                maxLength: {
                  value: 30,
                  message: "Name must be at most 30 characters",
                },
                minLength: {
                  value: 1,
                  message: "Name must be at least 1 character",
                },
                pattern: {
                  value: VALID_NAME_PERSON,
                  message: VALID_NAME_PERSON_ERROR_MSG,
                },
              })}
              error={errors.firstname}
              additionalStyleInput="w-full"
            />

            <FormInput
              placeholder="Your Last Name"
              label="Last Name"
              registration={register("lastname", {
                required: "Required",
                maxLength: {
                  value: 30,
                  message: "Name must be at most 30 characters",
                },
                minLength: {
                  value: 1,
                  message: "Name must be at least 1 character",
                },
                pattern: {
                  value: VALID_NAME_PERSON,
                  message: VALID_NAME_PERSON_ERROR_MSG,
                },
              })}
              error={errors.lastname}
              additionalStyleInput="w-full"
            />

            <FormInput
              placeholder="Your Email"
              type="email"
              registration={register("email", {
                required: "Required",
                pattern: {
                  value: VALID_EMAIL,
                  message: "Invalid email format",
                },
              })}
              error={errors.email}
              additionalStyleInput="w-full"
            />

            {/* strong password */}
            <FormInput
              type="password"
              placeholder="Create Password"
              registration={register("password", {
                required: "Required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 character",
                },
              })}
              error={errors.password}
              additionalStyleInput="w-full"
            />

            {/* <FormInput
              placeholder="Your Shop Name"
              label="Shop Name"
              registration={register("shopName", {
                required: "Required",
                maxLength: {
                  value: 30,
                  message: "Name must be at most 30 characters",
                },
                minLength: {
                  value: 1,
                  message: "Name must be at least 1 character",
                },
                pattern: {
                  value: VALID_NAME_GENERAL,
                  message: VALID_NAME_GENERAL_ERROR_MSG,
                },
              })}
              error={errors.shopName}
              additionalStyleInput="w-full"
            /> */}

            {/* Checkbox to terms and conditions */}
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                {...register("agree", {
                  required:
                    "You must agree to the terms and conditions before signing up",
                })}
                className="w-6 h-6 mr-4"
                id="agree"
              />
              <label htmlFor="agree" className="text-sm">
                {`By ticking this box, I agree to SWAP SOUND's privacy policy & terms.`}
                {/* TODO: add link to some random template privacy policy & terms  */}
              </label>
            </div>

            {errors.agree && (
              <p className={styleFormErrorMessage}>{errors.agree?.message}</p>
            )}

            <button
              className="h-8 bg-sky-600 rounded-md p-1 w-full mt-4 font-black block hover:bg-sky-900 transition duration-200"
              disabled={showLoader}
            >
              {showLoader ? <LoadingIndicator /> : "Sign Up"}
            </button>
          </form>

          <hr className="my-4" />

          {/* TODO: provide real sign in options for Gmail and Facebook */}
          <div className="flex items-center justify-around text-sm mb-3">
            Already have an account? Sign in with:
          </div>

          <div className="flex flex-col items-center">
            <Link to="/login" className="mb-2 w-72">
              <SignInOptionButton additionalStyle="bg-slate-100 w-full">
                SWAP SOUND Account
              </SignInOptionButton>
            </Link>

            <div className="flex justify-between w-72">
              <SignInOptionButton additionalStyle="bg-[#EA4335] w-32">
                {iconGoogle("inline mr-2")} Google
              </SignInOptionButton>
              <SignInOptionButton additionalStyle="bg-[#1877F2] w-32">
                {iconFacebook("inline mr-2")} Facebook
              </SignInOptionButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
