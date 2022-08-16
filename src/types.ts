export interface AppSize {
  height: number;
}

export interface CompleteProps {
  isComplete: boolean;
}

export interface ITodo {
  id: string;
  isComplete: boolean;
  title: string;
  content: string;
  dueDate: Date | null;
}
