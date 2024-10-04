import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import CanvasList from '../components/CanvasList';
import SearchBar from '../components/SearchBar';
import ViewToggle from '../components/ViewToggle';
import { createCanvas, deleteCanvas, getCanvases } from '../api/canvas'; // API import
import Loading from '../components/Loading';
import Error from '../components/Error';
import Button from '../components/Button';
import Modal from '../components/Modal';
import toastr from 'toastr';
import CategoryFilter from '../components/CategoryFilter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function Home() {
  const [isGridView, setIsGridView] = useState(true); // 그리드, 뷰 초기화
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 오픈 초기화
  const [isLoadingCreate, setIsLoadingCreate] = useState(false); // 버튼 로딩 초기화
  const [filter, setFilter] = useState({
    searchText: undefined,
    category: undefined,
  }); // 검색 텍스트, 카테고리 저장 초기화

  // filter 함수
  const handleFilter = (key, value) =>
    setFilter({
      ...filter,
      [key]: value,
    });

  const queryClient = useQueryClient();

  // 1] 데이터 조회
  /**
   * queryKey: 쿼리의 고유 키를 설정한다. 필터링 된 데이터를 관리하기 위해 ['canvases', filter.searchText, filter.category] 형태로 설정한다.
   * queryFn: 데이터를 가져오는 함수이다. getCanvases를 호출하여 firebase에서 데이터를 가져온다.
   * staleTime: 데이터 신선도 파악 시간 설정, 5분이 설정되어있음
   * refetchOnWindowFocus: 다른 창에서 돌아 왔을 때 자동으로 데이터 갱신을 하지 않도록 설정 (default: true)
   */
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['canvases', filter.searchText, filter.category],
    queryFn: () => {
      // console.log('fetching data');
      return getCanvases({
        // 수정됨: 기존의 JSON 서버에서 Firestore로 변경
        title_like: filter.searchText,
        category: filter.category,
      });
    },
    staleTime: 5000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  // 2] 등록할 때 useMutation 사용
  /**
   * mutationFn: 캔버스를 생성하는 함수로 createCanvas를 사용한다.
   * onSuccess: 캔버스가 성공적으로 생성된 후 쿼리를 무효화하고 데이터를 다시 가져오며 모달을 닫는다.
   * onError: 오류 발생 시 경고창을 띄움
   */
  const mutation = useMutation({
    mutationFn: title => createCanvas(title), // 수정됨: 기존의 JSON 서버에서 Firestore로 변경
    onSuccess: () => {
      queryClient.invalidateQueries(['canvases']);
      refetch();
      setIsModalOpen(false);
    },
    onError: error => {
      toastr.error(error.message);
    },
  });

  // 3] 삭제
  /**
   * deleteCanvasMutation: 캔버스를 삭제하는 함수로 deleteCanvas를 사용한다.
   * 삭제가 성공적으로 이루어지면 쿼리를 무효화하여 최신 데이터를 반영한다.
   */
  const { mutate: deleteCanvasMutation } = useMutation({
    mutationFn: deleteCanvas, // 수정됨: 기존의 JSON 서버에서 Firestore로 변경
    onSuccess: () => {
      queryClient.invalidateQueries(['canvases']);
    },
    onError: error => {
      toastr.error(error.message);
    },
  });

  // 모달 핸들러
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  /**
   * 캔버스를 생성하는 버튼이 클릭되면 mutation.mutate(title)을 호출하여 생성 요청을 한다.
   */
  const handleCreateCanvas = title => {
    mutation.mutate(title);
  };

  // 삭제기능
  const handleDeleteItem = async id => {
    deleteCanvasMutation(id);
  };

  return (
    <>
      <div>
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex gap-2 flex-col w-full sm:flex-row mb-4 sm:mb-0">
            <SearchBar
              searchText={filter.searchText}
              onSearch={val => handleFilter('searchText', val)}
            />
            <CategoryFilter
              category={filter.category}
              onChange={val => handleFilter('category', val)}
            />
          </div>
          <ViewToggle isGridView={isGridView} setIsGridView={setIsGridView} />
        </div>
        <div className="flex justify-end mb-6">
          <Button onClick={handleOpenModal} loading={isLoadingCreate}>
            등록하기
          </Button>
        </div>
        {isLoading && <Loading />}
        {error && <Error message={error.message} onRetry={refetch} />}
        {!isLoading && !error && (
          <CanvasList
            filteredData={data}
            isGridView={isGridView}
            searchText={filter.searchText}
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
