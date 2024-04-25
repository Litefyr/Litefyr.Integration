import plugin from "tailwindcss/plugin";

export default plugin(({ addVariant }) => {
    // Add hover and focus combi
    addVariant("hocus", ["&:hover", "&:focus"]);
    addVariant("group-hocus", [":merge(.group):hover &", ":merge(.group):focus &"]);
    addVariant("peer-hocus", [":merge(.peer):hover ~ &", ":merge(.peer):focus ~ &"]);

    // Add combi hover and focus-within
    addVariant("hocus-within", ["&:hover", "&:focus-within"]);
    addVariant("group-hocus-within", [":merge(.group):hover &", ":merge(.group):focus-within &"]);
    addVariant("peer-hocus-within", [":merge(.peer):hover ~ &", ":merge(.peer):focus-within ~ &"]);

    // Add combi hover and focus-visible
    addVariant("hocus-visible", ["&:hover", "&:focus-visible"]);
    addVariant("group-hocus-visible", [":merge(.group):hover &", ":merge(.group):focus-visible &"]);
    addVariant("peer-hocus-visible", [":merge(.peer):hover ~ &", ":merge(.peer):focus-visible ~ &"]);
});
