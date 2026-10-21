// Crop the supplied LSTA artwork in CSS so the copper hand emblem stays legible
// at sidebar size without altering the original image.
export default function LogoMark({ size = 32 }) {
  return (
    <span role="img" aria-label="Limpopo Scholar Transport Alliance" style={{
      display: 'block', width: size, height: size, position: 'relative',
      overflow: 'hidden', flexShrink: 0, background: '#080808', borderRadius: 5,
    }}>
      <img src="/lsta-logo.png" alt="" aria-hidden="true" style={{
        display: 'block', position: 'absolute', maxWidth: 'none',
        width: size * 1536 / 672, height: size * 1024 / 672,
        left: -size * 432 / 672, top: -size * 64 / 672,
      }} />
    </span>
  );
}
