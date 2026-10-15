import { KHULANODE_LOGO } from '../utils/khulanodeBrand.js';

// Keep the original brand colors across all MailFlow themes.
export default function LogoMark({ size = 32 }) {
  return (
    <img
      src={KHULANODE_LOGO}
      alt="KhulaNode"
      width={size}
      height={size}
      style={{ display: 'block', objectFit: 'contain', flexShrink: 0 }}
    />
  );
}
