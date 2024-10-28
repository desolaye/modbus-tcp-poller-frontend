import { useEffect, useState } from "react";

type UseFetchProps<T> = {
  fn: () => Promise<T>;
};

export const useFetch = <T>(props: UseFetchProps<T>) => {
  const { fn } = props;

  const [data, setData] = useState<T>();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isRefetch, setIsRefetch] = useState(true);

  const refetch = () => setIsRefetch(true);

  useEffect(() => {
    if (isRefetch) {
      fn()
        .then(setData)
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }
  }, [isRefetch]);

  return { data, isLoading, isError, refetch };
};
