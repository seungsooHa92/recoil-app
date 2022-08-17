import Calendar from 'react-calendar';
import styled from 'styled-components';

export const TodoTitleInput = styled.input`
  width: 100%;
  border: 0;
  height: 40px;
  background: #13bd7e66;
`;

export const TodoContent = styled.textarea`
  width: 100%;
  border: 0;
  background: #13bd7e66;
  height: 160px;
  resize: none;
`;
export const StyledCalendar = styled(Calendar)`
  width: 100%;
  border: 0;
  height: 100%;
  .react-calendar__tile {
    max-width: 100%;
    padding: 10px 6.6667px;
    background: none;
    text-align: center;
    line-height: 16px;
    font-weight: bold;
  }
  .react-calendar__tile--now {
    background: #13bd7e66;
  }
`;

export const DateContent = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 13px;
`;

export const SaveButton = styled.button`
  background: #13bd7e;
  color: white;
  border: 0;
  width: 100%;
  height: 48px;
  border-radius: 8px;
  margin-
`;
