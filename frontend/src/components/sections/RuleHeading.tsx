import styles from './RuleHeading.module.css';

interface RuleHeadingProps {
  title: string;
  id?: string;
}

export function RuleHeading({ title, id }: RuleHeadingProps) {
  return (
    <div className={styles.heading}>
      <span aria-hidden="true" />
      <h2 id={id}>{title}</h2>
      <span aria-hidden="true" />
    </div>
  );
}
