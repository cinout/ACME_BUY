import { useState } from "react";
import Router from "@/router/Router.tsx";
import { publicRoutes } from "./router/routes/publicRoutes.tsx";
import { getPrivateRoutes } from "./router/routes/index.tsx";

export default function App() {
  const [allRoutes, setAllRoutes] = useState([
    ...publicRoutes,
    getPrivateRoutes, // TODO: is this correct?
  ]);

  // TODO: Use useEffect to check for a JWT in the cookie and dispatch it to Redux.
  // useEffect(() => {
  //   const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");

  //   if (token) {
  //     // Decode JWT token to get user info
  //     const decodedToken: any = jwt_decode(token); // Decoding token to get user info
  //     const user = { email: decodedToken.email, name: decodedToken.name }; // Assuming token contains email and name

  //     // Dispatch to Redux store
  //     dispatch(setUser({ user, token }));

  //     // Optionally redirect to a protected page
  //     navigate("/dashboard");
  //   } else {
  //     navigate("/login");
  //   }
  // }, [dispatch, navigate]);

  return <Router allRoutes={allRoutes} />; // TODO: should I use RouterProvider, createBrowserRouter instead?
}
