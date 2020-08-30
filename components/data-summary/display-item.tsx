import styles from './display-item.module.scss';
import classNames from 'classnames';

type DisplayItemProps = {
  iconChild?: React.ReactNode;
  className?: string;
  label: string;
  value: React.ReactText | boolean | null | undefined;
};

const DisplayItem = ({
  iconChild,
  className,
  label,
  value,
}: DisplayItemProps) => (
  <div className={classNames(styles.displayItem, className)}>
    <div className={styles.label}>
      {iconChild && <div className={styles.iconWrapper}>{iconChild}</div>}
      <span>{label}</span>
    </div>
    <div className={styles.value}>{value}</div>
  </div>
);

export default DisplayItem;
