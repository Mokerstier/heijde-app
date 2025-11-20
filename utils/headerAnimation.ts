import gsap from 'gsap';

export const animateHeader = (root: HTMLSpanElement | null) => {
    if (root === null) return;
    const lightningPaths = root.querySelectorAll('path') as unknown as SVGPathElement[];

    const tl = gsap.timeline();

    if (lightningPaths.length > 0) {
        lightningPaths.forEach((lightningPath, index) => {
            gsap.killTweensOf(lightningPath);

            gsap.set(lightningPath, {
                strokeWidth: 2,
                stroke: index % 2 ? '#ffffff' : '#3488dc',
                opacity: 1,
                strokeDasharray: index % 2 ? 200 : 800,
                strokeDashoffset: 1200,
                onComplete: () => {
                    tl.to(
                        lightningPath,
                        {
                            stroke: index % 2 ? '#ffffff' : '#3488dc',
                            strokeDashoffset: index % 2 ? 0 : 1000,
                            duration: 2.5,
                            opacity: 0.5,
                            ease: 'power1.out',
                        },
                        0
                    ).to(
                        lightningPath,
                        {
                            strokeDashoffset: index % 2 ? 1000 : 0,
                            duration: 0.5,
                            opacity: 0,
                            ease: 'power1.out',
                        },
                        2.5
                    );
                },
            });
            tl.to(
                lightningPath,
                {
                    strokeDashoffset: index % 2 ? 400 : -400,
                    duration: 1.5,
                    opacity: 0.1,
                    ease: 'power2.inOut',
                },
                0
            ).to(
                lightningPath,
                {
                    strokeDashoffset: index % 2 ? -100 : 400,
                    duration: 0.5,
                    opacity: 0,
                    ease: 'power2.inOut',
                },
                1.5
            );
        });
    }
};
