import { GQL_ADMIN_GET_CURRENT } from "@/graphql/adminGql";
import { GQL_SELLER_GET_CURRENT } from "@/graphql/sellerGql";
import { useAppSelector } from "@/redux/hooks";
import { AdminEntity, SellerEntity } from "@/utils/entities";
import { RoleEnum } from "@/utils/enums";
import { useQuery } from "@apollo/client";

// return user info based on role
export function useHookGetUserInfo() {
  // const dispatch = useAppDispatch();
  const { role } = useAppSelector((state) => state.auth);

  // query is only dispatched if no cache. So no need to worry about performance
  //  TODO: add customer role
  const getUserQuery = useQuery(
    role === RoleEnum.Seller ? GQL_SELLER_GET_CURRENT : GQL_ADMIN_GET_CURRENT,
    { skip: !role }
  );

  if (getUserQuery.loading) {
    return null;
  }

  switch (role) {
    case RoleEnum.Seller: {
      return (getUserQuery.data as { getCurrentSeller: SellerEntity })
        .getCurrentSeller;
    }
    case RoleEnum.Admin: {
      return (getUserQuery.data as { getCurrentAdmin: AdminEntity })
        .getCurrentAdmin;
    }
    // TODO: add customer role
  }
}
