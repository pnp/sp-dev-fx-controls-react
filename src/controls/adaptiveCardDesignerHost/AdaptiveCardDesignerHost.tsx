import { IStyleFunctionOrObject } from "@fluentui/react/lib/Utilities";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { IPanelStyleProps, IPanelStyles, Panel, PanelType } from "@fluentui/react/lib/Panel";
import { getTheme } from "@fluentui/react/lib/Styling";
import { ThemeProvider } from "@fluentui/react/lib/Theme";
import * as React from 'react';
import { useState } from 'react';
import { AdaptiveCardDesigner } from "./AdaptiveCardDesigner";
import { IAdaptiveCardDesignerHostProps } from "./IAdaptiveCardDesignerProps";

const panelStyles:IStyleFunctionOrObject<IPanelStyleProps, IPanelStyles> = {
    scrollableContent: { display: "flex", height: "100%" },
    content: {
        display: "flex",
        flex: "1 1 auto",
        flexDirection: "column",
        overflow: "hidden",
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0
    },
    commands: { marginBottom: 15 }
};

export const AdaptiveCardDesignerHost = (props: IAdaptiveCardDesignerHostProps): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <DefaultButton text={props.buttonText} onClick={() => setIsOpen(true)} />
            <ThemeProvider theme={getTheme()}>
                <Panel
                    styles={panelStyles}
                    headerText={props.headerText}
                    isBlocking={true}
                    isOpen={isOpen}
                    type={PanelType.smallFluid}
                    hasCloseButton={true}
                    onDismiss={(ev) => {
                        const srcElement = (ev as React.SyntheticEvent).nativeEvent.target as Element | null;
                        if (srcElement && srcElement.className.indexOf('ms-Overlay') !== -1) {
                            ev.preventDefault();
                        } else {
                            setIsOpen(false);
                        }
                    }}>
                    <hr />
                    <AdaptiveCardDesigner {...props} />
                </Panel>
            </ThemeProvider>
        </>
    );
};
