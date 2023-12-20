const media = {
  // Mobile device sizes
  phoneOnly: '(max-width: 599px)', // Small phones in portrait mode
  tabletPortrait: '(min-width: 600px) and (max-width: 767px)', // Tablets in portrait mode
  tabletLandscape: '(min-width: 768px) and (max-width: 1023px)', // Tablets in landscape mode
  mobile: '(min-width: 450px)', // Mobile devices

  // Larger device sizes
  desktopSmall: '(min-width: 1200px) and (max-width: 1279px)', // Small desktop screens
  desktopMedium: '(min-width: 1280px) and (max-width: 1439px)', // Medium desktop screens
  desktopLarge: '(min-width: 1440px) and (max-width: 1919px)', // Large desktop screens
  desktopXLarge: '(min-width: 1920px) and (max-width: 2559px)', // Extra-large desktop screens
  desktopXXLarge: '(min-width: 2560px)', // Very large desktop screens
  tabletMini: '(min-width: 600px)', // Tablets devices
  tablet: '(min-width: 768px)', // Tablets devices
  tabletLarge: '(min-width: 880px)', // Tablets and larger devices
  laptopMini: '(min-width: 992px)', // Small laptops
  laptop: '(min-width: 1200px)', // Laptops and small desktop screens
  desktop: '(min-width: 1280px)', // Medium and large desktop screens
  largeDesktop: '(min-width: 1440px)', // Larger desktop screens

  // Device orientation
  portrait: '(orientation: portrait)', // Vertical mode
  landscape: '(orientation: landscape)', // Horizontal mode
};

export default media;
