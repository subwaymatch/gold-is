import styles from './loading-overlay.module.scss';
import LogoImage from './images/logo-image.png';

export default function LoadingOverlay() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loadMessageWrapper}>
        <img src={LogoImage} />
        <span>Rushing for gold...</span>
      </div>
    </div>
  );
}
