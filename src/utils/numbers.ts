export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min); // Ensure the minimum value is inclusive
  max = Math.floor(max); // Ensure the maximum value is inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
