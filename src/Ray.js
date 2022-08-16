var Geometry = require('./Geometry.js');
var Linear = require('./Linear.js');
var Point = require('./Point.js');
var Line = require('./Line.js');

class Ray extends Linear {
	#origin;
	#signX;
	#signY;

	constructor(...args) {
		if (args.length < 2) {
			const [ry] = args;
			super(ry.a, ry.b, ry.c);

			this.#origin = ry.origin;
			this.#signX = ry.signX;
			this.#signY = ry.signY;
			return;
		}

		const [origin, midpoint] = args;
		super(origin, midpoint);

		this.#origin = origin.copy;
		this.#signX = Math.sign(midpoint.x - origin.x);
		this.#signY = Math.sign(midpoint.y - origin.y);
	}

	get origin() {
		return this.#origin.copy;
	}

	get signX() {
		return this.#signX;
	}

	get signY() {
		return this.#signY;
	}

	get copy() {
		return new Ray(this);
	}

	get line() {
		return new Line(this.a, this.b, this.c);
	}

	get isRay() {
		return true;
	}

	intersectsPoint(pt, getValues = false) {
		return pt.intersectsRay(this, getValues);
	}

	intersectsLine(ln, getValues = false) {
		return ln.intersectsRay(this, getValues);
	}

	intersectsRay(ry2, getValues = false) {
		const pt = this.line.intersectsRay(ry2, true);
		if (!pt) {
			return getValues ? null : false;
		}
		return this.intersectsPoint(pt[0], getValues);
	}

	intersectsSegment(sg, getValues = false) {
		const pt = sg.line.intersectsRay(this, true);
		if (!pt) {
			return getValues ? null : false;
		}
		return pt[0].intersectsSegment(sg, getValues);
	}

	intersectsPolygon(py, getValues = false) {
		const map = new Map();

		for (let i = 0; i < py.segments.length; i += 1) {
			const sg = py.segments[i];
			let pt = this.intersectsSegment(sg, true);
			if (pt) {
				pt = pt[0];
				map.set(pt.x, pt.y);
				if (!getValues) break;
			}
		}

		if (!getValues) return !!map.size;

		const points = Array
			.from(map.entries())
			.map(([x, y]) => new Point(x, y));

		return points.length ? points : null;
	}

	intersectsAABB(bx, getValues = false) {
		this.intersectsPolygon(bx, getValues);
	}

	intersectsCircle(ce, getValues = false) {
		let pts = this.line.intersectsCircle(ce, true);
		if (!pts) {
			return getValues ? null : false;
		}
		pts = pts.filter((pt) => pt.intersectsRay(this));

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

module.exports = Ray;
