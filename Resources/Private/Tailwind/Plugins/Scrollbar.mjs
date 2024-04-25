import plugin from "tailwindcss/plugin";

// Add scrollbar variants and utilities

export default plugin(({ addVariant, addUtilities }) => {
    addVariant("scrollbar", "&::-webkit-scrollbar");
    addVariant("scrollbar-track", "&::-webkit-scrollbar-track");
    addVariant("scrollbar-thumb", "&::-webkit-scrollbar-thumb");

    addUtilities({
        // Add utility to hide the scrollbar
        ".hide-scrollbar": {
            "-ms-overflow-style": "none", // for Internet Explorer, Edge
            "scrollbar-width": "none", // for Firefox
            "&::-webkit-scrollbar": {
                display: "none", // for Chrome, Safari, and Opera
            },
        },
    });
});
