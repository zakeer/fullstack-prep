export interface CodingProblem {
  id: string
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  category: string[]
  weekRelevance: number[]
  dayRelevance?: { week: number; day: number }[]
  leetcodeUrl?: string
  timeComplexity: string
  spaceComplexity: string
  hints: string[]
  solution: {
    approach: string
    code: string
    explanation: string
  }
  examples: {
    input: string
    output: string
    explanation?: string
  }[]
  constraints: string[]
  followUp?: string[]
}

export const codingProblems: CodingProblem[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    difficulty: "Easy",
    category: ["Array", "Hash Table"],
    weekRelevance: [1],
    dayRelevance: [{ week: 1, day: 1 }],
    leetcodeUrl: "https://leetcode.com/problems/two-sum/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    hints: [
      "Try using a hash map to store numbers you've seen",
      "For each number, check if target - number exists in the hash map",
      "Remember to return the indices, not the values",
    ],
    solution: {
      approach: "Hash Map",
      code: `def twoSum(nums, target):
    num_map = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    
    return []`,
      explanation:
        "We iterate through the array once, storing each number and its index in a hash map. For each number, we check if its complement (target - current number) exists in the hash map. If it does, we've found our pair and return their indices.",
    },
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists.",
    ],
    followUp: ["Can you come up with an algorithm that is less than O(n²) time complexity?"],
  },
  {
    id: "valid-palindrome",
    title: "Valid Palindrome",
    description:
      "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",
    difficulty: "Easy",
    category: ["Two Pointers", "String"],
    weekRelevance: [1],
    dayRelevance: [{ week: 1, day: 2 }],
    leetcodeUrl: "https://leetcode.com/problems/valid-palindrome/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    hints: [
      "Use two pointers, one from the start and one from the end",
      "Skip non-alphanumeric characters",
      "Compare characters in lowercase",
    ],
    solution: {
      approach: "Two Pointers",
      code: `def isPalindrome(s):
    left, right = 0, len(s) - 1
    
    while left < right:
        # Skip non-alphanumeric characters from left
        while left < right and not s[left].isalnum():
            left += 1
        
        # Skip non-alphanumeric characters from right
        while left < right and not s[right].isalnum():
            right -= 1
        
        # Compare characters (case-insensitive)
        if s[left].lower() != s[right].lower():
            return False
        
        left += 1
        right -= 1
    
    return True`,
      explanation:
        "We use two pointers starting from both ends of the string. We skip non-alphanumeric characters and compare the remaining characters in lowercase. If any pair doesn't match, it's not a palindrome.",
    },
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: "true",
        explanation: '"amanaplanacanalpanama" is a palindrome.',
      },
      {
        input: 's = "race a car"',
        output: "false",
        explanation: '"raceacar" is not a palindrome.',
      },
    ],
    constraints: ["1 ≤ s.length ≤ 2 * 10⁵", "s consists only of printable ASCII characters."],
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    difficulty: "Easy",
    category: ["Stack", "String"],
    weekRelevance: [2],
    dayRelevance: [{ week: 2, day: 1 }],
    leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    hints: [
      "Use a stack to keep track of opening brackets",
      "When you see a closing bracket, check if it matches the most recent opening bracket",
      "The string is valid if the stack is empty at the end",
    ],
    solution: {
      approach: "Stack",
      code: `def isValid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in mapping:
            # Closing bracket
            if not stack or stack.pop() != mapping[char]:
                return False
        else:
            # Opening bracket
            stack.append(char)
    
    return len(stack) == 0`,
      explanation:
        "We use a stack to keep track of opening brackets. When we encounter a closing bracket, we check if it matches the most recent opening bracket (top of stack). The string is valid if all brackets are properly matched and the stack is empty at the end.",
    },
    examples: [
      {
        input: 's = "()"',
        output: "true",
      },
      {
        input: 's = "()[]{}"',
        output: "true",
      },
      {
        input: 's = "(]"',
        output: "false",
      },
    ],
    constraints: ["1 ≤ s.length ≤ 10⁴", "s consists of parentheses only '()[]{}'."],
  },
  {
    id: "binary-search",
    title: "Binary Search",
    description:
      "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums.",
    difficulty: "Easy",
    category: ["Array", "Binary Search"],
    weekRelevance: [2],
    dayRelevance: [{ week: 2, day: 2 }],
    leetcodeUrl: "https://leetcode.com/problems/binary-search/",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    hints: [
      "Use two pointers: left and right",
      "Calculate mid point and compare with target",
      "Eliminate half of the search space in each iteration",
    ],
    solution: {
      approach: "Binary Search",
      code: `def search(nums, target):
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1`,
      explanation:
        "We maintain two pointers and repeatedly divide the search space in half. If the middle element equals the target, we return its index. If it's smaller, we search the right half; if larger, we search the left half.",
    },
    examples: [
      {
        input: "nums = [-1,0,3,5,9,12], target = 9",
        output: "4",
        explanation: "9 exists in nums and its index is 4",
      },
      {
        input: "nums = [-1,0,3,5,9,12], target = 2",
        output: "-1",
        explanation: "2 does not exist in nums so return -1",
      },
    ],
    constraints: [
      "1 ≤ nums.length ≤ 10⁴",
      "-10⁴ < nums[i], target < 10⁴",
      "All the integers in nums are unique.",
      "nums is sorted in ascending order.",
    ],
  },
  {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    description:
      "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
    difficulty: "Medium",
    category: ["Array", "Dynamic Programming"],
    weekRelevance: [2],
    dayRelevance: [{ week: 2, day: 4 }],
    leetcodeUrl: "https://leetcode.com/problems/maximum-subarray/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    hints: [
      "This is Kadane's algorithm",
      "Keep track of the maximum sum ending at current position",
      "Reset the current sum if it becomes negative",
    ],
    solution: {
      approach: "Kadane's Algorithm",
      code: `def maxSubArray(nums):
    max_sum = nums[0]
    current_sum = nums[0]
    
    for i in range(1, len(nums)):
        # Either extend the existing subarray or start a new one
        current_sum = max(nums[i], current_sum + nums[i])
        max_sum = max(max_sum, current_sum)
    
    return max_sum`,
      explanation:
        "Kadane's algorithm works by maintaining the maximum sum of subarrays ending at each position. At each step, we decide whether to extend the current subarray or start a new one from the current element.",
    },
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "[4,-1,2,1] has the largest sum = 6.",
      },
      {
        input: "nums = [1]",
        output: "1",
      },
      {
        input: "nums = [5,4,-1,7,8]",
        output: "23",
      },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
    followUp: [
      "If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.",
    ],
  },
  {
    id: "lru-cache",
    title: "LRU Cache",
    description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.",
    difficulty: "Medium",
    category: ["Hash Table", "Linked List", "Design"],
    weekRelevance: [5],
    dayRelevance: [{ week: 5, day: 3 }],
    leetcodeUrl: "https://leetcode.com/problems/lru-cache/",
    timeComplexity: "O(1)",
    spaceComplexity: "O(capacity)",
    hints: [
      "Use a combination of hash map and doubly linked list",
      "Hash map provides O(1) access, linked list maintains order",
      "Move accessed items to the front, remove from the back",
    ],
    solution: {
      approach: "Hash Map + Doubly Linked List",
      code: `class Node:
    def __init__(self, key=0, val=0):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}  # key -> node
        
        # Create dummy head and tail nodes
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head
    
    def _add_node(self, node):
        # Add node right after head
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node
    
    def _remove_node(self, node):
        # Remove an existing node
        prev_node = node.prev
        next_node = node.next
        prev_node.next = next_node
        next_node.prev = prev_node
    
    def _move_to_head(self, node):
        # Move node to head (mark as recently used)
        self._remove_node(node)
        self._add_node(node)
    
    def _pop_tail(self):
        # Remove last node
        last_node = self.tail.prev
        self._remove_node(last_node)
        return last_node
    
    def get(self, key: int) -> int:
        node = self.cache.get(key)
        if node:
            # Move to head (recently used)
            self._move_to_head(node)
            return node.val
        return -1
    
    def put(self, key: int, value: int) -> None:
        node = self.cache.get(key)
        
        if node:
            # Update existing node
            node.val = value
            self._move_to_head(node)
        else:
            # Add new node
            new_node = Node(key, value)
            
            if len(self.cache) >= self.capacity:
                # Remove least recently used
                tail = self._pop_tail()
                del self.cache[tail.key]
            
            self.cache[key] = new_node
            self._add_node(new_node)`,
      explanation:
        "We use a hash map for O(1) access and a doubly linked list to maintain the order of usage. The most recently used items are at the front, and least recently used at the back. When capacity is exceeded, we remove from the back.",
    },
    examples: [
      {
        input:
          '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]',
        output: "[null, null, null, 1, null, -1, null, -1, 3, 4]",
      },
    ],
    constraints: [
      "1 ≤ capacity ≤ 3000",
      "0 ≤ key ≤ 10⁴",
      "0 ≤ value ≤ 10⁵",
      "At most 2 * 10⁵ calls will be made to get and put.",
    ],
  },
]

