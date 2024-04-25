export default [
    {
        key: "divide",
        themeKey: "divideColor",
        property: ["border-color"],
        selector: "& > :not([hidden]) ~ :not([hidden])",
    },
    {
        key: "bg",
        themeKey: "backgroundColor",
        property: ["background-color"],
    },
    {
        key: "border",
        themeKey: "borderColor",
        property: ["border-color"],
    },
    {
        key: "border-x",
        themeKey: "borderColor",
        property: ["border-left-color", "border-right-color"],
    },
    {
        key: "border-y",
        themeKey: "borderColor",
        property: ["border-top-color", "border-bottom-color"],
    },
    {
        key: "border-s",
        themeKey: "borderColor",
        property: ["border-inline-start-color"],
    },
    {
        key: "border-e",
        themeKey: "borderColor",
        property: ["border-inline-end-color"],
    },
    {
        key: "border-t",
        themeKey: "borderColor",
        property: ["border-top-color"],
    },
    {
        key: "border-r",
        themeKey: "borderColor",
        property: ["border-right-color"],
    },
    {
        key: "border-b",
        themeKey: "borderColor",
        property: ["border-bottom-color"],
    },
    {
        key: "border-l",
        themeKey: "borderColor",
        property: ["border-left-color"],
    },
    {
        key: "text",
        themeKey: "textColor",
        property: ["color"],
    },
    {
        key: "placeholder",
        themeKey: "placeholderColor",
        property: ["color"],
        selector: "&::placeholder",
    },
    {
        key: "outline",
        themeKey: "outlineColor",
        property: ["outline-color"],
    },
    {
        key: "ring",
        themeKey: "ringColor",
        property: ["--tw-ring-color"],
    },
    {
        key: "ring-offset",
        themeKey: "ringOffsetColor",
        property: ["--tw-ring-offset-color"],
    },
    {
        key: "fill",
        themeKey: "fill",
        property: ["fill"],
    },
    {
        key: "stroke",
        themeKey: "stroke",
        property: ["stroke"],
    },
    {
        key: "accent",
        themeKey: "accentColor",
        property: ["accent-color"],
    },
    {
        key: "shadow",
        themeKey: "boxShadowColor",
        property: ["--tw-shadow-color"],
        additionalProperty: {
            "--tw-shadow": "var(--tw-shadow-colored)",
        },
    },
    {
        key: "caret",
        themeKey: "caretColor",
        property: ["caret-color"],
    },
    {
        key: "decoration",
        themeKey: "textDecorationColor",
        property: ["text-decoration-color"],
    },
    {
        key: "from",
        themeKey: "gradientColorStops",
        property: ["--tw-gradient-from"],
        propertyValue: ({ value }) => `${value} var(--tw-gradient-from-position)`,
        additionalProperty: ({ transparentValue }) => ({
            "@defaults gradient-color-stops": {},
            "--tw-gradient-to": `${transparentValue} var(--tw-gradient-from-position)`,
            "--tw-gradient-stops": "var(--tw-gradient-from), var(--tw-gradient-to)",
        }),
    },
    {
        key: "via",
        themeKey: "gradientColorStops",
        property: ["--tw-gradient-to"],
        propertyValue: ({ transparentValue }) => `${transparentValue} var(--tw-gradient-to-position)`,
        additionalProperty: ({ value }) => ({
            "--tw-gradient-stops": `var(--tw-gradient-from), ${value} var(--tw-gradient-via-position), var(--tw-gradient-to)`,
        }),
    },
    {
        key: "to",
        themeKey: "gradientColorStops",
        property: ["--tw-gradient-to"],
        propertyValue: ({ value }) => `${value} var(--tw-gradient-to-position)`,
        additionalProperty: {
            "@defaults gradient-color-stops": {},
        },
    },
];
