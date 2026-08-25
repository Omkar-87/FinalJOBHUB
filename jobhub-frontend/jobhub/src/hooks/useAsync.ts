import { useCallback, useEffect, useState } from 'react';

interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useAsync<T>(fn: () => Promise<T>, deps: unknown[] = []): AsyncState<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [tick, setTick] = useState(0);

  const load = useCallback(() => {
    setIsLoading(true);
    setError(null);
    fn()
      .then((res) => setData(res))
      .catch((err) => setError(err instanceof Error ? err : new Error('Something went wrong')))
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick]);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load]);

  return { data, isLoading, error, refetch: () => setTick((t) => t + 1) };
}
