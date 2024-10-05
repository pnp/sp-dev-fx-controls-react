import { Guid } from "@microsoft/sp-core-library";
import { DocumentCard, DocumentCardDetails } from "@fluentui/react/lib/DocumentCard";
import { Persona } from "@fluentui/react/lib/Persona";
import { Stack } from "@fluentui/react/lib/Stack";
import * as React from "react";
import { IUserInfo } from "../../../models/IUsersResults";
import { useListItemCommentsStyles } from "../useListItemCommentsStyles";
import { PHOTO_URL } from "./../../../common/constants";

export interface IRenderUserProps {
  user: IUserInfo;
}
export const RenderUser: React.FunctionComponent<IRenderUserProps> = (
  props: React.PropsWithChildren<IRenderUserProps>
) => {
  const { user } = props;
  const { documentCardUserStyles, renderUserContainerStyles } = useListItemCommentsStyles();

  return (
    <>
      <DocumentCard styles={documentCardUserStyles}>
        <DocumentCardDetails>
          <Stack
            horizontal
            horizontalAlign="start"
            verticalAlign="center"
            styles={renderUserContainerStyles}
            key={Guid.newGuid().toString()}
          >
            <Persona
              text={user.displayName}
              secondaryText={user.mail}
              coinSize={40}
              imageUrl={`${PHOTO_URL}${user.mail}`}
            />
          </Stack>
        </DocumentCardDetails>
      </DocumentCard>
    </>
  );
};
