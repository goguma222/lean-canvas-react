import { FaArrowLeft } from 'react-icons/fa';
import { TbWriting } from 'react-icons/tb';
import { BiCategory } from 'react-icons/bi';
import { Link } from 'react-router-dom';

function BoardDetailViewItem({ board }) {
  return (
    <>
      <div className="relative bg-white rounded-lg shadow-md p-4 text-sm sm:text-base">
        {board ? (
          <div className="overflow-hidden">
            <Link
              to="/board"
              className="mb-5 block border-b border-gray-200 pb-2.5"
            >
              <FaArrowLeft />
            </Link>
            <div className="flex items-center justify-between mb-2">
              <h2 className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md p-1 bg-blue-600 relative">
                  <TbWriting className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </span>
                {board.title}
              </h2>
              <h3>작성자 : {board.name}</h3>
            </div>
            <div className="flex items-center justify-between mb-5 block border-b border-gray-200 pb-2.5">
              <h4 className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md p-1 bg-blue-600 relative">
                  <BiCategory className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </span>
                {board.category}
              </h4>
              {board.lastModified && <h5>등록일 : {board.lastModified}</h5>}
            </div>
            <p className="bg-gray-200 min-h-[220px] p-3">{board.content}</p>
          </div>
        ) : (
          <p>게시물을 불러오는 중입니다.</p>
        )}
      </div>
    </>
  );
}

export default BoardDetailViewItem;
