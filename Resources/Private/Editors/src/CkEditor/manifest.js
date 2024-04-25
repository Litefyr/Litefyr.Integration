import manifest from "@neos-project/neos-ui-extensibility";
import Tag from "./Tag";
import InsertText from "./InsertText";

const tagsConfig = {
    code: {
        tooltip: "Code",
        icon: "code",
    },
};

const insertTextConfig = {
    logo: {
        tooltip: "Litespeed.Theme:Backend.Main:insertLogo",
        icon: "flag",
        text: "⚑",
        position: "start",
    },
};

manifest("Litespeed.Theme:CkEditor", {}, (globalRegistry, { frontendConfiguration }) => {
    const ckEditorRegistry = globalRegistry.get("ckEditor5");

    Tag(ckEditorRegistry, tagsConfig);
    InsertText(ckEditorRegistry, insertTextConfig);
});
