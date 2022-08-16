var Geometry = require('./Geometry.js');
var Point = require('./Point.js');

class Arc extends Geometry {
	#start;
	#end;
	#r;
	#dir;

	constructor(start, end, r, dir) {
		super(start, end);

		this.#start = start;
		this.#end = end;
		this.#r = r;
		this.#dir = dir;
	}

	get start() {
		return this.#start;
	}

	get end() {
		return this.#end;
	}

	get dir() {
		return this.#dir;
	}

	get copy() {
		return new Arc(this.#start, this.#end, this.#r, this.#dir);
	}

	get isArc() {
		return true;
	}
}

module.exports = Arc;
