import * as React from 'react';
import { ThemeProvider, IReadonlyTheme, ThemeChangedEventArgs } from '@microsoft/sp-component-base';
import { ISPEventObserver } from '@microsoft/sp-core-library';

const setCSSVariables = (domElement: HTMLElement, theming: any, themeKeys: IThemeKey[]): void => {
  if (!domElement || !themeKeys || !themeKeys.length) {
    return;
  }

  if (theming) {
    themeKeys.forEach(key => {
      const themeValue = theming[key.key];

      domElement.style.setProperty(`--${key.key}`, themeValue || key.default);
    });
  }
  else {
    themeKeys.forEach(key => {
      domElement.style.removeProperty(`--${key}`);
    });
  }
};

export interface IThemeKey {
  key: string;
  default: string;
}

export interface IThemableComponentProps {
  themeProvider?: ThemeProvider;
  observer?: ISPEventObserver;
}

export const withTheme = <P extends object>(Component: React.ComponentType<P>, themeKeys: IThemeKey[]): React.FC<P & IThemableComponentProps> => (props) => {
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
      setCSSVariables(containerRef.current, { ...themeVariant.palette, ...themeVariant.semanticColors }, themeKeys);
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
