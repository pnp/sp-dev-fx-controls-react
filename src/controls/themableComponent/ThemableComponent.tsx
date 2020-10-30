import * as React from 'react';
import { ThemeProvider, IReadonlyTheme, ThemeChangedEventArgs } from '@microsoft/sp-component-base';
import { ISPEventObserver } from '@microsoft/sp-core-library';

/**
 * Sets variables for the Themable component
 * @param domElement Themable component DOM element
 * @param theming current theme slots
 * @param themeKeys theme slots to set/remove variable
 */
const setCSSVariables = (domElement: HTMLElement, theming: any, themeSlots: IThemeSlot[]): void => {
  if (!domElement || !themeSlots || !themeSlots.length) {
    return;
  }

  if (theming) {
    themeSlots.forEach(slot => {
      const themeValue = theming[slot.key];

      domElement.style.setProperty(`--${slot.key}`, themeValue || slot.default);
    });
  }
  else {
    themeSlots.forEach(slot => {
      domElement.style.removeProperty(`--${slot.key}`);
    });
  }
};

/**
 * Theme slot
 */
export interface IThemeSlot {
  /**
   * slot key
   */
  key: string;
  /**
   * slot fallback
   */
  default: string;
}

/**
 * Base properties for the Themable component
 */
export interface IThemableComponentProps {
  /**
   * Theme provider
   */
  themeProvider?: ThemeProvider;
  /**
   * Observer to listen to events. Usually - Web Part object
   */
  observer?: ISPEventObserver;
}

/**
 * Decorator component with SPFx theme support.
 * @param Component Base component to add theme support to
 * @param themeSlots theme slots that the base component uses
 */
export const withTheme = <P extends object>(Component: React.ComponentType<P>, themeSlots: IThemeSlot[]): React.FC<P & IThemableComponentProps> => (props) => {
  const [themeProvider, setThemeProvider] = React.useState<ThemeProvider>();
  const [themeVariant, setThemeVariant] = React.useState<IReadonlyTheme>();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const onThemeChanged = React.useCallback((e: ThemeChangedEventArgs) => {
    setThemeVariant(e.theme);
  }, [setThemeVariant]);

  React.useEffect(() => {
    if (props.themeProvider && props.observer) {
      setThemeProvider(props.themeProvider);
      setThemeVariant(props.themeProvider.tryGetTheme());
      props.themeProvider.themeChangedEvent.add(props.observer, onThemeChanged);
    }

    return () => {
      if (props.themeProvider && props.observer) {
        props.themeProvider.themeChangedEvent.remove(props.observer, onThemeChanged);
      }
    };
  }, [props.themeProvider, props.observer, setThemeProvider, setThemeVariant, onThemeChanged]);

  React.useEffect(() => {
    if (themeVariant && containerRef.current) {
      setCSSVariables(containerRef.current, { ...themeVariant.palette, ...themeVariant.semanticColors }, themeSlots);
    }
  }, [themeVariant, containerRef]);

  if (themeProvider) {
    return <div ref={containerRef}>
      <Component {...props} />
    </div>;
  }
  else {
    return <Component {...props} />;
  }
};
