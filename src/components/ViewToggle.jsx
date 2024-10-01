import { FaTh, FaList } from 'react-icons/fa';
export default function ViewToggle({ setIsGridView, isGridView }) {
  return (
    <div className="flex space-x-2">
      <button
        className={`p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isGridView ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        aria-label="Grid view"
        onClick={() => setIsGridView(true)}
      >
        <FaTh />
      </button>
      <button
        className={`p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isGridView ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        aria-label="List view"
        onClick={() => setIsGridView(false)}
      >
        <FaList />
      </button>
    </div>
  );
}
