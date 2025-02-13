import toast from "react-hot-toast";
import { useApolloClient, useMutation } from "@apollo/client";
import { getErrorMessage } from "@/graphql";
import { GQL_AUTH_LOG_OUT } from "@/graphql/authGql";
import { useAppDispatch } from "@/redux/hooks";
import { afterLogout } from "@/redux/reducers/authReducer";

export default function SectionProfile() {
  /**
   * Redux
   */
  const dispatch = useAppDispatch();

  /**
   * GQL
   */
  const client = useApolloClient();
  const [gqlAuthLogOut] = useMutation(GQL_AUTH_LOG_OUT, {
    onError: (err) => {
      const errorMessage = getErrorMessage(err);
      toast.error(errorMessage);
    },
    onCompleted: () => {
      dispatch(afterLogout());
      void client.clearStore(); // TODO: should I leave something in cache?
      // redirected to login page due to ProtectRoute
    },
  });

  /**
   * Functions
   */
  function handleLogout() {
    void gqlAuthLogOut();
  }

  // TODO: update UI
  return (
    <div>
      Admin Profile
      <button className="bg-aqua-forest-200" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
}
