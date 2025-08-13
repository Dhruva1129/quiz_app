import React from "react";
import { QuizQuestion } from "../types";

interface QuestionCardProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onNext,
  onPrevious,
  isFirst,
  isLast,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-blue-600">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="text-xs text-gray-500 capitalize">
            {question.difficulty} • {question.category}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1">
          <div
            className="bg-blue-600 h-1 rounded-full transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
          {question.question}
        </h2>
      </div>

      <div className="space-y-3 mb-6">
        {question.choices.map((choice, index) => (
          <label
            key={index}
            className={`
              block p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
              ${
                question.userAnswer === choice
                  ? "border-blue-500 bg-blue-50 text-blue-900"
                  : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
              }
            `}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={choice}
              checked={question.userAnswer === choice}
              onChange={(e) => onAnswer(e.target.value)}
              className="sr-only"
            />
            <div className="flex items-start space-x-3">
              <div
                className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5
                ${
                  question.userAnswer === choice
                    ? "border-blue-500 bg-blue-500"
                    : "border-gray-300"
                }
              `}
              >
                {question.userAnswer === choice && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
              <span className="flex-1 text-gray-900">{choice}</span>
            </div>
          </label>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={onPrevious}
          disabled={isFirst}
          className={`btn-secondary ${
            isFirst ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previous
        </button>

        <button onClick={onNext} className="btn-primary">
          {isLast ? "Finish Quiz" : "Next"}
        </button>
      </div>
    </div>
  );
};
