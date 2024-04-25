import plugin from "tailwindcss/plugin";

export default plugin(({ addVariant }) => {
    // Add light mode
    addVariant("light", ":is(.light &)");
});
