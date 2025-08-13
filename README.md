
### Approach & Components

- **Start Page**: Collects user email before beginning the quiz.
- **Quiz Page**: Displays questions, choices, and a 30-minute timer. Users can navigate between questions and see which have been visited or answered.
- **Overview Panel**: Shows all questions with status indicators (visited/answered).
- **Report Page**: After completion or when time runs out, shows each question, the user's answer, and the correct answer side-by-side.
- **State Management**: Uses React hooks and TypeScript interfaces (`QuizState`, `QuizQuestion`) for robust state tracking.
- **API Integration**: Fetches questions and formats choices from OpenTDB.

## Setup & Installation

1. **Install dependencies**
   ```sh
   npm install
   ```

2. **Start the development server**
   ```sh
   npm start
   ```

3. **Open your browser**
   Visit `http://localhost:3000` to use the app.

## Assumptions

- The user provides a valid email address to start the quiz.
- The OpenTDB API is available and returns 15 questions per request.
- All questions are multiple-choice; choices are a combination of `correct_answer` and `incorrect_answers`.
- The timer is set for 30 minutes and auto-submits when time expires.

## Challenges & Solutions

- **API Data Formatting**: The OpenTDB API returns answers in different formats (sometimes HTML encoded). We decode and sanitize all questions and answers before display.
- **Timer Accuracy**: Ensured the timer is precise and auto-submits the quiz when time runs out using React hooks.
- **Navigation & State**: Built a robust state management system to track visited and answered questions, allowing seamless navigation.
- **User Experience**: Designed a clean, responsive UI with clear feedback for navigation and completion status.
