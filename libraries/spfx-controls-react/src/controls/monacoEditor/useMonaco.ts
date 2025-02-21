import { useState, useEffect } from "react";
import loader, { Monaco } from "@monaco-editor/loader";

const CDN_PATH_TO_MONACO_EDITOR = "https://cdn.jsdelivr.net/npm/monaco-editor@0.32.1/min/vs";
export enum EStatus {
  LOADING,
  LOADED,
  ERROR,
}

export const useMonaco = (): {
  monaco: Monaco;
  status: EStatus;
  error: Error;
} => {
  const [monaco, setMonaco] = useState<Monaco>(undefined);
  const [status, setStatus] = useState<EStatus>(EStatus.LOADING);
  const [error, setError] = useState<Error>(undefined);

  useEffect(() => {
    (async () => {
      try {
        loader.config({ paths: { vs: CDN_PATH_TO_MONACO_EDITOR } });
        const monacoObj = await loader.init();
        setStatus(EStatus.LOADED);
        setMonaco(monacoObj);
      } catch (error) {
        setStatus(EStatus.ERROR);
        setMonaco(undefined);
        setError(error);
      }
    })().then(() => { /* no-op; */ }).catch(() => { /* no-op; */ });
  }, []);

  return {
    monaco,
    status,
    error,
  };
};
