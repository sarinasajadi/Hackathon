import lodash from 'lodash';
import { Dispatch, SetStateAction } from 'react';
import Cookies from 'universal-cookie';
import _PropTypes from 'prop-types';
import moment from 'moment';
import { FormContextValues } from 'react-hook-form';
import { AnyObject } from '../types';

type SetValue = FormContextValues['setValue'];
type Register = FormContextValues['register'];

const cookies = new Cookies();

export const ThousandsSeprator = (x = 0): string => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const FindAndCheckValue = (
  object: AnyObject,
  object_path: string,
  find_path: string,
  value: string,
): string | false => {
  if (lodash.get(object, object_path, []).length > 0) {
    const item = lodash.get(object, object_path).find((c: AnyObject) => lodash.get(c, find_path) === value);
    if (item) {
      return item.message;
    }
  }
  return false;
};

export const GetQueryStringValue = (key: string): string =>
  decodeURIComponent(
    window.location.search.replace(
      new RegExp(`^(?:.*[&\\?]${encodeURIComponent(key).replace(/[.+*]/g, '\\$&')}(?:\\=([^&]*))?)?.*$`, 'i'),
      '$1',
    ),
  );

export const getUniqueCode = (): string => {
  // eslint-disable-next-line no-undef
  const typedArray = new Uint8Array(5);
  const randomValues = window.crypto.getRandomValues(typedArray);
  return randomValues.join('');
};

export const convertToBase64 = (response: AnyObject): Promise<string | null | ArrayBuffer> =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(response.data);
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });

// Regex

export const OnlyAcceptEnglishCharacters = (character: string): boolean => /^[a-zA-Z]+$/.test(character);

export const OnlyAcceptEnglishInteger = (character: string): boolean => /^\d+$/.test(character);

export const ValidKeysInAll = (character: AnyObject): boolean => {
  const validKey = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Backspace', ' ', 'Tab', 'Enter'];
  const validCombinedCharacters = ['a', 'c', 'v'];
  if (validCombinedCharacters.includes(character.key.toLowerCase()) && (character.metaKey || character.ctrlKey))
    return true;
  return validKey.includes(character.key);
};

export const EmailSpecialKeys = (character: string): boolean => {
  const validKey = ['@', '.', '_'];
  return validKey.includes(character);
};

export const Dot = (event: AnyObject): boolean => event.key === '.' && !event?.target?.value.toString().match(/\./g);

// Handler
export const onKeyDownHandlerOnlyAcceptIntegerEnglish = (event: AnyObject): boolean | undefined => {
  if (event.altKey) {
    event.preventDefault();
    return;
  }
  if (OnlyAcceptEnglishInteger(event.key) || ValidKeysInAll(event) || Dot(event)) return true;
  event.preventDefault();
};

export const onKeyDownHandlerOnlyDontAcceptSpace = (event: AnyObject): boolean | undefined => {
  if (event.altKey) return event.preventDefault();
  if (event.key === ' ') {
    event.preventDefault();
  } else return true;
};

export const onKeyDownHandlerOnlyAcceptIntegerEnglishDontAcceptSpace = (event: AnyObject): boolean | undefined => {
  if (event.altKey) return event.preventDefault();
  if ((OnlyAcceptEnglishInteger(event.key) || ValidKeysInAll(event) || Dot(event)) && event.key !== ' ') return true;
  event.preventDefault();
};

export const onKeyDownHandlerOnlyAcceptIntegerEnglishDontAcceptSpaceDontAcceptDot = (
  event: AnyObject,
): boolean | undefined => {
  if (event.altKey) return event.preventDefault();
  if ((OnlyAcceptEnglishInteger(event.key) || ValidKeysInAll(event)) && event.key !== ' ') return true;
  event.preventDefault();
};

export const onKeyDownHandlerOnlyAcceptIntegerEnglishDontAcceptSpaceAcceptDash = (
  event: AnyObject,
): boolean | undefined => {
  if (event.altKey) return event.preventDefault();
  if (/^[-/]/.test(event.key)) {
    return true;
  }
  if ((OnlyAcceptEnglishInteger(event.key) || ValidKeysInAll(event) || Dot(event)) && event.key !== ' ') return true;
  event.preventDefault();
};

