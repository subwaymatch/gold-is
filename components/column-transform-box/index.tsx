import { MdAdd } from 'react-icons/md';
import styles from './column-transform-box.module.scss';

type ColumnTransformBoxProps = {
  title: string;
  description: string;
  onClick: () => void;
};

export default function ColumnTransformBox({
  title,
  description,
  onClick,
}: ColumnTransformBoxProps) {
  return (
    <div className={styles.columnTransformBox}>
      <h3 className={title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.runButton}>
        <MdAdd className={styles.reactIcon} />
        <span
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
        >
          Add Code
        </span>
      </div>
    </div>
  );
}
