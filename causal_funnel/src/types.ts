export interface Question {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizQuestion extends Question {
  id: number;
  choices: string[];
  userAnswer?: string;
  visited: boolean;
}

export interface QuizState {
  email: string;
  questions: QuizQuestion[];
  currentQuestion: number;
  timeRemaining: number;
  isCompleted: boolean;
  startTime: number;
}

export interface ApiResponse {
  response_code: number;
  results: Question[];
}
