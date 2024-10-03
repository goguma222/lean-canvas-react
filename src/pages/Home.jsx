import { useEffect, useState } from 'react';
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
import CategoryFilter from '../components/CategoryFilter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function Home() {
  const [searchText, setSearchText] = useState();
  const [isGridView, setIsGridView] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [filter, setFilter] = useState({
    searchText: undefined,
    category: undefined,
  });

  const handleFilter = (key, value) =>
    setFilter({
      ...filter,
      [key]: value,
    });

  const queryClient = useQueryClient();

  // 1] 데이터 조회
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['canvases', filter.searchText, filter.category],
    queryFn: () =>
      getCanvases({ title_like: filter.searchText, category: filter.category }),
    initialData: [],
  });

  // 2] 등록할 때 useMutation 사용
  const mutation = useMutation({
    mutationFn: title => createCanvas(title),
    onSuccess: () => {
      queryClient.invalidateQueries(['canvases']); // 쿼리 무효화
      refetch();
      setIsModalOpen(false); // 모달 닫기
    },
    onError: error => {
      alert(error.message); // 에러 처리
    },
  });

  // 3] 삭제
  const { mutate: deleteCanvasMutation } = useMutation({
    mutationFn: deleteCanvas,
    onSuccess: () => {
      queryClient.invalidateQueries(['canvases']); // 쿼리 무효화
    },
    onError: error => {
      alert(error.message); // 에러 처리
    },
  });

  // 모달 핸들러
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCreateCanvas = title => {
    mutation.mutate(title);
  };

  // 삭제기능
  const handleDeleteItem = async id => {
    // if (confirm('삭제 하시겠습니까?') === false) {
    //   return;
    // }

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
        {error && (
          <Error
            message={error.message}
            onRetry={refetch} // refetch를 사용하여 재시도
          />
        )}
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
