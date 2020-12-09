import { 
    Card, 
    Flex, 
    ThemePrepared,
    Text } from "@fluentui/react-northstar";
import * as React from "react";
import { DashboardCallout } from "../DashboardCallout";
import { IWidget } from "./IWidget";

export const WidgetTitle = ({
    widget,
    globalTheme,
    allowHidingWidget,
    onWidgetHiding
}: {
    widget: IWidget;
    globalTheme: ThemePrepared<any>,
    allowHidingWidget: boolean,
    onWidgetHiding?: (widget: IWidget) => void
}) => {
    const [calloutOpen, setCalloutOpen] = React.useState(false);
    return (
        <Card.Header>
            <Flex gap="gap.small" space="between" style={{ minHeight: "2rem" }}>
                <Flex gap="gap.small" column>
                    <Text content={widget.title} style={{ margin: 0 }} weight="bold" />
                    {widget.desc && <Text content={widget.desc} size="small" />}
                </Flex>
                <DashboardCallout
                    open={calloutOpen}
                    globalTheme={globalTheme}
                    onOpenChange={({ currentTarget }, props) => {
                        if (props && props.open) {
                            setCalloutOpen(props.open);
                        }
                        else{
                            setCalloutOpen(false);
                        }
                    }}
                    menuProps={{
                        offset: [0, 0],
                        position: "below",
                    }}
                    actionHandlers={{
                        hideHideButton: !allowHidingWidget,
                        onHide:()=>{
                            onWidgetHiding(widget);
                        }
                    }}
                    widgetActionGroup={widget.widgetActionGroup}
                />
            </Flex>
        </Card.Header>
    );
};