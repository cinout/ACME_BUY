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
      input.substring(length / 2 + 3, length)
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

export function capFirstLetter(input: string) {
  return input ? input.charAt(0).toUpperCase() + input.slice(1) : "";
}
