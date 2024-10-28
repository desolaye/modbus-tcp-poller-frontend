import { useEffect, useState } from "react";

type UseFetchProps<T> = {
  fn: () => Promise<T>;
};

export const useFetch = <T>(props: UseFetchProps<T>) => {
  const { fn } = props;

  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fn()
      .then(setData)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading, isError };
};
