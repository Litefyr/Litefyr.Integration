import plugin from "tailwindcss/plugin";

export default plugin.withOptions(
    function (options = {}) {
        const { gap, content, wide, contentSlider, wideSlider } = options;

        if (!gap) {
            throw new Error("gap is required");
        }

        if (!content) {
            throw new Error("content is required");
        }

        if (!wide) {
            throw new Error("wide is required");
        }

        if (!contentSlider) {
            throw new Error("contentSlider is required");
        }

        if (!wideSlider) {
            throw new Error("wideSlider is required");
        }

        return function ({ addBase }) {
            addBase({
                ":root": {
                    "--content-gap": gap,
                    "--content-padding": "2rem",
                    "--content-padding-wide": "4rem",
                    "--content-padding-left": "max(env(safe-area-inset-left,0), var(--content-padding))",
                    "--content-padding-right": "max(env(safe-area-inset-right,0), var(--content-padding))",
                    "--content-padding-wide-left": "max(env(safe-area-inset-left,0), var(--content-padding-wide))",
                    "--content-padding-wide-right": "max(env(safe-area-inset-right,0), var(--content-padding-wide))",
                    "--content-max-width": content,
                    "--content-max-width-wide": wide,
                },
            });
        };
    },
    function (options = {}) {
        if (options.gap) {
            delete options.gap;
        }

        return {
            theme: {
                extend: {
                    screens: options,
                },
            },
        };
    },
);
