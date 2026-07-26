/**
 * Attach to onMouseDown of any element with position:relative + overflow:hidden
 * (e.g. .btn-primary, .btn-ghost, .theme-toggle-btn) to spawn a Material-style
 * ripple centered on the click point.
 */
export default function spawnRipple(event) {
  const target = event.currentTarget;
  const rect = target.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 1.8;
  const ripple = document.createElement('span');
  ripple.className = 'ac-ripple';
  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
  target.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
}
