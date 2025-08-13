import { Question, QuizQuestion, ApiResponse } from './types';

export const fetchQuizQuestions = async (): Promise<QuizQuestion[]> => {
  try {
    const response = await fetch('https://opentdb.com/api.php?amount=15');
    const data: ApiResponse = await response.json();
    
    if (data.response_code !== 0) {
      throw new Error('Failed to fetch questions');
    }

    return data.results.map((question: Question, index: number) => ({
      ...question,
      id: index + 1,
      choices: shuffleArray([...question.incorrect_answers, question.correct_answer]),
      visited: false,
      question: decodeHtmlEntities(question.question),
      correct_answer: decodeHtmlEntities(question.correct_answer),
      incorrect_answers: question.incorrect_answers.map(answer => decodeHtmlEntities(answer))
    }));
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    throw error;
  }
};

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const decodeHtmlEntities = (text: string): string => {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
};
