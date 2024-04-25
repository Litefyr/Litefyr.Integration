import plugin from "tailwindcss/plugin";

function headerCollapse(value) {
    if (!value || value == "0px") {
        return {
            "margin-top": "calc(var(--header-height) * -1)",
            "padding-top": "var(--header-height)",
        };
    }
    return {
        "margin-top": "calc(var(--header-height) * -1)",
        "padding-top": `calc(var(--header-height) + ${value})`,
    };
}

export default plugin(
    function ({ addUtilities, matchUtilities, theme }) {
        matchUtilities(
            {
                "header-collapse": (value) => headerCollapse(value),
            },
            {
                values: theme("spacing"),
            },
        );

        addUtilities({
            ".header-collapse": headerCollapse(),
            ".no-content-padding": {
                "--content-padding": "0",
            },
            ".no-content-gap": {
                "--content-gap": "0",
            },
        });
    },
    {
        theme: {
            extend: {
                spacing: {
                    content: "var(--content-padding, 0)",
                    "content-gap": "var(--content-gap)",
                    header: "var(--header-height)",
                },
            },
        },
    },
);
