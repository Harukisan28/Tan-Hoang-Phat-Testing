import styles from './RuleHeading.module.css';

interface RuleHeadingProps {
  title: string;
}

export function RuleHeading({ title }: RuleHeadingProps) {
  return (
    <div className={styles.heading}>
      <span aria-hidden="true" />
      <h2>{title}</h2>
      <span aria-hidden="true" />
    </div>
  );
}
