export interface DayPlan {
  day: number
  morning: string
  afternoon: string
  evening: string
  codingProblem: string
  difficulty: "Easy" | "Medium" | "Hard"
}

export interface WeekPlan {
  week: number
  theme: string
  description: string
  days: DayPlan[]
}

export const studyPlan: WeekPlan[] = [
  {
    week: 1,
    theme: "Foundation & Core Principles",
    description: "Solidifying the absolute basics and building your impact narrative",
    days: [
      {
        day: 1,
        morning: "Frontend Core (HTML/CSS) - Semantic HTML, Box Model, Flexbox, Grid, Responsive Design",
        afternoon: "Build a responsive profile card component from scratch",
        evening: "Practice 'Tell me about yourself' behavioral question",
        codingProblem: "Two Sum",
        difficulty: "Easy",
      },
      {
        day: 2,
        morning: "JavaScript Core - ES6+ features, Promises, async/await, DOM manipulation, Event Loop",
        afternoon: "Build application that fetches data from Pokemon API",
        evening: "Practice 'Why do you want to work here?' behavioral question",
        codingProblem: "Valid Palindrome",
        difficulty: "Easy",
      },
      {
        day: 3,
        morning: "Python Core - Data structures, decorators, context managers, threading vs multiprocessing",
        afternoon: "Write Python script using requests library to scrape webpage data",
        evening: "Focus on scripting skills",
        codingProblem: "Reverse a String",
        difficulty: "Easy",
      },
      {
        day: 4,
        morning: "Backend Core (Framework Intro) - Flask vs FastAPI philosophies, routing, request/response cycle",
        afternoon: "Set up basic FastAPI application with two GET endpoints",
        evening: "Practice 'What is your greatest strength?' behavioral question",
        codingProblem: "FizzBuzz",
        difficulty: "Easy",
      },
      {
        day: 5,
        morning: "Database Core (SQL) - SELECT, WHERE, JOINs, GROUP BY, INDEX importance",
        afternoon: "Solve beginner to intermediate SQL problems",
        evening: "Focus on database querying",
        codingProblem: "Combine Two Tables",
        difficulty: "Easy",
      },
    ],
  },
  {
    week: 2,
    theme: "Intermediate Concepts & Building",
    description: "Connecting systems and understanding the how and why behind technical choices",
    days: [
      {
        day: 1,
        morning: "Frontend (State Management) - React Context API, Redux Toolkit, Zustand",
        afternoon: "Integrate state management into React to-do list with theme switcher",
        evening: "Review state management concepts",
        codingProblem: "Valid Parentheses",
        difficulty: "Easy",
      },
      {
        day: 2,
        morning: "Backend (Data Handling) - Pydantic models, request validation, HTTPException",
        afternoon: "Add POST and PUT endpoints with Pydantic models to FastAPI app",
        evening: "Review data validation patterns",
        codingProblem: "Binary Search",
        difficulty: "Medium",
      },
      {
        day: 3,
        morning: "Database (ORMs) - SQLAlchemy Core vs ORM, connections, sessions, CRUD",
        afternoon: "Connect FastAPI to SQLite with SQLAlchemy ORM, implement User CRUD",
        evening: "Review ORM concepts and trade-offs",
        codingProblem: "First Bad Version",
        difficulty: "Easy",
      },
      {
        day: 4,
        morning: "UI/UX & Accessibility - ARIA labels, keyboard navigation, color contrast, SEO",
        afternoon: "Audit and fix accessibility issues in profile card from Week 1",
        evening: "Review accessibility best practices",
        codingProblem: "Maximum Subarray",
        difficulty: "Medium",
      },
      {
        day: 5,
        morning: "System Design Intro - Client-server model, REST API principles",
        afternoon: "Design REST API for Twitter-like clone with /tweets, /users, /follows",
        evening: "Review API design",
        codingProblem: "Insert Interval",
        difficulty: "Medium",
      },
    ],
  },
  {
    week: 3,
    theme: "Advanced Development & Performance",
    description: "Diving deeper into optimization, security, and complex features",
    days: [
      {
        day: 1,
        morning: "Frontend (Performance) - React.memo, useMemo, useCallback, code splitting, lazy loading",
        afternoon: "Profile React app bundle, implement lazy loading for large components",
        evening: "Review React performance optimization techniques",
        codingProblem: "Product of Array Except Self",
        difficulty: "Medium",
      },
      {
        day: 2,
        morning: "Backend (Performance) - Caching strategies, Redis, HTTP headers, background tasks",
        afternoon: "Add caching layer to FastAPI endpoints, implement background email task",
        evening: "Review caching trade-offs",
        codingProblem: "K Closest Points to Origin",
        difficulty: "Medium",
      },
      {
        day: 3,
        morning: "Authentication & Security - JWT tokens, OAuth2, password hashing, CORS, SQL injection",
        afternoon: "Implement JWT-based authentication in FastAPI app",
        evening: "Review security best practices",
        codingProblem: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
      },
      {
        day: 4,
        morning: "Testing - PyTest for backend, Jest with React Testing Library",
        afternoon: "Write unit tests for Pydantic models, API endpoints, and React components",
        evening: "Review testing pyramid concept",
        codingProblem: "3Sum",
        difficulty: "Medium",
      },
      {
        day: 5,
        morning: "System Design (DDIA) - Database scaling, replication, sharding/partitioning",
        afternoon: "Diagram database scaling for Twitter clone with 1000x tweet volume",
        evening: "Review database scaling strategies",
        codingProblem: "Binary Tree Level Order Traversal",
        difficulty: "Medium",
      },
    ],
  },
  {
    week: 4,
    theme: "Specialization & Integration",
    description: "Tying frontend and backend together seamlessly with advanced software patterns",
    days: [
      {
        day: 1,
        morning: "Frontend (Advanced React) - Custom hooks, compound components, render props, HOCs",
        afternoon: "Build complex custom hooks like useLocalStorage or useFetch",
        evening: "Review advanced React patterns",
        codingProblem: "Clone Graph",
        difficulty: "Medium",
      },
      {
        day: 2,
        morning: "Backend (Advanced FastAPI) - Dependency Injection, middleware, custom APIRouter",
        afternoon: "Refactor FastAPI app with dependencies, add request logging middleware",
        evening: "Review FastAPI dependency injection system",
        codingProblem: "Set Matrix Zeroes",
        difficulty: "Medium",
      },
      {
        day: 3,
        morning: "Fullstack Integration - TanStack Query (React Query) or SWR for server-state",
        afternoon: "Connect React frontend to authenticated FastAPI backend with React Query",
        evening: "Think about user experience benefits of server-state libraries",
        codingProblem: "Number of Islands",
        difficulty: "Medium",
      },
      {
        day: 4,
        morning: "Database (Advanced) - ACID properties, transactions, isolation levels, indexing",
        afternoon: "Write complex SQL query with transactions for money transfer",
        evening: "Review transaction isolation levels",
        codingProblem: "Rotting Oranges",
        difficulty: "Medium",
      },
      {
        day: 5,
        morning: "System Design (Caching) - CDN, Load Balancer, Application, Database caching",
        afternoon: "Redesign URL shortener with caching layers at every level",
        evening: "Review caching patterns (cache-aside, write-through)",
        codingProblem: "Word Search",
        difficulty: "Medium",
      },
    ],
  },
  {
    week: 5,
    theme: "Architecture & Behavioral Depth",
    description: "Focusing on high-level system design and mastering behavioral interviews",
    days: [
      {
        day: 1,
        morning: "Architecture (Microservices) - Microservices vs monoliths, inter-service communication",
        afternoon: "Diagram e-commerce platform as microservices (Auth, Product, Order, Payment)",
        evening: "Review microservice patterns and pitfalls",
        codingProblem: "Merge Intervals",
        difficulty: "Medium",
      },
      {
        day: 2,
        morning: "Architecture (Events) - Message brokers, event-driven architecture, eventual consistency",
        afternoon: "Add event publishing for user signup with worker for welcome email",
        evening: "Review synchronous vs asynchronous communication",
        codingProblem: "Time Based Key-Value Store",
        difficulty: "Medium",
      },
      {
        day: 3,
        morning: "Behavioral (STAR Method) - Prepare 5-10 key stories focusing on Impact",
        afternoon: "Prepare stories for Leadership, Conflict, Failure, Technical Challenge, Prioritization",
        evening: "Practice telling one story out loud",
        codingProblem: "LRU Cache",
        difficulty: "Medium",
      },
      {
        day: 4,
        morning: "Behavioral (PM/Stakeholder) - Trade-offs, timeline estimation, scope negotiation, mentoring",
        afternoon: "Practice pushback on requirements and complex task estimation",
        evening: "Refine behavioral answers",
        codingProblem: "Find Median from Data Stream",
        difficulty: "Hard",
      },
      {
        day: 5,
        morning: "System Design (Full) - Design Netflix, YouTube, or Twitter with video/feed streaming",
        afternoon: "Draw complete architectural diagram with detailed component discussion",
        evening: "Review complete system design",
        codingProblem: "Minimum Window Substring",
        difficulty: "Hard",
      },
    ],
  },
  {
    week: 6,
    theme: "Review, Mock Interviews & Polish",
    description: "Simulating real interview environment, filling gaps, and building confidence",
    days: [
      {
        day: 1,
        morning: "Frontend Review - Create cheatsheet of React hooks, state management, performance",
        afternoon: "Mock Interview 1: Frontend-focused (build paginated data table)",
        evening: "Review weak spots from mock interview",
        codingProblem: "Reverse Nodes in k-Group",
        difficulty: "Hard",
      },
      {
        day: 2,
        morning: "Backend Review - Create backend cheatsheet for FastAPI, auth, testing, databases",
        afternoon: "Mock Interview 2: Backend-focused (design rate-limited API)",
        evening: "Review backend concepts from mock",
        codingProblem: "Serialize and Deserialize Binary Tree",
        difficulty: "Hard",
      },
      {
        day: 3,
        morning: "System Design Review - Review all system design diagrams created",
        afternoon: "Mock Interview 3: Full system design (Design a web crawler)",
        evening: "Refine high-level design explanations",
        codingProblem: "Course Schedule",
        difficulty: "Medium",
      },
      {
        day: 4,
        morning: "Behavioral Review - Perfect STAR method stories and 'Tell me about yourself' pitch",
        afternoon: "Mock Interview 4: Full behavioral interview with friend/colleague",
        evening: "Fine-tune answers based on feedback",
        codingProblem: "Edit Distance",
        difficulty: "Hard",
      },
      {
        day: 5,
        morning: "Final Prep - Research companies, prepare insightful questions for interviewers",
        afternoon: "Relax, light review of cheatsheets, stay fresh and confident",
        evening: "Get good night's sleep",
        codingProblem: "Practice any weak areas",
        difficulty: "Medium",
      },
    ],
  },
]
