import React from "react";
import { QuizQuestion } from "../types";

interface ReportPageProps {
  email: string;
  questions: QuizQuestion[];
  onRestart: () => void;
}

export const ReportPage: React.FC<ReportPageProps> = ({
  email,
  questions,
  onRestart,
}) => {
  const answeredQuestions = questions.filter((q) => q.userAnswer !== undefined);
  const correctAnswers = answeredQuestions.filter(
    (q) => q.userAnswer === q.correct_answer
  );
  const score = correctAnswers.length;
  const totalQuestions = questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);

  const getScoreColor = () => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreMessage = () => {
    if (percentage >= 80) return "Excellent work!";
    if (percentage >= 60) return "Good job!";
    return "Keep practicing!";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Quiz Results
            </h1>
            <p className="text-gray-600">Results for: {email}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{score}</div>
              <div className="text-sm text-gray-600">Correct Answers</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">
                {totalQuestions}
              </div>
              <div className="text-sm text-gray-600">Total Questions</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className={`text-2xl font-bold ${getScoreColor()}`}>
                {percentage}%
              </div>
              <div className="text-sm text-gray-600">Score</div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className={`text-xl font-semibold ${getScoreColor()}`}>
              {getScoreMessage()}
            </h2>
          </div>

          <button
            onClick={onRestart}
            className="btn-primary w-full md:w-auto mx-auto block mb-8"
          >
            Take Another Quiz
          </button>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Question Review
          </h3>
          {questions.map((question, index) => (
            <div
              key={question.id}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-semibold text-gray-900">
                    Question {index + 1}
                  </h4>
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      question.userAnswer === question.correct_answer
                        ? "bg-green-100 text-green-800"
                        : question.userAnswer === undefined
                        ? "bg-gray-100 text-gray-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {question.userAnswer === question.correct_answer
                      ? "Correct"
                      : question.userAnswer === undefined
                      ? "Not Answered"
                      : "Incorrect"}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">{question.question}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">
                    Your Answer:
                  </h5>
                  <div
                    className={`p-3 rounded-lg ${
                      question.userAnswer === undefined
                        ? "bg-gray-50 border border-gray-200"
                        : question.userAnswer === question.correct_answer
                        ? "bg-green-50 border border-green-200"
                        : "bg-red-50 border border-red-200"
                    }`}
                  >
                    {question.userAnswer || "No answer provided"}
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">
                    Correct Answer:
                  </h5>
                  <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                    {question.correct_answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
