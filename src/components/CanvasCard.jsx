// CanvasCard.jsx

import { FaPlus } from 'react-icons/fa';
import Note from './Note';
import { v4 as uuidv4 } from 'uuid';

export default function CanvasCard({
  title,
  isSubTitle = false,
  notes = [], // 기본값으로 빈 배열 설정
  onNotesChange,
}) {
  // 노트 추가 함수
  const handleAddNote = () => {
    if (!Array.isArray(notes)) {
      // console.error('notes is not an array:', notes); // 디버깅을 위한 로그
      return; // notes가 배열이 아닐 경우 함수 종료
    }

    const newNote = {
      id: uuidv4(),
      content: '',
      color: '',
    };
    onNotesChange([...notes, newNote]);
  };

  // 노트 제거 함수
  const handleRemoveNote = id => {
    onNotesChange(notes.filter(note => note.id !== id));
  };

  // 노트 업데이트 함수
  const handleUpdateNote = (id, content, color) => {
    // console.log('Updating note:', { id, content, color });
    onNotesChange(
      notes.map(note => (note.id === id ? { ...note, content, color } : note)),
    );
  };

  return (
    <div className="row-span-1 bg-white min-h-48 border border-collapse border-gray-300">
      <div
        className={`${isSubTitle === false && 'bg-gray-100 border-b border-b-gray-300'} flex items-start justify-between px-3 py-2`}
      >
        <h3 className={`${isSubTitle === false && 'font-bold'}`}>{title}</h3>
        <button
          className="bg-blue-400 text-white p-1.5 text-xs rounded-md"
          onClick={handleAddNote}
        >
          <FaPlus />
        </button>
      </div>
      <div className="space-y-3 min-h-32 p-3">
        {Array.isArray(notes) &&
          notes.map(
            (
              note, // notes가 배열인지 확인
            ) => (
              <Note
                key={note.id}
                id={note.id}
                content={note.content}
                color={note.color}
                onRemoveNote={handleRemoveNote}
                onUpdateNote={handleUpdateNote}
              />
            ),
          )}
      </div>
    </div>
  );
}
