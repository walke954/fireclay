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

const circles = {
  '0': new Circle(19, 5, 12),
  '1': new Circle(29, 6, 8),
  '2': new Circle(34, 35, 2),
  '3': new Circle(5, 36, 11),
  '4': new Circle(22, 24, 10),
  '5': new Circle(0, 15, 6)
}

describe('SpaceTree', () => {
  function segmentTree() {
    const tree = new SpaceTree(0, 0, 40, 40, 2);

    Object.values(circles).forEach((sg, i) => {
      tree.add(sg);
    });

    return tree;
  }

  describe('circles', () => {
    it('should overlap aabb', () => {
      const tree = segmentTree();

      // aabb
      const vals = tree.search(new AABB(10, 10, 20, 20));
      expect(vals.size).toBe(4);

      expect(vals.has(circles['0'])).toBe(true);
      expect(vals.has(circles['1'])).toBe(true);
      expect(vals.has(circles['3'])).toBe(true);
      expect(vals.has(circles['4'])).toBe(true);
    });

    it('should overlap circle', () => {
      const tree = segmentTree();

      // circle
      const vals = tree.search(new Circle(14, 8, 10));
      expect(vals.size).toBe(4);

      expect(vals.has(circles['0'])).toBe(true);
      expect(vals.has(circles['1'])).toBe(true);
      expect(vals.has(circles['4'])).toBe(true);
      expect(vals.has(circles['5'])).toBe(true);
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
      expect(vals.size).toBe(4);
      expect(vals.has(circles['0'])).toBe(true);
      expect(vals.has(circles['2'])).toBe(true);
      expect(vals.has(circles['3'])).toBe(true);
      expect(vals.has(circles['4'])).toBe(true);
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
      expect(vals.has(circles['0'])).toBe(true);
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

      expect(vals.size).toBe(2);
      expect(vals.has(circles['0'])).toBe(true);
      expect(vals.has(circles['4'])).toBe(true);
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
      
      expect(vals.size).toBe(2);
      expect(vals.has(circles['0'])).toBe(true);
      expect(vals.has(circles['4'])).toBe(true);
    });

    it('should overlap point', () => {
      const tree = segmentTree();

      // point
      const vals = tree.search(new Point(30, 26));
      expect(vals.size).toBe(1);
      expect(vals.has(circles['4'])).toBe(true);
    });
  });
});
