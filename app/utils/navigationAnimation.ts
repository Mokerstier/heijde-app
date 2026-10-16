import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { zap } from '~/utils/lightning';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(Flip);
}

/**
 * The active-link underline: it elastically slides to the clicked link (Flip) and a
 * small bolt strikes along it. Returns a cleanup function that removes the listeners.
 */
export const animateNavigation = (navigationLinksRef: HTMLLIElement[] | null) => {
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

    const cleanups = (navigationLinksRef ?? []).map((link) => {
        const onClick = () => {
            gsap.to(navigationLinksRef, { color: '#3d7bff' });

            const state = Flip.getState(active);
            link.appendChild(active);

            gsap.killTweensOf(active);
            Flip.from(state, { duration: 1.2, absolute: true, ease: 'elastic.out(1, 0.5)' });

            // The underline dims for a moment while the bolt strikes along it.
            gsap.timeline()
                .to(active, { height: '1px', duration: 0.15, ease: 'power1.in' })
                .to(active, { height: '3px', duration: 0.5, ease: 'power2.out' });
            zap(active, { jitter: 9 });
        };
        link.addEventListener('click', onClick);
        return () => link.removeEventListener('click', onClick);
    });

    return () => {
        cleanups.forEach((cleanup) => cleanup());
        active.remove();
    };
};
