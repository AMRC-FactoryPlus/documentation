/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class", '[data-theme="dark"]'],
    content: ["./src/**/*.{js,jsx,ts,tsx,mdx,md}", "./docs/**/*.mdx", "./articles/**/*.mdx"],
    theme: {
        extend: {
            colors: {
                'brand-black': '#444950',
                'brand': '#131E29',
                'brand-90': '#2B353E',
                'brand-80': '#424B54',
                'brand-70': '#5A6269',
                'brand-60': '#71787F',
                'brand-50': '#898F94',
                'brand-40': '#A1A5A9',
                'brand-30': '#B8BBBF',
                'brand-20': '#D0D2D4',
                'brand-10': '#E7E9EA',
                'brand-5': '#F3F4F4',
                'brand-3': '#F8F8F9'
            },
        },
    },
    corePlugins: {preflight: false},
};