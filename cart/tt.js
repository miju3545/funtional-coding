// Actions
let shopping_cart = [];
let shopping_cart_total = 0;

const add_item_to_cart = ({ name, price }) => {
	shopping_cart = add_item({ name, price });
	set_cart_total_dom();
	update_shipping_icons();
	update_tax_dom();
};

const update_shipping_icons = () => {
	const buttons = get_buy_buttons_dom();
	for (let button of buttons) {
		const item = button.item;
		if (gets_free_shipping(shopping_cart_total, item)) button.show_free_shipping_icon();
		else button.hide_free_shipping_icon();
	}
};

const update_tax_dom = () => {
	set_tax_dom(calc_tax(shopping_cart_total));
};

// Calculations
const add_item = (cart, item) => {
	const new_cart = cart.slice();
	new_cart.push(item);

	return new_cart;
};

const calc_total = (cart) => {
	let total = 0;
	for (let item of cart) total += item;

	return total;
};

const gets_free_shipping = (total, item_price) => {
	return total + item_price >= 2000;
};

const calc_tax = (amount) => amount * 0.1;
