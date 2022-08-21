import Geometry from './Geometry';
import SpaceTree from './SpaceTree';

class SpaceMesh(objs) {

}

Object.defineProperty(Geometry, 'createMesh', {
	writable: true,
	value: (x, y, w, h, bucketSize) => {
		return new SpaceTree(x, y, w, h, bucketSize);
	}
});

module.exports = SpaceMesh;
