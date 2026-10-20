// The compact AL lightning mark is legible alongside the inbox wordmark.
export default function LogoMark({ size = 32 }) {
  return (
    <img
      src="/autolex-mark.png"
      alt="AutoLex"
      width={size}
      height={size}
      style={{ display: 'block', objectFit: 'contain', flexShrink: 0, background: '#ffffff', borderRadius: 5, padding: 2, boxSizing: 'border-box' }}
    />
  );
}
