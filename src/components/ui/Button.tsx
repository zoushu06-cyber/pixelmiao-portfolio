import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: 'solid' | 'outline' | 'ghost' | 'light';
  size?: 'md' | 'lg';
  arrow?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

export function Button({
  children,
  to,
  href,
  variant = 'solid',
  size = 'md',
  arrow = true,
  className = '',
  onClick,
  type = 'button'
}: ButtonProps) {
  const cls = `btn btn--${variant} btn--${size} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <svg className="btn__arrow" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M4 10h11M11 5.5 15.5 10 11 14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick}>
      {inner}
    </button>
  );
}
