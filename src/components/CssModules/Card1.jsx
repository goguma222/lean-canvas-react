// 일반적인 css
// import './Card2.css';
import styles from './Card1.module.css';

function Card1() {
  return <article className={styles.card}>Card1</article>;
}

export default Card1;
