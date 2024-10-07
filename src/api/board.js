// 파이어베이스 연동 코드
import { db } from '../firebase';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import dayjs from 'dayjs';

// 모든 보드 조회
export async function getBoards(params) {
  const boardCollection = collection(db, 'board'); // board 컬렉션 참조
  const querySnapshot = await getDocs(boardCollection); // 모든 문서 가져오기
  const boardData = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  // 필터링 로직 추가 (params 사용)
  return boardData.filter(board => {
    const matchesTitle =
      !params.title_link || board.title.includes(params.title_link);
    const matchesCategory =
      !params.category || board.category === params.category;
    return matchesTitle && matchesCategory;
  });
}

// 보드 생성
// src/api/board.js

export async function createBoards({ title, name, content, category }) {
  const newBoards = {
    title: title,
    name: name,
    content: content,
    category: category,
    lastModified: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  };

  console.log('보드 생성 데이터:', newBoards); // 데이터 확인

  try {
    const docRef = await addDoc(collection(db, 'board'), newBoards); // 수정된 부분
    return { id: docRef.id, ...newBoards }; // 생성된 데이터와 ID 반환
  } catch (error) {
    console.error('보드 생성 중 오류 발생:', error); // 오류 처리 추가
    throw error;
  }
}

// 보드 삭제
export async function deleteBoards(id) {
  await deleteDoc(doc(db, 'board', id));
}

// ID로 보드 조회
/**
 * getDoc(canvasDoc): 주어진 ID의 문서를 Firebase에서 가져온다.
 * 반환할 데이터는 문서 ID와 데이터를 포함한다.
 */

export async function getBoardById(id) {
  const boardDoc = doc(db, 'board', id);
  const boardData = await getDoc(boardDoc);

  // 문서가 존재하는지 확인
  if (boardData.exists()) {
    return { id: boardData.id, ...boardData.data() }; // 반환할 데이터
  } else {
    throw new Error('게시글을 찾을 수 없습니다.');
  }
}

// 타이틀 업데이트
/**
 * updateDoc(boardDoc, {title:title}): 주어진 ID의 문서에서 타이틀만 업데이트한다.
 */
export async function updateTitle(id, title, content, category, name) {
  const boardDoc = doc(db, 'board', id);
  await updateDoc(boardDoc, {
    title: title,
    content: content,
    category: category,
    name: name,
  });
}

// 전체 데이터 업데이트
/**
 * updateCanvas: 전체 보드 데이터(타이틀, 이름, 내용, 카테고리 등)를 업데이트한다. updateBoardData는 업데이트할 필드와 값을 포함한다.
 */
export const updateBoards = async (id, updateBoardData) => {
  const boardDoc = doc(db, 'board', id);
  await updateDoc(boardDoc, updateBoardData);
};
