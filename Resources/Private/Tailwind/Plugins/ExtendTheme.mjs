export default {
    colors: {
        theme: {
            color: getColorCustomProperties(),
            accent: getColorCustomProperties("accent"),
            back: getColorCustomProperties("back"),
            front: getColorCustomProperties("front"),
        },
    },
    fontSize: {
        logo: "var(--logo-size, 2rem)",
        logosmall: "calc(var(--logo-size, 2rem) * .8)",
    },
    height: {
        logo: "1.25em",
    },
    maxHeight: {
        logo: "1.25em",
    },
    fontWeight: {
        normal: getFontWeight("normal", 400),
        bold: getFontWeight("bold", 700),
        main: getFontWeight("main"),
        "main-bold": getFontWeight("main-bold"),
        headline: getFontWeight("headline"),
        "headline-bold": getFontWeight("headline-bold"),
        quote: getFontWeight("quote"),
        "quote-bold": getFontWeight("quote-bold"),
    },
    fontFamily: {
        inherit: "inherit",
        main: getFontFamilyCustomProperties("main"),
        headline: getFontFamilyCustomProperties("headline"),
        quote: getFontFamilyCustomProperties("quote"),
        button: getFontFamilyCustomProperties("button"),
    },
    borderRadius: {
        box: getBorderRadius("box"),
        image: getBorderRadius("image"),
        button: getBorderRadius("button"),
        scroller: getBorderRadius("scroller"),
        // 30px is the maximal border radius for inputs
        input: getBorderRadius("button", "4px", "30px"),
    },
    maxWidth: {
        content: "var(--content-max-width)",
        "content-wide": "var(--content-max-width-wide)",
    },
};

function getFallback(fallback = false) {
    return fallback === false ? "" : `, ${fallback}`;
}

function getFontWeight(name, fallback = false) {
    return `var(--font-weight-${name}${getFallback(fallback)})`;
}

function getBorderRadius(name, fallback = false, max = false) {
    const value = `var(--rounded-${name}${getFallback(fallback)})`;
    if (max === false) {
        return value;
    }
    return `min(${value}, ${max})`;
}

function getColorCustomProperties(name) {
    name = name ? `-${name}` : "";
    return `oklch(var(--color${name}-l) var(--color${name}-c) var(--color${name}-h) / <alpha-value>)`;
}

function getFontFamilyCustomProperties(name) {
    return [
        `var(--font-${name})`,
        {
            fontFeatureSettings: `var(--font-${name}--feature)`,
            fontVariationSettings: `var(--font-${name}--variation)`,
        },
    ];
}
