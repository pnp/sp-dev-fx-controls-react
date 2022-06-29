import { ThemeProviderProps } from '@fluentui/react-theme-provider';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IEnhancedThemeProviderProps extends ThemeProviderProps {
  /**
  * Set the context from the SPFx component.
  */
  context: WebPartContext;
}
