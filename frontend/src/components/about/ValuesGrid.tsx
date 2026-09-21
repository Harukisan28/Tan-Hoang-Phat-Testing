import { Cog, Handshake, ShieldCheck, UsersRound } from 'lucide-react';
import { values } from '../../data/siteData';
import styles from './ValuesGrid.module.css';

interface ValuesGridProps {
  dark?: boolean;
}

const icons = {
  shield: ShieldCheck,
  gear: Cog,
  users: UsersRound,
  handshake: Handshake,
};

export function ValuesGrid({ dark = false }: ValuesGridProps) {
  return (
    <div className={`${styles.grid} ${dark ? styles.dark : ''}`.trim()}>
      {values.map((value) => {
        const Icon = icons[value.icon as keyof typeof icons];
        return (
          <article className={styles.item} key={value.title}>
            <div className={styles.icon}><Icon aria-hidden="true" size={25} strokeWidth={1.8} /></div>
            <div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
