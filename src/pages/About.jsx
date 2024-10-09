import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

/**
 * 1. queryClient를 생성한다.
 * 2. isLoading, error, data 등등 여러 값을 받을 수 있지만 이 세가지를 객체에 담아서 useQuery훅으로 받는다.
 * 3. useQuery훅을 사용할 때 queryKey, queryFn은 필수이다.
 * 4. queryKey에 canvas라는 키 배열에 형태로 제공된다.
 * 5. axios 목적: 데이터를 가져오는 비동기 함수입니다.
 * 6. axios 형식: 함수로 작성되며, 데이터 fetch를 수행합니다.
 * 7. axios 비동기 요청: axios.get을 통해 지정된 URL에서 데이터를 가져옵니다. then(res => res.data)는 응답에서 실제 데이터 부분만을 추출합니다. 이는 응답 객체에서 데이터 부분만 필요할 때 유용합니다.
 *8. initialData 목적: 쿼리가 처음 실행될 때 사용할 초기 데이터입니다. 이는 데이터가 로딩 중일 때 UI를 표시하기 위해 사용될 수 있습니다.
 * 9. initialData 형식: 배열로 설정되어 있으며, 빈 배열로 초기화했습니다. 이는 서버에서 가져올 데이터가 없을 경우 UI에서 빈 상태를 표시할 수 있도록 합니다.
 * 10. initialData 캐싱: 초기 데이터는 캐싱을 설정할 때 유의해야 합니다. 예를 들어, 쿼리가 다시 실행될 때 이 초기 데이터가 덮어씌워질 수 있습니다.
 *
 */
export default function About() {
  // 해당 페이지로 접근 시 차단 방법
  const navigate = useNavigate();

  useEffect(() => {
    const cutOff = false;

    if (!cutOff) {
      alert('이 페이지에 접근할 수 없습니다.');
      navigate('/');
    }
  }, [navigate]);

  const queryClient = useQueryClient();

  /**
   * 전체적인 작동 방식
   * 1. 쿼리 실행: 컴포넌트가 렌더링될 때 useQuery 훅이 호출되면 queryKey와 queryFn을 사용하여 API에서 데이터를 요청합니다.
   * 2. 로딩 상태: 데이터 요청이 진행되는 동안 isLoading은 true로 설정되며, 이를 통해 UI에서 로딩 스피너 등을 표시할 수 있습니다.
   * 3. 에러 처리: 요청이 실패하면 error 객체에 에러 정보가 설정됩니다. 이를 통해 사용자에게 에러 메시지를 표시할 수 있습니다.
   * 4. 데이터: 요청이 성공적으로 완료되면 data 변수에 API에서 가져온 데이터가 저장됩니다. 이 데이터는 UI에 렌더링되는 데 사용됩니다.
   */
  const { isLoading, error, data } = useQuery({
    queryKey: ['canvases'],
    queryFn: () =>
      axios
        .get('https://json-server-vercel-mu-umber.vercel.app/canvases/')
        .then(res => res.data),
    // 초기 데이터 설정 (이러한 속성은 캐싱을 설정할 때 유의해야함)
    initialData: [],
  });

  const { mutate: createNewCanvas, isLoading: isLoadingCreate } = useMutation({
    mutationFn: newCanvas =>
      axios.post(
        'https://json-server-vercel-mu-umber.vercel.app/canvases/',
        newCanvas,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(['canvases']);
    },
  });

  const handleCreate = () => {
    createNewCanvas({ title: 'new canvas' });
  };

  return (
    <div>
      <h2 className="text-3xl">useQuery</h2>
      {isLoading && <p>...Loading</p>}
      {error && <p className="text-red-700">{error.message}</p>}
      {data && data.map(item => <li key={item.id}>{item.title}</li>)}

      <h2 className="text-3xl">useMutation</h2>
      {isLoadingCreate && <p>...Loading</p>}
      <Button onClick={handleCreate}>등록</Button>
    </div>
  );
}
