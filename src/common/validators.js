const checked = (value, options) => {
  if (value !== true) {
    return options.message || 'must be checked';
  }
};

export const checkOnlyPositiveInteger = (value) => {
  if (/^[0-9]+[0-9]*$/.test(value)) {
    return true;
  }
  if (!String(value).startsWith('.') && String(value).includes('.') && !String(value).startsWith('.')) {
    return true;
  }
  return false;
};

export const onlyPositiveInteger = {
  message: 'Only number entry is allowed',
  value: /^[0-9]+[0-9]*$/,
};
export const zeroBehindTheNumber = {
  message: 'It is not allowed to enter zero behind the number',
  value: /^(?:[1-9]\d*|0)$/,
};


export const onlyInteger = {
  message: 'Only number entry is allowed',
  value: /^\d+$/,
};

export const onlyIntegerAndFloat = {
  value: /(\d+(\.\d+)?)/,
};

export const onlyEnglishCharacterAndNumbers = {
  value: /^[A-Za-z0-9 _\-_.()]+$/,
};

export const emailRegex = {
  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
};

export default {
  checked,
};
export function onlyDigit(s) {
  const reg = new RegExp(/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/);
  return s !== undefined && s !== null && s.toString().length ? reg.test(s) : true;
}
