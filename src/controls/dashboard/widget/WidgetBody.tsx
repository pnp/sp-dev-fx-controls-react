import { Box, Card, Flex, Menu, SiteVariablesPrepared, tabListBehavior } from "@fluentui/react-northstar";
import * as React from "react";
import { IWidget } from "./IWidget";


const EmptyState = ({ borderColor }: { borderColor: string }) => {
    return (
        <Box
            styles={{
                height: "100%",
                border: `1px dashed ${borderColor}`,
            }}
        />
    );
};

export const WidgetBody = ({
    widget,
    siteVariables,
}: {
    widget: IWidget;
    siteVariables: SiteVariablesPrepared;
}) => {
    const [activeTabId, setActiveTabId] = React.useState(0);
    return (
        <Card.Body
            style={{
                marginBottom: "0.75rem",
                height: "100%",
                overflow: "hidden",
            }}
            fitted
        >
            {widget.body ? (
                <>
                    {widget.body.length > 1 && (
                        <Menu
                            style={{
                                border: "none",
                                background: "none",
                                marginBottom: "1.25rem",
                            }}
                            items={Array.from(widget.body, ({ id, title }) =>
                                Object.assign({ key: id, content: title })
                            )}
                            activeIndex={activeTabId}
                            onItemClick={({ currentTarget }, props) =>
                                setActiveTabId(props && props.index ? props.index : 0)
                            }
                            accessibility={tabListBehavior}
                            underlined
                            primary
                        />
                    )}
                    {widget.body.map(({ id, content }, i) => (
                        <Flex
                            key={id}
                            styles={{
                                height: "100%",
                                display: activeTabId === i ? "flex" : "none",
                            }}
                            column
                        >
                            {content}
                        </Flex>
                    ))}
                </>
            ) : (
                    <EmptyState borderColor={siteVariables.colors.grey["300"]} />
                )}
        </Card.Body>
    );
};
