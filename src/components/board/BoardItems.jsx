import { Link } from 'react-router-dom';
// import { FaTrash } from 'react-icons/fa';

export default function BoardItems({ id, title, name }) {
  return (
    <li className="mb-4">
      <Link
        key={id}
        className="relative bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 flex justify-between p-5"
        to={`/board/${id}`}
      >
        <span className="inline-block overflow-hidden text-ellipsis whitespace-nowrap max-h-6">
          {title}
        </span>
        <span className="border-l border-gray-400 h-full mx-2 pl-6 text-ellipsis whitespace-nowrap">
          {name}
        </span>
      </Link>
    </li>
  );
}
