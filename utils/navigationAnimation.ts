import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
gsap.registerPlugin(Flip, MotionPathPlugin);

export const animateNavigation = (navigationLinksRef: HTMLLIElement[] | null) => {
    const svgNS = 'http://www.w3.org/2000/svg';

    // Create the defs element
    const defs = document.createElementNS(svgNS, 'defs');

    // Create the linearGradient element
    const linearGradient = document.createElementNS(svgNS, 'linearGradient');
    linearGradient.setAttribute('id', 'gradient-stroke');
    linearGradient.setAttribute('x1', '0%');
    linearGradient.setAttribute('y1', '0%');
    linearGradient.setAttribute('x2', '100%');
    linearGradient.setAttribute('y2', '0%');

    // Create the stop elements
    const stop1 = document.createElementNS(svgNS, 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('style', 'stop-color: white; stop-opacity: 1');

    const stop2 = document.createElementNS(svgNS, 'stop');
    stop2.setAttribute('offset', '50%');
    stop2.setAttribute('style', 'stop-color: #3488dc; stop-opacity: 1');

    const stop3 = document.createElementNS(svgNS, 'stop');
    stop3.setAttribute('offset', '100%');
    stop3.setAttribute('style', 'stop-color: white; stop-opacity: .2');

    // Append the stop elements to the linearGradient
    linearGradient.appendChild(stop1);
    linearGradient.appendChild(stop2);
    linearGradient.appendChild(stop3);

    // Append the linearGradient to the defs
    defs.appendChild(linearGradient);

    // const active = document.querySelector('.animate-here') as HTMLSpanElement;
    const active = document.createElement('span');
    active.classList.add(
        'animate-here',
        'absolute',
        '-bottom-3',
        'left-0',
        'h-[3px]',
        'w-full',
        'rounded-2xl',
        'bg-primary'
    );

    const activeLink = document.querySelector('.active');
    activeLink?.parentElement?.appendChild(active);

    // Append the lightning-root SVG to the active span
    const lightningRoot = document.getElementById('lightning-root');
    if (lightningRoot) {
        lightningRoot.appendChild(defs);
        active.appendChild(lightningRoot);
    }

    // Animate the lightning path with a glitchy effect
    const lightningPaths = lightningRoot?.querySelectorAll('path') as unknown as SVGPathElement[];

    navigationLinksRef?.forEach((link) => {
        link.addEventListener('click', () => {
            gsap.set(lightningRoot, { opacity: 1 });
            gsap.to(navigationLinksRef, { color: '#3488dc' });
            if (document.activeElement === link.querySelector('a')) {
                gsap.to(link, { color: '#3488dc' });
            }

            const state = Flip.getState(active);
            link.appendChild(active);

            gsap.killTweensOf(active);
            gsap.killTweensOf(lightningRoot);

            const tl = gsap.timeline();

            Flip.from(state, {
                duration: 1.5,
                absolute: true,
                ease: 'elastic.out(1, 0.5)',
            });

            tl.to(
                active,
                {
                    height: '1px',
                    background: 'linear-gradient(90deg, #ffffff, #3488dc, #ffffff)',
                    duration: 0.5,
                    opacity: 1,
                    ease: 'power1.inOut',
                    yoyo: true,
                    repeat: 2,
                },
                0
            ).to(active, {
                height: '3px',
                background: '#3488dc',
                duration: 0.5,
                ease: 'power1.inOut',
            });

            if (lightningPaths.length > 0) {
                lightningPaths.forEach((lightningPath, index) => {
                    gsap.killTweensOf(lightningPath);

                    gsap.set(lightningPath, {
                        stroke: 'url(#gradient-stroke)',
                        strokeWidth: 2,
                        opacity: 1,
                        strokeDasharray: 400,
                        strokeDashoffset: 700,
                    });
                    tl.to(
                        lightningPath,
                        {
                            strokeDashoffset: 0,
                            duration: 1.5,
                            ease: 'power1.out',
                        },
                        0
                    ).to(
                        lightningPath,
                        {
                            strokeDashoffset: 100,
                            duration: 0.5,
                            opacity: 0,
                            ease: 'power1.out',
                        },
                        1.5
                    );
                });

                // Add electric sparks effect
                const sparks: { spark: HTMLSpanElement }[] = [];

                for (let i = 0; i < 5; i++) {
                    const span = document.createElement('span');
                    gsap.killTweensOf(span);
                    span.classList.add('spark');
                    active.appendChild(span);

                    const rect = active.getBoundingClientRect();
                    const startX = rect.width / 2;
                    const startY = rect.height / 2;

                    gsap.set(span, {
                        left: startX,
                        top: startY,
                    });

                    sparks.push({ spark: span });
                }

                sparks.forEach(({ spark }) => {
                    const angle = Math.random() * 2 * Math.PI;
                    const distance = Math.random() * 20;
                    const endX = Math.cos(angle) * distance;
                    const endY = Math.sin(angle) * distance;

                    gsap.to(spark, {
                        duration: 1.5,
                        left: `+=${endX}`,
                        top: `+=${endY}`,
                        opacity: 0,
                        ease: 'power1.out',
                        onComplete: () => {
                            spark.remove();
                        },
                    });
                });
            }
        });
    });
};
