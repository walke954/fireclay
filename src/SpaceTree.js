const AABB = require('./AABB.js');
const Geometry = require('./Geometry.js');

class SpaceTree extends AABB {
	#x;
	#y;
	#w;
	#h;
	#bucketSize;
	#set;
	#children;
	#leaf;
	#size;
	#indivisible;
	#options;

	constructor(x, y, w, h, options = {}) {
		super(x, y, w, h);

		const {
			bucketSize = 4,
			minSize
		} = options;

		this.#options = options;
		this.#bucketSize = bucketSize;
		this.#set = new Set();
		this.#children = [];
		this.#leaf = true;
		this.#indivisible = minSize ? w <= minSize && h <= minSize : false;
	}

	get size() {
		return this.#set.size;
	}

	get copy() {
		return this.copyToNew(this.#x, this.#y, this.#w, this.#h);
	}

	get isSpaceTree() {
		return true;
	}

	get items() {
		return Array.from(Object.values(this.#set));
	}

	#divide() {
		const halfW = this.w / 2;
		const halfH = this.h / 2;

		if (this.w * 2 < this.h) {
			this.#children = [
				new SpaceTree(
					this.x, this.y,
					this.w, halfH,
					this.#options
				),
				new SpaceTree(
					this.x, this.y + halfH,
					this.w, halfH,
					this.#options
				),
			];
			return;
		}

		if (this.h * 2 < this.w) {
			this.#children = [
				new SpaceTree(
					this.x, this.y,
					halfW, this.h,
					this.#options
				),
				new SpaceTree(
					this.x + halfW, this.y,
					halfW, this.h,
					this.#options
				),
			];
			return;
		}

		this.#children = [
			new SpaceTree(
				this.x, this.y,
				halfW, halfH,
				this.#options
			),
			new SpaceTree(
				this.x + halfW, this.y,
				halfW, halfH,
				this.#options
			),
			new SpaceTree(
				this.x + halfW, this.y + halfH,
				halfW, halfH,
				this.#options
			),
			new SpaceTree(
				this.x, this.y + halfH,
				halfW, halfH,
				this.#options
			),
		];
	}

	add(obj) {
		const has = this.#set.has(obj);
		if (has) {
			return this;
		}

		if (!(obj instanceof Geometry) || !this.overlaps(obj)) {
			return this;
		}

		this.#set.add(obj);

		if (!this.#leaf) {
			this.#children.forEach((child) => {
				child.add(obj);
			});
			return this;
		}

		if (this.#indivisible || this.size <= this.#bucketSize) {
			return this;
		}

		let contained = true;
		for (let i = 0; i < this.items.length; i += 1) {
			if (!this.items[i].contains(this)) {
				contained = false;
			}
		}

		if (contained) {
			return this;
		}

		this.#leaf = false;
		this.#divide();

		this.#children.forEach((child) => {
			this.#set.forEach((g) => {
				child.add(g);
			});
		});

		return this;
	}

	remove(obj) {
		const has = this.#set.has(obj);
		if (!has) {
			return this;
		}

		this.#set.delete(obj);

		if (!this.#leaf && this.size <= this.#bucketSize) {
			this.#children = [];
			this.#leaf = true;
		}
	}

	search(g) {
		const set = new Set();

		if (!(g instanceof Geometry)) {
			return set;
		}

		const contains = g.contains(this);
		if (contains) {
			this.#set.forEach((obj) => {
				set.add(obj);
			});
			return set;
		}

		const overlaps = g.overlaps(this);
		if (!overlaps) {
			return set;
		}

		if (this.#leaf) {
			this.#set.forEach((obj) => {
				if (obj.overlaps(g)) {
					set.add(obj);
				}
			});
			return set;
		}

		this.#children.forEach((child) => {
			const found = child.search(g);
			found.forEach((obj) => {
				if (obj.overlaps(g)) {
					set.add(obj);
				}
			});
		});

		return set;
	}

	copyToNew(x, y, w, h) {
		const tree = new SpaceTree(x, y, w, h, this.#bucketSize);
		const items = this.search(tree);
		items.forEach((it) => {
			tree.add(it);
		});

		return tree;
	}
}

Object.defineProperty(Geometry, 'createSpaceTree', {
	value: (...args) => new SpaceTree(...args)
});

module.exports = SpaceTree;
