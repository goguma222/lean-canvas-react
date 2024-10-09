import { FaArrowLeft } from 'react-icons/fa';
import { TbWriting } from 'react-icons/tb';
import { Link } from 'react-router-dom';

function BoardDetailViewItem({ board }) {
  return (
    <>
      <div className="relative bg-white rounded-lg shadow-md p-4">
        {board ? (
          <div className="overflow-hidden">
            <Link to="/board" className="mb-6 block">
              <FaArrowLeft />
            </Link>
            <div>
              <h2 className="flex justify-start gap-2 mb-3">
                <span className="w-6 h-6 rounded-md p-1 bg-gray-800 relative">
                  <TbWriting className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </span>
                제목 : {board.title}
              </h2>
              <h3 className="flex justify-start gap-2 mb-3">
                작성자 : {board.name}
              </h3>
            </div>
            <h4 className="flex justify-start gap-2 mb-3">
              카테고리 : {board.category}
            </h4>
            {board.lastModified && (
              <h5 className="flex justify-start gap-2 mb-3">
                등록일 : {board.lastModified}
              </h5>
            )}
            <p>내용 : {board.content}</p>
          </div>
        ) : (
          <p>게시물을 불러오는 중입니다.</p>
        )}
      </div>
    </>
  );
}

export default BoardDetailViewItem;
