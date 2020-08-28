import styles from './loading-overlay.module.scss';
import WaitImage from 'images/gold-bars-yellow.png';

export default function LoadingOverlay() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loadMessageWrapper}>
        <img src={WaitImage} className={styles.waitImage} />
        <p>Rushing for gold...</p>
      </div>
    </div>
  );
}
