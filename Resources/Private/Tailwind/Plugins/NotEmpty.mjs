import plugin from "tailwindcss/plugin";

// Add not empty variant

export default plugin(({ addVariant }) => {
    addVariant("not-empty", "&:not(:empty)");
    addVariant("group-not-empty", [":merge(.group):not(:empty) &"]);
    addVariant("peer-not-empty", [":merge(.peer):not(:empty) ~ &"]);
});
