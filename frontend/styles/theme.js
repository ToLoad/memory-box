const size = {
  mobile: '480px',
  tablet: '768px',
  laptopS: '900px',
  laptopM: '1239px',
  desktop: '1240px',
};
const flex = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
  laptopS: `(max-width: ${size.laptopS})`,
  laptopM: `(max-width: ${size.laptopM})`,
  desktop: `(min-width: ${size.desktop})`,
};
const theme = {
  ...flex,
};

export default theme;
