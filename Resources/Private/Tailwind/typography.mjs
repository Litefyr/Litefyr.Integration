const round = (num) =>
    num
        .toFixed(7)
        .replace(/(\.[0-9]+?)0+$/, "$1")
        .replace(/\.0$/, "");
const rem = (px) => `${round(px / 16)}rem`;
const em = (px, base) => `${round(px / base)}em`;

const size = {
    fontSize: rem(18),
    lineHeight: round(32 / 18),
    p: {
        marginTop: em(24, 18),
        marginBottom: em(24, 18),
    },
    '[class~="lead"]': {
        fontSize: em(22, 18),
        lineHeight: round(32 / 22),
        marginTop: em(24, 22),
        marginBottom: em(24, 22),
    },
    blockquote: {
        marginTop: em(40, 24),
        marginBottom: em(40, 24),
        paddingInlineStart: em(24, 24),
    },
    h1: {
        fontSize: em(48, 18),
        marginTop: "0",
        marginBottom: em(40, 48),
        lineHeight: round(48 / 48),
    },
    h2: {
        fontSize: em(30, 18),
        marginTop: em(56, 30),
        marginBottom: em(32, 30),
        lineHeight: round(40 / 30),
    },
    h3: {
        fontSize: em(24, 18),
        marginTop: em(40, 24),
        marginBottom: em(16, 24),
        lineHeight: round(36 / 24),
    },
    h4: {
        marginTop: em(32, 18),
        marginBottom: em(8, 18),
        lineHeight: round(28 / 18),
    },
    img: {
        marginTop: em(32, 18),
        marginBottom: em(32, 18),
    },
    picture: {
        marginTop: em(32, 18),
        marginBottom: em(32, 18),
    },
    "picture > img": {
        marginTop: "0",
        marginBottom: "0",
    },
    video: {
        marginTop: em(32, 18),
        marginBottom: em(32, 18),
    },
    kbd: {
        fontSize: em(16, 18),
        borderRadius: rem(5),
        paddingTop: em(4, 18),
        paddingInlineEnd: em(8, 18),
        paddingBottom: em(4, 18),
        paddingInlineStart: em(8, 18),
    },
    code: {
        fontSize: em(16, 18),
    },
    "h2 code": {
        fontSize: em(26, 30),
    },
    "h3 code": {
        fontSize: em(21, 24),
    },
    pre: {
        fontSize: em(16, 18),
        lineHeight: round(28 / 16),
        marginTop: em(32, 16),
        marginBottom: em(32, 16),
        borderRadius: rem(6),
        paddingTop: em(16, 16),
        paddingInlineEnd: em(24, 16),
        paddingBottom: em(16, 16),
        paddingInlineStart: em(24, 16),
    },
    ol: {
        marginTop: em(24, 18),
        marginBottom: em(24, 18),
        paddingInlineStart: em(28, 18),
    },
    ul: {
        marginTop: em(24, 18),
        marginBottom: em(24, 18),
        paddingInlineStart: em(28, 18),
    },
    li: {
        marginTop: em(12, 18),
        marginBottom: em(12, 18),
    },
    "ol > li": {
        paddingInlineStart: em(8, 18),
    },
    "ul > li": {
        paddingInlineStart: em(8, 18),
    },
    "> ul > li p": {
        marginTop: em(16, 18),
        marginBottom: em(16, 18),
    },
    "> ul > li > *:first-child": {
        marginTop: em(24, 18),
    },
    "> ul > li > *:last-child": {
        marginBottom: em(24, 18),
    },
    "> ol > li > *:first-child": {
        marginTop: em(24, 18),
    },
    "> ol > li > *:last-child": {
        marginBottom: em(24, 18),
    },
    "ul ul, ul ol, ol ul, ol ol": {
        marginTop: em(16, 18),
        marginBottom: em(16, 18),
    },
    dl: {
        marginTop: em(24, 18),
        marginBottom: em(24, 18),
    },
    dt: {
        marginTop: em(24, 18),
    },
    dd: {
        marginTop: em(12, 18),
        paddingInlineStart: em(28, 18),
    },
    hr: {
        marginTop: em(56, 18),
        marginBottom: em(56, 18),
    },
    "hr + *": {
        marginTop: "0",
    },
    "h2 + *": {
        marginTop: "0",
    },
    "h3 + *": {
        marginTop: "0",
    },
    "h4 + *": {
        marginTop: "0",
    },
    table: {
        fontSize: em(16, 18),
        lineHeight: round(24 / 16),
    },
    "thead th": {
        paddingInlineEnd: em(12, 16),
        paddingBottom: em(12, 16),
        paddingInlineStart: em(12, 16),
    },
    "thead th:first-child": {
        paddingInlineStart: "0",
    },
    "thead th:last-child": {
        paddingInlineEnd: "0",
    },
    "tbody td, tfoot td": {
        paddingTop: em(12, 16),
        paddingInlineEnd: em(12, 16),
        paddingBottom: em(12, 16),
        paddingInlineStart: em(12, 16),
    },
    "tbody td:first-child, tfoot td:first-child": {
        paddingInlineStart: "0",
    },
    "tbody td:last-child, tfoot td:last-child": {
        paddingInlineEnd: "0",
    },
    figure: {
        marginTop: em(32, 18),
        marginBottom: em(32, 18),
    },
    "figure > *": {
        marginTop: "0",
        marginBottom: "0",
    },
    figcaption: {
        fontSize: em(16, 18),
        lineHeight: round(24 / 16),
        marginTop: em(16, 16),
    },
};

