// Actions
const fetchSubscribersFromDB = () => {
	const subscribers = [
		{ email: 'john@coldmail.com', rec_count: 2 },
		{ email: 'sam.pamil.co', rec_count: 16 },
		{ email: 'linda1989@oal.com', rec_count: 1 },
		{ email: 'jan1940@ahoy.com', rec_count: 0 },
		{ email: 'mrbig@pmail.co', rec_count: 25 },
		{ email: 'lol@lol.lol', rec_count: 0 },
	];

	return subscribers;
};

const fetchCouponsFromDB = () => {
	const coupons = [
		{ code: 'mayDiscount', rank: 'good' },
		{ code: 'tenPercent', rank: 'good' },
		{ code: 'promotion45', rank: 'best' },
		{ code: 'iHeartYou', rank: 'bad' },
		{ code: 'getAdeal', rank: 'best' },
		{ code: 'iLikedDiscounts', rank: 'good' },
	];

	return coupons;
};

const emailForSubscriber = (subscriber) => {
	const rank = subCouponRank(subscriber);
	const coupons = selectCouponsByRank(rank);

	return {
		from: 'newsletter@coupondog.co',
		to: subscriber.email,
		subject: `Your ${rank} weekly coupons inside.`,
		body: `Here are the ${rank} coupons: ${coupons.map((c) => c.code).join(', ')}`,
	};
};

const emailsForSubscribers = (subscribers) => {
	const emails = [];
	for (let sub of subscribers) {
		const email = emailForSubscriber(sub);
		emails.push(email);
	}

	return emails;
};

const sendIssue = () => {
	const coupons = fetchCouponsFromDB();
	const subscribers = fetchSubscribersFromDB();
	const emails = emailsForSubscribers(subscribers);

	for (email of emails) emailSystem.send(email);
};

// Datas
const subscribers = get_subscribers();
const coupons = get_coupons();

// Calculations
const subCouponRank = (subscriber) => (subscriber.rec_count >= 10 ? 'best' : 'good');

const selectCouponsByRank = (coupons, rank) => {
	return coupons.filter((coup) => coup.rec_count === rank);
};
