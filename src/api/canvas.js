// import { canvases } from './http';
// import dayjs from 'dayjs';

// export async function getCanvases(params) {
//   const payload = Object.assign(
//     {
//       // 해당 정렬 방법은 json-server@0.17.4 버전 스펙이다.
//       _sort: 'lastModified',
//       _order: 'desc', // 반대로
//       // _order: 'asc', 첫 번째 순서대로
//     },
//     params,
//   );
//   const { data } = await canvases.get('/', { params: payload });
//   return data;
// }

// // 생성 로직
// export async function createCanvas(title) {
//   const newCanvas = {
//     // title: uuidv4().substring(0, ' ') + '_새로운 린 캔번스', // 기존에 실습한 것
//     title: title,
//     lastModified: dayjs().format('YYYY-MM-DD HH:mm:ss'),
//     category: '신규',
//   };

//   // http.js에 post로 요청하면 된다.
//   const response = await canvases.post('/', newCanvas);
//   return response.data; // 생성된 데이터 반환
// }

// // 삭제 로직
// export async function deleteCanvas(id) {
//   // 1. axios에 instance에 요청
//   // 2. json-server에서 특정 아이템을 제거하기 위해서는 http메서드 delete로 요청하면 된다.
//   // return이 필요 없을 때는 안 써도 된다.
//   await canvases.delete(`/${id}`);
// }

// // canvasItem 조회하는 함수
// export async function getCanvasById(id) {
//   const { data } = await canvases.get(`/${id}`);
//   return data; // 외부에서 사용할 수 있도록 return 해준다.
// }

// // 타이틀 업데이트 함수 / json-server
// export async function updateTitle(id, title) {
//   /*
//    * post - 새로운 자원을 생성할 때 쓰는 메서드 (회원가입 등등 신규등록)
//    * put - 기존 자원 전체 업데이트 또는 새 자원 생성
//    * patch - 기존 자원에 일부만 수정할 때 사용
//    * 만약에 put을 사용하게 되면 title을 업뎃하게 될 경우 title을 제외 한 나머지 값들이 전부 삭제된 후 title만 남게 된다. (주의)
//    */
//   // 수정할 경로(url), data (수정할 데이터)
//   canvases.patch(`/${id}`, { title });
// }

// // 기존 자원을 모두 업데이트 하는 함수
// export const updateCanvas = async (id, updatedCanvasData) => {
//   const response = await canvases.put(`/${id}`, updatedCanvasData); // canvases를 사용해야 함
//   return response.data;
// };

// 파이어베이스 연동 코드
import { db } from '../firebase'; // Firebase 초기화 파일 import
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

// 모든 캔버스 조회
/**
 * collection(db, 'canvases'): Firebase 데이터베이스에서 'canvases'라는 컬렉션을 참조한다.
 * getDocs(canvasesCollection): 컬렉션 내 모든 문서 가져오기
 * querySnapshot.docs.map: 가져온 문서들을 반복하며 각 문서의 ID와 데이터를 객체형태로 변환한다.
 * params: 제목과 카테고리로 필터링할 수 있는 매개변수이다.
 * filter: 각 캔퍼스의 제목과 카테고리를 검사하여 조건에 맞는 켄버스만 반환한다.
 */
export async function getCanvases(params) {
  const canvasesCollection = collection(db, 'canvases'); // canvases 컬렉션 참조
  const querySnapshot = await getDocs(canvasesCollection); // 모든 문서 가져오기
  const canvasesData = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  // 필터링 로직 추가 (params 사용)
  return canvasesData.filter(canvas => {
    const matchesTitle =
      !params.title_like || canvas.title.includes(params.title_like);
    const matchesCategory =
      !params.category || canvas.category === params.category;
    return matchesTitle && matchesCategory;
  });
}

// 캔버스 생성
/**
 * newCanvas: 새로운 캔버스 객체를 생성한다.
 * addDoc(collection(db, 'canvases'), newCanvas): Firestore에 새로운 문서를 추가한다.
 * docRef.id: 생성된 문서의 ID를 반환하여 캔버스 객체와 함께 반환한다.
 */
export async function createCanvas(title) {
  const newCanvas = {
    title: title,
    lastModified: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    category: '신규',
  };

  const docRef = await addDoc(collection(db, 'canvases'), newCanvas);
  return { id: docRef.id, ...newCanvas }; // 생성된 데이터와 ID 반환
}

// 캔버스 삭제
/**
 * deleteDoc(doc(db, 'canvases', id)): 주어진 ID를 가진 캔버스 문서를 Firebase에서 삭제한다.
 */
export async function deleteCanvas(id) {
  await deleteDoc(doc(db, 'canvases', id));
}

// ID로 캔버스 조회
/**
 * getDoc(canvasDoc): 주어진 ID의 문서를 Firebase에서 가져온다.
 * 반환할 데이터는 문서 ID와 데이터를 포함한다.
 */
export async function getCanvasById(id) {
  const canvasDoc = doc(db, 'canvases', id);
  const canvasData = await getDoc(canvasDoc);
  return { id: canvasData.id, ...canvasData.data() }; // 반환할 데이터
}

// 타이틀 업데이트
/**
 * updateDoc(canvasDoc, {title:title}): 주어진 ID의 문서에서 타이틀만 업데이트한다.
 */
export async function updateTitle(id, title) {
  const canvasDoc = doc(db, 'canvases', id);
  await updateDoc(canvasDoc, { title: title });
}

// 전체 캔버스 데이터 업데이트
/**
 * updateCanvas: 전체 캔버스 데이터(타이틀, 카테고리 등)를 업데이트한다. updateCanvasData는 업데이트할 필드와 값을 포함한다.
 */
export const updateCanvas = async (id, updatedCanvasData) => {
  const canvasDoc = doc(db, 'canvases', id);
  await updateDoc(canvasDoc, updatedCanvasData);
};
