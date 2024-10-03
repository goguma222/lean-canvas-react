import { useState, useCallback } from 'react';

// 외부에서 사용했던 비즈니스 로직을 공통적으로 사용할 수 있게 만들어 놓음
export default function useApiRequest(apiFunction) {
  const [isLoading, setIsLoading] = useState(false); // 초기화
  const [error, setError] = useState(null); // 초기화

  // options: {onSucces, onError} 로 받음 (구조분해 할당해서 가져와서 받음)
  const execute = useCallback(
    async (params, { onSuccess, onError } = {}) => {
      try {
        // 네트워크 통신 전에 isLoading, Error를 초기화를 해준다.
        setIsLoading(true);
        setError(null);

        await new Promise(resolver => setTimeout(resolver, 1000));
        const response = await apiFunction(params);
        if (onSuccess) {
          onSuccess(response);
        }
      } catch (err) {
        setError(err);
        if (onError) {
          onError(err);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [apiFunction],
  );

  return {
    isLoading,
    error,
    execute,
  };
}
