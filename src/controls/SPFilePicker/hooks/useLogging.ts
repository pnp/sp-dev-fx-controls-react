import { useMemo } from 'react';
import { Log } from '@microsoft/sp-core-library';

const DEFAULT_SOURCE = 'SPFilePicker';

/**
 * Return value of {@link useLogging}.
 */
export interface IUseLoggingReturn {
  /** Logs an informational message. */
  info: (message: string) => void;

  /** Logs a warning message. */
  warn: (message: string) => void;

  /** Logs an error (string message or `Error`). */
  error: (message: string | Error) => void;

  /** Logs a verbose/debug message. */
  verbose: (message: string) => void;
}

/**
 * Thin logging hook built on the SPFx {@link Log} API. It provides a stable,
 * memoized logger scoped to a source name, with no external dependencies.
 *
 * @param source - Log source shown in the SPFx diagnostics. Defaults to `SPFilePicker`.
 *
 * @example
 * ```ts
 * const { info, error } = useLogging();
 * info('picker launched');
 * error(new Error('token failed'));
 * ```
 */
export function useLogging(source: string = DEFAULT_SOURCE): IUseLoggingReturn {
  return useMemo<IUseLoggingReturn>(
    () => ({
      info: (message: string) => Log.info(source, message),
      warn: (message: string) => Log.warn(source, message),
      error: (message: string | Error) =>
        Log.error(source, message instanceof Error ? message : new Error(message)),
      verbose: (message: string) => Log.verbose(source, message),
    }),
    [source],
  );
}
