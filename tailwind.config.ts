import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
    content: [],
    theme: {
        extend: {
            container: {
                center: true,
                padding: {
                    DEFAULT: '1rem',
                    sm: '3rem',
                    lg: '4rem',
                    xl: '6rem',
                },
                screens: {
                    'sm': '600px',
                    'md': '728px',
                    'lg': '984px',
                    'xl': '1024px',
                    '2xl': '1240px',
                },
            },
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
