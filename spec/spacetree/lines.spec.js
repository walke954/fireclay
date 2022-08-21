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

const lines = {
  '0': new Line(4, 2, 3),
  '1': new Line(4, 1, 100),
  '2': new Line(1, -2, 10),
  '3': new Line(6, -5, 8),
  '4': new Line(1, 0, 36),
  '5': new Line(0, 1, 23)
};

describe('SpaceTree', () => {
  function lineTree() {
    const tree = new SpaceTree(0, 0, 40, 40, 2);

    Object.values(lines).forEach((ln) => {
      tree.add(ln);
    });

    return tree;
  }

  describe('lines', () => {
    it('should overlap aabb', () => {
      const tree = lineTree();

      // aabb
      const vals = tree.search(new AABB(10, 10, 20, 20));
      expect(vals.size).toBe(4);

      expect(vals.has(lines['1'])).toBe(true);
      expect(vals.has(lines['2'])).toBe(true);
      expect(vals.has(lines['3'])).toBe(true);
      expect(vals.has(lines['5'])).toBe(true);
    });

    it('should overlap circle', () => {
      const tree = lineTree();

      // circle
      const vals = tree.search(new Circle(14, 8, 10));
      expect(vals.size).toBe(3);

      expect(vals.has(lines['1'])).toBe(true);
      expect(vals.has(lines['2'])).toBe(true);
      expect(vals.has(lines['3'])).toBe(true);
    });

    it('should overlap polygon', () => {
      const tree = lineTree();

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
      expect(vals.has(lines['1'])).toBe(true);
      expect(vals.has(lines['3'])).toBe(true);
      expect(vals.has(lines['4'])).toBe(true);
      expect(vals.has(lines['5'])).toBe(true);
    });

    it('should overlap segment', () => {
      const tree = lineTree();

      // segment
      const sg = new Segment(
        new Point(1, 3),
        new Point(15, 5)
      );
      const vals = tree.search(sg);

      expect(vals.size).toBe(1);
      expect(vals.has(lines['3'])).toBe(true);
    });

    it('should overlap ray', () => {
      const tree = lineTree();

      // ray
      const vals = tree.search(
        new Ray(
          new Point(8, 4),
          new Point(15, 5)
        )
      );
      expect(vals.size).toBe(3);
      expect(vals.has(lines['1'])).toBe(true);
      expect(vals.has(lines['2'])).toBe(true);
      expect(vals.has(lines['4'])).toBe(true);
    });

    it('should overlap line', () => {
      const tree = lineTree();

      // line
      const vals = tree.search(
        new Line(
          new Point(8, 4),
          new Point(15, 5)
        )
      );
      expect(vals.size).toBe(5);
      expect(vals.has(lines['1'])).toBe(true);
      expect(vals.has(lines['2'])).toBe(true);
      expect(vals.has(lines['3'])).toBe(true);
      expect(vals.has(lines['4'])).toBe(true);
    });

    it('should overlap point', () => {
      const tree = lineTree();

      // point
      const vals = tree.search(new Point(36, 23));
      expect(vals.size).toBe(2);
      expect(vals.has(lines['4'])).toBe(true);
      expect(vals.has(lines['5'])).toBe(true);
    });
  });
});
