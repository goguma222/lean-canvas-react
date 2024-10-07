import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBoards } from '../api/board';
import Search from '../components/board/Search';
import CategoryFilter from '../components/board/CategoryFilter';
import BoardList from '../components/board/BoardList';
import Loading from '../components/Loading';
import Error from '../components/Error';

function Board() {
  const [filter, setFilter] = useState({
    searchText: undefined,
    category: undefined,
    name: undefined,
  }); // 필터 초기화

  // filter(검색) 함수
  const handleFilter = (key, value) =>
    setFilter({
      ...filter,
      [key]: value,
    });

  // const queryClient = useQueryClient();
  // 데이터 조회
  /**
   * queryKey: 쿼리의 고유 키를 설정한다. 필터링 된 데이터를 관리하기 위해 ['board', filter.searchText, filter.category] 형태로 설정한다.
   * queryFn: 데이터를 가져오는 함수이다. getBoards를 호출하여 firebase에서 데이터를 가져온다.
   * staleTime: 데이터 신선도 파악 시간 설정, 5분이 설정되어있음
   * refetchOnWindowFocus: 다른 창에서 돌아 왔을 때 자동으로 데이터를 갱신을 하지 않도록 설정 (default: true)
   */
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['board', filter.searchText, filter.category, filter.name],
    queryFn: () => {
      return getBoards({
        title: filter.searchText,
        category: filter.category,
        name: filter.name,
      });
    },
    staleTime: 5000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div>
        <div className="mb-6 flex flex-col sm:flex-row items-end justify-between md:items-center">
          <div className="flex gap-2 flex-col w-full sm:flex-row mb-4 sm:mb-0">
            <Search
              searchText={filter.searchText}
              onSearch={val => handleFilter('searchText', val)}
            />
            <CategoryFilter
              category={filter.category}
              onChange={val => handleFilter('category', val)}
            />
          </div>
          {/* <ViewToggle isGridView={isGridView} setIsGridView={setIsGridView} /> */}
          {/* rounded-md hover:bg-blue-600 whitespace-nowrap */}
          <Link
            to={'/board/InquiryWriting'}
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 whitespace-nowrap"
          >
            글쓰기
          </Link>
        </div>
        <div>
          {isLoading && <Loading />}
          {error && <Error message={error.message} onRetry={refetch} />}
          {!isLoading && !error && (
            <BoardList filteredData={data} searchText={filter.searchText} />
          )}
        </div>
        {/* 페이지네이션 또는 무한스크롤 넣기 */}
      </div>
    </>
  );
}

export default Board;
