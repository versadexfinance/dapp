import { BASE_UNIT } from './constants';
import rem from './rem';

const getValueWithBaseUnit = <T>(v: T) => {
  if (typeof v === 'string') {
    return v;
  }

  if (typeof v === 'number') {
    return rem(v * BASE_UNIT);
  }

  throw new Error('Value is not');
};

const utils = {
  width: (value: number | string) => ({
    width: getValueWithBaseUnit(value),
  }),
  minWidth: (value: number | string) => ({
    minWidth: getValueWithBaseUnit(value),
  }),
  maxWidth: (value: number | string) => ({
    maxWidth: getValueWithBaseUnit(value),
  }),
  height: (value: number | string) => ({
    height: getValueWithBaseUnit(value),
  }),
  minHeight: (value: number | string) => ({
    minHeight: getValueWithBaseUnit(value),
  }),
  maxHeight: (value: number | string) => ({
    maxHeight: getValueWithBaseUnit(value),
  }),
  p: (value: number | string) => ({
    padding: getValueWithBaseUnit(value),
  }),
  pt: (value: number | string) => ({
    paddingTop: getValueWithBaseUnit(value),
  }),
  pr: (value: number | string) => ({
    paddingRight: getValueWithBaseUnit(value),
  }),
  pb: (value: number | string) => ({
    paddingBottom: getValueWithBaseUnit(value),
  }),
  pl: (value: number | string) => ({
    paddingLeft: getValueWithBaseUnit(value),
  }),
  px: (value: number | string) => {
    const properValue = getValueWithBaseUnit(value);
    return {
      paddingLeft: properValue,
      paddingRight: properValue,
    };
  },
  py: (value: number | string) => {
    const properValue = getValueWithBaseUnit(value);
    return {
      paddingTop: properValue,
      paddingBottom: properValue,
    };
  },
  gap: (value: number | string) => ({
    gap: getValueWithBaseUnit(value),
  }),
  m: (value: number | string) => ({
    margin: getValueWithBaseUnit(value),
  }),
  mt: (value: number | string) => ({
    marginTop: getValueWithBaseUnit(value),
  }),
  mr: (value: number | string) => ({
    marginRight: getValueWithBaseUnit(value),
  }),
  mb: (value: number | string) => ({
    marginBottom: getValueWithBaseUnit(value),
  }),
  ml: (value: number | string) => ({
    marginLeft: getValueWithBaseUnit(value),
  }),
  mx: (value: number | string) => {
    const properValue = getValueWithBaseUnit(value);
    return {
      marginLeft: properValue,
      marginRight: properValue,
    };
  },
  my: (value: number | string) => {
    const properValue = getValueWithBaseUnit(value);
    return {
      marginTop: properValue,
      marginBottom: properValue,
    };
  },
  dimensions: (value: number | string) => {
    const properValue = getValueWithBaseUnit(value);
    return {
      width: properValue,
      height: properValue,
    };
  },
};

export default utils;
