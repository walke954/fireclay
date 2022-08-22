const Geometry = require('./Geometry.js');
const Point = require('./Point.js');

class Shape extends Geometry {
	#x;
	#y;

	constructor(x, y) {
		super();

		this.#x = x;
		this.#y = y;
	}

	get x() {
		return this.#x;
	}

	set x(v) {
		this.#x += v;
	}

	get y() {
		return this.#y;
	}

	set y(v) {
		return this.#y += v;
	}

	get center() {
		return new Point(this.#x, this.#y);
	}

	get isShape() {
		return true;
	}
}

module.exports = Shape;
