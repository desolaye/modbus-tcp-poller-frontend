import { useState } from "react";

type UseMutateProps<T, K> = {
  fn: (data: K) => Promise<T>;
  onSuccess?: () => void;
};

export const useMutate = <T, K>(props: UseMutateProps<T, K>) => {
  const { fn, onSuccess } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const mutateAsync = async (data: K) => {
    setIsLoading(true);

    fn(data)
      .then(() => onSuccess?.())
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  return { mutateAsync, isLoading, isError };
};
