import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
    content: [],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                lg: '3rem',
            },
        },
        extend: {
            colors: {
                'primary': '#3488dc',
                'primary-200': '#187adc',
                'gray': '#ABB2BF',
                'slate': '#282C33',
            },
            fontFamily: {
                'nico-moji': ['Nico-Moji', ...defaultTheme.fontFamily.serif],
                'fira-code': ['Fira-Code', ...defaultTheme.fontFamily.mono],
            },
            spacing: {
                '21': '84px',
            },
        },
    },
    plugins: [],
} satisfies Config;

