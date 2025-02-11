import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/reducers/authReducer";
import toast from "react-hot-toast";
import { useApolloClient } from "@apollo/client";

export default function SectionProfile() {
  // TODO: update UI
  const client = useApolloClient();

  const dispatch = useAppDispatch();

  function handleLogout() {
    dispatch(logout())
      .unwrap()
      .then(() => {
        void client.clearStore();
        // redirected to login page due to ProtectRoute
      })
      .catch((e) => {
        toast.error(e); // show error
      });
  }

  return (
    <div>
      Seller Profile
      <button className="bg-aqua-forest-200" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
}
