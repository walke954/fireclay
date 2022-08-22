const {
  Point,
  Line,
  Ray,
  Segment,
  Polygon,
  AABB,
  Circle,
  SpaceTree
} = require('../../src');

const aabbs = {
  '0': new AABB(5, 5, 3, 3),
  '1': new AABB(22, 22, 9, 9),
  '2': new AABB(28, 7, 5, 30),
  '3': new AABB(2, 17, 6, 4),
  '4': new AABB(16, 2, 6, 9),
  '5': new AABB(3, 27, 6, 10)
}

describe('SpaceTree', () => {
  function segmentTree() {
    const options = {bucketSize: 2};
    const tree = new SpaceTree(0, 0, 40, 40, options);

    Object.values(aabbs).forEach((sg, i) => {
      tree.add(sg);
    });

    return tree;
  }

  describe('aabbs', () => {
    it('should overlap aabb', () => {
      const tree = segmentTree();

      // aabb
      const vals = tree.search(new AABB(10, 10, 20, 20));
      expect(vals.size).toBe(3);

      expect(vals.has(aabbs['1'])).toBe(true);
      expect(vals.has(aabbs['2'])).toBe(true);
      expect(vals.has(aabbs['4'])).toBe(true);
    });

    it('should overlap circle', () => {
      const tree = segmentTree();

      // circle
      const vals = tree.search(new Circle(14, 8, 10));
      expect(vals.size).toBe(2);

      expect(vals.has(aabbs['0'])).toBe(true);
      expect(vals.has(aabbs['4'])).toBe(true);
    });

    it('should overlap polygon', () => {
      const tree = segmentTree();

      // polygon
      const vals = tree.search(
        new Polygon(
          new Point(10, 5),
          new Point(40, 30),
          new Point(35, 40),
          new Point(5, 25)
        )
      );
      expect(vals.size).toBe(5);
      expect(vals.has(aabbs['1'])).toBe(true);
      expect(vals.has(aabbs['2'])).toBe(true);
      expect(vals.has(aabbs['3'])).toBe(true);
      expect(vals.has(aabbs['4'])).toBe(true);
      expect(vals.has(aabbs['5'])).toBe(true);
    });

    it('should overlap segment', () => {
      const tree = segmentTree();

      // segment
      const sg = new Segment(
        new Point(1, 3),
        new Point(15, 15)
      );
      const vals = tree.search(sg);

      expect(vals.size).toBe(1);
      expect(vals.has(aabbs['0'])).toBe(true);
    });

    it('should overlap ray', () => {
      const tree = segmentTree();

      // ray
      const vals = tree.search(
        new Ray(
          new Point(1, 3),
          new Point(15, 15)
        )
      );

      expect(vals.size).toBe(3);
      expect(vals.has(aabbs['0'])).toBe(true);
      expect(vals.has(aabbs['1'])).toBe(true);
      expect(vals.has(aabbs['2'])).toBe(true);
    });

    it('should overlap line', () => {
      const tree = segmentTree();

      // line
      const vals = tree.search(
        new Line(
          new Point(1, 3),
          new Point(15, 15)
        )
      );
      
      expect(vals.size).toBe(3);
      expect(vals.has(aabbs['0'])).toBe(true);
      expect(vals.has(aabbs['1'])).toBe(true);
      expect(vals.has(aabbs['2'])).toBe(true);
    });

    it('should overlap point', () => {
      const tree = segmentTree();

      // point
      const vals = tree.search(new Point(30, 26));
      expect(vals.size).toBe(2);
      expect(vals.has(aabbs['1'])).toBe(true);
      expect(vals.has(aabbs['2'])).toBe(true);
    });
  });
});
