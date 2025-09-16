export interface StudyMaterial {
  id: string
  title: string
  description: string
  category: "frontend" | "backend" | "database" | "system-design" | "behavioral" | "algorithms"
  type: "article" | "video" | "documentation" | "cheatsheet" | "practice" | "notes"
  difficulty: "beginner" | "intermediate" | "advanced"
  estimatedTime: number // in minutes
  tags: string[]
  content?: string
  externalUrl?: string
  weekRelevance: number[] // which weeks this is most relevant for
  dayRelevance?: { week: number; day: number }[]
}

export const studyMaterials: StudyMaterial[] = [
  // Frontend Materials
  {
    id: "html-css-fundamentals",
    title: "HTML & CSS Fundamentals",
    description: "Complete guide to semantic HTML, CSS Box Model, Flexbox, and Grid layouts",
    category: "frontend",
    type: "cheatsheet",
    difficulty: "beginner",
    estimatedTime: 30,
    tags: ["HTML", "CSS", "Flexbox", "Grid", "Responsive Design"],
    weekRelevance: [1],
    dayRelevance: [{ week: 1, day: 1 }],
    content: `# HTML & CSS Fundamentals

## Semantic HTML Elements
- \`<header>\`, \`<nav>\`, \`<main>\`, \`<article>\`, \`<section>\`, \`<aside>\`, \`<footer>\`
- Use semantic elements for better accessibility and SEO
- \`<button>\` vs \`<div>\` for interactive elements

## CSS Box Model
- Content → Padding → Border → Margin
- \`box-sizing: border-box\` includes padding and border in width/height

## Flexbox
\`\`\`css
.container {
  display: flex;
  justify-content: center; /* horizontal alignment */
  align-items: center; /* vertical alignment */
  flex-direction: row; /* or column */
  flex-wrap: wrap; /* or nowrap */
}

.item {
  flex: 1; /* grow and shrink */
  flex-basis: 200px; /* initial size */
}
\`\`\`

## CSS Grid
\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 1rem;
}

.item {
  grid-column: span 2;
  grid-row: 1 / 3;
}
\`\`\`

## Responsive Design
\`\`\`css
/* Mobile First */
.container { width: 100%; }

@media (min-width: 768px) {
  .container { width: 750px; }
}

@media (min-width: 1024px) {
  .container { width: 1000px; }
}
\`\`\``,
  },
  {
    id: "javascript-es6-features",
    title: "JavaScript ES6+ Features",
    description: "Modern JavaScript features including arrow functions, destructuring, promises, and async/await",
    category: "frontend",
    type: "notes",
    difficulty: "intermediate",
    estimatedTime: 45,
    tags: ["JavaScript", "ES6", "Promises", "Async/Await", "Destructuring"],
    weekRelevance: [1, 2],
    dayRelevance: [{ week: 1, day: 2 }],
    content: `# JavaScript ES6+ Features

## Arrow Functions
\`\`\`javascript
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// With block body
const multiply = (a, b) => {
  const result = a * b;
  return result;
};
\`\`\`

## Destructuring
\`\`\`javascript
// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];

// Object destructuring
const { name, age, ...others } = person;

// Function parameters
const greet = ({ name, age }) => \`Hello \${name}, you are \${age}\`;
\`\`\`

## Promises and Async/Await
\`\`\`javascript
// Promise
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// Async/Await
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
\`\`\`

## Template Literals
\`\`\`javascript
const name = 'John';
const age = 30;
const message = \`Hello \${name}, you are \${age} years old\`;
\`\`\`

## Spread and Rest Operators
\`\`\`javascript
// Spread
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

// Rest
const sum = (...numbers) => numbers.reduce((a, b) => a + b, 0);
\`\`\``,
  },
  {
    id: "react-hooks-guide",
    title: "React Hooks Complete Guide",
    description: "Comprehensive guide to React hooks including useState, useEffect, useContext, and custom hooks",
    category: "frontend",
    type: "article",
    difficulty: "intermediate",
    estimatedTime: 60,
    tags: ["React", "Hooks", "useState", "useEffect", "Custom Hooks"],
    weekRelevance: [2, 4],
    externalUrl: "https://react.dev/reference/react",
  },
  // Backend Materials
  {
    id: "fastapi-fundamentals",
    title: "FastAPI Fundamentals",
    description: "Building REST APIs with FastAPI, Pydantic models, and dependency injection",
    category: "backend",
    type: "notes",
    difficulty: "intermediate",
    estimatedTime: 50,
    tags: ["FastAPI", "Python", "REST API", "Pydantic", "Dependency Injection"],
    weekRelevance: [1, 2, 4],
    dayRelevance: [
      { week: 1, day: 4 },
      { week: 2, day: 2 },
    ],
    content: `# FastAPI Fundamentals

## Basic Setup
\`\`\`python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float
    is_offer: bool = False

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}

@app.post("/items/")
def create_item(item: Item):
    return item
\`\`\`

## Pydantic Models
\`\`\`python
from pydantic import BaseModel, validator
from typing import Optional, List
from datetime import datetime

class User(BaseModel):
    id: int
    name: str
    email: str
    created_at: datetime = datetime.now()
    tags: List[str] = []
    
    @validator('email')
    def email_must_contain_at(cls, v):
        if '@' not in v:
            raise ValueError('Invalid email')
        return v
\`\`\`

## Dependency Injection
\`\`\`python
from fastapi import Depends

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/users/")
def read_users(db: Session = Depends(get_db)):
    return db.query(User).all()
\`\`\`

## Error Handling
\`\`\`python
@app.get("/items/{item_id}")
def read_item(item_id: int):
    if item_id not in items:
        raise HTTPException(
            status_code=404, 
            detail="Item not found"
        )
    return items[item_id]
\`\`\``,
  },
  // Database Materials
  {
    id: "sql-fundamentals",
    title: "SQL Fundamentals & Best Practices",
    description: "Essential SQL queries, joins, indexing, and performance optimization techniques",
    category: "database",
    type: "cheatsheet",
    difficulty: "beginner",
    estimatedTime: 40,
    tags: ["SQL", "Joins", "Indexing", "Performance", "Database Design"],
    weekRelevance: [1, 2, 4],
    dayRelevance: [{ week: 1, day: 5 }],
    content: `# SQL Fundamentals & Best Practices

## Basic Queries
\`\`\`sql
-- SELECT with conditions
SELECT name, email, created_at 
FROM users 
WHERE active = true 
  AND created_at > '2023-01-01'
ORDER BY created_at DESC
LIMIT 10;

-- Aggregate functions
SELECT 
  COUNT(*) as total_users,
  AVG(age) as average_age,
  MAX(created_at) as latest_signup
FROM users
WHERE active = true;
\`\`\`

## Joins
\`\`\`sql
-- INNER JOIN
SELECT u.name, p.title
FROM users u
INNER JOIN posts p ON u.id = p.user_id;

-- LEFT JOIN
SELECT u.name, COUNT(p.id) as post_count
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
GROUP BY u.id, u.name;

-- Multiple joins
SELECT u.name, p.title, c.content
FROM users u
INNER JOIN posts p ON u.id = p.user_id
LEFT JOIN comments c ON p.id = c.post_id;
\`\`\`

## Indexing
\`\`\`sql
-- Create index for faster queries
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_posts_user_created ON posts(user_id, created_at);

-- Composite index
CREATE INDEX idx_user_status_date ON users(status, created_at);
\`\`\`

## Performance Tips
- Use EXPLAIN to analyze query performance
- Index frequently queried columns
- Avoid SELECT * in production
- Use LIMIT for large result sets
- Consider query caching for expensive operations`,
  },
  // System Design Materials
  {
    id: "system-design-basics",
    title: "System Design Interview Basics",
    description: "Fundamental concepts for system design interviews including scalability, load balancing, and caching",
    category: "system-design",
    type: "article",
    difficulty: "intermediate",
    estimatedTime: 90,
    tags: ["System Design", "Scalability", "Load Balancing", "Caching", "Microservices"],
    weekRelevance: [2, 3, 4, 5],
    content: `# System Design Interview Basics

## Key Concepts

### Scalability
- **Vertical Scaling**: Adding more power (CPU, RAM) to existing machines
- **Horizontal Scaling**: Adding more machines to the pool of resources

### Load Balancing
- Distributes incoming requests across multiple servers
- Types: Round Robin, Least Connections, IP Hash
- Can be implemented at different layers (L4, L7)

### Caching
- **Browser Cache**: Client-side caching
- **CDN**: Geographic distribution of static content
- **Application Cache**: In-memory caching (Redis, Memcached)
- **Database Cache**: Query result caching

### Database Design
- **SQL vs NoSQL**: Choose based on consistency vs availability needs
- **Replication**: Master-slave, Master-master
- **Sharding**: Horizontal partitioning of data

## Common Patterns

### Microservices
- Break monolith into smaller, independent services
- Each service owns its data
- Communicate via APIs (REST, gRPC)
- Benefits: Independent deployment, technology diversity
- Challenges: Network complexity, data consistency

### Event-Driven Architecture
- Services communicate through events
- Loose coupling between components
- Better scalability and resilience
- Use message queues (RabbitMQ, Kafka)

## Design Process
1. **Clarify Requirements**: Functional and non-functional
2. **Estimate Scale**: Users, requests, data size
3. **High-Level Design**: Major components and data flow
4. **Detailed Design**: Deep dive into critical components
5. **Scale the Design**: Handle bottlenecks and failures`,
  },
  // Behavioral Materials
  {
    id: "star-method-guide",
    title: "STAR Method for Behavioral Interviews",
    description: "Complete guide to structuring behavioral interview answers using the STAR method",
    category: "behavioral",
    type: "practice",
    difficulty: "beginner",
    estimatedTime: 30,
    tags: ["STAR Method", "Behavioral Interview", "Storytelling", "Leadership"],
    weekRelevance: [3, 5, 6],
    content: `# STAR Method for Behavioral Interviews

## What is STAR?
- **S**ituation: Set the context
- **T**ask: Describe your responsibility
- **A**ction: Explain what you did
- **R**esult: Share the outcome and impact

## Example Questions & Answers

### "Tell me about a time you had to work with a difficult team member"

**Situation**: During my last project, I was working with a senior developer who was resistant to code reviews and often pushed changes without following our team's process.

**Task**: As the tech lead, I needed to ensure code quality while maintaining team harmony and not alienating a valuable team member.

**Action**: I scheduled a private one-on-one meeting to understand their perspective. I learned they felt the review process was slowing them down. I proposed a compromise: they could push urgent fixes directly but would pair program with junior developers for knowledge sharing, and we'd streamline our review process for non-critical changes.

**Result**: The team member became more collaborative, our code quality improved, and we reduced review turnaround time by 40%. The junior developers also learned significantly more through the pairing sessions.

## Common Question Categories

### Leadership
- "Tell me about a time you had to lead a project"
- "Describe a situation where you had to influence others"

### Problem Solving
- "Tell me about a challenging technical problem you solved"
- "Describe a time when you had to learn something new quickly"

### Conflict Resolution
- "Tell me about a disagreement you had with a colleague"
- "Describe a time you had to give difficult feedback"

### Failure/Learning
- "Tell me about a time you failed"
- "Describe a mistake you made and how you handled it"

## Tips for Strong STAR Answers
- Be specific with numbers and metrics
- Focus on YOUR actions, not the team's
- Show growth and learning from experiences
- Practice 8-10 stories that cover different scenarios
- Keep answers to 2-3 minutes maximum`,
  },
  // Algorithm Materials
  {
    id: "big-o-notation",
    title: "Big O Notation & Time Complexity",
    description: "Understanding algorithm efficiency and time/space complexity analysis",
    category: "algorithms",
    type: "cheatsheet",
    difficulty: "beginner",
    estimatedTime: 35,
    tags: ["Big O", "Time Complexity", "Space Complexity", "Algorithms"],
    weekRelevance: [1, 2, 3, 4, 5, 6],
    content: `# Big O Notation & Time Complexity

## Common Time Complexities

### O(1) - Constant Time
\`\`\`python
def get_first_element(arr):
    return arr[0]  # Always takes same time regardless of array size
\`\`\`

### O(log n) - Logarithmic Time
\`\`\`python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
\`\`\`

### O(n) - Linear Time
\`\`\`python
def find_max(arr):
    max_val = arr[0]
    for num in arr:  # Must check every element
        if num > max_val:
            max_val = num
    return max_val
\`\`\`

### O(n log n) - Linearithmic Time
\`\`\`python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)
\`\`\`

### O(n²) - Quadratic Time
\`\`\`python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):  # Nested loops
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
\`\`\`

## Space Complexity

### O(1) - Constant Space
\`\`\`python
def swap(a, b):
    temp = a  # Only using fixed amount of extra space
    a = b
    b = temp
\`\`\`

### O(n) - Linear Space
\`\`\`python
def create_copy(arr):
    return arr.copy()  # Space grows with input size
\`\`\`

## Analysis Tips
- Focus on the worst-case scenario
- Drop constants: O(2n) becomes O(n)
- Drop lower-order terms: O(n² + n) becomes O(n²)
- Consider both time and space complexity
- Different operations may have different complexities`,
  },
]

export const materialCategories = [
  { id: "all", label: "All Materials", count: studyMaterials.length },
  { id: "frontend", label: "Frontend", count: studyMaterials.filter((m) => m.category === "frontend").length },
  { id: "backend", label: "Backend", count: studyMaterials.filter((m) => m.category === "backend").length },
  { id: "database", label: "Database", count: studyMaterials.filter((m) => m.category === "database").length },
  {
    id: "system-design",
    label: "System Design",
    count: studyMaterials.filter((m) => m.category === "system-design").length,
  },
  { id: "behavioral", label: "Behavioral", count: studyMaterials.filter((m) => m.category === "behavioral").length },
  { id: "algorithms", label: "Algorithms", count: studyMaterials.filter((m) => m.category === "algorithms").length },
]

export const materialTypes = [
  { id: "all", label: "All Types" },
  { id: "article", label: "Articles" },
  { id: "video", label: "Videos" },
  { id: "documentation", label: "Documentation" },
  { id: "cheatsheet", label: "Cheat Sheets" },
  { id: "practice", label: "Practice" },
  { id: "notes", label: "Notes" },
]
