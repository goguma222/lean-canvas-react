import { useEffect, useState } from 'react';
import { FaCheck, FaEdit } from 'react-icons/fa';

export default function CanvasTitle({ value, onChange }) {
  // 1. CanvasTitle prop으로 value 값을 받아옴
  // 2. title 초기 값에 prop으로 받아 온 인자 넣고 초기화하기
  // 3. useEffect Hook을 사용하여 초기 렌더링 시 값 출력하기
  const [title, setTitle] = useState(value);
  useEffect(() => {
    setTitle(value);
  }, [value]);

  const [isEditing, setIsEditing] = useState(false);

  const handleDoneTitle = () => {
    setIsEditing(false);
    onChange(title);
  };

  // const [editingTitle, setEditingTitle] = useState(title);
  // const handleEditingTitle = e => {
  //   setEditingTitle(e.target.value);
  // };

  return (
    <div className="flex items-center justify-center mb-10">
      {isEditing ? (
        <div className="flex items-center">
          <input
            type="text"
            className="text-4xl font-bold text-center text-blue-600 bg-transparent border-b-2 border-blue-600 focus:outline-none"
            onKeyPress={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                // setTitle(editingTitle);
                onChange(title);
                setIsEditing(false);
              }
            }}
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <button
            className="ml-2 p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            aria-label="Save title"
            onClick={handleDoneTitle}
          >
            <FaCheck />
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-center ">{title}</h1>
          <button
            className="ml-2 p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
            aria-label="Edit title"
            onClick={() => setIsEditing(true)}
          >
            <FaEdit />
          </button>
        </>
      )}
    </div>
  );
}