export default {
    DEFAULT: {
        css: {
            ...size,
            maxWidth: null,
            "--tw-prose-links": "inherit",
            "--tw-prose-bullets": "oklch(var(--color-accent-l) var(--color-accent-c) var(--color-accent-h))",
            "--tw-prose-quote-borders":
                "oklch(var(--color-accent-l) var(--color-accent-c) var(--color-accent-h) / 0.9)",
            "--tw-prose-body": "oklch(var(--color-front-l) var(--color-front-c) var(--color-front-h))",
            "--tw-prose-headings": "oklch(var(--color-front-l) var(--color-front-c) var(--color-front-h) / 0.9)",
            "--tw-prose-lead": "oklch(var(--color-front-l) var(--color-front-c) var(--color-front-h) / 0.9)",
            "--tw-prose-bold": "oklch(var(--color-front-l) var(--color-front-c) var(--color-front-h))",
            "--tw-prose-counters": "oklch(var(--color-front-l) var(--color-front-c) var(--color-front-h) / 0.9)",
            "--tw-prose-hr": "oklch(var(--color-back-l) var(--color-back-c) var(--color-back-h))",
            "--tw-prose-quotes": "oklch(var(--color-front-l) var(--color-front-c) var(--color-front-h) / 0.9)",
            "--tw-prose-captions": "oklch(var(--color-front-l) var(--color-front-c) var(--color-front-h))",
            "--tw-prose-code": "oklch(var(--color-front-l) var(--color-front-c) var(--color-front-h))",
            "--tw-prose-pre-code": "oklch(var(--color-front-l) var(--color-front-c) var(--color-front-h))",
            "--tw-prose-pre-bg": "oklch(var(--color-front-l) var(--color-front-c) var(--color-front-h))",
            "--tw-prose-th-borders": "oklch(var(--color-front-l) var(--color-front-c) var(--color-front-h))",
            "--tw-prose-td-borders": "oklch(var(--color-front-l) var(--color-front-c) var(--color-front-h))",
            h1: {
                ...size.h1,
                fontWeight: "var(--font-weight-headline)",
                fontFamily: "var(--font-headline)",
                fontFeatureSettings: "var(--font-headline--feature)",
                fontVariationSettings: "var(--font-headline--variation)",
            },
            h2: {
                ...size.h2,
                fontWeight: "var(--font-weight-headline)",
                fontFamily: "var(--font-headline)",
                fontFeatureSettings: "var(--font-headline--feature)",
                fontVariationSettings: "var(--font-headline--variation)",
            },
            h3: {
                ...size.h3,
                fontWeight: "var(--font-weight-headline)",
                fontFamily: "var(--font-headline)",
                fontFeatureSettings: "var(--font-headline--feature)",
                fontVariationSettings: "var(--font-headline--variation)",
            },
            h4: {
                ...size.h4,
                fontWeight: "var(--font-weight-headline)",
                fontFamily: "var(--font-headline)",
                fontFeatureSettings: "var(--font-headline--feature)",
                fontVariationSettings: "var(--font-headline--variation)",
            },
            h5: {
                fontWeight: "var(--font-weight-headline)",
                fontFamily: "var(--font-headline)",
                fontFeatureSettings: "var(--font-headline--feature)",
                fontVariationSettings: "var(--font-headline--variation)",
            },
            blockquote: {
                ...size.blockquote,
                paddingTop: "1rem",
                paddingBottom: "1rem",
                fontWeight: "var(--font-weight-quote)",
                fontFamily: "var(--font-quote)",
                fontStyle: null,
                fontFeatureSettings: "var(--font-quote--feature)",
                fontVariationSettings: "var(--font-quote--variation)",
                "&>:first-child": {
                    marginTop: "0",
                },
                "&>:last-child": {
                    marginBottom: "0",
                },
            },
            strong: {
                fontWeight: "var(--font-weight-bold)",
            },
            a: {
                textDecoration: "underline",
                fontWeight: null,
                "&:hover": {
                    textDecoration: "none",
                },
                "&:focus": {
                    textDecoration: "none",
                },
            },
        },
    },
};
