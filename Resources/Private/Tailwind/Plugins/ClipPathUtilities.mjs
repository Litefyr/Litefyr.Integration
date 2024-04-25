import plugin from "tailwindcss/plugin";

export default plugin(
    function ({ addUtilities, addComponents, addVariant, matchUtilities }) {
        matchUtilities(
            {
                "clippath-inset": (value) => ({
                    "clip-path": `inset(${value})`,
                }),
            },
            {
                values: {
                    0: "0 0 0 0",
                },
            },
        );
        addUtilities({
            ".clippath-display": {
                display: "var(--clippath-display, none)",
            },
        });
        addVariant("has-wave", [".has-wave &"]);
        addVariant("is-flat", [".is-flat &"]);
        addVariant("clippath-next", ["& + .clippath-top", "& + .clippath-bottom"]);
        addVariant("clippath-next-inside", "& + .clippath-inside");
        addComponents({
            ".clippath-top": {
                display: "var(--clippath-display-top, none)",
                "margin-top": "calc(var(--clippath-margin, 2px) - 2px)",
                "margin-bottom": "-1px",
                "clip-path": "var(--clippath-path-top, none)",
                "aspect-ratio": "var(--clippath-ratio, 1 / 0)",
                position: "relative",
                "z-index": "-2",
            },
            ".clippath-bottom": {
                display: "var(--clippath-display-bottom, none)",
                "margin-top": "-1px",
                "clip-path": "var(--clippath-path-bottom, none)",
                "aspect-ratio": "var(--clippath-ratio, 1 / 0)",
                position: "relative",
                "z-index": "-1",
            },
        });
    },
    {
        theme: {
            extend: {
                spacing: {
                    clippath: "var(--clippath-height, inherit)",
                    "clippath-half": "var(--clippath-height-half, inherit)",
                },
            },
        },
    },
);
