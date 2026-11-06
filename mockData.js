// Pre-seeded MAKAUT Semester 3 CSE Mock Data for Standalone Client Execution
export const initialMockData = {
  profile: {
    name: "Akashdip Sah",
    degree: "B.Tech CSE",
    institute: "Budge Budge Institute of Technology (MAKAUT)",
    batch: "Batch 2026–2027",
    section: "Section A",
    current_semester: 3,
    current_cgpa: 8.84,
    target_cgpa: 9.20,
    attendance_rate: 88.4,
    study_velocity_hours: 18.5
  },
  summary: {
    completion_percentage: 64.7,
    completed_topics: 28,
    total_topics: 42,
    study_time_today: "3h 45m",
    study_time_week: "18h 30m"
  },
  deadlines: [
    { id: 1, title: "MAKAUT CA-2 Assessment Window", subject_code: "CS301", deadline_date: "2026-11-18", days_remaining: 12, type: "CA_EXAM" },
    { id: 2, title: "COA Pipeline Architecture Report", subject_code: "PCC-CS302", deadline_date: "2026-11-22", days_remaining: 16, type: "ASSIGNMENT" },
    { id: 3, title: "Python Lab Continuous Viva", subject_code: "PCC-CS391", deadline_date: "2026-11-26", days_remaining: 20, type: "LAB_VIVA" },
    { id: 4, title: "MAKAUT Odd-Semester Final Exams", subject_code: "ALL", deadline_date: "2026-12-15", days_remaining: 39, type: "SEM_EXAM" }
  ],
  subjects: [
    {
      id: 1,
      code: "PCC-CS301",
      name: "Data Structures & Algorithms",
      credits: 4.0,
      category: "Core CSE",
      professor: "Prof. S. Sengupta",
      color_theme: "primary",
      total_modules: 5,
      current_unit_name: "Unit 2: Advanced Trees & Graphs",
      total_topics: 12,
      completed_topics: 8,
      inflight_topics: 3,
      completion_percentage: 66.7
    },
    {
      id: 2,
      code: "BSC-M301",
      name: "Mathematics III",
      credits: 4.0,
      category: "Basic Science",
      professor: "Dr. A. Roy",
      color_theme: "secondary",
      total_modules: 4,
      current_unit_name: "Unit 3: Multiple Integrals",
      total_topics: 8,
      completed_topics: 5,
      inflight_topics: 2,
      completion_percentage: 62.5
    },
    {
      id: 3,
      code: "PCC-CS302",
      name: "Computer Organisation",
      credits: 4.0,
      category: "Core CSE",
      professor: "Prof. R. Banerjee",
      color_theme: "tertiary",
      total_modules: 4,
      current_unit_name: "Unit 3: Pipelining & Memory",
      total_topics: 8,
      completed_topics: 6,
      inflight_topics: 2,
      completion_percentage: 75.0
    },
    {
      id: 4,
      code: "ESC-301",
      name: "Analog & Digital Circuits",
      credits: 3.0,
      category: "Engineering Science",
      professor: "Dr. M. Ghosh",
      color_theme: "outline",
      total_modules: 4,
      current_unit_name: "Unit 4: Sequential Flip-Flops",
      total_topics: 6,
      completed_topics: 4,
      inflight_topics: 1,
      completion_percentage: 66.7
    },
    {
      id: 5,
      code: "PCC-CS391",
      name: "Python Programming Lab",
      credits: 2.0,
      category: "Core CSE",
      professor: "Prof. K. Mukherjee",
      color_theme: "tertiary",
      total_modules: 5,
      current_unit_name: "Unit 5: NumPy & Graph Models",
      total_topics: 5,
      completed_topics: 4,
      inflight_topics: 1,
      completion_percentage: 80.0
    },
    {
      id: 6,
      code: "HSMC-301",
      name: "Economics for Engineers",
      credits: 2.0,
      category: "Humanities",
      professor: "Dr. P. Sen",
      color_theme: "secondary",
      total_modules: 3,
      current_unit_name: "Unit 2: Engineering Cost Analysis",
      total_topics: 3,
      completed_topics: 2,
      inflight_topics: 0,
      completion_percentage: 66.7
    }
  ],
  topics: [
    { id: 1, subject_id: 1, unit_number: 1, unit_name: "Linear Data Structures", title: "Arrays, Linked Lists, & Complexity Analysis", status: "done", priority: "high", difficulty: "beginner", revision_completed: 1, notes: "Mastered two-pointer and cycle detection (Floyd's algorithm)." },
    { id: 2, subject_id: 1, unit_number: 1, unit_name: "Linear Data Structures", title: "Stack & Queue: Infix to Postfix, Circular Queues", status: "done", priority: "normal", difficulty: "beginner", revision_completed: 1, notes: "Completed evaluation of postfix using operand stack." },
    { id: 3, subject_id: 1, unit_number: 2, unit_name: "Non-Linear Structures: Trees", title: "Binary Trees & BST Insert, Delete, Traversals", status: "done", priority: "high", difficulty: "intermediate", revision_completed: 1, notes: "BST delete cases handled with inorder successor." },
    { id: 4, subject_id: 1, unit_number: 2, unit_name: "Non-Linear Structures: Trees", title: "AVL Trees: LL, RR, LR, RL Rotations", status: "done", priority: "high", difficulty: "intermediate", revision_completed: 1, notes: "Single rotation for LL/RR; Double for LR/RL. Balance factor invariant maintained." },
    { id: 5, subject_id: 1, unit_number: 2, unit_name: "Non-Linear Structures: Trees", title: "B-Trees & B+ Tree Multi-way Search Indexing", status: "in-flight", priority: "high", difficulty: "advanced", revision_completed: 0, notes: "Study root split and node overflow condition." },
    { id: 6, subject_id: 1, unit_number: 3, unit_name: "Graph Algorithms", title: "BFS, DFS, & Topological Sorting", status: "done", priority: "high", difficulty: "intermediate", revision_completed: 1, notes: "Kahn algorithm and DFS finish time stack for DAG." },
    { id: 7, subject_id: 1, unit_number: 3, unit_name: "Graph Algorithms", title: "Dijkstra's & Bellman-Ford Shortest Path", status: "done", priority: "high", difficulty: "intermediate", revision_completed: 1, notes: "Greedy min-heap priority queue vs dynamic relaxation." },
    { id: 8, subject_id: 1, unit_number: 3, unit_name: "Graph Algorithms", title: "Kruskal & Prim Minimal Spanning Trees", status: "in-flight", priority: "normal", difficulty: "intermediate", revision_completed: 0, notes: "Disjoint set union (DSU) with rank and path compression." },
    { id: 9, subject_id: 1, unit_number: 4, unit_name: "Searching & Sorting", title: "Quick Sort, Merge Sort & Lower Bounds", status: "done", priority: "normal", difficulty: "intermediate", revision_completed: 1, notes: "Partition Lomuto vs Hoare; O(N log N) comparison lower bound proof." },
    { id: 10, subject_id: 1, unit_number: 4, unit_name: "Searching & Sorting", title: "Heap Sort & Priority Queues", status: "done", priority: "normal", difficulty: "intermediate", revision_completed: 1, notes: "Heapify operation O(N) linear time construction." },
    { id: 11, subject_id: 1, unit_number: 5, unit_name: "Hashing & Advanced", title: "Collision Resolution & Open Addressing", status: "in-flight", priority: "normal", difficulty: "advanced", revision_completed: 0, notes: "Linear probing clustering vs quadratic and double hashing." },
    { id: 12, subject_id: 1, unit_number: 5, unit_name: "Hashing & Advanced", title: "Trie & String Matching Algorithms", status: "pending", priority: "low", difficulty: "advanced", revision_completed: 0, notes: "Prefix tree insertion and KMP failure function table." },
    { id: 13, subject_id: 2, unit_number: 1, unit_name: "Differential Calculus", title: "Power Series, Taylor & Maclaurin Series", status: "done", priority: "normal", difficulty: "intermediate", revision_completed: 1, notes: "Rolle's Theorem & Taylor series expansion points." },
    { id: 14, subject_id: 2, unit_number: 2, unit_name: "Partial Differentiation", title: "Euler's Theorem & Jacobian Transformations", status: "in-flight", priority: "normal", difficulty: "intermediate", revision_completed: 0, notes: "Euler theorem on homogeneous functions of degree n." },
    { id: 15, subject_id: 2, unit_number: 2, unit_name: "Partial Differentiation", title: "Maxima & Minima with Lagrange Multipliers", status: "done", priority: "high", difficulty: "intermediate", revision_completed: 1, notes: "Grad f = lambda Grad g constraint condition." },
    { id: 16, subject_id: 2, unit_number: 3, unit_name: "Multiple Integrals", title: "Double & Triple Integrations in Polar Coordinates", status: "in-flight", priority: "high", difficulty: "intermediate", revision_completed: 0, notes: "Volume transforms and dx dy = r dr dtheta." },
    { id: 17, subject_id: 2, unit_number: 4, unit_name: "Vector Calculus", title: "Stokes, Gauss Divergence & Green's Theorem", status: "pending", priority: "high", difficulty: "advanced", revision_completed: 0, notes: "Stokes theorem boundary line integral equals surface curl." },
    { id: 18, subject_id: 3, unit_number: 2, unit_name: "Processor & Control Unit", title: "Data Path Architecture & Micro-operations", status: "done", priority: "high", difficulty: "intermediate", revision_completed: 1, notes: "ALU flags and register transfer language." },
    { id: 19, subject_id: 3, unit_number: 3, unit_name: "Pipelining & Parallelism", title: "Instruction Pipeline, Structural Hazards", status: "done", priority: "high", difficulty: "advanced", revision_completed: 1, notes: "Data dependency forwarding and branch penalty bubbles." },
    { id: 20, subject_id: 3, unit_number: 4, unit_name: "Memory Organisation", title: "Cache Principles: Direct, Associative, Set-Associative", status: "done", priority: "high", difficulty: "intermediate", revision_completed: 1, notes: "Tag, Index, and Block offset address partitioning." }
  ],
  goals: [
    { id: 1, title: "Complete DSA: Binary Search Tree traversals", subject_code: "PCC-CS301", priority: "High", status: "completed" },
    { id: 2, title: "Practise Mathematics III: Multiple Integrals surface area problems", subject_code: "BSC-M301", priority: "High", status: "pending" },
    { id: 3, title: "Revise Computer Organisation: Cache Mapping techniques", subject_code: "PCC-CS302", priority: "Medium", status: "pending" },
    { id: 4, title: "Python Lab: Implement Dijkstra's Algorithm graph routing", subject_code: "PCC-CS391", priority: "Normal", status: "pending" },
    { id: 5, title: "Economics Chapter 4: Marginal Cost curves and Break-even points", subject_code: "HSMC-301", priority: "Low", status: "pending" }
  ],
  tests: [
    { id: 1, subject_code: "CS301", test_type: "CA-1 Internal Assessment", domain: "CA", max_marks: 25.0, obtained_marks: 23.0, percentage: 92.0, grade: "O", weightage_percent: 15.0, eval_date: "2026-10-12", notes: "Data Structures & Algorithms", evaluator_remarks: "Outstanding performance in linked lists & stacks. Clean asymptotic analysis." },
    { id: 2, subject_code: "BS-M301", test_type: "CA-1 Unit Exam", domain: "CA", max_marks: 25.0, obtained_marks: 19.0, percentage: 76.0, grade: "A", weightage_percent: 15.0, eval_date: "2026-10-15", notes: "Mathematics III", evaluator_remarks: "Formulas in Partial Differentiation need revision. Stokes theorem boundaries skipped." },
    { id: 3, subject_code: "ES-CS391", test_type: "PCA-1 Python Lab", domain: "PCA", max_marks: 50.0, obtained_marks: 48.0, percentage: 96.0, grade: "O", weightage_percent: 20.0, eval_date: "2026-10-18", notes: "Python Programming Lab", evaluator_remarks: "Clean code structure, fast recursion handling, excellent NumPy implementation." },
    { id: 4, subject_code: "PCC-CS302", test_type: "Mock Midterm Comp Org", domain: "Mock", max_marks: 40.0, obtained_marks: 34.0, percentage: 85.0, grade: "E", weightage_percent: 15.0, eval_date: "2026-10-22", notes: "Computer Organisation", evaluator_remarks: "Strong in Boolean logic & multiplexers, review instruction pipelines and hazard handling." },
    { id: 5, subject_code: "CS301", test_type: "CA-2 Diagnostic Test", domain: "CA", max_marks: 25.0, obtained_marks: 22.0, percentage: 88.0, grade: "E", weightage_percent: 15.0, eval_date: "2026-10-28", notes: "Data Structures & Algorithms", evaluator_remarks: "Mastered recursion, brush up hash collision." },
    { id: 6, subject_code: "EC301", test_type: "Lab Viva Analog Electronics", domain: "Viva", max_marks: 25.0, obtained_marks: 20.0, percentage: 80.0, grade: "E", weightage_percent: 10.0, eval_date: "2026-11-01", notes: "Analog & Digital Electronics", evaluator_remarks: "Good understanding of OP-AMP feedback circuits and slew rates." }
  ],
  pyqs: [
    { id: 1, subject_code: "PCC-CS301", year: 2024, exam_type: "Semester Final", question_text: "Prove that an AVL tree with n nodes has height bounded by 1.44 log2(n). Show step-by-step LL and LR rotations on an initially empty AVL tree after inserting 10, 20, 30, 40, 50, 25.", marks: 10, module_unit: "Unit 2: Trees", solution_summary: "Height balance property guarantees O(log N) lookup. Rotations restore balance factor within {-1, 0, +1}." },
    { id: 2, subject_code: "PCC-CS301", year: 2023, exam_type: "Semester Final", question_text: "Write an algorithm for BFS traversal of a graph using an adjacency list. Explain its time and space complexity with an example.", marks: 8, module_unit: "Unit 3: Graphs", solution_summary: "Time complexity is O(V + E) using queue data structure; space complexity is O(V) for visited array." },
    { id: 3, subject_code: "BSC-M301", year: 2024, exam_type: "Semester Final", question_text: "Verify Stokes theorem for F = (2x - y)i - yz^2 j - y^2 z k over upper half of unit sphere x^2 + y^2 + z^2 = 1 bounded by z = 0.", marks: 10, module_unit: "Unit 4: Vector Calculus", solution_summary: "Integral over closed circle boundary equals surface integral of curl F dot n dS. Both evaluate to pi." },
    { id: 4, subject_code: "PCC-CS302", year: 2024, exam_type: "Semester Final", question_text: "Explain Direct, Associative, and 4-way Set-Associative cache mapping techniques. A 64 KB cache has 16-byte blocks. For a 32-bit physical address, determine the tag, index, and offset fields.", marks: 12, module_unit: "Unit 4: Memory", solution_summary: "Block offset = 4 bits (16B). For 4-way set associative: 1024 sets -> 10 bits index, 18 bits tag." },
    { id: 5, subject_code: "ESC-301", year: 2023, exam_type: "Semester Final", question_text: "Design a synchronous MOD-6 up counter using JK flip-flops. Draw state diagram, state table, and logic circuit.", marks: 10, module_unit: "Unit 4: Sequential Logic", solution_summary: "Requires 3 flip-flops (2^3 = 8 > 6). States 000 to 101. Reset on 110 using excitation table." }
  ]
};

