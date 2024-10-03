import { canvases } from './http';
import dayjs from 'dayjs';

export async function getCanvases(params) {
  const payload = Object.assign(
    {
      // 해당 정렬 방법은 json-server@0.17.4 버전 스펙이다.
      _sort: 'lastModified',
      _order: 'desc', // 반대로
      // _order: 'asc', 첫 번째 순서대로
    },
    params,
  );
  const { data } = await canvases.get('/', { params: payload });
  return data;
}

export async function createCanvas(title) {
  const newCanvas = {
    // title: uuidv4().substring(0, ' ') + '_새로운 린 캔번스', // 기존에 실습한 것
    title: title,
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

// canvasItem 조회하는 함수
export async function getCanvasById(id) {
  const { data } = await canvases.get(`/${id}`);
  return data; // 외부에서 사용할 수 있도록 return 해준다.
}

// 타이틀 업데이트 함수 / json-server
export async function updateTitle(id, title) {
  /*
   * post - 새로운 자원을 생성할 때 쓰는 메서드 (회원가입 등등 신규등록)
   * put - 기존 자원 전체 업데이트 또는 새 자원 생성
   * patch - 기존 자원에 일부만 수정할 때 사용
   * 만약에 put을 사용하게 되면 title을 업뎃하게 될 경우 title을 제외 한 나머지 값들이 전부 삭제된 후 title만 남게 된다. (주의)
   */
  // 수정할 경로(url), data (수정할 데이터)
  canvases.patch(`/${id}`, { title });
}

// 기존 자원을 모두 업데이트 하는 함수
export const updateCanvas = async (id, updatedCanvasData) => {
  const response = await canvases.put(`/${id}`, updatedCanvasData); // canvases를 사용해야 함
  return response.data;
};
