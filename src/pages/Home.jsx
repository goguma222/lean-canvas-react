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

function Home() {
  const [searchText, setSearchText] = useState();
  const [isGridView, setIsGridView] = useState(true);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchData(params) {
    // 이렇게 해도 된다.
    // const data = await fetch('http://localhost:8000/canvases')
    //   .then(res => res.json())
    //   .catch(console.error);

    // 아래가 더 편함 (getCanvases.js에 비동기 할 코드들을 넣어서 재사용하면 된다.)
    try {
      setIsLoading(true);
      setError(null);
      await new Promise(resolver => setTimeout(resolver, 1000));
      const response = await getCanvases(params); // Network 통신을 하는 중이다.
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  const debouncedFetchData = useCallback(
    debounce(params => fetchData(params), 300),
    [],
  );

  useEffect(() => {
    if (searchText) {
      debouncedFetchData({ title_like: searchText });
    } else {
      setData([]); // 검색어가 없으면 데이터 초기화
    }

    return () => {
      debouncedFetchData.cancel();
    };
  }, [searchText, debouncedFetchData]);

  // 등록하기 버튼 누를 때 클릭 막는 함수 (중복 클릭 막는 함수)
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const handleCreateCanvas = async () => {
    try {
      setIsLoadingCreate(true);
      await createCanvas();
      debouncedFetchData({ title_like: searchText });
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoadingCreate(false);
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
          <Button onClick={handleCreateCanvas} loading={isLoadingCreate}>
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
    </>
  );
}

export default Home;
