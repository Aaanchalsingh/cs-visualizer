export const concepts = [
  // ─── DATA STRUCTURES ──────────────────────────────────────────────────────
  {
    id: 'binary-search-tree',
    title: 'Binary Search Tree',
    emoji: '🌲',
    category: 'Data Structures',
    difficulty: 'Intermediate',
    description: 'A tree where each node has at most two children, with left < root < right.',
    steps: [
      {
        title: 'Empty Tree',
        explanation: 'We start with an empty BST. Every insertion follows the BST property: values smaller than the root go left, larger go right.',
        diagram: `graph TD
  ROOT([Empty])
  style ROOT fill:#1f2937,stroke:#374151,color:#6b7280`,
        code: `class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None`,
      },
      {
        title: 'Insert 10 (Root)',
        explanation: 'The first inserted value becomes the root of the tree.',
        diagram: `graph TD
  A((10))
  style A fill:#4263eb,stroke:#748ffc,color:#fff`,
        code: `root = Node(10)`,
      },
      {
        title: 'Insert 5 (Left of 10)',
        explanation: '5 < 10, so it goes to the left child of 10.',
        diagram: `graph TD
  A((10)) --> B((5))
  A --> R([ ])
  style A fill:#4263eb,stroke:#748ffc,color:#fff
  style B fill:#2f9e44,stroke:#40c057,color:#fff
  style R fill:#1f2937,stroke:#374151,color:#6b7280`,
        code: `# 5 < 10 → go left
root.left = Node(5)`,
      },
      {
        title: 'Insert 15 (Right of 10)',
        explanation: '15 > 10, so it goes to the right child of 10.',
        diagram: `graph TD
  A((10)) --> B((5))
  A --> C((15))
  style A fill:#4263eb,stroke:#748ffc,color:#fff
  style B fill:#2f9e44,stroke:#40c057,color:#fff
  style C fill:#e67700,stroke:#f59f00,color:#fff`,
        code: `# 15 > 10 → go right
root.right = Node(15)`,
      },
      {
        title: 'Insert 3 (Left of 5)',
        explanation: '3 < 10 → go left. 3 < 5 → go left again. Insert as left child of 5.',
        diagram: `graph TD
  A((10)) --> B((5))
  A --> C((15))
  B --> D((3))
  B --> E([ ])
  style A fill:#4263eb,stroke:#748ffc,color:#fff
  style B fill:#2f9e44,stroke:#40c057,color:#fff
  style C fill:#e67700,stroke:#f59f00,color:#fff
  style D fill:#c2255c,stroke:#f06595,color:#fff
  style E fill:#1f2937,stroke:#374151,color:#6b7280`,
        code: `# 3 < 10 → left; 3 < 5 → left
root.left.left = Node(3)`,
      },
      {
        title: 'Search for 5',
        explanation: 'Start at root (10). 5 < 10 → go left. Found 5! BST search is O(log n) on average.',
        diagram: `graph TD
  A((10)) -->|"5 < 10 → left"| B((5 ✓))
  A --> C((15))
  B --> D((3))
  B --> E([ ])
  style A fill:#374151,stroke:#6b7280,color:#9ca3af
  style B fill:#2f9e44,stroke:#40c057,color:#fff
  style C fill:#374151,stroke:#6b7280,color:#9ca3af
  style D fill:#374151,stroke:#6b7280,color:#9ca3af
  style E fill:#1f2937,stroke:#374151,color:#6b7280`,
        code: `def search(node, target):
    if node is None or node.val == target:
        return node
    if target < node.val:
        return search(node.left, target)
    return search(node.right, target)`,
      },
    ],
  },

  {
    id: 'linked-list',
    title: 'Linked List',
    emoji: '🔗',
    category: 'Data Structures',
    difficulty: 'Beginner',
    description: 'A sequence of nodes where each node points to the next.',
    steps: [
      {
        title: 'Single Node',
        explanation: 'A linked list starts with a single node. Each node stores data and a pointer to the next node.',
        diagram: `graph LR
  A["data: 1 | next: null"]
  style A fill:#4263eb,stroke:#748ffc,color:#fff`,
        code: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None`,
      },
      {
        title: 'Append Node 2',
        explanation: 'We set node 1\'s next pointer to a new node containing 2.',
        diagram: `graph LR
  A["1"] -->|next| B["2 | null"]
  style A fill:#4263eb,stroke:#748ffc,color:#fff
  style B fill:#2f9e44,stroke:#40c057,color:#fff`,
        code: `head = Node(1)
head.next = Node(2)`,
      },
      {
        title: 'Append Node 3',
        explanation: 'Traverse to the last node, then append.',
        diagram: `graph LR
  A["1"] -->|next| B["2"] -->|next| C["3 | null"]
  style A fill:#4263eb,stroke:#748ffc,color:#fff
  style B fill:#2f9e44,stroke:#40c057,color:#fff
  style C fill:#e67700,stroke:#f59f00,color:#fff`,
        code: `head.next.next = Node(3)`,
      },
      {
        title: 'Insert at Head',
        explanation: 'Insert 0 at the beginning: new node\'s next = old head, new node becomes head.',
        diagram: `graph LR
  Z["0"] -->|next| A["1"] --> B["2"] --> C["3 | null"]
  style Z fill:#c2255c,stroke:#f06595,color:#fff
  style A fill:#4263eb,stroke:#748ffc,color:#fff
  style B fill:#2f9e44,stroke:#40c057,color:#fff
  style C fill:#e67700,stroke:#f59f00,color:#fff`,
        code: `new_node = Node(0)
new_node.next = head
head = new_node`,
      },
      {
        title: 'Delete a Node',
        explanation: 'To delete node 1, set node 0\'s next pointer to skip over node 1.',
        diagram: `graph LR
  Z["0"] -->|"next (skip 1)"| B["2"] --> C["3 | null"]
  X["1 ❌"]
  style Z fill:#c2255c,stroke:#f06595,color:#fff
  style B fill:#2f9e44,stroke:#40c057,color:#fff
  style C fill:#e67700,stroke:#f59f00,color:#fff
  style X fill:#374151,stroke:#6b7280,color:#6b7280`,
        code: `# Delete node after prev
prev.next = prev.next.next`,
      },
    ],
  },

  // ─── ALGORITHMS ────────────────────────────────────────────────────────────
  {
    id: 'bubble-sort',
    title: 'Bubble Sort',
    emoji: '🫧',
    category: 'Algorithms',
    difficulty: 'Beginner',
    description: 'Repeatedly swap adjacent elements that are out of order until the list is sorted.',
    steps: [
      {
        title: 'Unsorted Array',
        explanation: 'Start with [5, 3, 8, 1]. Bubble sort compares adjacent pairs and swaps them if needed.',
        diagram: `graph LR
  A["5"] --- B["3"] --- C["8"] --- D["1"]
  style A fill:#4263eb,stroke:#748ffc,color:#fff
  style B fill:#4263eb,stroke:#748ffc,color:#fff
  style C fill:#4263eb,stroke:#748ffc,color:#fff
  style D fill:#4263eb,stroke:#748ffc,color:#fff`,
        code: `arr = [5, 3, 8, 1]`,
      },
      {
        title: 'Pass 1: Compare 5 and 3',
        explanation: '5 > 3 → swap. Array becomes [3, 5, 8, 1].',
        diagram: `graph LR
  A["3 ✓"] --- B["5 ✓"] --- C["8"] --- D["1"]
  style A fill:#2f9e44,stroke:#40c057,color:#fff
  style B fill:#2f9e44,stroke:#40c057,color:#fff
  style C fill:#4263eb,stroke:#748ffc,color:#fff
  style D fill:#4263eb,stroke:#748ffc,color:#fff`,
        code: `# 5 > 3 → swap
arr = [3, 5, 8, 1]`,
      },
      {
        title: 'Pass 1: Compare 5 and 8',
        explanation: '5 < 8 → no swap needed. Move on.',
        diagram: `graph LR
  A["3"] --- B["5"] --- C["8"] --- D["1"]
  style A fill:#374151,stroke:#6b7280,color:#9ca3af
  style B fill:#e67700,stroke:#f59f00,color:#fff
  style C fill:#e67700,stroke:#f59f00,color:#fff
  style D fill:#4263eb,stroke:#748ffc,color:#fff`,
        code: `# 5 < 8 → no swap
arr = [3, 5, 8, 1]`,
      },
      {
        title: 'Pass 1: Compare 8 and 1',
        explanation: '8 > 1 → swap. 8 "bubbles up" to near the end. Array becomes [3, 5, 1, 8].',
        diagram: `graph LR
  A["3"] --- B["5"] --- C["1 ✓"] --- D["8 ✓"]
  style A fill:#374151,stroke:#6b7280,color:#9ca3af
  style B fill:#374151,stroke:#6b7280,color:#9ca3af
  style C fill:#2f9e44,stroke:#40c057,color:#fff
  style D fill:#c2255c,stroke:#f06595,color:#fff`,
        code: `# 8 > 1 → swap; 8 is in place
arr = [3, 5, 1, 8]`,
      },
      {
        title: 'After All Passes',
        explanation: 'After O(n²) comparisons in the worst case, the array is fully sorted.',
        diagram: `graph LR
  A["1 ✓"] --- B["3 ✓"] --- C["5 ✓"] --- D["8 ✓"]
  style A fill:#2f9e44,stroke:#40c057,color:#fff
  style B fill:#2f9e44,stroke:#40c057,color:#fff
  style C fill:#2f9e44,stroke:#40c057,color:#fff
  style D fill:#2f9e44,stroke:#40c057,color:#fff`,
        code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
# Time: O(n²) | Space: O(1)`,
      },
    ],
  },

  {
    id: 'binary-search',
    title: 'Binary Search',
    emoji: '🔍',
    category: 'Algorithms',
    difficulty: 'Beginner',
    description: 'Efficiently find an element in a sorted array by halving the search space each time.',
    steps: [
      {
        title: 'Sorted Array',
        explanation: 'Binary search only works on sorted arrays. We want to find the value 7 in [1, 3, 5, 7, 9, 11].',
        diagram: `graph LR
  A["1"] --- B["3"] --- C["5"] --- D["7"] --- E["9"] --- F["11"]
  style A fill:#4263eb,stroke:#748ffc,color:#fff
  style B fill:#4263eb,stroke:#748ffc,color:#fff
  style C fill:#4263eb,stroke:#748ffc,color:#fff
  style D fill:#4263eb,stroke:#748ffc,color:#fff
  style E fill:#4263eb,stroke:#748ffc,color:#fff
  style F fill:#4263eb,stroke:#748ffc,color:#fff`,
        code: `arr = [1, 3, 5, 7, 9, 11]
target = 7`,
      },
      {
        title: 'Check Middle Element',
        explanation: 'low=0, high=5. mid=2. arr[2]=5. 7 > 5 → search right half.',
        diagram: `graph LR
  A["1"] --- B["3"] --- C["5 mid"] --- D["7"] --- E["9"] --- F["11"]
  style A fill:#374151,stroke:#6b7280,color:#9ca3af
  style B fill:#374151,stroke:#6b7280,color:#9ca3af
  style C fill:#e67700,stroke:#f59f00,color:#fff
  style D fill:#4263eb,stroke:#748ffc,color:#fff
  style E fill:#4263eb,stroke:#748ffc,color:#fff
  style F fill:#4263eb,stroke:#748ffc,color:#fff`,
        code: `low, high = 0, 5
mid = (0 + 5) // 2  # = 2
arr[2] = 5 < 7 → search right`,
      },
      {
        title: 'Narrow to Right Half',
        explanation: 'low=3, high=5. mid=4. arr[4]=9. 7 < 9 → search left half.',
        diagram: `graph LR
  A["1 ✗"] --- B["3 ✗"] --- C["5 ✗"] --- D["7"] --- E["9 mid"] --- F["11"]
  style A fill:#1f2937,stroke:#374151,color:#4b5563
  style B fill:#1f2937,stroke:#374151,color:#4b5563
  style C fill:#1f2937,stroke:#374151,color:#4b5563
  style D fill:#4263eb,stroke:#748ffc,color:#fff
  style E fill:#e67700,stroke:#f59f00,color:#fff
  style F fill:#4263eb,stroke:#748ffc,color:#fff`,
        code: `low = 3, high = 5
mid = (3 + 5) // 2  # = 4
arr[4] = 9 > 7 → search left`,
      },
      {
        title: 'Found!',
        explanation: 'low=3, high=3. mid=3. arr[3]=7 == target. Found in O(log n) time!',
        diagram: `graph LR
  A["1 ✗"] --- B["3 ✗"] --- C["5 ✗"] --- D["7 ✓ FOUND"] --- E["9 ✗"] --- F["11 ✗"]
  style A fill:#1f2937,stroke:#374151,color:#4b5563
  style B fill:#1f2937,stroke:#374151,color:#4b5563
  style C fill:#1f2937,stroke:#374151,color:#4b5563
  style D fill:#2f9e44,stroke:#40c057,color:#fff
  style E fill:#1f2937,stroke:#374151,color:#4b5563
  style F fill:#1f2937,stroke:#374151,color:#4b5563`,
        code: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1
# Time: O(log n) | Space: O(1)`,
      },
    ],
  },

  // ─── DESIGN PATTERNS ───────────────────────────────────────────────────────
  {
    id: 'observer-pattern',
    title: 'Observer Pattern',
    emoji: '👁️',
    category: 'Design Patterns',
    difficulty: 'Intermediate',
    description: 'One subject notifies many observers automatically when its state changes.',
    steps: [
      {
        title: 'The Problem',
        explanation: 'Multiple objects (observers) need to react when another object (subject) changes. Hard-coding dependencies creates tight coupling.',
        diagram: `graph TD
  S[Subject] -->|direct call| A[Component A]
  S -->|direct call| B[Component B]
  S -->|direct call| C[Component C]
  style S fill:#c2255c,stroke:#f06595,color:#fff
  style A fill:#374151,stroke:#6b7280,color:#9ca3af
  style B fill:#374151,stroke:#6b7280,color:#9ca3af
  style C fill:#374151,stroke:#6b7280,color:#9ca3af`,
        code: `# Tightly coupled — bad!
class Subject:
    def change(self):
        component_a.update()
        component_b.update()
        component_c.update()`,
      },
      {
        title: 'Observer Interface',
        explanation: 'Define a common Observer interface with an update() method. All observers implement this.',
        diagram: `classDiagram
  class Observer {
    <<interface>>
    +update(data)
  }
  class ConcreteObserverA {
    +update(data)
  }
  class ConcreteObserverB {
    +update(data)
  }
  Observer <|.. ConcreteObserverA
  Observer <|.. ConcreteObserverB`,
        code: `from abc import ABC, abstractmethod

class Observer(ABC):
    @abstractmethod
    def update(self, data): pass`,
      },
      {
        title: 'Subject with Subscribe / Notify',
        explanation: 'The Subject maintains a list of observers. It calls notify() to alert all of them when state changes.',
        diagram: `classDiagram
  class Subject {
    -observers: list
    +subscribe(observer)
    +unsubscribe(observer)
    +notify(data)
  }`,
        code: `class Subject:
    def __init__(self):
        self._observers = []

    def subscribe(self, obs):
        self._observers.append(obs)

    def notify(self, data):
        for obs in self._observers:
            obs.update(data)`,
      },
      {
        title: 'Observers React to Change',
        explanation: 'When the subject changes, all subscribed observers are notified automatically — no tight coupling.',
        diagram: `graph TD
  S["Subject\n(state changed)"] -->|notify| A["Observer A\nupdate()"]
  S -->|notify| B["Observer B\nupdate()"]
  S -->|notify| C["Observer C\nupdate()"]
  style S fill:#4263eb,stroke:#748ffc,color:#fff
  style A fill:#2f9e44,stroke:#40c057,color:#fff
  style B fill:#2f9e44,stroke:#40c057,color:#fff
  style C fill:#2f9e44,stroke:#40c057,color:#fff`,
        code: `# Usage
subject = Subject()
subject.subscribe(ConcreteObserverA())
subject.subscribe(ConcreteObserverB())

subject.state = "new value"
subject.notify("new value")
# Both observers update automatically`,
      },
    ],
  },

  {
    id: 'singleton-pattern',
    title: 'Singleton Pattern',
    emoji: '1️⃣',
    category: 'Design Patterns',
    difficulty: 'Beginner',
    description: 'Ensures a class has only one instance and provides a global access point to it.',
    steps: [
      {
        title: 'The Problem',
        explanation: 'Without Singleton, every call to the constructor creates a separate instance — no shared state.',
        diagram: `graph LR
  A[Client A] -->|new DB()| X["DB instance 1"]
  B[Client B] -->|new DB()| Y["DB instance 2"]
  C[Client C] -->|new DB()| Z["DB instance 3"]
  style X fill:#c2255c,stroke:#f06595,color:#fff
  style Y fill:#c2255c,stroke:#f06595,color:#fff
  style Z fill:#c2255c,stroke:#f06595,color:#fff`,
        code: `# Problem: 3 separate DB connections!
db1 = Database()
db2 = Database()
db3 = Database()`,
      },
      {
        title: 'Singleton: One Instance Only',
        explanation: 'The Singleton stores its own instance in a class variable and returns it on every call.',
        diagram: `graph LR
  A[Client A] -->|getInstance()| S["Single DB instance"]
  B[Client B] -->|getInstance()| S
  C[Client C] -->|getInstance()| S
  style S fill:#4263eb,stroke:#748ffc,color:#fff
  style A fill:#2f9e44,stroke:#40c057,color:#fff
  style B fill:#2f9e44,stroke:#40c057,color:#fff
  style C fill:#2f9e44,stroke:#40c057,color:#fff`,
        code: `class Database:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

db1 = Database()
db2 = Database()
assert db1 is db2  # True ✓`,
      },
    ],
  },

  // ─── SYSTEM DESIGN ─────────────────────────────────────────────────────────
  {
    id: 'load-balancer',
    title: 'Load Balancer',
    emoji: '⚖️',
    category: 'System Design',
    difficulty: 'Intermediate',
    description: 'Distributes incoming traffic across multiple servers to ensure reliability and performance.',
    steps: [
      {
        title: 'Without Load Balancer',
        explanation: 'All traffic hits a single server. If it gets overwhelmed or crashes, the whole service goes down.',
        diagram: `graph LR
  U1[User 1] --> S["Single Server 😰"]
  U2[User 2] --> S
  U3[User 3] --> S
  style S fill:#c2255c,stroke:#f06595,color:#fff`,
        code: `# Single point of failure
# No horizontal scaling`,
      },
      {
        title: 'Add a Load Balancer',
        explanation: 'A load balancer sits in front of your servers and routes each request to one of them.',
        diagram: `graph LR
  Users["Users"] --> LB["Load Balancer"]
  LB --> S1["Server 1"]
  LB --> S2["Server 2"]
  LB --> S3["Server 3"]
  style LB fill:#4263eb,stroke:#748ffc,color:#fff
  style S1 fill:#2f9e44,stroke:#40c057,color:#fff
  style S2 fill:#2f9e44,stroke:#40c057,color:#fff
  style S3 fill:#2f9e44,stroke:#40c057,color:#fff`,
        code: `# Round Robin: distribute evenly
servers = [s1, s2, s3]
idx = request_count % len(servers)
route_to(servers[idx])`,
      },
      {
        title: 'Round Robin Strategy',
        explanation: 'Round Robin sends each request to the next server in rotation. Simple and effective for uniform workloads.',
        diagram: `sequenceDiagram
  participant C as Client
  participant LB as Load Balancer
  participant S1 as Server 1
  participant S2 as Server 2
  participant S3 as Server 3
  C->>LB: Request 1
  LB->>S1: Route
  C->>LB: Request 2
  LB->>S2: Route
  C->>LB: Request 3
  LB->>S3: Route
  C->>LB: Request 4
  LB->>S1: Route (back to start)`,
        code: `# Nginx round robin config
upstream backend {
    server s1.example.com;
    server s2.example.com;
    server s3.example.com;
}`,
      },
      {
        title: 'Health Checks',
        explanation: 'Load balancers periodically ping each server. Unhealthy servers are removed from rotation automatically.',
        diagram: `graph TD
  LB["Load Balancer"] -->|"ping ✓"| S1["Server 1 🟢"]
  LB -->|"ping ✓"| S2["Server 2 🟢"]
  LB -->|"ping ✗ — removed"| S3["Server 3 🔴"]
  style LB fill:#4263eb,stroke:#748ffc,color:#fff
  style S1 fill:#2f9e44,stroke:#40c057,color:#fff
  style S2 fill:#2f9e44,stroke:#40c057,color:#fff
  style S3 fill:#c2255c,stroke:#f06595,color:#fff`,
        code: `# Auto-failover: if server fails,
# LB stops routing to it
# and spreads load to healthy servers`,
      },
    ],
  },

  {
    id: 'caching',
    title: 'Caching',
    emoji: '⚡',
    category: 'System Design',
    difficulty: 'Beginner',
    description: 'Store frequently accessed data in fast memory to reduce latency and database load.',
    steps: [
      {
        title: 'Without Cache',
        explanation: 'Every request goes to the database. Slow, expensive, and doesn\'t scale.',
        diagram: `sequenceDiagram
  participant C as Client
  participant S as Server
  participant DB as Database
  C->>S: GET /user/1
  S->>DB: SELECT * FROM users WHERE id=1
  DB-->>S: user data (50ms)
  S-->>C: response`,
        code: `# Every request hits DB
def get_user(id):
    return db.query(f"SELECT * FROM users WHERE id={id}")
# Slow: ~50ms each time`,
      },
      {
        title: 'Cache Hit',
        explanation: 'On the second request, the server checks the cache first. Data is found (cache hit) — returned in ~1ms.',
        diagram: `sequenceDiagram
  participant C as Client
  participant S as Server
  participant Cache as Cache (Redis)
  participant DB as Database
  C->>S: GET /user/1
  S->>Cache: get("user:1")
  Cache-->>S: ✓ HIT — user data (1ms)
  S-->>C: response (fast!)`,
        code: `def get_user(id):
    cached = redis.get(f"user:{id}")
    if cached:
        return cached  # ~1ms ✓
    user = db.query(...)
    redis.set(f"user:{id}", user, ttl=300)
    return user`,
      },
      {
        title: 'Cache Miss',
        explanation: 'If data isn\'t in cache (cache miss), fetch from DB and store in cache for next time.',
        diagram: `sequenceDiagram
  participant C as Client
  participant S as Server
  participant Cache as Cache (Redis)
  participant DB as Database
  C->>S: GET /user/99 (new)
  S->>Cache: get("user:99")
  Cache-->>S: ✗ MISS
  S->>DB: SELECT ...
  DB-->>S: user data
  S->>Cache: set("user:99", data, ttl=300)
  S-->>C: response`,
        code: `# TTL (Time To Live) = 300 seconds
# After 300s, cache expires
# Next request refetches from DB`,
      },
    ],
  },

  // ─── PROGRAMMING ───────────────────────────────────────────────────────────
  {
    id: 'recursion',
    title: 'Recursion',
    emoji: '🔄',
    category: 'Programming',
    difficulty: 'Intermediate',
    description: 'A function that calls itself to solve smaller subproblems until a base case is reached.',
    steps: [
      {
        title: 'The Idea',
        explanation: 'A recursive function solves a big problem by reducing it to a smaller version of the same problem, until it hits a base case.',
        diagram: `graph TD
  A["factorial(4)"] --> B["4 × factorial(3)"]
  B --> C["3 × factorial(2)"]
  C --> D["2 × factorial(1)"]
  D --> E["Base case: return 1"]
  style E fill:#2f9e44,stroke:#40c057,color:#fff
  style A fill:#4263eb,stroke:#748ffc,color:#fff`,
        code: `def factorial(n):
    if n == 1:       # base case
        return 1
    return n * factorial(n - 1)  # recurse`,
      },
      {
        title: 'Call Stack: Going Down',
        explanation: 'Each recursive call is added to the call stack. The stack grows until the base case.',
        diagram: `graph BT
  E["factorial(1) → 1"] --> D["factorial(2) waiting..."]
  D --> C["factorial(3) waiting..."]
  C --> B["factorial(4) waiting..."]
  style E fill:#2f9e44,stroke:#40c057,color:#fff
  style D fill:#e67700,stroke:#f59f00,color:#fff
  style C fill:#e67700,stroke:#f59f00,color:#fff
  style B fill:#4263eb,stroke:#748ffc,color:#fff`,
        code: `# Call stack (top = most recent):
# factorial(1) ← executing
# factorial(2) ← waiting
# factorial(3) ← waiting
# factorial(4) ← waiting`,
      },
      {
        title: 'Unwinding: Going Up',
        explanation: 'Once the base case returns, each waiting call resolves and returns up the stack.',
        diagram: `graph TD
  A["factorial(4) = 24 ✓"] --> B["factorial(3) = 6 ✓"]
  B --> C["factorial(2) = 2 ✓"]
  C --> D["factorial(1) = 1 ✓"]
  style A fill:#4263eb,stroke:#748ffc,color:#fff
  style B fill:#2f9e44,stroke:#40c057,color:#fff
  style C fill:#2f9e44,stroke:#40c057,color:#fff
  style D fill:#2f9e44,stroke:#40c057,color:#fff`,
        code: `# Unwinding:
# factorial(1) returns 1
# factorial(2) returns 2 × 1 = 2
# factorial(3) returns 3 × 2 = 6
# factorial(4) returns 4 × 6 = 24 ✓`,
      },
    ],
  },
]
