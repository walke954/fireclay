const Geometry = require('./Geometry.js');
const Point = require('./Point.js');
const Polygon = require('./Polygon.js');

class AABB extends Polygon {
	#x;
	#y;
	#w;
	#h;

	constructor(x, y, w, h) {
		const points = [
			new Point(x, y),
			new Point(x, y + h),
			new Point(x + w, y + h),
			new Point(x + w, y),
		];

		super(...points);

		this.#x = x;
		this.#y = y;
		this.#w = w;
		this.#h = h;
	}

	get x() {
		return this.#x;
	}

	get y() {
		return this.#y;
	}

	get w() {
		return this.#w;
	}

	get h() {
		return this.#h;
	}

	get isAABB() {
		return true;
	}

	containsAABB(bx) {
		const containsX =
			Geometry.lessThenOrEqualTo(this.x, bx.x)
			&& Geometry.greaterThenOrEqualTo(this.x + this.w, bx.x + bx.w);
		const containsY =
			Geometry.lessThenOrEqualTo(this.y, bx.y)
			&& Geometry.greaterThenOrEqualTo(this.y + this.h, bx.y + bx.h);
		return containsX && containsY;
	}

	overlapsPoint(pt) {
		return pt.overlapsAABB(this);
	}

	overlapsAABB(bx) {
		return this.intersectsAABB(bx) || this.containsAABB(bx) || bx.containsAABB(this);
	}
}

module.exports = AABB;
