/* eslint-disable require-atomic-updates */
/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from 'react';

import * as strings from 'ControlStrings';
import { useAtom } from 'jotai';

import {
  INav,
  INavLink,
  INavLinkGroup,
  Nav,
} from '@fluentui/react/lib/Nav';
import { Separator } from '@fluentui/react/lib/Separator';
import { Spinner } from '@fluentui/react/lib/Spinner';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { IRenderFunction } from '@fluentui/react/lib/Utilities';
import { TermStore } from '@microsoft/microsoft-graph-types';

import { globalState } from './atoms/globalState';
import { ErrorMessage } from './ErrorMessage/ErrorMessage';
import { useGraphTaxonomyAPI } from './hooks/useGraphTaxonomyAPI';
import { useSessionStorage } from './hooks/useSessionStorage';
import { INavigationProps } from './INavigationProps';
import { RenderLink } from './RenderLink';
import { RenderNoOptions } from './RenderNoOptions';
import { useNavigationStyles } from './useNavigationStyles';
import { useTaxonomyUtils } from './utils/useTaxonomyUtils';
import { useUtils } from './utils/useUtils';

export const Navigation: React.FunctionComponent<INavigationProps> = (
  props: React.PropsWithChildren<INavigationProps>
) => {
  const { context, termSetId } = props;
  const [appGlobalState, setAppGlobalState] = useAtom(globalState);
  const { isLoadingNavitionTree, refreshNavigationTree, showContextMenu, onSelected } = appGlobalState || {};
  const { navStyles } = useNavigationStyles();
  const { pageContext } = context || {};
  const { site } = pageContext || {};
  const { getTermSetChildren, getTermSet } = useGraphTaxonomyAPI(context);
  const isLoadedTermSetsRef = React.useRef<boolean>(false);
  const { createItems } = useTaxonomyUtils(context);
  const [navLinksGroup, setNavLinksGroup] = React.useState<INavLinkGroup[]>([]);
  const { selectedItem } = appGlobalState;
  const navRef = React.useRef<INav>(null);
  const { getCacheKey } = useUtils();

  const [getSessionStorageItem] = useSessionStorage();
  const [termSetInfo, setTermSetInfo] = React.useState<TermStore.Set>(null);
  const [error, setError] = React.useState<Error>(null);

  const loadNavLinks = React.useCallback(
    async (refresh: boolean) => {
      if (!site) return;

      setError(null);
      setAppGlobalState((state) => ({ ...state, isLoadingNavitionTree: true }));
      isLoadedTermSetsRef.current = true;
      const termSetChildren = await getTermSetChildren(site?.id.toString(), termSetId, refresh);
      const navItems = await createItems(site?.id.toString(), termSetId, termSetChildren, 0, refresh);
      const navGroup = { groupData: { termSet: termSetId }, links: navItems };
      setNavLinksGroup((state) => [...state, navGroup]);
      setAppGlobalState((state) => ({
        ...state,
        selectedItem: selectedItem ?? navItems[0],
        isLoadingNavitionTree: false,
        refreshNavigationTree: false,
      }));
    },
    [
      selectedItem,
      site,
      getSessionStorageItem,
      getCacheKey,
      getTermSetChildren,
      createItems,
      setAppGlobalState,
      termSetId,
    ]
  );

  React.useEffect(() => {
    (async () => {
      try {
        if (!isLoadedTermSetsRef.current) {
          const termSetInfo = await getTermSet(site?.id.toString(), termSetId);
          setTermSetInfo(termSetInfo);
          await loadNavLinks(false);
          isLoadedTermSetsRef.current = true;
        }
      } catch (error) {
        setError(error);
      } finally {
        setAppGlobalState((state) => ({ ...state, isLoadingNavitionTree: false }));
      }
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      if (refreshNavigationTree) {
        setNavLinksGroup([]);
        await loadNavLinks(refreshNavigationTree);
      }
    })();
  }, [refreshNavigationTree]);

  const onRenderLink: IRenderFunction<INavLink> = React.useCallback(
    (link: INavLink): JSX.Element => {
      return <RenderLink link={link} showContextMenu={showContextMenu} />;
    },
    [showContextMenu]
  );

  const onLinkClick = React.useCallback(
    (ev: React.MouseEvent<HTMLElement, MouseEvent>, item: INavLink) => {
      ev.preventDefault();
      setAppGlobalState((state) => ({ ...state, selectedItem: item }));
      if (onSelected) {
        onSelected(item.data);
      }
    },
    [selectedItem, setAppGlobalState]
  );

  const hasLinks = React.useMemo(() => {
    return navLinksGroup[0]?.links?.length > 0;
  }, [navLinksGroup]);

  const hasError = React.useMemo(() => {
    return error !== null || termSetInfo === null;
  }, [error, termSetInfo]);

  if (isLoadingNavitionTree) return <Spinner ariaLive="assertive" />;

  if (hasError)
    return (
      <ErrorMessage showError={hasError} errorMessage={error?.message ?? strings.TermSertNaviagtionErrorMessage} />
    );

  return (
    <>
      <Stack horizontalAlign="stretch" tokens={{ childrenGap: 0 }}>
        <Text variant="large">{termSetInfo?.localizedNames[0].name ?? ""}</Text>
        <Separator />
        {hasLinks ? (
          <Nav
            componentRef={navRef}
            ariaLabel="navigation"
            styles={navStyles}
            groups={navLinksGroup}
            onRenderLink={onRenderLink}
            selectedKey={selectedItem?.key}
            onLinkClick={onLinkClick}
          />
        ) : (
          <RenderNoOptions />
        )}
      </Stack>
    </>
  );
};
