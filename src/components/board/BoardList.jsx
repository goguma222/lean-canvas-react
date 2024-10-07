import BoardItems from './BoardItems';

export default function BoardList({ filteredData, searchText }) {
  if (!filteredData || filteredData.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-600">
          {searchText ? '검색 결과가 없습니다' : '목록이 없습니다.'}
        </p>
      </div>
    );
  }
  return (
    <>
      {/* <div className='grid gap-6 grid-cols-1'></div> */}
      <div className="w-full">
        <ul>
          {filteredData.map(item => (
            <BoardItems
              key={item.id}
              id={item.id}
              title={item.title}
              name={item.name}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
