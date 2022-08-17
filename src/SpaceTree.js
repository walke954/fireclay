const AABB = require('./AABB.js');
const Geometry = require('./Geometry.js');

const MIN_SIZE = 1;

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

	constructor(x, y, w, h, bucketSize = 4) {
		super(x, y, w, h);

		this.#bucketSize = bucketSize;
		this.#set = new Set();
		this.#children = [];
		this.#leaf = true;
		this.#size = 0;
		this.#indivisible = w <= MIN_SIZE && h <= MIN_SIZE;
	}

	get copy() {
		return this.copyToNew(this.#x, this.#y, this.#w, this.#h);
	}

	#divide() {
		this.#leaf = false;

		const halfW = this.w / 2;
		const halfH = this.w / 2;

		if (this.w * 2 < this.h) {
			this.#children = [
				new SpaceTree(
					this.x, this.y,
					this.w, halfH,
					this.#bucketSize
				),
				new SpaceTree(
					this.x, this.y + halfH,
					this.w, halfH,
					this.#bucketSize
				),
			];
			return;
		}

		if (this.h * 2 < this.w) {
			this.#children = [
				new SpaceTree(
					this.x, this.y,
					halfW, this.h,
					this.#bucketSize
				),
				new SpaceTree(
					this.x + halfW, this.y,
					halfW, this.h,
					this.#bucketSize
				),
			];
			return;
		}

		this.#children = [
			new SpaceTree(
				this.x, this.y,
				halfW, halfH,
				this.#bucketSize
			),
			new SpaceTree(
				this.x + halfW, this.y,
				halfW, halfH,
				this.#bucketSize
			),
			new SpaceTree(
				this.x + halfW, this.y + halfH,
				halfW, halfH,
				this.#bucketSize
			),
			new SpaceTree(
				this.x, this.y + halfH,
				halfW, halfH,
				this.#bucketSize
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
		this.#size += 1;


		if (this.#leaf) {
			if (!this.#indivisible && this.#size <= this.#bucketSize) {
				return this;
			}
			this.#divide();
		}

		this.#children.forEach((child) => {
			child.add(obj);
		});

		return this;
	}

	remove(obj) {
		const has = this.#set.has(obj);
		if (!has) {
			return this;
		}

		this.#set.delete(obj);
		this.#size -= 1;

		if (!this.#leaf && this.#size <= this.#bucketSize) {
			this.#children = [];
			this.#leaf = true;
		}
	}

	search(g) {
		const set = new Set();

		if (!(g instanceof Geometry)) {
			return set;
		}

		const overlap = this.overlaps(g);
		if (!overlap) {
			return set;
		}

		const contains = this.contains(g);
		if (contains) {
			this.#set.forEach((obj) => {
				set.add(obj);
			});
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

module.exports = SpaceTree;
