/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
//import './style.css';

import * as React from 'react';

import { useAtom } from 'jotai';

import {
  mergeClasses,
  Persona,
  PresenceBadgeStatus,
} from '@fluentui/react-components';
import { Presence } from '@microsoft/microsoft-graph-types';
import { LivePersona } from '@pnp/spfx-controls-react/lib/LivePersona';

import { globalState } from '../../atoms/globalState';
import { useGraphUserAPI } from '../../hooks/useGraphUserAPI';
import { IUserInfo } from '../../models/IUserInfo';
import { useUserCardStyles } from './useUserCardStyles';

/* import { MgtTemplateProps, Person } from "@microsoft/mgt-react";
import { Caption1, Caption1Strong } from "@fluentui/react-components"; */
export interface IuserCardProps {
  userId?: string;
  showOverCard?: boolean;
  onSelected?: (user: IUserInfo) => void;
  className?: string;
}

export const UserCard: React.FunctionComponent<IuserCardProps> = (props: React.PropsWithChildren<IuserCardProps>) => {
  const [appGlobalState] = useAtom(globalState);
  const { context } = appGlobalState;

  const { userId, showOverCard, onSelected, className } = props;
  const { getUserById, getUserPresence } = useGraphUserAPI(context);
  const [user, setUser] = React.useState<IUserInfo>();
   const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const styles = useUserCardStyles();

  const availability: PresenceBadgeStatus = React.useMemo(() => {
    const { presence } = user || {};
    switch (presence?.availability?.toLowerCase()) {
      case "available":
        return "available";
      case "away":
        return "away";
      case "busy":
        return "busy";
      case "offline":
        return "offline";
      default:
        return "offline";
    }
  }, [user?.presence?.availability]);

  const checkUserPresence = React.useCallback(async () => {
    if (!userId) return;
    let userPresence: Presence = { availability: "offline", activity: "offline" };
    let user = await getUserById(userId);
    if (user)
      try {
        getUserPresence(user?.id || "").then((presence) => {
          userPresence = presence as Presence;
          user = { ...user, presence: userPresence } as IUserInfo;
          setUser(user);
        });
      } catch (error) {
        console.log(error);
      }finally{
        setIsLoading(false);
      }
    user = { ...user, presence: userPresence } as IUserInfo;
    setUser(user);
  }, [userId, context]);

  React.useEffect(() => {
    (async () => {
      await checkUserPresence();
      setInterval(async () => {
        await checkUserPresence();
      }, 60000);
    })();
  }, []);

   if (isLoading) return <></>;

  return (
    <>
      <div
        className={mergeClasses( styles.container, className) }
        key={userId}
        onClick={() => {
          if (onSelected) onSelected(user as IUserInfo);
        }}
      >
        <LivePersona
          upn={showOverCard ? (userId as string) : ""}
          template={
            <>
              <div className={styles.root}>
                <Persona
                  name={user?.displayName ?? "No Name"}
                  secondaryText={user?.jobTitle ?? "No Job Title"}
                  presence={{ status: availability }}
                  avatar={{
                    image: {
                      src: user?.userPhoto,
                    },
                  }}
                />
              </div>
            </>
          }
          serviceScope={context.serviceScope as any}
        />
      </div>
    </>
  );
};
