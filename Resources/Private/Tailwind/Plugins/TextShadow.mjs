import plugin from "tailwindcss/plugin";

export default plugin(({ matchUtilities, theme }) => {
    matchUtilities(
        {
            "text-shadow-opacity": (value) => {
                return {
                    "--tw-text-shadow-opacity": value,
                };
            },
        },
        { values: theme("opacity") },
    );
    matchUtilities(
        {
            "text-shadow": (value) => {
                if (value == "none" || value.match(/^\d/)) {
                    // value is none or starts with a number, so it is not just the color
                    return { "text-shadow": value };
                }

                return {
                    "--tw-text-shadow-opacity": "0.5",
                    "text-shadow": `0 0 15px ${value}`,
                };
            },
        },
        {
            values: {
                contrast:
                    "oklch(clamp(0, calc(var(--tw-infinite) * (var(--tw-lightness-threshold) - var(--tw-text-l) - var(--tw-text-l-offset))), 1) 0 0 / var(--tw-text-shadow-opacity))",
                text: "oklch(var(--tw-text-l) var(--tw-text-c) var(--tw-text-h) / var(--tw-text-shadow-opacity))",
                bg: "oklch(var(--tw-bg-l) var(--tw-bg-c) var(--tw-bg-h) / var(--tw-text-shadow-opacity))",
                front: "oklch(var(--color-front-l) var(--color-front-c) var(--color-front-h) / var(--tw-text-shadow-opacity))",
                back: "oklch(var(--color-back-l) var(--color-back-c) var(--color-back-h) / var(--tw-text-shadow-opacity))",
                white: "oklch(1 0 0 / var(--tw-text-shadow-opacity))",
                black: "oklch(0 0 0 / var(--tw-text-shadow-opacity))",
                none: "none",
            },
        },
    );
});
