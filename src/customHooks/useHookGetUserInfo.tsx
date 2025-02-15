import { GQL_SELLER_GET_CURRENT } from "@/graphql/sellerGql";
import { useAppSelector } from "@/redux/hooks";
import { SellerEntity } from "@/utils/entities";
import { useQuery } from "@apollo/client";

// return user info based on role
export function useHookGetUserInfo() {
  // const dispatch = useAppDispatch();
  const { role } = useAppSelector((state) => state.auth);

  // query is only dispatched if no cache. So no need to worry about performance
  //  TODO: add customer role
  const getUserQuery = useQuery(GQL_SELLER_GET_CURRENT, { skip: !role });

  if (getUserQuery.loading) {
    return null;
  }

  return (getUserQuery.data as { getCurrentSeller: SellerEntity })
    .getCurrentSeller;
}
