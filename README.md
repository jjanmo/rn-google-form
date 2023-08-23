# Google Form Clone

## How to start

### Install & Execute

```
  yarn
```

> 프로젝트에 필요한 패키지 설치

```
  yarn start
```

> 로컬에서 실행

위 명령어를 후에 `터미널 창`에서 여러가지 명령어 셋과 QR코드를 노출합니다.

- iOS 에뮬레이터 : `i` 클릭

  > (※. xcode가 설치되었어야함)

- Android 에뮬레이터 : `a` 클릭

- 폰에서 직접 실행 : `QR코드`를 찍은 후 `Expo Go` 라는 앱으로 이동 후 실행
  > (※. Expo Go앱이 설치되었어야함)

## How to use dummy data

1. `cardSlice.ts` 파일로 이동합니다.

2. 상단에 주석처리된 부분의 주석을 제거합니다.

3. `dummyState`를 `createSlice` 안의 `initialState`에 할당합니다.

4. 추가적인 더미데이터를 만들고 싶다면, `src > dummy.ts` 파일에서 수정하시면 됩니다.

5. 혹시 새로운 더미데이터를 사용하는 경우, `activeCard`에 설문항목 중 한 개의 `아이디 값을 등록`해줘야 합니다.

6. 더미데이터 없이 테스트를 원하신다면 원래 상태, 즉 `initialState`를 유지한 채로 시작하면 됩니다.

## Project Structure

```
src
 ├── @types       : 타입 선언
 ├── components   : 컴퍼넌트 단위로 구분
 │      ├── Card  : 설문지 항목을 카드 단위로 구분하여 구성
 │      └── Form  : 미리보기에서의 항목을 타입 단위로 구분하여 구성
 ├── screens      : 스크린(페이지)
 ├── store        : slice(reducer, action) 등 상태관리 관련 코드
 └── styles       : 스타일 관련 코드
```

## Component Structure & Logic

- 설문지 항목 분류

  > 용도와 기능에 따라서 분류

  - TitleCard : 설문 상단의 설문지 전체 제목 항목

  - SurveyCard : 설문 타입별 항목

    - TextCard : 텍스트를 쓸 수 있는 설문 항목

    - SelectCard : 체크박스, 라디오버튼을 사용할 수 있는 설문 항목

- 설문 항목 CRUD

  - 설문 항목 추가/삭제 : `active card(현재 포커싱된 카드)` 기준으로 추가/삭제가 이루어집니다.
  - 설문 항목의 CRUD는 모두 mutable한 방식으로 이루어지는데, 이는 RTK(redux toolkit) 내부적으로 immer를 사용하기 때문에 가능합니다. 그래서 코드 작성시 직관적이고 편리한 mutable한 코드를 사용하였습니다. (`cardSlice.ts` 파일)

- 미리보기 스크린

  - ~~입력값에 대한 상태관리는 이루어지지 않고 설문 항목에 맞는 UI로 노출만 되는 상태입니다.~~

  - 입력 후 제출 가능합니다. 입력 폼 상태 관리는 react-hook-form을 이용하였고, 제출 후에 form상태를 리셋시킵니다. 대신 해당 결과값은 redux에 저장하여 관리합니다.

- 응답보기 스크린

  - 해당 스크린은 응답값이 있는 경우에만 노출됩니다.

  - 응답값과 이에 매칭되는 설문 정보(질문/선택옵션)을 노출합니다.

## Features

> 구현하지 않아도 되는 기능에 대해선 🔥 이모지 체크( + 좀 더 해보고 싶었던 부분)

