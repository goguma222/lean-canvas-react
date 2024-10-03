import axios from 'axios';

// instance 만드는 함수
function create(baseURL, options) {
  // const instance = axios.create({
  //   // key, value 같을 때 value 생략 가능 (아래(주석)와 같이 쓰면 된다.)
  //   // baseURL
  //   baseURL: baseURL,
  // });

  // Ojbect.assign 객체 할당
  const instance = axios.create(Object.assign({ baseURL: baseURL }), options);
  return instance;
}

console.log(
  'import.meta.env.VITE_API_BASE_URL: ',
  import.meta.env.VITE_API_BASE_URL,
);

// VITE 환경변수
export const canvases = create(
  `${import.meta.env.VITE_API_BASE_URL}/canvases/`,
);

// 서버에 연결
// export const canvases = create(
//   'https://json-server-vercel-mu-umber.vercel.app/canvases/',
// );

// 로컬에 연결
// export const posts = create('http://localhost:8000/posts/');
