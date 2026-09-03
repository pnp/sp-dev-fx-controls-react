import { Card, Text, Flex } from "@fluentui/react-northstar";
import * as React from "react";
import { IWidget } from "./IWidget";
import * as strings from 'ControlStrings';

export const WidgetFooter = ({ widget }: { widget: IWidget }): JSX.Element => (
    <Card.Footer fitted>
        <Flex space="between" vAlign="center">
            <Text
                as="a"
                href={widget.link.href}
                target={widget.link.target ?? "_blank"}
                content={widget.link.title ?? strings.ViewMore}
                size="small"
                color={widget.link.color ?? "default"}
                style={{ textDecoration: "none" }}
            />
        </Flex>
    </Card.Footer>
);
