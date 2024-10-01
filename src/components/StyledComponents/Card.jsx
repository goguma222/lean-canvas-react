import styled from 'styled-components';

const CardContainer = styled.div.attrs({
  className: 'card-container',
})`
  border: 2px solid #393939;
  padding: 24px;
  border-radius: 6px;
  ${props => {
    console.log(props);
    return (
      props.$dark &&
      `
      background-color: black;
      color: #fff;
      border: none;
      `
    );
  }}
`;

// 활용성이 높은 것 (필수!!)

export default function Card() {
  return (
    // 특수문자가 있기 때문에 대괄호로 접근하면 된다. (자바스크립트 문법)
    <CardContainer $dark>
      <h2>Styled Component</h2>
      <p>이것은 styled-components로 만든 카드입니다.</p>
    </CardContainer>
  );
}
