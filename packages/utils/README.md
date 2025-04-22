# @test/utils

test utils

## 프로젝트 구조

- `src` : 소스 코드
- `dist` : 빌드 결과물
  - `yarn workspace @test/utils build` 명령어를 실행하면 `src` 폴더의 파일들이 빌드되어 `dist` 폴더로 복사됩니다.

패키지 배포시 dist 폴더의 파일들이 배포됩니다.


### 빌드

`esbuild` 를 이용해서 빌드됩니다.

`cjs`와 `esm` 모두 지원합니다.

```json
// package.json
"main": "dist/cjs/index.cjs",
"module": "dist/esm/index.js",
"types": "dist/@types/index.d.ts",
```