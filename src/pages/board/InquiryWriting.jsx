import InquiryWritingForm from '../../components/board/InquiryWritingForm';
import { createBoards } from '../../api/board';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export default function InquiryWriting() {
  const [filter, setFilter] = useState({
    searchText: '',
    category: '',
    name: '',
    content: '',
  });

  const queryClient = useQueryClient();

  // 1] 등록
  const mutation = useMutation({
    mutationFn: ({ title, name, content, category }) =>
      createBoards({ title, name, content, category }), // 객체 형태로 전달
    onSuccess: () => {
      queryClient.invalidateQueries(['board']);
    },
  });

  // board 생성하는 버튼을 클릭하면 mutation.mutate({title, name, content, category})를  호출하여 생성 요청을 한다.
  const handleCreateBoards = (title, name, content, category) => {
    // 객체 형태로 전달
    mutation.mutate({ title, name, content, category });
  };

  return (
    <>
      <InquiryWritingForm
        onSubmit={handleCreateBoards}
        category={filter.category}
      />
    </>
  );
}
