import {
  capitalize,
  truncate,
  removeWhitespace,
  toKebabCase,
  reverse,
} from './string-helper';

describe('string-helper', () => {
  describe('capitalize', () => {
    it('첫 글자를 대문자로 변환해야 한다', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('world')).toBe('World');
    });

    it('빈 문자열이나 한 글자 문자열도 처리해야 한다', () => {
      expect(capitalize('')).toBe('');
      expect(capitalize('a')).toBe('A');
    });

    it('이미 대문자로 시작하는 문자열은 그대로 반환해야 한다', () => {
      expect(capitalize('Hello')).toBe('Hello');
    });

    it('빈 문자열과 한 글자 문자열도 처리해야 한다', () => {
      expect(capitalize('')).toBe('');
      expect(capitalize('a')).toBe('A');
    });
  });

  describe('truncate', () => {
    it('지정된 길이로 문자열을 자르고 말줄임표를 추가해야 한다', () => {
      expect(truncate('Hello World', 5)).toBe('Hello...');
      expect(truncate('JavaScript', 4)).toBe('Java...');
    });

    it('문자열이 지정된 길이보다 짧으면 그대로 반환해야 한다', () => {
      expect(truncate('Hi', 5)).toBe('Hi');
      expect(truncate('', 3)).toBe('');
    });

    it('빈 문자열과 한 글자 문자열도 처리해야 한다', () => {
      expect(truncate('', 3)).toBe('');
      expect(truncate('a', 3)).toBe('a');
    });
  });

  describe('removeWhitespace', () => {
    it('모든 공백을 제거해야 한다', () => {
      expect(removeWhitespace('Hello World')).toBe('HelloWorld');
      expect(removeWhitespace('   spaces   everywhere   ')).toBe(
        'spaceseverywhere',
      );
    });

    it('탭과 줄바꿈도 제거해야 한다', () => {
      expect(removeWhitespace('Hello\tWorld\n!')).toBe('HelloWorld!');
    });

    it('빈 문자열과 한 글자 문자열도 처리해야 한다', () => {
      expect(removeWhitespace('')).toBe('');
      expect(removeWhitespace('a')).toBe('a');
    });
  });

  describe('toKebabCase', () => {
    it('카멜케이스를 케밥-케이스로 변환해야 한다', () => {
      expect(toKebabCase('helloWorld')).toBe('hello-world');
      expect(toKebabCase('HelloWorld')).toBe('hello-world');
    });

    it('공백과 언더스코어를 하이픈으로 변환해야 한다', () => {
      expect(toKebabCase('hello world')).toBe('hello-world');
      expect(toKebabCase('hello_world')).toBe('hello-world');
    });

    it('연속된 구분자를 단일 하이픈으로 변환해야 한다', () => {
      expect(toKebabCase('hello__world')).toBe('hello-world');
      expect(toKebabCase('hello  world')).toBe('hello-world');
    });

    it('빈 문자열과 한 글자 문자열도 처리해야 한다', () => {
      expect(toKebabCase('')).toBe('');
      expect(toKebabCase('a')).toBe('a');
    });
  });

  describe('reverse', () => {
    it('문자열을 뒤집어야 한다', () => {
      expect(reverse('hello')).toBe('olleh');
      expect(reverse('world')).toBe('dlrow');
    });

    it('특수문자와 공백이 포함된 문자열도 뒤집어야 한다', () => {
      expect(reverse('hello!')).toBe('!olleh');
      expect(reverse('hi there')).toBe('ereht ih');
    });

    it('빈 문자열과 한 글자 문자열도 처리해야 한다', () => {
      expect(reverse('')).toBe('');
      expect(reverse('a')).toBe('a');
    });
  });
});
