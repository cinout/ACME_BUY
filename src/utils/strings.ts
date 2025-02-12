export function shortenEnd(input: string, length: number) {
  if (!input) {
    return "";
  }

  if (input.length > length) {
    return input.substring(0, length - 3) + "...";
  } else {
    return input;
  }
}

export function shortenMiddle(input: string, length: number) {
  if (!input) {
    return "";
  }

  if (input.length > length) {
    return (
      input.substring(0, length / 2) +
      "..." +
      input.substring(input.length - length / 2, input.length)
    );
  } else {
    return input;
  }
}

export function joinUrl(...args: string[]) {
  return args
    .reduce<string[]>((arr, arg, i) => {
      if (arg) {
        arr.push(arg.replace(i === 0 ? /\/$/ : /^\/|\/$/g, ""));
      }
      return arr;
    }, [])
    .join("/");
}

export function capFirstLetter(input: string | undefined) {
  return input
    ? input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()
    : "";
}

export const VALID_NAME_PERSON = /^[a-z'-]+(?: [a-z'-]+)*$/i;
export const VALID_NAME_PERSON_ERROR_MSG =
  "only support character, space, apostrophe (') and hyphen (-).";

export const VALID_NAME_GENERAL = /^[a-z0-9'][a-z0-9-'\s]*$/i; // i flag allows a-z to match both uppercase and lowercase letters without explicitly writing A-Z
export const VALID_NAME_GENERAL_ERROR_MSG =
  "must start with a character or digit, and contain only characters, digits, space, apostrophe (') and hyphen (-).";

// export const VALID_NAME_BRAND = /^[a-z0-9_-\s]+$/i; // i flag allows a-z to match both uppercase and lowercase letters without explicitly writing A-Z
// export const VALID_NAME_BRAND_ERROR_MSG =
//   "must start with a character or digit, and contain only characters, digits, space, and hyphen (dash).";

export const VALID_EMAIL =
  /^(([^<>()[]\\.,;:s@]+(.[^<>()[]\\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

// TODO: add them later
export const VALID_URL =
  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
export const VALID_UUID_V4 =
  /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
export const IP_REGEX =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
export const CUSTOM_FIELD_ASSET_ID = /^[a-zA-Z_]([a-zA-Z0-9._-]){0,254}$/;
export const BASE64 =
  /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
