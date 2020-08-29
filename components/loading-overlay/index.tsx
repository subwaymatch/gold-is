import styles from './loading-overlay.module.scss';
import WaitImage from 'images/gold-bars-no-shades-01@2x.png';

type LoadingOverlayProps = {
  callback: () => void;
};

export default function LoadingOverlay({ callback }: LoadingOverlayProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loadMessageWrapper}>
        <img
          src={WaitImage}
          onLoad={() => setTimeout(callback, 100)}
          className={styles.waitImage}
        />
        <p>Rushing for gold...</p>
      </div>
    </div>
  );
}
