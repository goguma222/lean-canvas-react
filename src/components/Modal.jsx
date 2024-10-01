import { useState } from 'react';

export default function Modal({ isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useState('');

  if (!isOpen) return null;

  const handleSubmit = e => {
    e.preventDefault(); // 기본 제출 이벤트 방지
    if (title.trim()) {
      onSubmit(title);
      setTitle('');
      onClose();
    } else {
      alert('타이틀을 입력해주세요.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg mb-4">캔버스 제목 입력</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="border rounded px-2 py-1 w-full"
            placeholder="제목을 입력하세요"
          />
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white rounded px-4 py-1"
            >
              등록하기
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 bg-gray-300 rounded px-4 py-1"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
