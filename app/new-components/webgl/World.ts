import { mat4 } from 'gl-matrix';
import { Object3D } from './Object3D';

export type WorldObject = {
  object: Object3D,
  worldPosition: mat4
};

export class World {
	objects: WorldObject[] = [];

	addObjectAtOrigin(object: Object3D) {
		this.objects.push({
			object,
			worldPosition: mat4.create(),
		});
	}

	addObject(object: Object3D, worldPosition: mat4) {
		this.objects.push({
			object,
			worldPosition,
		});
	}

	getObjects(): WorldObject[] {
		return this.objects;
	}

	clearObjects() {
		this.objects = []
	}
}
