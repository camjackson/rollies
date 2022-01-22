import type { Camera, Intersection, Object3D } from 'three';
import { Raycaster, Vector2 } from 'three';
import type { ObjectMouseEventHandler } from './context';

// Can initialise these at module load
const clickHandlers = new Map<Object3D, ObjectMouseEventHandler>();
const mouseMoveHandlers = new Map<Object3D, ObjectMouseEventHandler>();
const rayCaster = new Raycaster();
const clickPoint = new Vector2(); // Screen-space coords, range [-1, 1]

export class TroisCaster {
  // Only these few are class fields, because they have to be lazily initialised
  private readonly canvas: HTMLCanvasElement;
  private readonly camera: Camera;

  constructor(canvas: HTMLCanvasElement, camera: Camera) {
    this.canvas = canvas;
    this.camera = camera;
  }

  public attach(): void {
    this.canvas.addEventListener('click', this.onClickCanvas);
    this.canvas.addEventListener('mousemove', this.onMouseMoveCanvas);
  }

  public detach(): void {
    this.canvas.removeEventListener('click', this.onClickCanvas);
    this.canvas.removeEventListener('mousemove', this.onMouseMoveCanvas);
    clickHandlers.clear();
    mouseMoveHandlers.clear();
  }

  private onClickCanvas = (e: MouseEvent) =>
    this.handleMouseEvent(e, clickHandlers);
  private onMouseMoveCanvas = (e: MouseEvent) =>
    this.handleMouseEvent(e, mouseMoveHandlers);

  private handleMouseEvent = (
    domEvent: MouseEvent,
    handlers: Map<Object3D, ObjectMouseEventHandler>,
  ) => {
    const intersections = this.raycast(domEvent, Array.from(handlers.keys()));

    let stopped = false;
    const stopPropagation = () => {
      stopped = true;
    };
    intersections.forEach((intersection) => {
      if (stopped) return;
      handlers.get(intersection.object)({
        domEvent,
        intersection,
        stopPropagation,
      });
    });
  };

  private raycast = (e: MouseEvent, objects: Object3D[]): Intersection[] => {
    // https://stackoverflow.com/questions/12800150/catch-the-click-event-on-a-specific-mesh-in-the-renderer
    clickPoint.x = (e.clientX / this.canvas.clientWidth) * 2 - 1;
    clickPoint.y = -(e.clientY / this.canvas.clientHeight) * 2 + 1;

    rayCaster.setFromCamera(clickPoint, this.camera);

    const intersections = rayCaster.intersectObjects(objects);

    return intersections;
  };
}

// TODO: Find a way to de-dupe this code and make it work for lots of different events
export const onObjectClick = (
  object: Object3D,
  onClick: ObjectMouseEventHandler,
): void => {
  clickHandlers.set(object, onClick);
};
export const onObjectMouseMove = (
  object: Object3D,
  onMouseMove: ObjectMouseEventHandler,
): void => {
  mouseMoveHandlers.set(object, onMouseMove);
};

export const removeOnObjectClick = (object: Object3D): void => {
  clickHandlers.delete(object);
};
export const removeOnObjectMouseMove = (object: Object3D): void => {
  mouseMoveHandlers.delete(object);
};
