const compose =
	(...fns) =>
	(arg) =>
		fns.reduce((composed, fn) => fn(composed), arg);

const addItem = (item) => (cart) => [...cart, { name: item.name, price: item.price }];
const calc_total = (cart) => cart.reduce((sum, item) => sum + item.price, 0);
const calc_tax = (cart) => calc_total(cart) * 0.1;
const get_total_price = (cart) => calc_total(cart) + calc_tax(cart);
const condition = () => 4000;
const is_free_shipping = (total) => total > condition();

const send_email = (email) => (free) =>
	free ? `To ${email} -  Free shipping is available` : `To ${email} - Free shipping is NOT available.`;

const ret = compose(
	addItem({ name: 'tissue', price: 1000 }),
	addItem({ name: 'box', price: 500 }),
	addItem({ name: 'nail', price: 2300 }),
	get_total_price,
	is_free_shipping,
	send_email('rov@gmail.com')
)([]);
console.log(ret);
