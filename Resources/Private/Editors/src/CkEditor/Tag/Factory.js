import AttributeCommand from "@ckeditor/ckeditor5-basic-styles/src/attributecommand";

export default function TagFactory(tagName) {
    return function Plugin(editor) {
        return {
            init: () => {
                editor.model.schema.extend("$text", { allowAttributes: tagName });
                editor.conversion.attributeToElement({
                    model: tagName,
                    view: tagName,
                });
                editor.commands.add(tagName, new AttributeCommand(editor, tagName));
            },
        };
    };
}