export const onKeyDownHandlerOnlyDontAcceptDashAndPlus = (event: AnyObject): boolean | undefined => {
  if (event.altKey) return event.preventDefault();
  if (/^[-+]/.test(event.key)) {
    event.preventDefault();
  } else return true;
};

export const onKeyDownHandlerOnlyAcceptEnglishCharacter = (event: AnyObject): boolean | undefined => {
  if (event.altKey) return event.preventDefault();
  if (OnlyAcceptEnglishCharacters(event.key) || ValidKeysInAll(event)) return true;
  event.preventDefault();
};

export const onKeyDownHandlerOnlyAcceptEnglishCharacterAndNumbers = (event: AnyObject): boolean | undefined => {
  if (event.altKey) return event.preventDefault();
  if (OnlyAcceptEnglishCharacters(event.key) || ValidKeysInAll(event) || OnlyAcceptEnglishInteger(event.key))
    return true;
  event.preventDefault();
};

export const onKeyDownHandlerOnlyAcceptValidCharactersInAnyLanguage = (event: AnyObject): boolean | undefined => {
  if (event.altKey) return event.preventDefault();
  if (event.key.toString().match(/([^\\{}[\];:/.,'"@!#$%^&(*)_+=-])/) || ValidKeysInAll(event)) return true;
  event.preventDefault();
};
export const onKeyDownHandlerOnlyAcceptEmailCharacters = (event: AnyObject): boolean | undefined => {
  if (event.altKey) return event.preventDefault();
  if (
    OnlyAcceptEnglishCharacters(event.key) ||
    ValidKeysInAll(event) ||
    EmailSpecialKeys(event.key) ||
    OnlyAcceptEnglishInteger(event.key)
  )
    return true;
  event.preventDefault();
};

export const onKeyDownHandlerOnlyAcceptWebSiteCharacters = (event: AnyObject): boolean | undefined => {
  if (event.altKey) return event.preventDefault();
  if (
    OnlyAcceptEnglishCharacters(event.key) ||
    ValidKeysInAll(event) ||
    EmailSpecialKeys(event.key) ||
    OnlyAcceptEnglishInteger(event.key) ||
    ['/'].includes(event.key)
  )
    return true;
  event.preventDefault();
};

export const isValidNationalCode = (value: string): boolean => {
  if (!value) return false;
  if (value.length !== 10 || /(\d)(\1){9}/.test(value)) return false;

  let sum = 0;
  const chars = value.split('');

  for (let i = 0; i < 9; i += 1) sum += +chars[i] * (10 - i);

  let lastDigit = null;
  const remainder = sum % 11;

  lastDigit = remainder < 2 ? remainder : 11 - remainder;

  return +chars[9] === lastDigit;
};

export const isValidLegalNationalCode = (code: string): boolean => {
  if (!code) return true;
  const L = code.length;

  if (L < 11 || parseInt(code, 10) === 0) return false;

  if (parseInt(code.substr(3, 6), 10) === 0) return false;
  const c = parseInt(code.substr(10, 1), 10);
  const d = parseInt(code.substr(9, 1), 10) + 2;
  const z = [29, 27, 23, 19, 17];
  let s = 0;
  for (let i = 0; i < 10; i++) s += (d + parseInt(code.substr(i, 1), 10)) * z[i % 5];
  s %= 11;
  if (s === 10) s = 0;
  return c === s;
};

export const isValidPlaque = (value: string): boolean => {
  if (!value) return true;
  if (
    value.startsWith('/') ||
    value.endsWith('/') ||
    value.startsWith('-') ||
    value.includes('.') ||
    value.endsWith('-') ||
    value.startsWith('0')
  )
    return false;
  return true;
};

export const fetchDataQueryCreator = (
  query: AnyObject,
  fields: AnyObject,
  filterDto: string,
  search: (modelName: string, params: any) => Promise<any>,
  searchPath: string,
  historyFilters?: AnyObject,
): Promise<any> =>
  new Promise((resolve, reject) => {
    const filters: AnyObject = {};
    if (query && Array.isArray(query.filters)) {
      query.filters.forEach((c) => {
        if (c.column.field === 'enabled') {
          lodash.set(filters, c.column.field, c.value === 'checked' || c.value === 'true');
        }
        if (c.column.field === 'updatedOn') {
          if (moment(c.value.from, 'YYYY-MM-DD', true).isValid() || moment(c.value.to, 'YYYY-MM-DD', true).isValid()) {
            lodash.set(
              filters,
              'updatedOnFrom',
              moment(`${c.value.from || '1000-01-01'} 00:00:00`).format('YYYY-MM-DD HH:mm:ss'),
            );
            lodash.set(
              filters,
              'updatedOnTo',
              moment(`${c.value.to || '9999-09-09'} 23:59:59`).format('YYYY-MM-DD HH:mm:ss'),
            );
          }
        } else if (c.column.field === 'createdOn') {
          if (moment(c.value.from, 'YYYY-MM-DD', true).isValid() || moment(c.value.to, 'YYYY-MM-DD', true).isValid()) {
            lodash.set(
              filters,
              'createdOnFrom',
              moment(`${c.value.from || '1000-01-01'} 00:00:00`).format('YYYY-MM-DD HH:mm:ss'),
            );
            lodash.set(
              filters,
              'createdOnTo',
              moment(`${c.value.to || '9999-09-09'} 23:59:59`).format('YYYY-MM-DD HH:mm:ss'),
            );
          }
        } else lodash.set(filters, c.column.field, Array.isArray(c.value) && c.value.length === 0 ? null : c.value);
      });
    }
    Object.keys(filters).forEach((prop) => {
      if (filters[prop] === '-1') {
        delete filters[prop];
      }
    });
    if (filters.enabled === 'checked') {
      filters.enabled = 'true';
    }
    if (filters.enabled === 'unchecked') {
      filters.enabled = 'false';
    }
    let sortFieldQuery = query?.orderBy?.field || 'createdOn';
    if (query?.orderBy?.field.includes('personnelFullName')) {
      sortFieldQuery = query?.orderBy?.field.replace('personnelFullName', 'person.firstName,person.lastName');
    }
    if (query?.orderBy?.field.includes('personFullName')) {
      const firstQuery = query?.orderBy?.field.replace('personFullName', '');
      sortFieldQuery = `${firstQuery}person.firstName,${firstQuery}person.lastName`;
    }
    if (query?.orderBy?.field.includes('fullName')) {
      const firstQuery = query?.orderBy?.field.replace('fullName', '');
      sortFieldQuery = `${firstQuery}person.firstName,${firstQuery}person.lastName`;
    }
    if (query?.orderBy?.field === 'code') {
      sortFieldQuery = 'numericCode';
    }
    const data = {
      currentPage: query?.page ? query?.page + 1 : 1,
      rowPerPage: query?.pageSize ? query?.pageSize : 200,
      sortField: sortFieldQuery,
      sortAscending: query?.orderDirection === 'asc' || false,
      enablePaging: true,
      fetchTotalRows: true,
      fields,
      filterMap: {
        suggestionQuery: query.search,
      },
      filterDto: {
        '@class': `com.lafarrerr.${filterDto}`,
        ...historyFilters,
        ...filters,
      },
    };
    search(searchPath, data)
      .then((response) => {
        const { results } = response.data;
        const { totalRows } = response.data;
        if (results.length === 0 && lodash.get(query, 'page') > 0)
          resolve(
            fetchDataQueryCreator(
              { ...query, page: parseInt(lodash.get(query, 'page'), 10) - 1 },
              fields,
              filterDto,
              search,
              searchPath,
            ),
          );
        resolve({
          data: results,
          // eslint-disable-next-line no-param-reassign
          page: query ? query.page++ : 1,
          totalCount: totalRows,
        });
      })
      .catch((err) => reject(err));
  });

export const convertKeyedObjectToArray = (obj: AnyObject, key: string, value: string): AnyObject[] => {
  const result: AnyObject[] = [];
  Object.keys(obj).forEach((k) => {
    result.push({ [key]: k, [value]: obj[k] });
  });
  return result;
};
export const convertArrayToKeyedObject = (array: any[] = [], key = 'key', value = 'value'): AnyObject => {
  let result = {};
  if (array && Array.isArray(array))
    array.forEach((item) => {
      result = { ...result, [lodash.get(item, key)]: lodash.get(item, value) };
    });
  return result;
};
export const convertArrayToKeyedObjects = (
  array: any[] = [],
  key = 'key',
  value = 'value',
  value_1 = 'value',
  seperator = ' ',
): AnyObject => {
  let result = {};
  if (array && Array.isArray(array))
    array.forEach((item) => {
      result = {
        ...result,
        [lodash.get(item, key)]: `${lodash.get(item, value)} ${seperator} ${lodash.get(item, value_1)}`,
      };
    });
  return result;
};
export const onChangeForBComponents = <T extends Record<string, unknown>>(
  e: AnyObject,
  setValue: SetValue,
  get: T,
  set: Dispatch<SetStateAction<T>>,
): void => {
  const { currentTarget: input } = e;
  const myForm = { ...get };
  if (input.value === '') input.value = null;
  lodash.set(myForm, input.name, input.value);
  setValue(input.name, input.value);
  set(myForm);
};

export const setValues = (setValue: SetValue, item: AnyObject): void => {
  if (item)
    Object.keys(item).forEach((element) => {
      setValue(element, item[element]);
    });
};

export const onChangeTable = (name: string, value: unknown): { currentTarget: { name: string; value: unknown } } => ({
  currentTarget: {
    name,
    value,
  },
});

export const removeTableData = (value: AnyObject | AnyObject[]): any[] => {
  const returnData: any[] = [];
  if (Array.isArray(value))
    value.forEach((element) => {
      const elCopy = { ...element };
      delete elCopy.tableData;
      returnData.push(elCopy);
    });
  return returnData;
};

export const removeTableDataAndConvertIdToInteger = (value: AnyObject[]): any[] | undefined => {
  if (value) {
    const returnData: any[] = [];
    value.forEach((element) => {
      const elCopy = { ...element };
      if (lodash.get(elCopy, 'consultant.id')) {
        lodash.set(elCopy, 'consultant.id', parseInt(lodash.get(elCopy, 'consultant.id'), 10));
      }
      if (lodash.get(elCopy, 'brand.id')) {
        lodash.set(elCopy, 'brand.id', parseInt(lodash.get(elCopy, 'brand.id'), 10));
      }
      if (lodash.get(elCopy, 'dayCount')) {
        lodash.set(elCopy, 'dayCount', parseInt(lodash.get(elCopy, 'dayCount'), 10));
      }
      if (lodash.get(elCopy, 'post')) lodash.set(elCopy, 'post.id', parseInt(lodash.get(elCopy, 'post.id'), 10));
      if (lodash.get(elCopy, 'internationalTerritory'))
        lodash.set(elCopy, 'internationalTerritory.id', parseInt(lodash.get(elCopy, 'internationalTerritory.id'), 10));
      delete elCopy.tableData;
      returnData.push(elCopy);
    });
    return returnData;
  }
};

export const onCountryChanged = (
  setValue: SetValue,
  setItem: Dispatch<SetStateAction<any>>,
  country: AnyObject,
): void => {
  setItem((old: AnyObject) => ({ ...old, country: { ...old.country, ...country } }));
  setValue('country', country);
};

export const onInternationalTerritoryChanged = (
  setItem: Dispatch<SetStateAction<any>>,
  internationalTerritory: AnyObject,
): void => {
  setItem((old: AnyObject) => ({
    ...old,
    country: { ...old.country, internationalTerritory },
  }));
};

export const onAddressChanged = (
  address: AnyObject,
  setValue: SetValue,
  get: AnyObject,
  set: Dispatch<SetStateAction<any>>,
): void => {
  const form = { ...get };
  form.address = {
    latitude: 0,
    longitude: 0,
    enabled: true,
    ...address,
  };
  setValue('address.latitude', 0);
  setValue('address.longitude', 0);
  setValue('address.enabled', true);
  set(form);
};

export const processDataForTreeView = (val: AnyObject): void => {
  lodash.set(val, 'title', val.name);
  lodash.set(val, 'label', val.name);
  lodash.set(val, 'value', val.id);
  lodash.set(val, 'key', val.id);
  for (let i = 0, len = val.children?.length; i < len; i++) {
    processDataForTreeView(val.children[i]);
  }
};

export const PropTypes = _PropTypes;

export const normalizeUsPhone = (phone: string): null | string => {
  // normalize string and remove all unnecessary characters
  const phoneNumber = phone?.replace(/[^\d]/g, '');

  // check if number length equals to 10
  if (phoneNumber?.length === 10) {
    // reformat and return phone number
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }
  return null;
};
