const {
  Point,
  Line,
  Ray,
  Segment,
  Polygon,
  AABB,
  Circle,
  SpaceTree
} = require('../src');

const points = {
  '0': new Point(3, 37),
  '1': new Point(15, 16),
  '2': new Point(23, 8),
  '3': new Point(39, 2),
  '4': new Point(32, 35),
  '5': new Point(2, 4)
};

const lines = {
  '0': new Line(4, 2, 3),
  '1': new Line(4, 1, 100),
  '2': new Line(1, -2, 10),
  '3': new Line(6, -5, 8),
  '4': new Line(1, 0, 36),
  '5': new Line(0, 1, 23)
};

describe('SpaceTree', () => {
  function pointTree() {
    const tree = new SpaceTree(0, 0, 40, 40, 2);

    Object.values(points).forEach((pt) => {
      tree.add(pt);
    });

    return tree;
  }

  function lineTree() {
    const tree = new SpaceTree(0, 0, 40, 40, 2);

    Object.values(lines).forEach((ln) => {
      tree.add(ln);
    });

    return tree;
  }

  describe('points', () => {
    it('should intersect aabb', () => {
      const tree = pointTree();

      // aabb
      const vals = tree.search(new AABB(10, 10, 20, 20));
      expect(vals.size).toBe(1);

      expect(vals.has(points['1'])).toBe(true);
    });

    it('should intersect circle', () => {
      const tree = pointTree();
      
      // circle
      const vals = tree.search(new Circle(14, 8, 10));
      expect(vals.size).toBe(2);
      expect(vals.has(points['1'])).toBe(true);
      expect(vals.has(points['2'])).toBe(true);
    })

    it('should intersect polygon', () => {
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

    it('should intersect segment', () => {
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

    it('should intersect ray', () => {
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

    it('should intersect line', () => {
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

    it('should intersect point', () => {
      const tree = pointTree();

      // point
      const vals = tree.search(new Point(39, 2));
      expect(vals.size).toBe(1);
      expect(vals.has(points['3'])).toBe(true);
    });
  });

  describe('line', () => {
    it('should intersect aabb', () => {
      const tree = lineTree();

      // aabb
      const vals = tree.search(new AABB(10, 10, 20, 20));
      expect(vals.size).toBe(4);

      expect(vals.has(lines['1'])).toBe(true);
      expect(vals.has(lines['2'])).toBe(true);
      expect(vals.has(lines['3'])).toBe(true);
      expect(vals.has(lines['5'])).toBe(true);
    });

    it('should intersect circle', () => {
      const tree = lineTree();

      // circle
      const vals = tree.search(new Circle(14, 8, 10));
      expect(vals.size).toBe(3);

      expect(vals.has(lines['1'])).toBe(true);
      expect(vals.has(lines['2'])).toBe(true);
      expect(vals.has(lines['3'])).toBe(true);
    });

    it('should intersect polygon', () => {
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

    it('should intersect segment', () => {
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

    it('should intersect ray', () => {
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

    it('should intersect line', () => {
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

    it('should intersect point', () => {
      const tree = lineTree();

      // point
      const vals = tree.search(new Point(36, 23));
      expect(vals.size).toBe(2);
      expect(vals.has(lines['4'])).toBe(true);
      expect(vals.has(lines['5'])).toBe(true);
    });
  });
});
