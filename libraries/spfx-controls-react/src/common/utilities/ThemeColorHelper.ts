import type { IThemeState } from "spfx-uifabric-themes";

export class ThemeColorHelper {
  /**
   * Extracts the color from a theme string
   * @param value The theme string (e.g.: "[theme:neutralDark, default: #212121]")
   */
  public static GetThemeColor(value: string): string {
    try {
      if (value.indexOf('theme:') > 0) {
        // This value has a theme substitution
        const themeParts: string[] = value.replace('[', '').replace(']', '').replace('"', '').split(',');
        let defaultValue: string = undefined;
        let themeValue: string = undefined;

        // Break the theme string into it's components
        themeParts.forEach(themePart => {
          if (themePart.indexOf('theme:') >= 0) {
            themeValue = themePart.replace('theme:', '');
          } else if (themePart.indexOf('default:') >= 0) {
            defaultValue = themePart.replace('default:', '').replace('"', '').trim();
          }
        });

        // If there is a theme value, try to read from environment
        if (themeValue !== undefined) {
          try {
            // This should definitely be easier to do in SPFx!

            // tslint:disable-next-line
            const themeStateVariable: IThemeState = window.__themeState__;
            if (themeStateVariable === undefined) {
              return defaultValue;
            }
            const themeState: {} = themeStateVariable.theme;

            if (themeState === undefined) {
              return defaultValue;
            }

            for (const varName in themeState) {
              if (!Object.prototype.hasOwnProperty.call(themeState, varName)) {
                continue;
              }

              // Cheesy cleanup of variables to remove extra quotes
              if (varName === themeValue) {
                return themeState[varName].replace('"', '').trim();
              }
            }
          } catch {
            // do nothing
          }

          return defaultValue;
        }
      }
    } catch {
      // do nothing
    }

    return value;
  }
}
