export default function CategoryFilter({ category, onChange }) {
  const categories = [
    '신규',
    '헬스케어',
    '공부',
    '물류',
    '여행',
    '자동차',
    '오토바이',
    '식품',
  ];
  return (
    <>
      <select
        className="border p-2 rounded-lg w-full sm:w-32"
        value={category}
        onChange={e => {
          const val = e.target.value;
          onChange(val === 'all' ? undefined : val);
        }}
      >
        <option value={'all'}>전체</option>
        {categories.map(item => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </>
  );
}
