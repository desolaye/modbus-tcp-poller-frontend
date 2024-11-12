import { useEffect, useState } from "react";

type UseFetchProps<T> = {
  fn: () => Promise<T>;
  enabled?: boolean;
  keys?: (string | boolean | number)[];
};

export const useFetch = <T>(props: UseFetchProps<T>) => {
  const { fn, enabled = true, keys = [] } = props;

  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(enabled);
  const [isError, setIsError] = useState(false);

  const fetchFn = () => {
    setData(undefined);
    setIsLoading(true);

    fn()
      .then(setData)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  const refetch = () => fetchFn();

  useEffect(() => {
    if (enabled) fetchFn();
  }, [enabled, ...keys]);

  return { data, isLoading, isError, refetch };
};
