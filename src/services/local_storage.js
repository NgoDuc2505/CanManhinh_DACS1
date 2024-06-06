const setLocal = (data,key) => {
  const jsonData = JSON.stringify(data);
  localStorage.setItem(key, jsonData);
};

const getValue = (key) => {
  const data = JSON.parse(localStorage.getItem(key));
  return data;
};

export { getValue, setLocal };
