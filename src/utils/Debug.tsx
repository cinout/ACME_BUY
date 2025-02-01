import { jwtDecode } from "jwt-decode";

const what = jwtDecode(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlYXNreWhvQGdtYWlsLmNvbSIsInJvbGUiOiJTZWxsZXIiLCJpYXQiOjE3MzgyMTQ1NTYsImV4cCI6MTczODgxOTM1Nn0._4lfBYgURYBvmRzq_g0s1F7Fm8wJySGNSGvVH47HLRM"
);
console.log(what);
