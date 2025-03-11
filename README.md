# monorepo-template

`yarn workspace` 및 `lerna`를 사용하여 구성된 모노레포 템플릿입니다.

## 목차

- [프로젝트 목록](#프로젝트-목록)
- [초기 설정](#초기-설정)
  - [패키지 매니저 설치](#패키지-매니저-설치)
  - [VSCode 설정](#vscode-설정)
- [배포 방법](#배포-방법)
- [오류 해결](#오류-해결)

<br>

## 프로젝트 목록

- `packages/utils` - 테스트용 공통 함수 패키지입니다.
- `packages/example` - 테스트용 패키지입니다.

세부 내용은 각 패키지의 README.md를 참고해주세요.

<br>

## 초기 설정

다음 **초기 설정은 필수**입니다.

### 패키지 매니저 설치

[yarn - install 공식 문서](https://yarnpkg.com/getting-started/install)

- yarn@4.6.0
- node v22.14.0

```bash
# https://yarnpkg.com/corepack
corepack enable
```

> **Warning**
> global로 yarn이 설치되어있다면 삭제하는 것을 권장합니다. [공식 문서](https://yarnpkg.com/getting-started/install)
> brew 등으로 설치된 yarn이 있다면 삭제해야 corepack에 포함된 yarn을 사용할 수 있습니다.

<br>

### VSCode 설정

#### 1. [ZipFS](https://marketplace.visualstudio.com/items?itemName=arcanis.vscode-zipfs) 확장 프로그램 (vscode extension) 설치

먼저, Yarn 팀이 유지보수하는 ZipFS 확장을 설치하세요.

#### 2. VSCode 설정 파일 생성

다음 명령어를 실행하면 .vscode/settings.json 파일이 생성됩니다:

```bash
yarn dlx @yarnpkg/sdks vscode
```

#### 3. TypeScript 버전 설정 활성화

안전상의 이유로 VSCode는 커스텀 TypeScript 설정을 명시적으로 활성화할 것을 요구합니다. 아래 단계를 따라주세요:

1. Ctrl+Shift+P를 눌러 명령 팔레트를 엽니다. (TypeScript 파일에서)
2. **"Select TypeScript Version"** 을 선택합니다.
3. **"Use Workspace Version"** 을 선택합니다.

이제 VSCode 프로젝트는 평소 사용하던 TypeScript 버전과 동일한 버전을 사용하도록 구성되었으며, 타입 정의를 올바르게 해석할 수 있습니다.

[공식문서](https://yarnpkg.com/getting-started/editor-sdks#vscode)

<br>

## 배포 방법

1. `main` 브랜치에 수정사항을 `push` 합니다.
2. `yarn run patch` 명령어를 실행하면 버젼이 올라가는 `commit` 및 `tag`가 생성되며, `origin`에 자동으로 `push`됩니다.
   1. `yarn run patch` 시 자동으로 필요한 빌드 명령어들을 모두 수행합니다. 이때 변경사항이 있으면 버젼 패치가 중단됩니다. 해당 변경사항까지 커밋 후 다시 명령어를 실행해야 합니다.
      1. 각 패키지마다 배포전 실행되어야하는 명령어는 패키지의 `package.json`에 `scripts`로 `build`에 추가해주세요.
3. github action에서 `tag` 커밋으로 트리거되어 배포가 시작됩니다.
   1. 자세한 내용은 `.github/workflows/release.yml`을 참고해주세요.

```bash
yarn run patch
```

### 배포 버젼 관리 툴 - lerna

[lerna 공식문서](https://lerna.js.org/docs/getting-started)

현재 프로젝트는 `lerna`를 사용하여 버젼을 관리하고 있습니다.

```bash
# 패키지 버젼 올리기 (private 패키지 제외)
yarn lerna version --no-private

# 패키지 배포하기
yarn lerna publish from-git --no-private --no-git-reset
```

<br>

## 개발 가이드

### yarn workspace

```bash
# 특정 패키지 명령어 실행
yarn workspace {패키지명} {명령어}
## 예시
yarn workspace @test/utils install something

# 모든 패키지마다 명령어 실행
yarn workspaces foreach -A {명령어}
## 예시
yarn workspaces foreach -A install something
```

### typescript

일부 프로젝트의 경우 ts가 적용되어있습니다.

```bash
# 패키지 빌드
yarn build-all
```

### jest 테스트 라이브러리

jest를 통해 테스트 코드가 작성되었습니다.

```bash
# 테스트 실행
yarn run test-all

## 특정 패키지만 테스트 실행
yarn workspace {패키지명} run jest
```

<br>

## 오류 해결

### VSCode - `JS/TS language service immediately crashed 5 times`

```
The JS/TS language service immediately crashed 5 times.
The service will not be restarted.

try disabling these extensions before filing an issue against VS Code.
```

<br>

#### 해결 방법

yarn berry pnp 환경에서 ts `5.4.4+` 버젼을 사용하면 발생합니다.

아래 해결 방법을 시도해보세요.

1. Uncheck "Experimental: Use Vs Code Watcher" checkbox in VS Code Settings / Extensions / Typescript / Tsserver. [출처](https://github.com/microsoft/vscode/issues/212731)
2. Restart VS Code.

위 방법이 안될 경우

1. `.vscode/settings.json` 파일을 생성하고 아래 내용을 추가합니다.[출처](https://log.somni.one/tsserver-crash-on-vscode-monorepo/)

```json
{
  "typescript.tsserver.experimental.useVsCodeWatcher": false
}
```
