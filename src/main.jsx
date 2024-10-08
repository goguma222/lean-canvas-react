import { StrictMode } from 'react';
import { app, analytics } from './firebase';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import CanvasDetail from './pages/CanvasDetail';
import ErrorPage from './pages/ErrorPage';
import './index.css';
import Board from './pages/Board';
import InquiryWriting from './pages/board/InquiryWriting';
import BoardDetail from './pages/board/BoardDetail';
import BoardDetailView from './pages/board/BoardDetailView';

// QueryClient() 생성하기
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      // {
      //   path: '/canvases/:id',
      //   element: <CanvasDetail />,
      // },
      {
        path: '/board',
        element: <Board />,
      },
      {
        path: '/board/InquiryWriting',
        element: <InquiryWriting />,
      },
      {
        path: '/board/:id',
        element: <BoardDetailView />,
      },
      {
        path: '/board/InquiryWriting/:id',
        element: <BoardDetail />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 사용할 컴포넌트에 QueryClientProvider 감싸주고 client Props를 위에서 생성한 queryClient 넘겨준다. */}
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
