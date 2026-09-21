import { Factory, Ruler, ShieldCheck } from 'lucide-react';
import styles from './ProofStrip.module.css';

const proofItems = [
  { label: 'Thiết kế theo yêu cầu', icon: Ruler },
  { label: 'Kiểm soát chất lượng', icon: ShieldCheck },
  { label: 'Thi công đồng bộ', icon: Factory },
];

export function ProofStrip() {
  return (
    <section className={styles.section} aria-label="Năng lực phối hợp">
      <div className="container">
        <div className={styles.grid}>
          {proofItems.map(({ label, icon: Icon }) => (
            <div className={styles.item} key={label}>
              <Icon aria-hidden="true" size={24} strokeWidth={1.8} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
