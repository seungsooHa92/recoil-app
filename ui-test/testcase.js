const TC = {
  'header-text': {
    scenario: '헤더 영역의 텍스트 값을 확인',
    required: 'THIS WEEK신나는 일주일을 계획합시다!',
    result: ''
  },
  'get-weather': {
    scenario: '받아온 날씨 데이터를 확인',
    required: '오늘',
    result: ''
  },
  'todo-create-1': {
    scenario: 'to-do 일정 하나의 생성을 확인',
    required: '이번주 할일 1',
    result: ''
  },
  'todo-create-2': {
    scenario: 'to-do 일정 두개의 생성을 확인',
    required: '이번주 할일 2',
    result: ''
  },
  'todo-delete': {
    scenario: 'to-do 일정 삭제 확인',
    required: '이번주 할일 1',
    result: ''
  },
  'edit-mode-on': {
    scenario: '일정 클릭시 편집모드 todo 상세보기 화면으로 전환되는지 확인',
    required: 'To-Do',
    result: ''
  },
  'todo-update': {
    scenario: '일정 업데이트가 정상 반영되는지 확인',
    required: {
      title: '이번주 할일1 -> 1*',
      content: '이번주 할일1 내용을 편집했습니다.'
    },
    result: ''
  }
};

module.exports = { TC };
