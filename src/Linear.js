const Geometry = require('./Geometry.js');

class Linear extends Geometry {
	#a;
	#b;
	#c;

	constructor(...args) {
		super();

		if (args.length > 2) {
			const [a, b, c] = args;
			this.#a = a;
			this.#b = b;
			this.#c = c;
			return;
		}

		const [pt1, pt2] = args;
		if (pt1.x === pt2.x && pt1.y === pt2.y) {
			this.#a = NaN;
			this.#b = NaN;
			this.#c = NaN;
		}

		const a = pt2.y - pt1.y;
		const b = pt2.x - pt1.x;

		this.#a = a;
		this.#b = -b;
		this.#c = (a * pt1.x) - (b * pt1.y);
	}

	get a() {
		return this.#a;
	}

	get b() {
		return this.#b;
	}

	get c() {
		return this.#c;
	}

	get isLinear() {
		return true;
	}

	equals(ln) {
		let f = null;
		const allkeys = ['a', 'b', 'c'];

		for (let i = 0; i < allkeys.length; i += 1) {
			const k = allkeys[i];
			if (this[k] === 0 && ln[k] === 0) {
				continue;
			}

			if (this[k] === 0 && ln[k] !== 0) {
				return false;
			}

			if (f === null) {
				f = this[k] / ln[k];
				continue;
			}

			if (this[k] / ln[k] !== f) {
				return false;
			}
		}

		return true;
	}
}

module.exports = Linear;
