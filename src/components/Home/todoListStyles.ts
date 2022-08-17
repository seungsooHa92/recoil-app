import styled from 'styled-components';
import { TitleProps } from '../../types';

export const TodoLayout = styled.div`
  background: white;
  height: 400px;
`;
export const AddButton = styled.button`
  background: #13bd7e;
  color: white;
  border: 0;
  width: 100%;
  height: 48px;
  border-radius: 8px;
  margin-bottom: 5px;
`;

export const TodoListWrap = styled.div`
  margin-top: 15px;
  height: 320px;
  overflow-y: scroll;
  background: #eeefef;
`;

export const TodoItem = styled.div`
  width: 100%;
  font-size: 14px;
`;

export const TodoItemInner = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  hieght: 24px;
`;
export const CheckBoxWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10%;
  height: 100%;
`;

export const CheckBox = styled.input`
  width: 16px;
  height: 16px;
  background: #13bd7e;
  border: 0px;
  border-radius: 9px;
  margin-right: 10px;
`;

export const Title = styled.span<TitleProps>`
  text-decoration: ${props => (props.isComplete ? 'line-through' : 'none')};
  display: flex;
  color: ${props => (props.isExpired ? 'red' : 'black')};
  align-items: center;
  width: 85%;
`;

export const Due = styled.div<Partial<TitleProps>>`
  color: ${props => (props.isExpired ? 'red' : 'black')};
  width: 85%;
`;

export const DeleteIcon = styled.div`
  width: 10%;
  height: 40px;
  display: flex;
  align-items: center;
  cursor: grab;
  justify-content: center;
  padding-right: 10px;
`;
