import { useState, useRef, useEffect } from 'react';
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';

// 매개변수 (인자)
const Note = ({
  id,
  content,
  color: initialColor,
  onUpdateNote,
  onRemoveNote,
}) => {
  const colorOptions = [
    'bg-yellow-300',
    'bg-pink-300',
    'bg-blue-300',
    'bg-green-300',
  ];

  const [inputValue, setInputValue] = useState(content); // textarea 값 초기화
  // const [color, setColor] = useState(colorOptions[randomIndex]); // 컬러 렌덤 초기값
  const [color, setColor] = useState(() => {
    if (initialColor) return initialColor;

    // 0, 1, 2, 3
    // 색상 렌덤으로 나오게 하기
    const randomIndex = Math.floor(Math.random() * colorOptions.length);

    return colorOptions[randomIndex];
  });

  const [isEditing, setIsEditing] = useState(false);

  const textareaRef = useRef(null);

  useEffect(() => {
    // 메모 높이 조절
    if (textareaRef.current) {
      // 높이를 auto로 리셋한 후
      textareaRef.current.style.height = 'auto';
      // 현재 스크롤 높이에 맞춰서 높이 설정
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  const handleContentChange = e => {
    const updatedContent = e.target.value;
    try {
      setInputValue(updatedContent); // 상태 업데이트
    } catch (err) {
      alert('Error updating note:', err);
    }
  };

  // 텍스트 영역에서 포커스가 벗어날 때 업데이트
  const handleBlur = () => {
    onUpdateNote(id, inputValue, color);
  };

  // 컬러 변경 핸들러
  const handleColorChange = newColor => {
    setColor(newColor);
    onUpdateNote(id, content, newColor);
  };

  return (
    <div
      className={`p-4 ${color} relative max-h-[32rem] overflow-hidden`}
      onClick={() => setIsEditing(true)}
    >
      <div className="absolute top-2 right-2">
        {isEditing ? (
          <button
            aria-label="Check Note"
            className="text-gray-700"
            onClick={e => {
              e.stopPropagation();
              setIsEditing(false);
            }}
          >
            <AiOutlineCheck size={20} />
          </button>
        ) : (
          <button
            aria-label="Close Note"
            className="text-gray-700"
            onClick={e => {
              e.stopPropagation();
              onRemoveNote(id);
            }}
          >
            <AiOutlineClose size={20} />
          </button>
        )}
      </div>
      <textarea
        className={`w-full h-full bg-transparent resize-none border-none focus:outline-none text-gray-900 overflow-hidden`}
        ref={textareaRef}
        value={inputValue}
        onChange={handleContentChange}
        onBlur={handleBlur}
        aria-label="Edit Note"
        placeholder="메모를 작성하세요."
        style={{ height: 'auto', minHeight: '8rem' }} // 최소 높이 설정
      />
      {isEditing && (
        <div className="flex space-x-2">
          {colorOptions.map((option, index) => (
            <button
              key={index}
              className={`w-6 h-6 rounded-full cursor-pointer outline outline-gray-50 ${option}`}
              aria-label={`Change color to ${option}`}
              onClick={() => handleColorChange(option)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Note;
