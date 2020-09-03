import styles from './full-button.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type FullButtonProps = {
  label: string;
  disabled: boolean;
  onClick: () => void;
  className?: string;
};

const FullButton = ({
  label,
  disabled,
  onClick,
  className,
}: FullButtonProps) => (
  <button
    className={cx('fullButton', {
      [className]: !!className,
    })}
    disabled={disabled}
    onClick={onClick}
  >
    {label}
  </button>
);

export default FullButton;
