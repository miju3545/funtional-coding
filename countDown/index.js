const countDown = (start, cb) => {
	cb(start);

	return start > 0 ? countDown(start - 1, cb) : start;
};
