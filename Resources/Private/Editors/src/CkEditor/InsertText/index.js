import { IconButtonComponent, addPlugin } from "../Helper";
import InsertTextFactory from "./Factory";

export default (ckEditorRegistry, settings) => {
    const richtextToolbar = ckEditorRegistry.get("richtextToolbar");
    const config = ckEditorRegistry.get("config");

    Object.keys(settings).forEach((key) => {
        const itemSettings = settings[key];
        const plugin = InsertTextFactory(key, itemSettings.text);
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
                isVisible: (options) => !!(options && options[key]),
                isActive: (options) => !!(options && options[key]),
            },
            itemSettings.position || "end",
        );
    });
};
