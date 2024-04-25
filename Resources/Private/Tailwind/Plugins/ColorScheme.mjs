import plugin from "tailwindcss/plugin";

export default plugin(function ({ addUtilities }) {
    addUtilities({
        ".color-scheme": { "color-scheme": "var(--color-scheme, normal)" },
        ".color-scheme-dark": { "color-scheme": "dark" },
        ".color-scheme-light": { "color-scheme": "light" },
        ".color-scheme-light-dark": { "color-scheme": "light dark" },
        ".color-scheme-dark-only": { "color-scheme": "dark only" },
        ".color-scheme-light-only": { "color-scheme": "light only" },
    });
});
