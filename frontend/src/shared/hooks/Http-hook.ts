import { useCallback, useRef, useState, useEffect } from 'react';
import { IResponseData } from '../../types/interfaces';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const activeHttpRequests = useRef<AbortController[]>([]);

  const sendRequest = useCallback(
    async (
      url: string,
      body: null | FormData | string = null,
      headers: HeadersInit | undefined = {},
      method: string = 'GET'
    ) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();

      try {
        const response: Response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });

        activeHttpRequests.current.push(httpAbortCtrl);

        const responseData: IResponseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          setIsLoading(false);
          throw new Error(
            responseData.message || 'Something went wrong, please try again.'
          );
        }
        setIsLoading(false);
        return responseData;
      } catch (err: unknown) {
        let errorMessage: string = 'Something went wrong, please try again.';
        if (err instanceof Error) {
          errorMessage = err.message;
          setError(errorMessage);
          setIsLoading(false);

          throw err;
        }
      }
    },
    []
  );

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  const clearError = () => {
    setError(null);
  };

  return {
    isLoading,
    error,
    sendRequest,
    clearError,
  };
};
