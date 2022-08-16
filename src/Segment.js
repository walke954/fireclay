var Geometry = require('./Geometry.js');
var Linear = require('./Linear.js');
var Point = require('./Point.js');
var Line = require('./Line.js');

class Segment extends Linear {
	#minX;
	#minY;
	#maxX;
	#maxY;
	#points;

	constructor(...args) {
		if (args.length < 2) {
			const [sg] = args;
			super(sg.a, sg.b, sg.c);

			this.#points = sg.points;
			this.#minX = sg.minX;
			this.#minY = sg.minY;
			this.#maxX = sg.maxX;
			this.#maxY = sg.maxY;
			return;
		}

		const [pt1, pt2] = args;
		super(pt1, pt2);

		this.#points = [pt1.copy, pt2.copy];
		this.#minX = Math.min(pt1.x, pt2.x);
		this.#minY = Math.min(pt1.y, pt2.y);
		this.#maxX = Math.max(pt1.x, pt2.x);
		this.#maxY = Math.max(pt1.y, pt2.y);
	}

	get minX() {
		return this.#minX;
	}

	get minY() {
		return this.#minY;
	}

	get maxX() {
		return this.#maxX;
	}

	get maxY() {
		return this.#maxY;
	}

	get midpoint() {
		return new Point(
			this.#minX + ((this.#maxX - this.#minX) / 2),
			this.#minY + ((this.#maxY - this.#minY) / 2),
		);
	}

	get points() {
		return this.#points.map(pt => pt.copy);
	}

	get copy() {
		return new Segment(this);
	}

	get line() {
		return new Line(this.a, this.b, this.c);
	}

	get isSegment() {
		return true;
	}

	intersectsPoint(pt, getValues = false) {
		return pt.intersectsSegment(this, getValues);
	}

	intersectsLine(ln, getValues = false) {
		return ln.intersectsSegment(this, getValues);
	}

	intersectsRay(ry, getValues = false) {
		return ry.intersectsSegment(this, getValues);
	}

	intersectsSegment(sg, getValues = false) {
		const pt = this.line.intersectsSegment(sg, true);
		if (!pt) {
			return getValues ? null : false;
		}
		return pt[0].intersectsSegment(this, getValues);
	}

	intersectsPolygon(py, getValues = false) {
		let pts = this.line.intersectsPolygon(py, true);
		if (!pts) {
			return getValues ? null : false;
		}
		pts = pts.filter((pt) => pt.intersectsSegment(this));

		if (!getValues) {
			return !!pts.length;
		}

		return pts.length ? pts : null;
	}

	intersectsAABB(bx, getValues = false) {
		this.intersectsPolygon(bx, getValues);
	}

	intersectsCircle(ce, getValues = false) {
		let pts = this.line.intersectsCircle(ce, true);
		if (!pts) {
			return getValues ? null : false;
		}
		pts = pts.filter((pt) => pt.intersectsSegment(this));

		if (!getValues) {
			return !!pts.length;
		}

		return pts.length ? pts : null;
	}

	overlapsPoint(pt) {
		return this.intersectsPoint(pt);
	}

	overlapsLine(ln) {
		return this.intersectsLine(ln);
	}

	overlapsRay(ry) {
		return this.intersectsRay(ry);
	}

	overlapsSegment(sg) {
		return this.intersectsSegment(sg);
	}

	overlapsPolygon(py) {
		return this.intersectsPolygon(py);
	}

	overlapsAABB(bx) {
		return this.intersectsAABB(bx);
	}

	overlapsCircle(ce) {
		return this.intersectsCircle(ce);
	}
}

module.exports = Segment;
