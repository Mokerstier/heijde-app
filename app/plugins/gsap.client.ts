import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { Flip } from 'gsap/Flip';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

export default defineNuxtPlugin(() => {
    gsap.registerPlugin(
        DrawSVGPlugin,
        Flip,
        ScrambleTextPlugin,
        ScrollSmoother,
        ScrollTrigger,
        SplitText
    );

    return {
        provide: { gsap },
    };
});
