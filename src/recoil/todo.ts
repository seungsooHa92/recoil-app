import { atom, selector } from 'recoil';
import { ITodo } from 'src/types';
import { Repository } from './repository';
import WeatherModel from './weatherModel';
/**
 * @function localStorageEfffect
 * @param key : localStorage의 key
 * @param setSelf: atom의 값을 초기화 해주는 함수
 * @param onSet : atom의 값이 변경되었을때 실행되는 함수
 *
 */
const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);

    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any, _: any, isReset: boolean) => {
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const editState = atom<boolean>({
  key: 'editState',
  default: false
});

export const todoState = atom<ITodo[]>({
  key: 'todos',
  default: [],
  effects: [localStorageEffect('todoRecoil')]
});

export const viewingId = atom<string>({
  key: 'viewingId',
  default: null
});

export const viewingTodo = atom<ITodo>({
  key: 'viewingTodo',
  default: null
});

export const clickedTodo = selector<ITodo>({
  key: 'clicedTodo',
  get: ({ get }) => {
    const todoList = get(todoState);
    const viewingTodoId = get(viewingId);
    return todoList.find(todo => todo.id === viewingTodoId);
  }
});

export const weatherList = selector<Array<WeatherModel>>({
  key: 'weathers',
  get: async ({ get }) => {
    const weathers = await Repository.getWeatherList();
    return weathers;
  }
});

export const todayWeather = selector<WeatherModel>({
  key: 'todayWeather',
  get: ({ get }) => {
    const weathers = get(weatherList);
    return weathers[0];
  }
});
