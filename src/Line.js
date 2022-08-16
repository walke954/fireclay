var Geometry = require('./Geometry.js');
var Linear = require('./Linear.js');
var Point = require('./Point.js');

class Line extends Linear {
	constructor(...args) {
		super(...args);
	}

	get copy() {
		return new Line(this.a, this.b, this.c);
	}

	get isLine() {
		return true;
	}

	intersectsPoint(pt, getValues = false) {
		return pt.intersectsLine(this, getValues);
	}

	intersectsLine(ln2, getValues = false) {
		const f = -(ln2.a / this.a);
		const y = ((f * this.c) + ln2.c) / ((f * this.b) + ln2.b);
		if (isNaN(y) || y === Infinity || y === -Infinity) {
			return getValues ? null : false;
		}

		if (!getValues) return true;

		const x = (this.c - (y * this.b)) / this.a;

		return [
			new Point(x, y)
		];
	}

	intersectsRay(ry, getValues = false) {
		let pt = this.intersectsLine(ry, true);
		if (!pt) {
			return getValues ? null : false;
		}
		return pt[0].intersectsRay(ry, getValues);
	}

	intersectsSegment(sg, getValues = false) {
		let pt = this.intersectsLine(sg, true);
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
		// get perpendicular
		const perp = new Line(
			this.b, -this.a,
			(this.b * ce.x) + (-this.a * ce.y)
		);

		const [inter] = perp.intersectsLine(this, true);

		const d = Geometry.pythdist(inter.x, inter.y, ce.x, ce.y);
		if (Geometry.greaterThenOrEqualTo(d, ce.r)) {
			return getValues ? null : false;
		} else if (!getValues) {
			return true;
		}

		if (d === 0) {
			const vd = Math.sqrt((this.a ** 2) + (this.b ** 2));

			return [
				new Point(
					ce.x - ((this.a * ce.r) / vd),
					ce.y + ((this.b * ce.r) / vd),
				),
				new Point(
					ce.x + ((this.a * ce.r) / vd),
					ce.y - ((this.b * ce.r) / vd),
				)
			];
		}

		const l = Math.sqrt((ce.r ** 2) - (d ** 2));
		const vd = Math.sqrt((perp.a ** 2) + (perp.b ** 2));

		return [
			new Point(
				inter.x + ((perp.a * l) / vd),
				inter.y + ((perp.b * l) / vd),
			),
			new Point(
				inter.x - ((perp.a * l) / vd),
				inter.y - ((perp.b * l) / vd),
			),
		];
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

module.exports = Line;
