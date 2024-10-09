import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
  // 해당 페이지 접근 시 차단
  const navigate = useNavigate();

  useEffect(() => {
    const cutOff = false;
    if (!cutOff) {
      alert('이 페이지에 접근할 수 없습니다.');
      navigate('/');
    }
  });
  return <div>Contact Page!</div>;
}
