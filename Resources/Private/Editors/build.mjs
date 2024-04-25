import esbuild from "esbuild";
import extensibilityMap from "@neos-project/neos-ui-extensibility/extensibilityMap.json" assert { type: "json" };

/** @type {import("esbuild").BuildOptions} */
const options = {
    logLevel: "info",
    bundle: true,
    minify: true,
    sourcemap: true,
    target: "es2020",
    format: "iife",
    legalComments: "none",
    entryPoints: { Plugin: "src/index.js" },
    loader: {
        ".js": "tsx",
    },
    outdir: "../../Public/Editors",
    alias: extensibilityMap,
};

if (process.argv.includes("--watch")) {
    esbuild.context(options).then((ctx) => ctx.watch());
} else {
    esbuild.build(options);
}
