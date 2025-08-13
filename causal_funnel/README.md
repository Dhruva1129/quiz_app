# Quiz Web Application

A modern, responsive quiz application built with React and TypeScript that fetches questions from the OpenTDB API.

## Features

✅ **Email Authentication**: Users must provide email to start quiz  
✅ **15 Questions**: Fetched from OpenTDB API with multiple categories  
✅ **30-minute Timer**: Countdown timer with auto-submit functionality  
✅ **Question Navigation**: Jump to any question with visual indicators  
✅ **Progress Tracking**: Shows visited and answered questions  
✅ **Results Report**: Side-by-side comparison of user vs correct answers  
✅ **Responsive Design**: Works on desktop, tablet, and mobile  
✅ **Modern UI**: Clean design with Tailwind CSS  

## Requirements Met

### Quiz Layout & Flow
- ✅ Start page with email submission
- ✅ 15 questions displayed one at a time
- ✅ 30-minute countdown timer at the top
- ✅ Auto-submit when timer reaches zero

### Navigation
- ✅ Navigate to specific questions via overview panel
- ✅ Visual indicators for visited questions
- ✅ Visual indicators for attempted questions

### End of Quiz
- ✅ Report page showing user vs correct answers
- ✅ Side-by-side comparison format
- ✅ Score calculation and percentage

### Data Source
- ✅ Fetches from https://opentdb.com/api.php?amount=15
- ✅ Uses `question` parameter for display
- ✅ Combines `correct_answer` and `incorrect_answers` for choices
- ✅ Uses `correct_answer` for validation

## Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/           # React components
│   ├── StartPage.tsx    # Email entry page
│   ├── QuestionCard.tsx # Individual question display
│   ├── QuestionNavigation.tsx # Question overview panel
│   ├── Timer.tsx        # Countdown timer
│   └── ReportPage.tsx   # Results display
├── hooks/
│   └── useTimer.ts      # Custom timer hook
├── api.ts               # OpenTDB API integration
├── types.ts             # TypeScript interfaces
├── App.tsx              # Main application component
└── index.tsx            # Application entry point
```

## Technologies Used

- **React 18** - Frontend framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling and responsive design
- **OpenTDB API** - Quiz questions source

## Usage

1. **Start Quiz**: Enter your email address on the welcome page
2. **Answer Questions**: Select answers from multiple choice options
3. **Navigate**: Use the overview panel to jump between questions
4. **Monitor Time**: Keep track with the countdown timer
5. **Review Results**: View detailed results with correct answers

## Features in Detail

### Timer System
- Displays remaining time in MM:SS format
- Changes color to red when 5 minutes remain
- Auto-submits quiz when time expires
- Visual pulse indicator when running

### Question Navigation
- Grid layout showing all 15 questions
- Color-coded status indicators:
  - Blue: Current question
  - Green: Answered
  - Yellow: Visited but not answered
  - Gray: Not visited

### Results Page
- Overall score and percentage
- Question-by-question breakdown
- Side-by-side answer comparison
- Motivational messages based on performance

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## API Integration

The app integrates with the Open Trivia Database API:
- Endpoint: `https://opentdb.com/api.php?amount=15`
- Handles HTML entity decoding
- Randomizes answer choices
- Error handling for network issues

## Responsive Design

- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly interface
- Optimized for all screen sizes
