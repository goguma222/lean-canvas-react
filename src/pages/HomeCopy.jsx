import { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import axios from 'axios';
import CanvasList from '../components/CanvasList';
import SearchBar from '../components/SearchBar';
import ViewToggle from '../components/ViewToggle';
import { createCanvas, deleteCanvas, getCanvases } from '../api/canvas';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { useQuery, useMutation } from '@tanstack/react-query';

function Home() {
  const [searchText, setSearchText] = useState();
  const [isGridView, setIsGridView] = useState(true);
  // const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가
  const [isLoadingCreate, setIsLoadingCreate] = useState(false); // 등록하기 버튼 누를 때 클릭 막는 함수 (중복 클릭 막는 함수)

  // 1] 데이터 조회
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['canvases', searchText],
    queryFn: () => getCanvases({ title_like: searchText }),
    initialData: [],
  });

  // 2] 등록

  // 조회하는 로직
  // async function fetchData(params) {
  //   try {
  //     setIsLoading(true);
  //     setError(null);
  //     await new Promise(resolver => setTimeout(resolver, 1000));
  //     const response = await getCanvases(params); // Network 통신을 하는 중이다.
  //     setData(response.data);
  //     console.log('data : ', response.data);
  //   } catch (err) {
  //     setError(err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  // const debouncedFetchData = useCallback(
  //   debounce(params => fetchData(params), 300),
  //   [],
  // );

  // 초기 렌더링 시 데이터 fetch
  // useEffect(() => {
  //   fetchData({}); // 초기 데이터 가져오기
  // }, []);

  // useEffect(() => {
  //   if (searchText) {
  //     debouncedFetchData({ title_like: searchText });
  //   } else {
  //     setData([]); // 검색어가 없으면 데이터 초기화
  //   }

  //   return () => {
  //     debouncedFetchData.cancel();
  //   };
  // }, [searchText, debouncedFetchData]);

  // 모달 핸들러
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCreateCanvas = async title => {
    try {
      setIsLoadingCreate(true); // 로딩
      await createCanvas(title); // 캔버스 생성
      debouncedFetchData({ title_like: searchText }); // 데이터를 새로고침
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoadingCreate(false);
      setIsModalOpen(false); // 모달 닫기
    }
  };

  // 삭제기능
  const handleDeleteItem = async id => {
    if (confirm('삭제 하시겠습니까?') === false) {
      return;
    }

    // delete logic 실행
    try {
      await deleteCanvas(id);
      debouncedFetchData({ title_like: searchText });
    } catch (err) {
      alert(err.message);
    }
  };

  // 검색기능
  // const filteredData = data.filter(item =>
  //   item.title.toLowerCase().includes(searchText.toLowerCase()),
  // );
  return (
    <>
      <div>
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
          <SearchBar searchText={searchText} setSearchText={setSearchText} />
          <ViewToggle isGridView={isGridView} setIsGridView={setIsGridView} />
        </div>
        <div className="flex justify-end mb-6">
          {/* <Button onClick={handleCreateCanvas} loading={isLoadingCreate}>
            등록하기
          </Button> */}
          <Button onClick={handleOpenModal} loading={isLoadingCreate}>
            등록하기
          </Button>
        </div>
        {isLoading && <Loading />}
        {error && (
          <Error
            message={error.message}
            onRetry={() => fetchData({ title_like: searchText })}
          />
        )}
        {/* 로딩이 없고, 에러가 없다면 실행 */}
        {!isLoading && !error && (
          // 목록이 없습니다.
          <CanvasList
            filteredData={data}
            isGridView={isGridView}
            searchText={searchText}
            onDeleteItem={handleDeleteItem}
          />
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateCanvas} // 모달에 제출 핸들러 전달
      />
    </>
  );
}

export default Home;
