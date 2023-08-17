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
  - 설문 항목의 CRUD는 모두 mutable한 방식으로 이루어지는데, 이는 RTK(redux toolkit) 내부적으로 immmer를 사용하기 때문에 가능합니다. 그래서 코드 작성시 직관적이고 편리한 mutable한 코드를 사용하였습니다. (`cardSlice.ts` 파일)

- 미리보기 페이지
  - 입력값에 대한 상태관리는 이루어지지 않고 설문 항목에 맞는 UI로 노출만 되는 상태입니다.

## Features

> 구현하지 않아도 되는 기능에 대해선 🔥 이모지 체크

- [x] 설문 추가 → 추가시 기본값은 `객관식 질문` 타입
- [x] 설문 제목 편집
- [x] 설문 타입 설정 → `Action Sheet` 이용
- [x] 설문 객관식 질문/체크박스 타입의 경우 `옵션` 추가/편집/삭제 가능
- [x] 설문 필수 옵션 설정
- [x] 설문 항목 복제(복사)
- [x] 설문 항목 삭제
- [x] 미리보기 스크린 → `react-native-navigation(Top Tabs Navigator)`의 이용
- [x] 설문 전체 제목/설명 편집 🔥
- [ ] 제출 버튼 🔥
- [ ] 설문 항목 드래그앤드랍 🔥
- [x] 설문 항목 추가/삭제시 해당 포커싱되는 설문항목으로 스크롤 이동 🔥
