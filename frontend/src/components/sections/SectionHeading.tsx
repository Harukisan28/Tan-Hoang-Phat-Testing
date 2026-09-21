interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  dark = false,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`section-heading-block section-heading-block--${align} ${className}`.trim()}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className={`section-heading ${dark ? 'dark-heading' : ''}`.trim()}>{title}</h2>
      {description && <p className={`lead ${dark ? 'lead--dark' : ''}`.trim()}>{description}</p>}
    </div>
  );
}
