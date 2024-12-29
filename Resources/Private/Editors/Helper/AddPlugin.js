const addPlugin = (Plugin, key) => (ckEditorConfiguration, options) => {
    if (!options.editorOptions) {
        return ckEditorConfiguration;
    }

    if ((options.editorOptions.formatting && options.editorOptions.formatting[key]) || options.editorOptions[key]) {
        ckEditorConfiguration.plugins = ckEditorConfiguration.plugins || [];
        ckEditorConfiguration.plugins.push(Plugin);
    }

    return ckEditorConfiguration;
};

export default addPlugin;
