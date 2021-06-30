export const shaffle = (array) => {
  array = [...array].sort(() => Math.random() - 0.5);
  return array;
};
