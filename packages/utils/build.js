const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

function getEntryPoints(dir, options = {}) {
  let files = [];

  // 주어진 디렉토리 내의 파일/디렉토리 목록을 읽어옵니다.
  const items = fs.readdirSync(dir);

  items.forEach((item) => {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      // 디렉토리라면 재귀적으로 다시 탐색
      files = files.concat(getEntryPoints(fullPath, options));
    } else if (checkEndsWith(fullPath, options.includes, options.excludes)) {
      // .ts 또는 .tsx 파일이고, .test.ts 파일은 제외
      files.push(fullPath);
    }
  });

  return files;

  function checkEndsWith(str = '', includes = [], excludes = []) {
    return includes.every((include) => str.endsWith(include)) && !excludes.some((exclude) => str.endsWith(exclude));
  }
}

// 예시 사용
const entryPoints = getEntryPoints('src', {
  includes: ['.ts'],
  excludes: ['.test.ts', '.d.ts'],
});

// 공통으로 사용할 옵션들
// https://esbuild.github.io/api/#build 에서 다양한 옵션들을 확인할 수 있다.

const baseConfig = {
  entryPoints, // 컴파일할 파일
  sourcemap: true, // 소스맵 생성 여부
  minify: true,
  bundle: false, // 번들링 여부
  tsconfig: 'tsconfig.json',
};

Promise.all([
  // 한 번은 cjs
  esbuild.build({
    ...baseConfig,
    format: 'cjs',
    outExtension: {
      '.js': '.cjs',
    },
    outdir: 'dist/cjs',
  }),
  // 한 번은 esm
  esbuild.build({
    ...baseConfig,
    format: 'esm',
    outdir: 'dist/esm',
  }),
]).catch((error) => {
  console.error('\x1b[31m%s\x1b[0m', '빌드 실패: esbuild 오류가 발생했습니다.');
  console.error(error);
  process.exit(1);
});
