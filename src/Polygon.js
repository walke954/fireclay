const Geometry = require('./Geometry.js');
const Shape = require('./Shape.js');
const Point = require('./Point.js');
const Ray = require('./Ray.js');
const Segment = require('./Segment.js');

// only use a tree if length is greater than this value
const MIN_SPACE_TREE_LENGTH = 5;

class Polygon extends Shape {
	#points;
	#segments;

	constructor(...args) {
		if (args.length === 1) {
			const [py] = args;

			super(py.center.x, py.center.y);

			this.#points = py.points;
			this.#segments = py.segments;
			return;
		}

		if (Array.isArray(args[0])) {
			args = args[0];
		}

		let minX = args[0].x;
		let maxX = args[0].x;
		let minY = args[0].y;
		let maxY = args[0].y;
		let sumX = 0;
		let sumY = 0;
		let det = 0;
		const segments = [];
		const points = [];
		args.forEach((pt, i) => {
			const nextPt = i === args.length - 1
				? args[0]
				: args[i + 1];

			minX = pt.x < minX ? pt.x : minX;
			maxX = pt.x > maxX ? pt.x : maxX;
			minY = pt.y < minY ? pt.y : minY;
			maxY = pt.y > maxY ? pt.y : maxY;

			sumX += pt.x;
			sumY += pt.y;

			det += (nextPt.x - pt.x) / (nextPt.y + pt.y);

			const s = new Segment(pt, nextPt);
			segments.push(s);
			points.push(pt.copy);
		});

		super(sumX / points.length, sumY / points.length);

		if (args.length >= MIN_SPACE_TREE_LENGTH) {
			this.#points = Geometry.createSpaceTree(minX, minY, maxX - minX, maxY - minY);
			this.#segments = Geometry.createSpaceTree(minX, minY, maxX - minX, maxY - minY);
			points.forEach((pt) => {
				this.#points.add(pt);
			});
			segments.forEach((sg) => {
				this.#segments.add(sg);
			});
		} else {
			this.#points = points;
			this.#segments = segments;
		}
	}

	get points() {
		if (this.#points.isSpaceTree) {
			return this.#points.items;
		}
		return this.#points.map(pt => pt.copy);
	}

	get segments() {
		if (this.#points.isSpaceTree) {
			return this.#segments.items;
		}
		return this.#segments.map(sg => sg.copy);
	}

	get copy() {
		return new Polygon(this);
	}

	get isPolygon() {
		return true;
	}

	intersectsPoint(pt, getValues = false) {
		if (this.#segments.isSpaceTree) {
			const sgs = this.#segments.search(pt);
			return getValues ? pt.copy : !!sgs.size;
		}

		return pt.intersectsPolygon(this, getValues);
	}

	intersectsLine(ln, getValues = false) {
		if (this.#segments.isSpaceTree) {
			const sgs = this.#segments.search(ln);
			if (!getValues) return !!sgs.size;
			return getValues
				? sgs.values().map(sg => sg.line.intersectsLine(ln)[0])
				: true;
		}

		return ln.intersectsPolygon(this, getValues);
	}

	intersectsRay(ry, getValues = false) {
		if (this.#segments.isSpaceTree) {
			const sgs = this.#segments.search(ry);
			if (!getValues) return !!sgs.size;
			return getValues
				? sgs.values().map(sg => sg.line.intersectsLine(ry.line)[0])
				: true;
		}

		return ry.intersectsPolygon(this, getValues);
	}

	intersectsSegment(sg1, getValues = false) {
		if (this.#segments.isSpaceTree) {
			const sgs = this.#segments.search(sg1);
			if (!getValues) return !!sgs.size;
			return getValues
				? sgs.values().map(sg2 => sg2.line.intersectsLine(sg1.line)[0])
				: true;
		}

		return sg1.intersectsPolygon(this, getValues);
	}

	intersectsPolygon(py, getValues = false) {
		const points = [];
		for (let i = 0; i < py.segments.length; i += 1) {
			const sg = py.segments[i];
			const sgs = this.intersectsSegment(sg, getValues);
			if (sgs) {
				if (!getValues) return true;
				points.push(...sgs.values());
			}
		}

		if (!getValues) {
			return false;
		}

		return points.length ? points : null;
	}

	intersectsAABB(bx, getValues = false) {
		return this.intersectsPolygon(bx, getValues);
	}

	intersectsCircle(ce, getValues = false) {
		const points = [];

		for (let i = 0; i < this.segments.length; i += 1) {
			const sg = this.segments[i];
			const pts = sg.intersectsCircle(ce, true);
			if (pts) {
				if (!getValues) return true;
				points.push(...pts);
			}
		}

		if (!getValues) {
			return false;
		}

		return points.length ? points : null;
	}

	containsPoint(pt) {
		if (pt.intersectsPolygon(this)) {
			return true;
		}

		let ry = null;
		for (let i = 0; i < this.segments.length; i += 1) {
			const mpt = this.segments[i].midpoint;
			ry = new Ray(pt, mpt);

			let intersects = false;
			for (let j = 0; j < this.points.length; j += 1) {
				const pt2 = this.points[j];
				if (pt2.intersectsRay(ry)) {
					intersects = true;
					break;
				}
			}

			if (!intersects) break;
		}

		// find number of intersects
		const count = this.segments.reduce((c, sg) => {
			return ry.intersectsSegment(sg) ? c + 1 : c;
		}, 0);

		return count % 2 !== 0;
	}

	containsSegment(sg) {
		const intersects = sg.intersectsPolygon(this);
		if (intersects) {
			return false;
		}

		const pt = sg.midpoint;
		return this.containsPoint(pt);
	}

	containsPolygon(py) {
		const intersects = this.intersectsPolygon(py);
		if (intersects) {
			return false;
		}

		const pt = py.points[0];
		return this.containsPoint(pt);
	}

	containsCircle(ce) {
		const intersects = this.intersectsCircle(ce);
		if (intersects) {
			return false;
		}

		const pt = new Point(ce.x, ce.y);
		return this.containsPoint(pt);
	}

	overlapsPoint(pt) {
		return this.containsPoint(pt);
	}

	overlapsLine(ln) {
		return this.intersectsLine(ln);
	}

	overlapsRay(ry) {
		return this.intersectsRay(ry);
	}

	overlapsSegment(sg) {
		const intersects = sg.intersectsPolygon(this);
		if (intersects) {
			return true;
		}

		const pt = sg.midpoint;
		return this.containsPoint(pt);
	}

	overlapsPolygon(py) {
		const intersects = this.intersectsPolygon(py);
		if (intersects) {
			return true;
		}

		let pt = py.points[0];
		const contains = this.containsPoint(pt);
		if (contains) {
			return true;
		}

		pt = this.points[0];
		return py.containsPoint(pt);
	}

	overlapsAABB(bx) {
		return this.overlapsPolygon(bx);
	}

	overlapsCircle(ce) {
		const intersects = this.intersectsCircle(ce);
		if (intersects) {
			return true;
		}

		let pt = new Point(ce.x, ce.y);
		const contains = this.containsPoint(pt);
		if (contains) {
			return true;
		}

		pt = this.points[0];
		return ce.containsPoint(pt);
	}
}

module.exports = Polygon;
