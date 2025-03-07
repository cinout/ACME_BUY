export enum RoleEnum {
  Admin = "Admin",
  User = "User",
}

// TODO: update them
export enum PaymentStatusEnum {
  Pending = "Pending",
}

// TODO: update them
export enum OrderStatusEnum {
  Pending = "Pending",
  Paid = "Paid",
  Shipped = "Shipped",
  Completed = "Completed",
  Canceled = "Canceled",
}

export enum ProductStatusEnum {
  Active = "Active",
  Removed = "Removed",
}

// TODO: update them
export enum WithdrawStatusEnum {
  Pending = "Pending",
}

export enum UserStatusEnum {
  Pending = "Pending",
  Deactivated = "Deactivated",
  Active = "Active",
}

export enum UserSignupMethodEnum {
  Default = "Default",
  Google = "Google",
  Facebook = "Facebook",
}

/**
 * Selector Options
 */
export enum MediaFormatEnum {
  Box_Set = "Box Set",
  Cassette = "Cassette",
  CD = "CD",
  Digital = "Digital",
  DVD_BlueRay = "DVD & BlueRay",
  Vinyl_7 = "7'' Vinyl",
  Vinyl_10 = "10'' Vinyl",
  Vinyl_12 = "12'' Vinyl",
  Others = "Others",
}

export enum ReleaseYearRangeEnum {
  y2020s = "2020s",
  y2010s = "2010s",
  y2000s = "2000s",
  y1990s = "1990s",
  y1980s = "1980s",
  y1970s = "1970s",
  y1960s = "1960s",
  y1950s = "1950s",
  y1940s = "1940s",
  y1930s = "1930s",
  y1920s = "1920s",
  y1910s = "1910s",
  y1900s = "1900s",
  Earlier = "Earlier",
}

export function translateYearToYearRangeEnum(year: number) {
  if (year < 1900) {
    return ReleaseYearRangeEnum.Earlier;
  } else if (year < 1910) {
    return ReleaseYearRangeEnum.y1900s;
  } else if (year < 1920) {
    return ReleaseYearRangeEnum.y1910s;
  } else if (year < 1930) {
    return ReleaseYearRangeEnum.y1920s;
  } else if (year < 1940) {
    return ReleaseYearRangeEnum.y1930s;
  } else if (year < 1950) {
    return ReleaseYearRangeEnum.y1940s;
  } else if (year < 1960) {
    return ReleaseYearRangeEnum.y1950s;
  } else if (year < 1970) {
    return ReleaseYearRangeEnum.y1960s;
  } else if (year < 1980) {
    return ReleaseYearRangeEnum.y1970s;
  } else if (year < 1990) {
    return ReleaseYearRangeEnum.y1980s;
  } else if (year < 2000) {
    return ReleaseYearRangeEnum.y1990s;
  } else if (year < 2010) {
    return ReleaseYearRangeEnum.y2000s;
  } else if (year < 2020) {
    return ReleaseYearRangeEnum.y2010s;
  } else if (year < 2030) {
    return ReleaseYearRangeEnum.y2020s;
  } else {
    throw Error("not available year range");
  }
}

export enum GradingEnum {
  Mint = "Mint",
  Near_Mint = "Near Mint",
  Very_Good = "Very Good",
  Fair = "Fair",
  Poor = "Poor",
}

export enum ReleaseRegionEnum {
  North_America = "North America",
  South_America = "South America",
  Europe = "Europe",
  Oceania = "Oceania",
  Japan = "Japan",
  Asia = "Asia",
  Others = "Others",
}
