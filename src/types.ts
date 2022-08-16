export interface AppSize {
  height: number;
}

export interface Expired {
  isExpired: boolean;
}

export interface TitleProps {
  isComplete: boolean;
  isExpired: boolean;
}

export interface ITodo {
  id: string;
  isComplete: boolean;
  title: string;
  content: string;
  dueDate: Date | null;
}
