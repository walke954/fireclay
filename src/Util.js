const PRECISION = 10; // precision when comparing numbers
const ERROR = 1 / (10 ** PRECISION);

class Util {
	static equalTo(v1, v2) {
		const v = v1 - v2;
		return v <= ERROR / 2 && v >= -ERROR / 2;
	}

	static greaterThen(v1, v2) {
		return v1 > v2 - ERROR;
	}

	static lessThen(v1, v2) {
		return v1 < v2 + ERROR;
	}

	static greaterThenOrEqualTo(v1, v2) {
		return v1 >= v2 - ERROR;
	}

	static lessThenOrEqualTo(v1, v2) {
		return v1 <= v2 + ERROR;
	}

	static pythdist(x1, y1, x2, y2) {
		return Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2));
	}
}

module.exports = Util;