export const problemCategories = [
  { id: "all", label: "All Problems", count: codingProblems.length },
  { id: "Array", label: "Array", count: codingProblems.filter((p) => p.category.includes("Array")).length },
  { id: "String", label: "String", count: codingProblems.filter((p) => p.category.includes("String")).length },
  {
    id: "Hash Table",
    label: "Hash Table",
    count: codingProblems.filter((p) => p.category.includes("Hash Table")).length,
  },
  {
    id: "Two Pointers",
    label: "Two Pointers",
    count: codingProblems.filter((p) => p.category.includes("Two Pointers")).length,
  },
  { id: "Stack", label: "Stack", count: codingProblems.filter((p) => p.category.includes("Stack")).length },
  {
    id: "Binary Search",
    label: "Binary Search",
    count: codingProblems.filter((p) => p.category.includes("Binary Search")).length,
  },
  {
    id: "Dynamic Programming",
    label: "Dynamic Programming",
    count: codingProblems.filter((p) => p.category.includes("Dynamic Programming")).length,
  },
  {
    id: "Linked List",
    label: "Linked List",
    count: codingProblems.filter((p) => p.category.includes("Linked List")).length,
  },
  { id: "Design", label: "Design", count: codingProblems.filter((p) => p.category.includes("Design")).length },
]
