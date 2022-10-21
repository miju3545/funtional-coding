// Array.find 로 객체 비교하는 것과 동일한 기능
// Array.findIndex(cb)
// Array.indexOf(value)
const indexOfElement = (arr, name) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].name === name) return i;
  }

  return null;
};

const isInCart = (cart, name) => {
  return indexOfElement(cart, name) !== null;
};

const isInCart2 = (cart, name) => {
  const existing = cart.find((element) => element.name === name);
  return Boolean(existing);
};

const indexOfObj = (arr, name) => {
  return arr.findIndex((o, i) => o.name === name);
};

const isInCart3 = (cart, name) => {
  return indexOfObj(cart, name) !== -1;
};

const makeItem = (name, price) => ({ name, price });
const addLastItem = (arr, element) => [...arr, element];
const addItem = (cart, item) => addLastItem(cart, item);

const freeTieClip = (cart) => {
  const hasTie = isInCart3(cart, "tie");
  const hasTieclip = isInCart3(cart, "tieclip");

  if (hasTie && !hasTieclip) {
    const newTieclip = makeItem("tieclip", 0);
    return addItem(cart, newTieclip);
  }

  return cart;
};

const removeItemByName = (cart, name) =>
  cart.filter((elem) => elem.name !== name);

const setPrice = (item, price) => ({ ...item, price });

const setPriceByName = (cart, name, price) => {
  return cart.map((element) =>
    element.name === name ? { ...element, price } : element
  );
};

const arraySet = (arr, index, value) => {
  const arrCopy = arr.slice();
  arrCopy[index] = value;
  return arrCopy;
};

const arrayGetItem = (arr, index) => arr[index];
const setPriceByName2 = (cart, name, price) => {
  const idx = indexOfObj(cart, name);
  if (idx > -1) {
    const item = arrayGetItem(cart, idx);
    return arraySet(cart, idx, setPrice(item, price));
  }
  return cart;
};

const myCart = [
  { name: "tie", price: 3000 },
  { name: "tiestrap", price: 300 },
];

// console.log(freeTieClip(myCart));
// console.log(setPriceByName(myCart, "tie", 1000));
console.log(setPriceByName2(myCart, "tie", 1000));
