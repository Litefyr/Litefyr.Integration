import plugin from "tailwindcss/plugin";

// Add not disabled variants

export default plugin(({ addVariant }) => {
    addVariant("not-disabled", "&:not(:disabled)");
    addVariant("group-not-disabled", [":merge(.group):not(:disabled) &"]);
    addVariant("peer-not-disabled", [":merge(.peer):not(:disabled) ~ &"]);
});
