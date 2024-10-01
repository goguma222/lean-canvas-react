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

export const canvases = create('http://localhost:8000/canvases/');
// export const posts = create('http://localhost:8000/posts/');
