const subscribers = [
	{ email: 'john@coldmail.com', rec_count: 2 },
	{ email: 'sam.pamil.co', rec_count: 16 },
	{ email: 'linda1989@oal.com', rec_count: 1 },
	{ email: 'jan1940@ahoy.com', rec_count: 0 },
	{ email: 'mrbig@pmail.co', rec_count: 25 },
	{ email: 'lol@lol.lol', rec_count: 0 },
];

const coupons = [
	{ code: 'mayDiscount', rank: 'good' },
	{ code: 'tenPercent', rank: 'good' },
	{ code: 'promotion45', rank: 'best' },
	{ code: 'iHeartYou', rank: 'bad' },
	{ code: 'getAdeal', rank: 'best' },
	{ code: 'iLikedDiscounts', rank: 'good' },
];

const subCouponRank = (subscriber) => {
	return subscriber.rec_count >= 10 ? 'best' : 'good';
};

const selectCouponsByRank = (coupons, rank) => {
	return coupons.filter((c) => c.rank === rank);
};

const emailForSubscriber = (subscriber, coupons) => {
	const subRank = subCouponRank(subscriber);
	const subCoups = selectCouponsByRank(coupons, subRank);

	return {
		from: 'newsletter@coupondog.co',
		to: subscriber.email,
		subject: `Your ${subRank} weekly coupons inside.`,
		body: `Here are the ${subRank} coupons: ${subCoups.map((c) => c.code).join(', ')}`,
	};
};

const emailsForSubscribers = (subscribers, coupons) => {
	return subscribers.map((subscriber) => emailForSubscriber(subscriber, coupons));
};

const fetchCouponsFromDB = () => {
	return coupons;
};
const fetchSubscribersFromDB = (page) => {
	return subscribers.splice(page, 100);
};

const sendIssue = () => {
	const coups = fetchCouponsFromDB();
	let page = 0;
	let subs = fetchSubscribersFromDB(page);

	while (subs.length) {
		const emails = emailsForSubscribers(subs, coups);
		// emails.forEach(email => emailSystem.sneD(email))
	}

	page++;
	subs = fetchSubscribersFromDB(page);
};
