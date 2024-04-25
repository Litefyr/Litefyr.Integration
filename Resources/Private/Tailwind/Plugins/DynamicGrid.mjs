import plugin from "tailwindcss/plugin";

export default plugin(function ({ addUtilities }) {
    addUtilities({
        ".grid-cols-dynamic": { "grid-template-columns": "repeat(var(--grid-cols), minmax(0, 1fr))" },
        ".grid-rows-dynamic": { "grid-template-rows": "repeat(var(--grid-rows), minmax(0, 1fr))" },
        ".grid-cols-dynamic-small": { "grid-template-columns": "repeat(var(--grid-cols-small), minmax(0, 1fr))" },
        ".grid-rows-dynamic-small": { "grid-template-rows": "repeat(var(--grid-rows-small), minmax(0, 1fr))" },
        ".grid-cols-dynamic-big": { "grid-template-columns": "repeat(var(--grid-cols-big), minmax(0, 1fr))" },
        ".grid-rows-dynamic-big": { "grid-template-rows": "repeat(var(--grid-rows-big), minmax(0, 1fr))" },
    });
});
