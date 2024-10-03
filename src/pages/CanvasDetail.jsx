import { useParams } from 'react-router-dom';
import CanvasTitle from '../components/CanvasTitle';
import LeanCanvas from '../components/LeanCanvas';
import { useEffect, useState } from 'react';
import { getCanvasById, updateTitle, updateCanvas } from '../api/canvas';

export default function CanvasDetail() {
  const { id } = useParams();
  const [canvas, setCanvas] = useState(null); // 초기값 null

  useEffect(() => {
    const fetchCanvas = async () => {
      try {
        const data = await getCanvasById(id);
        setCanvas(data);
      } catch (err) {
        alert('캔버스 불러오는데 실패하였습니다 : ' + err.message);
      }
    };
    fetchCanvas();
  }, [id]);

  const handleTitleChange = async title => {
    try {
      await updateTitle(id, title);
    } catch (err) {
      alert('제목 업데이트에 실패하였습니다 : ' + err.message);
    }
  };

  // updateCanvas 호출 함수
  const handleCanvasChange = async updatedCanvasData => {
    try {
      await updateCanvas(id, updatedCanvasData);
      setCanvas(updatedCanvasData);
      // console.log(`updatedCanvasData : ${updatedCanvasData}`);
    } catch (err) {
      alert('캔버스 업데이트에 실패하였습니다: ' + err.message);
    }
  };

  return (
    <>
      {/* {JSON.stringify(canvas)}; */}
      <CanvasTitle value={canvas?.title} onChange={handleTitleChange} />
      {canvas && (
        <LeanCanvas canvas={canvas} onCanvasChange={handleCanvasChange} />
      )}
    </>
  );
}
