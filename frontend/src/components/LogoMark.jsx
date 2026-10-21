// The circular B2SA mark stays legible in the narrow sidebar.
export default function LogoMark({ size = 32 }) {
  return (
    <img
      src="/b2sa-mark.jpeg"
      alt="B2SA"
      width={size}
      height={size}
      style={{ display: 'block', objectFit: 'contain', flexShrink: 0, background: '#ffffff', borderRadius: 5, padding: 2, boxSizing: 'border-box' }}
    />
  );
}
