# bank-salad 과제

## 실행환경

---

- yarn start
  - 클라이언트 프로젝트를 실행합니다.
- yarn ui-test
  - 클라이언트 프로젝트에대한 ui-test를 실행합니다.
  - yarn start가 실행중이어야 테스트가 가능합니다. (클라이언트 프로젝트 port가 3000 이어야합니다 )

## 프로젝트 구조

---

```jsx
├── App.tsx
├── components
│   ├── AppBody.tsx
│   ├── AppHeader.tsx
│   ├── Home(#1 화면 컴포넌트)
│   │   ├── TodoList.tsx
│   │   ├── Weather.tsx
│   │   ├── todoListStyles.ts
│   │   └── weatherStyles.ts
│   └── TodoEdit (#2 화면 관련 컴포넌트)
│       ├── TodoDetail.tsx
│       └── todoDetailStyles.ts
├── constant (라우터 구조를 담은 파일)
│   └── routePath.ts
├── context (mobx 와 함께 사용하던 컨텍스트)
│   └── RootStoreProvider.ts
├── globalStyles.ts (App 전역 스타일을 정의합니다.)
├── hook (customHook)
│   └── useLocalStorage.tsx
├── index.tsx (엔트리 파일 입니다.)
├── recoil (store)
│   ├── repository.ts (날씨 API)
│   ├── todo.ts (atom and selector)
│   └── weatherModel.ts (날씨 Model)
└── types.ts
```

## About

---

Top-down 방식으로 진행하겠습니다.

프로젝트에 두개의 화면이 존해나는 부분은 editState(recoil value) 값을 사용하여 AppBody컴포넌트에서 분기처리 하였습니다.

### **Recoil(Store)**

앱 전역 상태관리를 위하여 Recoil 라이브러리를 사용하여 구성하였습니다.

todo.ts

- editState : #1 #2 화면렌더링 구분을 위해 사용
- todoState: todolist 정보
  - attom effects를 통해 `localStorageEffect` 함수를 이용하여 앱 전역 상태뿐 아니라
    state값 변경시 localStorage에도 반영
- viewingId, viewingTodo : 현재 편집중인 일정 id / 일정 item
- clicedTodo: todoList(`atom`) 과 viewingId(`atom`)를 사용하여 클릭시 일정 정보를 반환
- weahterList: 날씨 API를 사용하여 얻은 날씨 정보
- todayWeather: weather(`atom`)로부터 얻은 오늘 날씨 정보

repository.ts

- API객체를 사용하여 날씨 정보를 조회함
  - pop()을 이용한 전처리 → 사용한 API 경우 8일 단위로 조회되기 때문
  - 과거 정보 사용이 불가하여 #1화면에서의 Weather 컴포넌트 구현의 변경이 있습니다
- WeatherModel을 사용하여 데이터 모델링

weatherModle.ts

- 날씨 데이터를 위하여 모델 클래스 정의
- getter 를 통하여 필요한 필드만 response에서 추출
  - key : list형 data 렌더링을 위해 필요한 key 프로퍼티
  - imageURL: img 태그의 src 값에 바인딩할 프로퍼티
  - temp: 온도 프로퍼티
  - krtime: UTC타임을 로컬시간으로 갖는 프로퍼티

---

### types.ts

앱에서 사용하는 데이터들의 타입을 담고있습니다.

- ITodo 일정정보들의 내부 프로퍼티정의를 위한 타입 선언

---

### UI Component

#1 화면

- Weather.tsx
  - 7일의 날씨 정보를 카드 형태로 보여줍니다.
  - 요구사항명세에 오늘이 포함된 일주일 시간 조회를 라이브러리를 통한 구현에 어려움이 있었습니다.
  - useRef 와 날씨정보를 이용하여 카드 클릭시 Scroll 기능을 추가해보았습니다 :)
  - 날씨 정보를 다시 불러올때 Suspense 컴포넌트를 사용한 동작에 부자연스러움이 있어
    useRecoilValueLodable을 사용하여 새로고침 기능을 구현하였습니다.
- TodoList.tsx
  - 추가 / 삭제 버튼 클릭
    - todoList(`atom`) 값을 (앱/스토리지)반영
  - 체크박스 클릭
    - 일정의 완료 상태를 업데이트하고 text-decoration을 변경합니다(strike)
  - 일정 아이템 클릭
    - viewingId viewingItem (`atom`) 값을 사용하여 #2화면에 필요한 데이터 생성
    - editStatus(`atom`) 사용하여 화면 전환
  - due date 오늘 또는 이전일때 isExpired 함수를 사용하여 스타일 반영

#2 화면

- TodoDetail.tsx
  - 각각 필요한 로컬 state 생성 title / content / date
  - 현재 보고있는 일정 아이템의 정보(`atom`)들을 각 로컬 state의 초기값으로 바인딩
  - 전역 상태값은 저장버튼 클릭시 업데이트
  - Input / Content
    - onChange 콜백에서 로컬 state 들을 업데이트함
  - Calendar
    - 오늘 날짜를 기본적으로 보여주고
    - 날짜 변경이 일어날씨 due-date 업데이트

## TEST

---

<aside>
💡 src/test 내부에 jest를 사용하여 unit 테스트 진행하려 했으나 
사용에 어려움이 있어 puppeteer libarary를 사용한 UI TEST 진행하였습니다.

</aside>

[Puppeteer | Puppeteer](https://pptr.dev/)

```jsx
├── constant.js
├── images (테스트 결과 이미지 파일)
│   ├── TESTCASE_to-do 일정 삭제 확인.png
│   ├── TESTCASE_to-do 일정 두개의 생성을 확인.png
│   ├── TESTCASE_to-do 일정 하나의 생성을 확인.png
│   ├── TESTCASE_일정 클릭시 편집모드 todo 상세보기 화면으로 전환되는지 확인.png
│   ├── TESTCASE_일정 업데이트가 정상 반영되는지 확인.png
│   ├── TESTCASE_받아온 날씨 데이터를 확인.png
│   ├── TESTCASE_컨텐트 입력확인.png
│   └── TESTCASE_타이틀 입력확인.png
├── index.js (테스트 러너)
├── testEditModeOn.js
├── testHeaderText.js
├── testTodoCreateOnce.js
├── testTodoCreateTwice.js
├── testTodoDelete.js
├── testTodoUpdate.js
├── testWeatherList.js
├── testcase.js (testcase 정보)
└── utils.js
```

- index 파일의 브라우저 객체 생성시 headless option은 변경 가능합니다.
- 테스트결과를 이미지 파일과 index.js 내부에서 로깅하였습니다.
- 세부 시나리오는 파일내 주석으로 남겨두었습니다
