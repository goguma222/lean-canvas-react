import { FaSpinner } from 'react-icons/fa';

export default function Button({
  loading = false,
  className,
  onClick,
  children,
}) {
  // style css,
  const clazz = [
    'bg-blue-500 hover:bg-blue-600 text-white font-bold py-1.5px px-4 rounded transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
    className,
  ].join(' ');
  const handleClick = () => {
    // 데이터가 실수로 2번 등록되는 것을 방지함.
    if (loading) {
      return;
    }
    onClick();
  };
  return (
    <button className={clazz} onClick={handleClick} disabled={loading}>
      <span className="flex items-center justify-center">
        {loading && <FaSpinner className="animate-spin mr-2" />}
        {children}
      </span>
    </button>
  );
}
