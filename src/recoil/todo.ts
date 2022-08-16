import axios from 'axios';
import { atom, selector } from 'recoil';
import { ITodo } from 'src/types';
import { API } from './repository';
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

export const clickedTodo = selector({
  key: 'clicedTodo',
  get: ({ get }) => {
    const todoList = get(todoState);
    const viewingTodoId = get(viewingId);
    return todoList.find(todo => todo.id === viewingTodoId);
  }
});

// export const weatherList = atom<Array<WeatherModel>>({
//   key: 'weathers',
//   default: []
// });

export const weatherList = selector<Array<WeatherModel>>({
  key: 'weathers',
  get: async ({ get }) => {
    try {
      const { data, status } = await axios.get(
        'https://openweathermap.org/data/2.5/onecall?lat=37.5683&lon=126.9778&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02'
      );
      data.daily.pop();
      return data.daily.map(dayWeather => new WeatherModel(dayWeather));
    } catch (err) {
      throw err;
    }
  }
});
