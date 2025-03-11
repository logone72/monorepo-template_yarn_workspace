
/**
 * 문자열의 첫 글자를 대문자로 변환합니다.
 * @param {string} str - 변환할 문자열
 * @returns {string} 첫 글자가 대문자로 변환된 문자열
 */
export const capitalize = (str: string): string => {
  if (!str) return str;

  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * 문자열을 지정된 길이로 자르고 말줄임표를 추가합니다.
 * @param {string} str - 자를 문자열
 * @param {number} length - 자를 길이
 * @returns {string} 잘린 문자열과 말줄임표
 */
export const truncate = (str: string, length: number): string => {
  if (!str || str.length <= length) return str;
  return str.slice(0, length) + '...';
};

/**
 * 문자열에서 모든 공백을 제거합니다.
 * @param {string} str - 공백을 제거할 문자열
 * @returns {string} 공백이 제거된 문자열
 */
export const removeWhitespace = (str: string): string => {
  return str.replace(/\s+/g, '');
};

/**
 * 문자열을 케밥-케이스로 변환합니다.
 * @param {string} str - 변환할 문자열
 * @returns {string} 케밥-케이스로 변환된 문자열
 */
export const toKebabCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

/**
 * 문자열을 뒤집습니다.
 * @param {string} str - 뒤집을 문자열
 * @returns {string} 뒤집힌 문자열
 */
export const reverse = (str: string): string => {
  return str.split('').reverse().join('');
};
