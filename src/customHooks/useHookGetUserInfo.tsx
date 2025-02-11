import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUser } from "@/redux/reducers/authReducer";
import { useEffect } from "react";

export function useHookGetUserInfo() {
  const dispatch = useAppDispatch();
  const { role, userInfo } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (role && !userInfo?.id) {
      void dispatch(getUser());
    }
  }, [dispatch, role, userInfo?.id]);
}
