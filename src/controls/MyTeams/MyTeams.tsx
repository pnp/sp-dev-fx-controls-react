import { Text } from "@fluentui/react/lib/Text";
import { Stack } from "@fluentui/react/lib/Stack";
import { FontIcon } from "@fluentui/react/lib/Icon";
import { MessageBarType } from "@fluentui/react/lib/MessageBar";
import { Spinner, SpinnerSize } from "@fluentui/react/lib/Spinner";
import { Customizer } from "@fluentui/react/lib/Utilities";
import * as React from "react";
import { IMyTeamsProps } from "./IMyTeamsProps";
import { getMyTeamsStyles } from "./MyTeamsStyles";
import { Providers, SharePointProvider } from "@microsoft/mgt-spfx";
import { Team } from "../MyTeams/components/Team";
import { ITeam } from ".././MyTeams/components/Team";
import { useTeams } from "./../../hooks";
import { IShowMessageProps, ShowMessage } from "../MyTeams/components/ShowMessage";
import strings from "ControlStrings";
import {IMyTeamsState} from './IMyTeamsState';
import { myTeamsReducer } from './MyTeamsReducer';
import {EMyTeamsTypes } from './EMyTeamsTypes';

const initialState:IMyTeamsState = {
  myTeams: [],
  message: undefined,
  hasError: false,
  isLoading: true,
};

export const MyTeams: React.FunctionComponent<IMyTeamsProps> = (
  props: React.PropsWithChildren<IMyTeamsProps>
) => {
  const {
    stackStyles,
    stackTokens,
    styleClasses,
    titleStyles,
  } = getMyTeamsStyles(props.themeVariant);

  const { title, webPartContext, onSelectedChannel, themeVariant, enablePersonCardInteraction } = props;
  const [state, dispatch] = React.useReducer(myTeamsReducer, initialState);

  Providers.globalProvider = React.useMemo(() => {
    if (!Providers.globalProvider) {
      return new SharePointProvider(webPartContext);
    }
    return;
  }, [props.webPartContext]);

  const { getMyTeams } = useTeams(webPartContext.serviceScope);

  React.useEffect(() => {
    (async () => {
      try {
        dispatch({
          type: EMyTeamsTypes.SET_HAS_ERROR,
          payload: false
        });
        dispatch({
          type:  EMyTeamsTypes.SET_IS_LOADING,
          payload: true
        });
        const _teams: ITeam[] = await getMyTeams();
        dispatch({
          type: EMyTeamsTypes.SET_IS_LOADING,
          payload: false
        });
        dispatch({
          type: EMyTeamsTypes.SET_MESSAGE,
          payload: undefined
        });
        dispatch({
          type: EMyTeamsTypes.SET_MYTEAMS,
          payload: _teams
        });
      } catch {
        const messageError: IShowMessageProps = {
          isShow: true,
          message: strings.MyTeamsMessageError,
          messageBarType: MessageBarType.error,
        };
        dispatch({
          type: EMyTeamsTypes.SET_IS_LOADING,
          payload: false
        });
        dispatch({
          type: EMyTeamsTypes.SET_MESSAGE,
          payload: messageError
        });
        dispatch({
          type: EMyTeamsTypes.SET_HAS_ERROR,
          payload: true
        });
      }
    })().then(() => { /* no-op; */ }).catch(() => { /* no-op; */ });
  }, []);


  const {hasError, isLoading, message, myTeams } = state;

  return (
    <>
      <Customizer settings={{ theme:  themeVariant }}>
        <Stack styles={stackStyles} tokens={stackTokens}>
          <Text variant={"xLargePlus"} styles={titleStyles}>
            {title}
          </Text>
          {hasError ? (
            <ShowMessage {...message} />
          ) : (
            <div className={styleClasses.teamsContainer}>
              {!myTeams?.length && !isLoading ? (
                <Stack
                  horizontal
                  horizontalAlign="center"
                  verticalAlign="center"
                  tokens={{ childrenGap: 20 }}
                  styles={{ root: { margin: 20 } }}
                >
                  <FontIcon
                    iconName="TeamsLogo"
                    style={{ fontSize: 28, width: 28, height: 28 }}
                  />
                  <Text variant="mediumPlus">
                    {strings.MyTeamsNoTeamsMessage}
                  </Text>
                </Stack>
              ) : isLoading ? (
                <Spinner
                  size={SpinnerSize.medium}
                  label={strings.MyTeamsLoadingMessage}
                  labelPosition={"bottom"}
                />
              ) : (
                myTeams.map((team: ITeam) => {
                  return (
                    <Team
                      key={team.id}
                      team={team}
                      serviceScope={webPartContext.serviceScope}
                      themeVariant={themeVariant}
                      onSelectedChannel={onSelectedChannel}
                      enablePersonCardInteraction={enablePersonCardInteraction}
                    />
                  );
                })
              )}
            </div>
          )}
        </Stack>
      </Customizer>
    </>
  );
};
