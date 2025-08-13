import React, { useState, useEffect } from 'react';
import { StartPage } from './components/StartPage';
import { QuestionCard } from './components/QuestionCard';
import { QuestionNavigation } from './components/QuestionNavigation';
import { Timer } from './components/Timer';
import { ReportPage } from './components/ReportPage';
import { useTimer } from './hooks/useTimer';
import { fetchQuizQuestions } from './api';
import { QuizQuestion, QuizState } from './types';

const QUIZ_DURATION = 30 * 60; // 30 minutes in seconds

type AppState = 'start' | 'quiz' | 'loading' | 'report' | 'error';

function App() {
  const [appState, setAppState] = useState<AppState>('start');
  const [quizState, setQuizState] = useState<QuizState>({
    email: '',
    questions: [],
    currentQuestion: 0,
    timeRemaining: QUIZ_DURATION,
    isCompleted: false,
    startTime: 0
  });
  const [error, setError] = useState<string>('');

  const { timeRemaining, isRunning, startTimer, stopTimer, formatTime } = useTimer(
    QUIZ_DURATION,
    handleTimeUp
  );

  function handleTimeUp() {
    handleFinishQuiz();
  }

  const handleStartQuiz = async (email: string) => {
    setAppState('loading');
    setError('');
    
    try {
      const questions = await fetchQuizQuestions();
      setQuizState({
        ...quizState,
        email,
        questions: questions.map(q => ({ ...q, visited: false })),
        currentQuestion: 0,
        startTime: Date.now()
      });
      
      // Mark first question as visited
      const updatedQuestions = [...questions];
      updatedQuestions[0].visited = true;
      
      setQuizState(prev => ({
        ...prev,
        questions: updatedQuestions
      }));
      
      setAppState('quiz');
      startTimer();
    } catch (error) {
      setError('Failed to load quiz questions. Please try again.');
      setAppState('error');
    }
  };

  const handleAnswer = (answer: string) => {
    const updatedQuestions = [...quizState.questions];
    updatedQuestions[quizState.currentQuestion].userAnswer = answer;
    
    setQuizState({
      ...quizState,
      questions: updatedQuestions
    });
  };

  const handleQuestionSelect = (questionIndex: number) => {
    const updatedQuestions = [...quizState.questions];
    updatedQuestions[questionIndex].visited = true;
    
    setQuizState({
      ...quizState,
      currentQuestion: questionIndex,
      questions: updatedQuestions
    });
  };

  const handleNext = () => {
    if (quizState.currentQuestion < quizState.questions.length - 1) {
      handleQuestionSelect(quizState.currentQuestion + 1);
    } else {
      handleFinishQuiz();
    }
  };

  const handlePrevious = () => {
    if (quizState.currentQuestion > 0) {
      handleQuestionSelect(quizState.currentQuestion - 1);
    }
  };

  const handleFinishQuiz = () => {
    stopTimer();
    setQuizState({
      ...quizState,
      isCompleted: true
    });
    setAppState('report');
  };

  const handleRestart = () => {
    setQuizState({
      email: '',
      questions: [],
      currentQuestion: 0,
      timeRemaining: QUIZ_DURATION,
      isCompleted: false,
      startTime: 0
    });
    setAppState('start');
    setError('');
  };

  if (appState === 'start') {
    return <StartPage onStart={handleStartQuiz} />;
  }

  if (appState === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="card text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz questions...</p>
        </div>
      </div>
    );
  }

  if (appState === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="card text-center max-w-md">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button onClick={handleRestart} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (appState === 'report') {
    return (
      <ReportPage
        email={quizState.email}
        questions={quizState.questions}
        onRestart={handleRestart}
      />
    );
  }

  // Quiz state
  const currentQuestion = quizState.questions[quizState.currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Quiz in Progress</h1>
          <Timer timeRemaining={formatTime} isRunning={isRunning} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <QuestionCard
              question={currentQuestion}
              questionNumber={quizState.currentQuestion + 1}
              totalQuestions={quizState.questions.length}
              onAnswer={handleAnswer}
              onNext={handleNext}
              onPrevious={handlePrevious}
              isFirst={quizState.currentQuestion === 0}
              isLast={quizState.currentQuestion === quizState.questions.length - 1}
            />
          </div>

          <div className="lg:col-span-1">
            <QuestionNavigation
              questions={quizState.questions}
              currentQuestion={quizState.currentQuestion}
              onQuestionSelect={handleQuestionSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
