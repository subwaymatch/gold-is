import styles from './section-title.module.scss';

type SectionTitleProps = {
  desc: string;
  title: string;
};

const SectionTitle = ({ desc, title }: SectionTitleProps) => {
  return (
    <h2 className={styles.sectionTitle}>
      <span className={styles.desc}>{desc}</span>
      <span className={styles.divider}>/</span>
      <span className={styles.title}>{title}</span>
    </h2>
  );
};

export default SectionTitle;
