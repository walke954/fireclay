const Geometry = require('./Geometry.js');
const Util = require('./Util.js');
const Linear = require('./Linear.js');
const Point = require('./Point.js');

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

	intersectsLine(ln, getValues = false) {
		let ln1 = this;
		let ln2 = ln;
		if (ln1.a === 0) {
			ln1 = ln;
			ln2 = this;
		}

		const f = -(ln2.a / ln1.a);
		const y1 = ((f * ln1.c) + ln2.c);
		const y2 = ((f * ln1.b) + ln2.b);
		if (Util.equalTo(y1, 0) && Util.equalTo(y2, 0)) {
			return getValues ? [ln1.copy] : true;
		}

		const y = y1 / y2;
		if (isNaN(y) || y === Infinity || y === -Infinity) {
			return getValues ? null : false;
		}

		if (!getValues) return true;

		const x = (ln1.c - (y * ln1.b)) / ln1.a;

		return [
			new Point(x, y)
		];
	}

	intersectsRay(ry, getValues = false) {
		let pt = this.intersectsLine(ry, true);
		if (!pt) {
			return getValues ? null : false;
		}

		if (pt.isLine) {
			return getValues ? [ry.copy] : true;
		}

		return pt[0].intersectsRay(ry, getValues);
	}

	intersectsSegment(sg, getValues = false) {
		let pt = this.intersectsLine(sg, true);
		if (!pt) {
			return getValues ? null : false;
		}

		pt = pt[0];
		if (pt.isLine) {
			return getValues ? [sg.copy] : true;
		}

		return pt.intersectsSegment(sg, getValues);
	}

	intersectsPolygon(py, getValues = false) {
		const vals = [];

		for (let i = 0; i < py.segments.length; i += 1) {
			const sg = py.segments[i];
			let pt = this.intersectsSegment(sg, true);
			if (pt) {
				vals.push(...pt);
				if (!getValues) break;
			}
		}

		if (!getValues) return !!vals.length;

		return vals.length ? vals : null;
	}

	intersectsAABB(bx, getValues = false) {
		return this.intersectsPolygon(bx, getValues);
	}

	intersectsCircle(ce, getValues = false) {
		// get perpendicular
		const perp = new Line(
			this.b, -this.a,
			(this.b * ce.x) + (-this.a * ce.y)
		);

		const [inter] = perp.intersectsLine(this, true);

		const d = Util.pythdist(inter.x, inter.y, ce.x, ce.y);

		if (Util.greaterThen(d, ce.r)) {
			return getValues ? null : false;
		} else if (!getValues) {
			return true;
		}

		if (Util.equalTo(d, ce.r)) {
			return [inter];
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
}

module.exports = Line;
