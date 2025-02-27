import { GQL_USER_GET_CURRENT } from "@/graphql/userGql";
import { useAppSelector } from "@/redux/hooks";
import { UserEntity } from "@/utils/entities";
import { useQuery } from "@apollo/client";

// return user info based on role
export function useHookGetUserInfo() {
  const { role } = useAppSelector((state) => state.auth);

  // query is only dispatched if no cache. So no need to worry about performance
  const getUserQuery = useQuery(GQL_USER_GET_CURRENT, { skip: !role });

  if (getUserQuery.loading) {
    return null;
  }

  return (getUserQuery.data as { getCurrentUser: UserEntity })?.getCurrentUser;
}
