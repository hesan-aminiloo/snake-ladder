const randomNum = (min, max) => {
  const rand = Math.random();
  return Math.floor(rand * (max - min + 1)) + min;
};

export {
  randomNum
};
