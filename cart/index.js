let your_cart = [];
let your_total = 0;

const calc_total = (cart) => {
	let total = 0;
	for (let item of cart) {
		total += item.price;
	}

	return total;
};

const calc_your_cart_total = (cart) => {
	your_total = calc_total(cart);
};

const add_item = (cart, item) => {
	const { name, price } = item;
	const new_cart = cart.slice();
	new_cart.push({ name, price });

	return new_cart;
};

const add_item_to_cart = (cart, item) => {
	your_cart = add_item(cart, item);
	calc_your_cart_total(your_cart);
};

add_item_to_cart(your_cart, { name: 'tissue', price: 1000 });
add_item_to_cart(your_cart, { name: 'paper', price: 100 });
// console.log(your_cart);

const update_tax_dom = (cart) => {
	return calc_tax(calc_your_cart_total(cart));
};

const calc_tax = (amount) => amount * 0.1;

const is_free_shipping = (cart, item_price) => cart + item_price >= 2000;

const check_for_free_shipping = (cart) => {
	let total = 0;
	let isFree = false;

	const calc_free_shipping = () => {
		for (let item of cart) {
			if (is_free_shipping(total, item.price)) {
				console.log('FREE SHIPPING');
				isFree = true;
			}
			total += item.price;
		}

		if (!isFree) console.log(`YOU NEED $${2000 - total} MORE FOR FREE SHIPPING.`);
	};

	return calc_free_shipping();
};

check_for_free_shipping(your_cart);
