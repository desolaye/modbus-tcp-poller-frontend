import { useEffect, useState } from "react";

type UseFetchProps<T> = {
  fn: () => Promise<T>;
  enabled?: boolean;
};

export const useFetch = <T>(props: UseFetchProps<T>) => {
  const { fn, enabled = true } = props;

  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(enabled);
  const [isError, setIsError] = useState(false);

  const fetchFn = () => {
    fn()
      .then(setData)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  const refetch = () => {
    setData(undefined);
    setIsLoading(true);
    fetchFn();
  };

  useEffect(() => {
    if (enabled) fetchFn();
  }, [enabled]);

  return { data, isLoading, isError, refetch };
};
