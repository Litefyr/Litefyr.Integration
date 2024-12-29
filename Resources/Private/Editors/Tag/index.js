import { addPlugin, IconButtonComponent } from "../Helper";
import TagFactory from "./Factory";

export default (ckEditorRegistry, settings = {}) => {
    const richtextToolbar = ckEditorRegistry.get("richtextToolbar");
    const config = ckEditorRegistry.get("config");
    let position = "link";

    Object.keys(settings).forEach((key) => {
        const plugin = TagFactory(key);
        const itemSettings = settings[key];
        config.set(key, addPlugin(plugin, key));

        richtextToolbar.set(
            key,
            {
                commandName: key,
                component: IconButtonComponent,
                callbackPropName: "onClick",
                icon: itemSettings.icon,
                hoverStyle: "brand",
                tooltip: itemSettings.tooltip || key,
                isVisible: (options) => !!(options && options.formatting && options.formatting[key]),
                isActive: (options) => !!(options && options[key]),
            },
            `after ${position}`,
        );

        position = key;
    });

    return config;
};
