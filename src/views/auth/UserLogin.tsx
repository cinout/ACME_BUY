import FormInput from "@/views/shared_components/form/FormInput";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/images/company_logo.png";
import SignInOptionButton from "../shared_components/SignInOptionButton";
import { useForm } from "react-hook-form";
import { FormUserLoginProps, userLogin } from "@/redux/reducers/authReducer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import LoadingIndicator from "../shared_components/LoadingIndicator";
import toast from "react-hot-toast";
import { useState } from "react";
import {
  iconFacebook,
  iconGoogle,
  iconGoRightWithoutCircle,
} from "@/utils/icons";
import store from "@/redux/store";
import {
  styleCompanyLogoPosition,
  styleLoginDialog,
  styleLoginSubmitButton,
  styleLoginTitle,
} from "@/utils/styles";
import { RoleEnum } from "@/graphql/userGql";

export default function UserLogin() {
  const dispatch = useAppDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const { role } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [didSubmit, setDidSubmit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormUserLoginProps>();

  function onSubmit(data: FormUserLoginProps) {
    setShowLoader(true);
    setDidSubmit(true);
    dispatch(
      userLogin(data) // TODO: update signupMethod for Google/Facebook login
    )
      .unwrap()
      .then(() => {
        // reset(); // reset form values
        setShowLoader(false);
        const updatedRole = store.getState().auth.role;
        // TODO: if user comes from /product/pID page, should redirect back
        void navigate(
          updatedRole === RoleEnum.User
            ? "/user/dashboard"
            : "/admin/dashboard",
          { replace: true }
        );
      })
      .catch((e) => {
        setShowLoader(false);
        toast.error(e); // show error
      });
  }

  return (
    <div className="bg-gradient-to-tr from-aqua-forest-200 to-sky-200 flex justify-center items-center min-w-full min-h-full relative font-arsenal-spaced-1">
      <Link className={styleCompanyLogoPosition} to="/">
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
        <div className={styleLoginDialog}>
          <div className={styleLoginTitle}>Log In</div>

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

            <button className={styleLoginSubmitButton} disabled={showLoader}>
              {showLoader ? <LoadingIndicator /> : "Log In"}
            </button>
          </form>

          <hr className="mt-8 mb-3" />

          {/* Sign In*/}
          {/* TODO: provide real sign in options for Gmail and Facebook */}
          <div className="flex flex-col justify-center items-center text-sm mb-3">
            <div> Don&apos;t have an account?</div>
            <div>
              <Link to="/signup" className="underline">
                Create one
              </Link>{" "}
              now, or sign in with:
            </div>
          </div>

          <div className="flex flex-col items-center">
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
