import { collection, setDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from './firebase';
import { seedDb } from '/data/db.json';

const addCanvases = async () => {
  for (const canvas of seedDb) {
    const canvasRef = doc(collection(db, 'canvases'), canvas.id.toString()); // ID를 문자열로 변환하여 문서 ID로 사용
    try {
      await setDoc(canvasRef, {
        ...canvas,
        lastModified: Timestamp.fromDate(new Date(canvas.lastModified)), // Date 타입 변환
        createdAt: Timestamp.fromDate(new Date()), // 현재 시간 추가
      });
      console.log(`문서 ${canvas.id} 추가 완료`);
    } catch (e) {
      console.error('문서 추가 오류: ', e);
    }
  }
};

// 호출
addCanvases();
