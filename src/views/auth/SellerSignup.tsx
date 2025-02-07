import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import FormInput from "@/views/shared_components/form/FormInput";
import logo from "@/assets/images/company_logo.png";
import SignInOptionButton from "../shared_components/SignInOptionButton";
import { useForm } from "react-hook-form";
import {
  VALID_EMAIL,
  VALID_NAME_GENERAL,
  VALID_NAME_GENERAL_ERROR_MSG,
} from "@/utils/strings";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import LoadingIndicator from "../shared_components/LoadingIndicator";
import {
  FormSellerSignupProps,
  sellerSignup,
} from "@/redux/reducers/authReducer";
import { SellerSignupMethodEnum } from "@/utils/enums";
import toast from "react-hot-toast";
import { styleFormErrorMessage } from "@/utils/styles";

export default function SellerSignup() {
  const dispatch = useAppDispatch();
  const { showLoader } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormSellerSignupProps>();

  function onSubmit(data: FormSellerSignupProps) {
    dispatch(
      sellerSignup({ ...data, signupMethod: SellerSignupMethodEnum.Default }) // TODO: update signupMethod for Google/Facebook login
    )
      .unwrap()
      .then(() => {
        reset(); // reset form values
        void navigate("/"); // user will be redirected from "/"" based on their role
      })
      .catch((e) => {
        toast.error(e); // show error
      });
  }

  return (
    <div className="bg-gradient-to-tr from-aqua-forest-100 to-sky-200 flex justify-center items-center min-w-full min-h-full">
      <div className="w-[21.875rem] max-w-full text-white bg-sky-400 rounded-lg p-6 shadow-xl">
        {/* Header */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-4/5" />
        </div>
        <div className="text-lg font-black">Seller Sign Up</div>
        <div className="text-sm mb-6">Register now and become our seller.</div>

        {/* Form */}
        {/* // TODO: add validation to the field values */}
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            placeholder="Your First Name"
            label="First Name"
            registration={register("firstname", {
              required: "First name is required",
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
            error={errors.firstname}
            additionalStyleInput="w-full"
          />
          <FormInput
            placeholder="Your Last Name"
            label="Last Name"
            registration={register("lastname", {
              required: "Last name is required",
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
            error={errors.lastname}
            additionalStyleInput="w-full"
          />
          <FormInput
            placeholder="Your Email"
            type="email"
            registration={register("email", {
              required: "Email is required",
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
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 character",
              },
            })}
            error={errors.password}
            additionalStyleInput="w-full"
          />

          {/* Checkbox to terms and conditions */}
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              {...register("agree", {
                required:
                  "You must agree to the terms and conditions before signing up",
              })}
              className="w-6 h-6 mr-4"
            />
            <label htmlFor="agree" className="text-sm">
              {`By ticking this box, I agree to ACME BUY's privacy policy & terms.`}
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
          <Link to="/login/seller" className="mb-2 w-72">
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
      </div>
    </div>
  );
}
