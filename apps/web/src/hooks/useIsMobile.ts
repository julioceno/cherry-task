export function useIsMobile() {
  return window.matchMedia && window.matchMedia('(max-width: 480px)').matches
}