- [x] 설문 전체 제목/설명 편집
- [x] 설문 추가 → 추가시 기본값은 `객관식 질문` 타입
- [x] 설문 제목 편집
- [x] 설문 타입 설정 → `Action Sheet` 이용
- [x] 설문 객관식 질문/체크박스 타입의 경우 `옵션` 추가/편집/삭제 가능
- [x] 설문 필수 옵션 설정
- [x] 설문 항목 복제(복사)
- [x] 설문 항목 삭제
- [x] 미리보기 스크린 → `react-native-navigation(Top Tabs Navigator)`의 이용
- [x] 미리보기에서 설문 상태(폼 상태) 관리 가능
- [x] 제출 버튼 🔥
- [x] 설문 항목 추가/삭제시 해당 포커싱되는 설문항목으로 스크롤 이동 🔥
- [x] 응답보기(응답한 결과를 보는 스크린) 🔥
- [x] 응답 초기화 버튼 🔥
- [ ] 설문 항목 드래그앤드랍 🔥
- [ ] 설문 및 응답 저장 : 다시 들어왔을 때 기존 응답을 볼 수 있도록 🔥

> 응답보기 스크린을 추가하게되면서

## 보완하고 싶은 부분

- 아직 구현하지 못한 부분들...🙃

- 상태 관리 측면

  - 이슈

    응답보기 스크린을 만들면서 응답값과 카드값을 매칭하여 결과값을 노출해주는 로직으로 구현하였습니다. 그 과정에서 설문항목을 담고있는 state(`cards.data`)를 그대로 가져와서 사용하였는데, 문제는 해당 state를 변경하는 경우(응답값이 있을 때, 설문항목을 추가/수정/복제 하는 경우) 응답보기 스크린에도 변경이 일어나는 오류가 생겼습니다.

  - 보완

    설문을 제출할 때, 그 당시의 설문항목을 담고 있는 state(`answers.prevCards`)를 생성하여 제출한 결과값과 싱크가 맞는 설문항목을 담을 수 있게 만들었습니다. 그래서 응답보기 스크린에서는 **딱 결과값에 맞는 state만을 구독**하여 사용할 수 있게 하였습니다.

    - 위 방법의 아쉬운 점은 중복된 정보가 두군데(cards, answers)에 중복되어 저장되어 있다는 점입니다. 위 방법 외에도 몇가지 생각한 방법들에 대해서 고민이 필요해보입니다.

  - [추가] 응답보기 스크린에서 `if (cards.length < 2)` 때문에 cards state를 가져와서 사용할 수 밖에 없는 상태입니다. 이 부분 때문에 cards의 변경으로 인해 응답보기 스크린에서 리랜더링이 일어나게 됩니다. (단, 위의 문제와 다르게 컨텐츠와는 연관이 없어서 내용적으로 이슈는 없는 상태입니다.) 제가 위에서 의도한바로 수정하기위해선 보안이 필요해보입니다.

- 컴퍼넌트 측면

  중복된 컴퍼넌트들이 많이 보입니다. 처음부터 좀 더 체계적으로 컴퍼넌트를 설계하지 못한 부분도 있는 것 같습니다. 카드(설문항목) / 폼(input) 구성으로 나누었지만 이렇게 분리된 둘 사이에서도 중복되는 부분이 있는 것 같아서 어떤 식으로 추상화를 시켜야할지 고민이 됩니다.

- 스타일 코드

  스타일 코드를 좀 더 가독성 있게 변경할 수 있는 방법은 없을지 고민입니다. 스타일 코드만 분리한다고 좋아지는 문제일지... 🤔

- 약간 미묘한 부분들

  - 설문 항목을 포커싱할 때, 해당 항목으로 스크롤을 이동할 수 있게하는 기능을 넣었는데, 특정 구간에서 제대로 동작하지 않는 것을 경험했습니다. 엄청 크리티컬한 부분은 아닐지라도 사용자 경험 관점에서 좀 더 편리한 기능을 제공하기 위한 수단으로 넣었던 부분인데, 아쉽습니다.

- 배포

  - 실제 배포라기보다 expo에서 제공하는 테스트용 퍼블리싱 기능이 있는걸로 알고 있어서 찾아봤는데, 웹으로는 가능해보이는데, 앱으로는 가능한지 잘 모르겠습니다. 예전 버전에서는 가능한걸 봤는데, 현재 버전에서는 가능한지는 좀 더 찾아봐야할 것 같습니다. 앱 테스트는 에뮬레이터보다 실제기기로 하는게 더 정확하다는 생각이 들어서...
