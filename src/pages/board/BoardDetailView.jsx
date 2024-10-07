import BoardDetailViewItem from '../../components/board/BoardDetailViewItem';
import { getBoardById } from '../../api/board';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function BoardDetailView() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const data = await getBoardById(id);
        setBoard(data);
      } catch (err) {
        alert('게시글을 불러오는데 실패하였습니다. : ' + err.message);
      }
    };
    fetchBoard();
  }, [id]);
  return (
    <>
      <div>
        <BoardDetailViewItem board={board} />
      </div>
    </>
  );
}
