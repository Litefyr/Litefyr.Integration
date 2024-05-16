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
        tooltip: "Litefyr.Integration:Backend.Main:insertLogo",
        icon: "flag",
        text: "⚑",
        position: "start",
    },
};

manifest("Litefyr.Integration:CkEditor", {}, (globalRegistry) => {
    const ckEditorRegistry = globalRegistry.get("ckEditor5");

    Tag(ckEditorRegistry, tagsConfig);
    InsertText(ckEditorRegistry, insertTextConfig);
});
