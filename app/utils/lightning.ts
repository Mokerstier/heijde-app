import gsap from 'gsap';

const SVG_NS = 'http://www.w3.org/2000/svg';
const rand = (min: number, max: number) => min + Math.random() * (max - min);

type Point = [number, number];

/** A jagged horizontal bolt: random vertical offsets that taper to zero at both ends. */
const boltPoints = (width: number, jitter: number): Point[] => {
    const count = Math.max(5, Math.round(width / 16));
    return Array.from({ length: count + 1 }, (_, i) => {
        const t = i / count;
        const envelope = Math.pow(Math.sin(Math.PI * t), 0.6);
        return [t * width, rand(-jitter, jitter) * envelope] as Point;
    });
};

/** A short side fork that splits off the main bolt and wanders away from it. */
const forkPoints = (bolt: Point[]): Point[] => {
    const from = bolt[Math.floor(rand(bolt.length * 0.2, bolt.length * 0.75))];
    const side = Math.random() < 0.5 ? -1 : 1;
    const points: Point[] = [from];
    for (let i = 0; i < Math.floor(rand(4, 7)); i++) {
        const [x, y] = points[points.length - 1];
        points.push([x + rand(6, 14), y + side * rand(3, 11) + rand(-4, 4)]);
    }
    return points;
};

const toPath = (points: Point[]) =>
    `M${points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' L')}`;

const makePath = (svg: SVGSVGElement, stroke: string, width: number, opacity: number) => {
    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', stroke);
    path.setAttribute('stroke-width', String(width));
    path.setAttribute('stroke-linejoin', 'round');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('opacity', String(opacity));
    svg.append(path);
    return path;
};

type ZapOptions = {
    /** Max vertical deviation in px. */
    jitter?: number;
    /** Glow colour of the main bolt. */
    color?: string;
    /** Glow colour of the forks. */
    accent?: string;
};

/**
 * Fires one procedurally generated lightning bolt along `host` (which must be
 * positioned): it strikes left to right, flickers into a few new shapes, throws
 * off a fork and some sparks, then fades. Layered strokes fake the glow, so no
 * blur filters are needed. The overlay removes itself when done.
 */
export const zap = (host: HTMLElement, options: ZapOptions = {}) => {
    const width = host.clientWidth;
    if (!width) return;
    const { jitter = 11, color = '#3d7bff', accent = '#a78bfa' } = options;

    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('width', String(width));
    svg.setAttribute('height', '1');
    Object.assign(svg.style, {
        position: 'absolute',
        left: '0',
        top: '50%',
        overflow: 'visible',
        pointerEvents: 'none',
    });

    const glowWide = makePath(svg, color, 10, 0.14);
    const glow = makePath(svg, color, 4, 0.5);
    const core = makePath(svg, '#ffffff', 1.6, 1);
    const forkGlow = makePath(svg, accent, 4, 0.5);
    const forkCore = makePath(svg, '#ffffff', 1.2, 0.9);
    const bolts = [glowWide, glow, core];
    const forks = [forkGlow, forkCore];
    const all = [...bolts, ...forks];

    const shape = () => {
        const points = boltPoints(width, jitter);
        const d = toPath(points);
        bolts.forEach((path) => path.setAttribute('d', d));
        const forkD = toPath(forkPoints(points));
        forks.forEach((path) => path.setAttribute('d', forkD));
        // The path length changed, so DrawSVG has to measure again.
        gsap.set(all, { drawSVG: '0% 100%' });
    };

    host.append(svg);
    shape();
    gsap.set(all, { drawSVG: '0% 0%' });

    const tl = gsap.timeline({ onComplete: () => svg.remove() });

    // Strike: the bolt races along the line, the fork trails slightly behind.
    tl.to(bolts, { drawSVG: '0% 100%', duration: 0.22, ease: 'power2.in', stagger: 0.015 }, 0).to(
        forks,
        { drawSVG: '0% 100%', duration: 0.18, ease: 'power1.out' },
        0.1
    );

    // Flicker: re-roll the shape a few times with uneven brightness.
    for (let i = 0; i < 3; i++) {
        tl.call(shape, [], 0.3 + i * 0.07).to(
            svg,
            { opacity: rand(0.45, 1), duration: 0.05 },
            0.3 + i * 0.07
        );
    }

    // Sparks pop off random spots on the line.
    for (let i = 0; i < 6; i++) {
        const spark = document.createElementNS(SVG_NS, 'circle');
        spark.setAttribute('r', String(rand(0.8, 1.6)));
        spark.setAttribute('fill', i % 2 ? '#ffffff' : accent);
        spark.setAttribute('cx', String(rand(width * 0.1, width * 0.95)));
        spark.setAttribute('cy', '0');
        svg.append(spark);
        tl.fromTo(
            spark,
            { opacity: 1, x: 0, y: 0 },
            {
                opacity: 0,
                x: rand(-14, 14),
                y: rand(-22, 22),
                duration: rand(0.35, 0.6),
                ease: 'power2.out',
            },
            0.15 + i * 0.03
        );
    }

    tl.to(svg, { opacity: 0, duration: 0.3, ease: 'power1.in' }, 0.55);

    return tl;
};

