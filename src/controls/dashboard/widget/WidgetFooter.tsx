import { Card, Text, Flex } from "@fluentui/react-northstar";
import * as React from "react";
import { IWidget } from "./IWidget";

export const WidgetFooter = ({ widget }: { widget: IWidget }) => (
    <Card.Footer fitted>
        <Flex space="between" vAlign="center">
            <Text
                as="a"
                href={widget.link.href}
                target="_blank"
                content="View more"
                size="small"
                color="brand"
                style={{ textDecoration: "none" }}
            />
        </Flex>
    </Card.Footer>
);
