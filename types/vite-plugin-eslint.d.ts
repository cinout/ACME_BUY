// manual type definition for vite-plugin-eslint
declare module "vite-plugin-eslint" {
  import { Plugin } from "vite";

  const eslint: (arguments) => Plugin;
  export default eslint;
}