type BurstOptions = {
    /** Number of bolts, spread evenly over 360 degrees. */
    count?: number;
    /** Distance from the centre where the bolts start, in px. */
    inner?: number;
    /** Distance from the centre where the bolts end, in px. */
    outer?: number;
};

/**
 * A ring of short lightning bolts that shoot from the centre of `host` outwards in all
 * directions, then fade. Meant for small elements such as the nav logo, so the bolts
 * overflow the host box. The overlay removes itself when done.
 */
export const burst = (host: HTMLElement, options: BurstOptions = {}) => {
    const { count = 7, inner = 13, outer = 36 } = options;

    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('aria-hidden', 'true');
    // Not 0x0: browsers skip rendering an svg with a zero width or height.
    svg.setAttribute('width', '1');
    svg.setAttribute('height', '1');
    Object.assign(svg.style, {
        position: 'absolute',
        left: 'calc(50% - 0.5px)',
        top: 'calc(50% - 0.5px)',
        overflow: 'visible',
        pointerEvents: 'none',
    });

    const offset = rand(0, Math.PI * 2);
    const glows: SVGPathElement[] = [];
    const cores: SVGPathElement[] = [];

    for (let i = 0; i < count; i++) {
        const angle = offset + (i / count) * Math.PI * 2 + rand(-0.15, 0.15);
        const length = outer - inner + rand(-4, 6);
        const steps = 5;
        const points: Point[] = Array.from({ length: steps + 1 }, (_, step) => {
            const t = step / steps;
            const radius = inner + t * length;
            // Sideways wobble, zero at the start so every bolt leaves from the logo.
            const side = step === 0 ? 0 : rand(-3.5, 3.5);
            return [
                Math.cos(angle) * radius - Math.sin(angle) * side,
                Math.sin(angle) * radius + Math.cos(angle) * side,
            ];
        });
        const d = toPath(points);
        const glow = makePath(svg, i % 2 ? '#a78bfa' : '#3d7bff', 3.5, 0.55);
        const core = makePath(svg, '#ffffff', 1.1, 1);
        glow.setAttribute('d', d);
        core.setAttribute('d', d);
        glows.push(glow);
        cores.push(core);
    }

    host.append(svg);
    const all = [...glows, ...cores];
    gsap.set(all, { drawSVG: '0% 0%' });

    // The cleanup is a timeline step, not onComplete, so callers may set their own onComplete.
    return gsap
        .timeline()
        // Strike outwards, bolts firing a hair apart.
        .to(all, {
            drawSVG: '0% 100%',
            duration: 0.16,
            ease: 'power2.out',
            stagger: { each: 0.012, from: 'random' },
        })
        // Then the tail catches up with the head and the bolt is gone.
        .to(all, { drawSVG: '100% 100%', duration: 0.25, ease: 'power2.in' }, 0.14)
        .to(svg, { opacity: 0, duration: 0.2 }, 0.3)
        .call(() => svg.remove());
};
