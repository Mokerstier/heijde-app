import { ExtrudeGeometry } from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import logoSvg from '~/assets/icons/w-logo-outline.svg?raw';

/** Width of the logo SVG in its own units. Scale a mesh by `target / LOGO_SVG_WIDTH`. */
export const LOGO_SVG_WIDTH = 626;

/**
 * The W logo as a bevelled 3D extrusion, centred on the origin. The geometry is in SVG
 * units and y points down, so the mesh needs a negative y scale. Client-side only.
 */
export const createLogoGeometry = (depth = 170) => {
    const { paths } = new SVGLoader().parse(logoSvg);
    const shapes = paths.flatMap((path) => path.toShapes(true));
    const geometry = new ExtrudeGeometry(shapes, {
        depth,
        bevelEnabled: true,
        bevelSize: 4,
        bevelThickness: 6,
        bevelSegments: 2,
    });
    geometry.center();
    return geometry;
};
