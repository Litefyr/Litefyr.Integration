function InsertTextFactory(commandName, text) {
    if (!text) {
        text = `{${commandName.toUpperCase()}}`;
    }
    return function Plugin(editor) {
        editor.commands.add(commandName, InsertTextCommand(editor, text));
    };
}

function InsertTextCommand(editor, text) {
    return {
        execute: () => {
            editor.model.change((writer) => {
                const insertPosition = editor.model.document.selection.getFirstPosition();
                writer.insertText(text, insertPosition);
            });
        },
    };
}

export default InsertTextFactory;
