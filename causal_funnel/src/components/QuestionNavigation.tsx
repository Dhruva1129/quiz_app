import React from "react";
import { QuizQuestion } from "../types";

interface QuestionNavigationProps {
  questions: QuizQuestion[];
  currentQuestion: number;
  onQuestionSelect: (questionIndex: number) => void;
}

export const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  questions,
  currentQuestion,
  onQuestionSelect,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        Question Overview
      </h3>
      <div className="grid grid-cols-5 gap-2">
        {questions.map((question, index) => {
          const isAnswered = question.userAnswer !== undefined;
          const isCurrent = index === currentQuestion;
          const isVisited = question.visited;

          return (
            <button
              key={question.id}
              onClick={() => onQuestionSelect(index)}
              className={`
                w-10 h-10 rounded-lg font-semibold text-sm transition-all duration-200
                ${
                  isCurrent
                    ? "bg-blue-600 text-white ring-2 ring-blue-300"
                    : isAnswered
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : isVisited
                    ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }
              `}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-600 rounded"></div>
          <span className="text-gray-600">Current Question</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
          <span className="text-gray-600">Answered</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded"></div>
          <span className="text-gray-600">Visited</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gray-100 border border-gray-300 rounded"></div>
          <span className="text-gray-600">Not Visited</span>
        </div>
      </div>
    </div>
  );
};
