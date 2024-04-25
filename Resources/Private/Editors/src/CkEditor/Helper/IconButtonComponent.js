import React from "react";
import { neos } from "@neos-project/neos-ui-decorators";
import { IconButton } from "@neos-project/react-ui-components";

const neosifier = neos((globalRegistry) => ({
    i18nRegistry: globalRegistry.get("i18n"),
}));

function IconButtonComponent(props) {
    const { i18nRegistry, tooltip, isActive, ...finalProps } = props;
    return <IconButton {...finalProps} isActive={Boolean(isActive)} title={i18nRegistry.translate(tooltip)} />;
}

export default neosifier(IconButtonComponent);
