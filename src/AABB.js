var Geometry = require('./Geometry.js');
var Point = require('./Point.js');
var Polygon = require('./Polygon.js');

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

	intersectsAABB(bx, getValues = false) {
		super.intersectsPolygon(bx, getValues);
	}

	containsAABB(bx) {
		const containsX = this.x <= bx.x && this.x + this.w >= bx.x + bx.w;
		const containsY = this.y <= bx.y && this.y + this.h >= bx.y + bx.h;
		return containsX && containsY;
	}

	overlapsPoint(pt) {
		return pt.overlapsAABB(this);
	}

	overlapsAABB(bx) {
		const interX = this.x + this.w < bx.x || bx.x + bx.w < this.x;
		const interY = this.y + this.h < bx.y || bx.y + bx.h < this.y;
		return !interX || !interY;
	}
}

module.exports = AABB;
