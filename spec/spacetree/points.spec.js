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

const points = {
  '0': new Point(3, 37),
  '1': new Point(15, 16),
  '2': new Point(23, 8),
  '3': new Point(39, 2),
  '4': new Point(32, 35),
  '5': new Point(2, 4)
};

describe('SpaceTree', () => {
  function pointTree() {
    const options = {bucketSize: 2};
    const tree = new SpaceTree(0, 0, 40, 40, options);

    Object.values(points).forEach((pt) => {
      tree.add(pt);
    });

    return tree;
  }

  describe('points', () => {
    it('should overlap aabb', () => {
      const tree = pointTree();

      // aabb
      const vals = tree.search(new AABB(10, 10, 20, 20));
      expect(vals.size).toBe(1);

      expect(vals.has(points['1'])).toBe(true);
    });

    it('should overlap circle', () => {
      const tree = pointTree();

      // circle
      const vals = tree.search(new Circle(14, 8, 10));
      expect(vals.size).toBe(2);
      expect(vals.has(points['1'])).toBe(true);
      expect(vals.has(points['2'])).toBe(true);
    })

    it('should overlap polygon', () => {
      const tree = pointTree();

      // polygon
      const vals = tree.search(
        new Polygon(
          new Point(10, 5),
          new Point(40, 30),
          new Point(35, 40),
          new Point(5, 25)
        )
      );
      expect(vals.size).toBe(2);
      expect(vals.has(points['1'])).toBe(true);
      expect(vals.has(points['4'])).toBe(true);
    })

    it('should overlap segment', () => {
      const tree = pointTree();

      // segment
      const vals = tree.search(
        new Segment(
          new Point(1, 3),
          new Point(3, 5)
        )
      );
      expect(vals.size).toBe(1);
      expect(vals.has(points['5'])).toBe(true);
    })

    it('should overlap ray', () => {
      const tree = pointTree();

      // ray
      const vals = tree.search(
        new Ray(
          new Point(1, 3),
          new Point(3, 5)
        )
      );
      expect(vals.size).toBe(1);
      expect(vals.has(points['5'])).toBe(true);
    })

    it('should overlap line', () => {
      const tree = pointTree();

      // line
      const vals = tree.search(
        new Line(
          new Point(1, 3),
          new Point(3, 5)
        )
      );
      expect(vals.size).toBe(1);
      expect(vals.has(points['5'])).toBe(true);
    })

    it('should overlap point', () => {
      const tree = pointTree();

      // point
      const vals = tree.search(new Point(39, 2));
      expect(vals.size).toBe(1);
      expect(vals.has(points['3'])).toBe(true);
    });
  });
});
