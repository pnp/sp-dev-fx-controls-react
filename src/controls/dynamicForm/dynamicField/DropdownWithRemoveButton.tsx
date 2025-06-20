import { Dropdown, IconButton, IDropdownProps, IIconProps } from "@fluentui/react";
import React from "react";
import { useState } from "react";



export const DropdownWithRemoveButton = (props: IDropdownProps): JSX.Element => {
    const [isEditing, setIsEditing] = useState(false);

    const titleRendererWithRemoveButton: IDropdownProps["onRenderTitle"] = (options) => {
        const iconStyles = {
            root: { "font-size": '12px' }
        };
        const removeIcon: IIconProps = { iconName: 'Clear', styles: iconStyles };
        return (
            <div>
                <span><span>{options[0].text}</span>
                    {
                        isEditing && <IconButton onClick={(e) => {
                            props.onChange(null, null);
                            e.stopPropagation();
                        }} iconProps={removeIcon} title="Remove" ariaLabel="Remove" />
                    }
                </span>
            </div>
        );
    };

    return (
        <Dropdown
            {...props}
            onRenderTitle={titleRendererWithRemoveButton}
            onMouseLeave={(e) => { setIsEditing(false); if (props.onMouseLeave) { props.onMouseLeave(e) }}}
            onFocus={(e) => { setIsEditing(true); if (props.onFocus) { props.onFocus(e) } }}
        />

    )

}