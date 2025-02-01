import FormInput from "@/views/shared_components/form/FormInput";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import logo from "@/assets/images/company_logo.png";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import LoadingIndicator from "../shared_components/LoadingIndicator";
import { admin_login, FormAdminLoginProps } from "@/redux/reducers/authReducer";

export default function AdminLogin() {
  const dispatch = useAppDispatch();
  const { showLoader } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormAdminLoginProps>();

  function onSubmit(data: FormAdminLoginProps) {
    dispatch(
      admin_login(data) // TODO: update signupMethod for Google/Facebook login
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
    <div className="bg-gradient-to-tr from-aqua-forest-800 to-sky-800 flex justify-center items-center min-w-full min-h-full">
      <div className="w-[21.875rem] max-w-full text-slate-900 bg-aqua-forest-200 rounded-lg p-6 shadow-xl">
        {/* Header */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-4/5" />
        </div>
        <div className="text-lg font-black mb-1">Admin Log In</div>
        {/* Form */}
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            placeholder="Your Email"
            type="email"
            registration={register("email", {
              required: "Please provide your email",
            })}
            error={errors.email}
            additionalStyleWrapper="my-4"
            additionalStyleInput="bg-aqua-forest-800 text-aqua-forest-200 placeholder:text-zinc-800 w-full"
          />
          <FormInput
            type="password"
            placeholder="Your Password"
            registration={register("password", {
              required: "Please provide your password",
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
    </div>
  );
}
