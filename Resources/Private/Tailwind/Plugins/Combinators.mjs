import plugin from "tailwindcss/plugin";

export default plugin(({ addVariant, matchVariant }) => {
    // ad is-[selector] variant
    matchVariant(
        "is",
        (value) => {
            return `:where(${value})&`;
        },
        {
            values: {
                interaction: "a,button",
                a: "a",
                button: "button",
                img: "img",
                figure: "figure",
                video: "video",
                audio: "audio",
                svg: "svg",
                picture: "picture",
            },
        },
    );

    // Add tags (heading, paragraph, etc.) content variant
    addVariant("theme", [":where([data-theme]) &", "&:where([data-theme])"]);
    addVariant("headings", "& :where(h1,h2,h3,h4,h5,h6)");
    addVariant("h1", "& :where(h1)");
    addVariant("h2", "& :where(h2)");
    addVariant("h3", "& :where(h3)");
    addVariant("h4", "& :where(h4)");
    addVariant("h5", "& :where(h5)");
    addVariant("h6", "& :where(h6)");
    addVariant("p", "& :where(p)");
    addVariant("ul", "& :where(ul)");
    addVariant("ol", "& :where(ol)");
    addVariant("li", "& :where(li)");
    addVariant("a", "& :where(a)");
    addVariant("a-hocus", "& :where(a:hover,a:focus)");
    addVariant("svg", "& :where(svg)");

    // Add media content variant
    addVariant("mediacontent", [
        "& :where(iframe,video,.jonnitto-prettyembed--vimeo,.jonnitto-prettyembed--youtube,.jonnitto-prettyembed--video)",
        "&:where(iframe,video,.jonnitto-prettyembed--vimeo,.jonnitto-prettyembed--youtube,.jonnitto-prettyembed--video)",
    ]);

    // Add image content variant
    addVariant("imagecontent", ["& :where(img)", "&:where(img)"]);

    // Add picture content variant
    addVariant("picturecontent", ["& :where(picture)", "&:where(picture)"]);

    // Add inputs content variant
    addVariant("inputs", ["& :where(input,select,textarea)", "&:where(input,select,textarea)"]);

    // Add inside variant
    addVariant("inside", "&*");

    // Add next variant
    addVariant("+", "& + *");

    // Add preceded variant
    addVariant("~", "& ~ *");

    // Add second variant
    addVariant("second", "&:nth-child(2)");

    // Add second third
    addVariant("third", "&:nth-child(3)");
});
