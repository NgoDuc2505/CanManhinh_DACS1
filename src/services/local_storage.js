const setLocal = (data, key) => {
  const jsonData = JSON.stringify(data);
  localStorage.setItem(key, jsonData);
};

const getValue = (key) => {
  const data = JSON.parse(localStorage.getItem(key));
  return data;
};

const delLocal = (key) => {
  localStorage.removeItem(key);
};

export { getValue, setLocal, delLocal };
