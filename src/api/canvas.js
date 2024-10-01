import { canvases } from './http';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

export function getCanvases(params) {
  const payload = Object.assign(
    {
      // 해당 정렬 방법은 json-server@0.17.4 버전 스펙이다.
      _sort: 'lastModified',
      _order: 'desc', // 반대로
      // _order: 'asc', 첫 번째 순서대로
    },
    params,
  );
  return canvases.get('/', { params: payload });
}

export async function createCanvas() {
  const newCanvas = {
    title: uuidv4().substring(0) + '_새로운 린 캔번스',
    lastModified: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    category: '신규',
  };

  // http.js에 post로 요청하면 된다.
  const response = await canvases.post('/', newCanvas);
  return response.data; // 생성된 데이터 반환
}

// 삭제 로직
export async function deleteCanvas(id) {
  // 1. axios에 instance에 요청
  // 2. json-server에서 특정 아이템을 제거하기 위해서는 http메서드 delete로 요청하면 된다.
  // return이 필요 없을 때는 안 써도 된다.
  await canvases.delete(`/${id}`);
}
