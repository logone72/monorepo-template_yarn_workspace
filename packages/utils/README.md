# @test/utils

test utils

## 프로젝트 구조

- `src` : 소스 코드 (ts)
- `dist` : 빌드 결과물
  - `yarn workspace @test/utils build` 명령어를 실행하면 `src` 폴더의 파일들이 빌드되어 `dist` 폴더로 복사됩니다.

패키지 배포시 dist 폴더의 파일들이 배포됩니다.

```json
{
  // package.json
  "main": "dist/index.js",
  "types": "dist/index.d.ts"
}
```
