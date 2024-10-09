import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function InquiryWritingForm({ onSubmit }) {
  const categories = [
    '최근',
    '공부',
    '여행',
    '자동차',
    '오토바이',
    '식품',
    '정보',
  ];

  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(categories[0]); // 기본 카테고리 설정

  const titleRef = useRef(null);
  const nameRef = useRef(null);
  const contentRef = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    // 유효성 검사
    if (title.trim() === '') {
      alert('제목을 입력해주세요.');
      titleRef.current.focus();
      return;
    }
    if (name.trim() === '') {
      alert('이름을 입력해주세요.');
      nameRef.current.focus();
      return;
    }
    if (content.trim() === '') {
      alert('내용을 입력해주세요.');
      contentRef.current.focus();
      return;
    }

    // 모든 값이 유효한 경우
    onSubmit(title, name, content, category); // 카테고리 추가
    setTitle('');
    setName('');
    setContent('');
    setCategory(categories[0]); // 기본 카테고리로 초기화
    navigate('/board');
  };

  const handleCancel = () => {
    navigate('/board', { replace: true });
  };

  return (
    <>
      <div className="relative bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg mb-5">게시판</h2>
        <div className="formWrap">
          <form method="post" onSubmit={handleSubmit}>
            <div className="formGroup border p-2 rounded-lg w-full flex items-center mb-4">
              <label
                htmlFor="title"
                className="inline-block w-calc-50p-10p sm:calc-50-30p md:w-calc-50p-38p xl:calc-50p-42p border-r border-gray-400 mr-4"
              >
                제목
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="제목을 입력해주세요."
                onChange={e => setTitle(e.target.value)}
                ref={titleRef}
                className="bg-gray-200 w-full py-1 px-3 rounded"
              />
            </div>
            <div className="formGroup border p-2 rounded-lg w-full flex items-center mb-4">
              <label
                htmlFor="name"
                className="inline-block w-calc-50p-10p sm:calc-50-30p md:w-calc-50p-38p xl:calc-50p-42p border-r border-gray-400 mr-4"
              >
                작성자
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="이름을 입력해주세요."
                onChange={e => setName(e.target.value)}
                ref={nameRef}
                className="bg-gray-200 w-full py-1 px-3 rounded"
              />
            </div>
            <div className="formGroup border p-2 rounded-lg w-full flex items-center mb-4">
              <label
                htmlFor="category"
                className="inline-block w-calc-50p-10p sm:calc-50-30p md:w-calc-50p-38p xl:calc-50p-42p border-r border-gray-400 mr-4"
              >
                카테고리
              </label>
              <select
                name="category"
                id="category"
                value={category} // 현재 선택된 카테고리
                onChange={e => setCategory(e.target.value)} // 카테고리 선택 시 상태 업데이트
                className="bg-gray-200 py-1 px-3 rounded w-full"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="formGroup border p-2 rounded-lg w-full flex items-center mb-4">
              <label
                htmlFor="content"
                className="inline-block w-calc-50p-10p sm:calc-50-30p md:w-calc-50p-38p xl:calc-50p-42p border-r border-gray-400 mr-4"
              >
                내용
              </label>
              <textarea
                name="content"
                id="content"
                onChange={e => setContent(e.target.value)}
                ref={contentRef}
                className="bg-gray-200 w-full py-1 px-3 rounded min-h-[220px]"
              ></textarea>
            </div>
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1.5px px-4 rounded transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                등록하기
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="ml-2 bg-gray-300 rounded px-4 py-1"
              >
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
