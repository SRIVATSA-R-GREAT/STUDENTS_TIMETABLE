import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Trash2,
  RotateCcw,
  Terminal,
  Sparkles,
  Sliders,
  Code2,
  ShieldCheck,
  Flame,
  Layers,
  Share2,
  Copy,
  Check,
  Info,
  ChevronRight,
  GraduationCap,
  Zap,
  BarChart3,
  Eye,
  X,
  FileText,
  Building2,
  Award,
  BookmarkCheck,
  UserCheck
} from 'lucide-react';

/**
 * =======================================================================
 *  MANGALORE INSTITUTE OF TECHNOLOGY & ENGINEERING (MITE)
 *  DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING (AIML)
 *  III Semester — Academic Year 2026-27
 *  Classroom: LH - P302 | Class Advisor: Dr. Yogeesha C B
 * =======================================================================
 *
 *  All times use 24-hour format and are day-relative (0–23).
 *  Days: 0 (Monday) through 6 (Sunday).
 */

export const DAYS = 7;
export const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const DAY_FULL_NAMES = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

// Period timings as per official MITE Timetable
export const PERIOD_LABELS = {
  9: 'P1 (09:00–09:55)',
  10: 'P2 (09:55–10:50)',
  11: 'P3 (11:10–12:05)',
  12: 'P4 (12:05–01:00)',
  13: 'Lunch (01:00–01:45)',
  14: 'P5 (01:45–02:40)',
  15: 'P6 (02:40–03:35)',
  16: 'P7 (03:35–04:30)',
  17: 'Study (05:00–06:00)',
  18: 'Study (06:00–07:00)',
  19: 'Study (07:00–08:00)',
  20: 'Study (08:00–09:00)',
};

export const DEFAULT_MIN_HOUR = 8;  // 8:00 AM
export const DEFAULT_MAX_HOUR = 21; // 9:00 PM
export const DEFAULT_MAX_BLOCK = 2; // Max 2 contiguous study hours

const TYPE_WEIGHT = {
  exam: 3,
  quiz: 2,
  assignment: 1,
};

/**
 * Official MITE CS&E (AIML) Courses (From Timetable AY 2026-27)
 */
export const MITE_COURSES = [
  {
    id: '23BSCI201',
    name: 'Engineering Mathematics - III',
    faculty: 'Dr. Ramya S',
    color: '#3b82f6', // Blue
    category: 'Core Maths',
  },
  {
    id: '23CIPC203',
    name: 'Data Structures and Applications',
    faculty: 'Dr. Yogeesha C B',
    color: '#8b5cf6', // Violet
    category: 'Core CS',
  },
  {
    id: '23CIPC204',
    name: 'Digital System Design',
    faculty: 'Mr. Prakash L.S. / Ms. Poornima',
    color: '#10b981', // Emerald
    category: 'Core CS / ADE',
  },
  {
    id: '23CIPC205',
    name: 'Computer Organization',
    faculty: 'Ms. Poornima',
    color: '#f59e0b', // Amber
    category: 'Core CS',
  },
  {
    id: '23CIPC206',
    name: 'Software Engineering',
    faculty: 'Mr. Vikram',
    color: '#06b6d4', // Cyan
    category: 'Core CS',
  },
  {
    id: '23CISE252',
    name: 'Python Programming',
    faculty: 'Ms. Padmakshi N',
    color: '#ec4899', // Pink
    category: 'Emerging Tech / CAD Lab',
  },
  {
    id: '23HMCC215',
    name: 'Universal Human Values',
    faculty: 'Dr. Umesh S S',
    color: '#84cc16', // Lime
    category: 'Humanities',
  },
  {
    id: '23NMCC22X',
    name: 'Yoga / PE / NSS / Arts - I',
    faculty: 'Ms. Nisha / Ms. Rithika / Dr. Sameera / Dr. Farha',
    color: '#a855f7', // Purple
    category: 'Non-Credit Mandatory',
  },
  {
    id: 'INST-HOURS',
    name: 'Institutional Hours (Library / CT / Mentoring / Clubs)',
    faculty: 'MITE Faculty & Class Advisor',
    color: '#64748b', // Slate
    category: 'Institutional',
  },
];

/**
 * Official MITE CS&E (AIML) III Sem Weekly Timetable Slots (Image 2)
 */
export const MITE_FIXED_SLOTS = [
  // --- MONDAY (Day 0) ---
  { id: 'fs-m1', courseId: '23CISE252', type: 'lecture', day: 0, startHour: 9, endHour: 10, label: 'Python Programming (Lecture)' },
  { id: 'fs-m2', courseId: '23HMCC215', type: 'lecture', day: 0, startHour: 10, endHour: 11, label: 'Universal Human Values' },
  { id: 'fs-m3', courseId: '23CIPC205', type: 'lecture', day: 0, startHour: 11, endHour: 12, label: 'Computer Organization' },
  { id: 'fs-m4', courseId: '23CIPC204', type: 'lecture', day: 0, startHour: 12, endHour: 13, label: 'Digital System Design' },
  { id: 'fs-m5', courseId: '23BSCI201', type: 'tutorial', day: 0, startHour: 14, endHour: 15, label: 'Engg Maths - III (Practice Hour*)' },

  // --- TUESDAY (Day 1) ---
  { id: 'fs-t1', courseId: '23CIPC205', type: 'lecture', day: 1, startHour: 9, endHour: 10, label: 'Computer Organization' },
  { id: 'fs-t2', courseId: '23CIPC204', type: 'lecture', day: 1, startHour: 10, endHour: 11, label: 'Digital System Design' },
  { id: 'fs-t3', courseId: '23HMCC215', type: 'lecture', day: 1, startHour: 11, endHour: 12, label: 'Universal Human Values' },
  { id: 'fs-t4', courseId: '23CIPC203', type: 'lecture', day: 1, startHour: 12, endHour: 13, label: 'Data Structures and Applications' },

  // --- WEDNESDAY (Day 2) ---
  { id: 'fs-w1', courseId: '23BSCI201', type: 'lecture', day: 2, startHour: 9, endHour: 10, label: 'Engineering Mathematics - III' },
  { id: 'fs-w2', courseId: '23CIPC205', type: 'lecture', day: 2, startHour: 10, endHour: 11, label: 'Computer Organization' },
  { id: 'fs-w3', courseId: 'INST-HOURS', type: 'lecture', day: 2, startHour: 11, endHour: 12, label: 'Library Reading Hour' },
  { id: 'fs-w4', courseId: '23CIPC203', type: 'lecture', day: 2, startHour: 12, endHour: 13, label: 'Data Structures and Applications' },
  { id: 'fs-w5', courseId: '23CIPC204', type: 'lab', day: 2, startHour: 14, endHour: 16, label: 'DSD Lab (Venue: LB-A103 1st Floor - ADE)' },
  { id: 'fs-w6', courseId: '23NMCC22X', type: 'lecture', day: 2, startHour: 16, endHour: 17, label: 'Yoga / PE / NSS / Arts - I' },

  // --- THURSDAY (Day 3) ---
  { id: 'fs-th1', courseId: '23BSCI201', type: 'lecture', day: 3, startHour: 9, endHour: 10, label: 'Engineering Mathematics - III' },
  { id: 'fs-th2', courseId: '23CIPC204', type: 'lecture', day: 3, startHour: 10, endHour: 11, label: 'Digital System Design' },
  { id: 'fs-th3', courseId: '23BSCI201', type: 'lecture', day: 3, startHour: 11, endHour: 12, label: 'Engineering Mathematics - III' },
  { id: 'fs-th4', courseId: 'INST-HOURS', type: 'lecture', day: 3, startHour: 12, endHour: 13, label: 'Communication Training (CT)' },
  { id: 'fs-th5', courseId: '23CIPC203', type: 'lab', day: 3, startHour: 14, endHour: 16, label: 'DSA Lab (Venue: LB-A103 1st Floor - ADE)' },

  // --- FRIDAY (Day 4) ---
  { id: 'fs-f1', courseId: '23CIPC206', type: 'lecture', day: 4, startHour: 9, endHour: 10, label: 'Software Engineering' },
  { id: 'fs-f2', courseId: '23CIPC206', type: 'lecture', day: 4, startHour: 10, endHour: 11, label: 'Software Engineering' },
  { id: 'fs-f3', courseId: '23CIPC205', type: 'lecture', day: 4, startHour: 11, endHour: 12, label: 'Computer Organization' },
  { id: 'fs-f4', courseId: '23CIPC203', type: 'lecture', day: 4, startHour: 12, endHour: 13, label: 'Data Structures and Applications' },
  { id: 'fs-f5', courseId: 'INST-HOURS', type: 'lecture', day: 4, startHour: 14, endHour: 15, label: 'Mentoring Session (Dr. Yogeesha C B)' },
  { id: 'fs-f6', courseId: '23CIPC206', type: 'tutorial', day: 4, startHour: 15, endHour: 16, label: 'Software Engineering (Tutorial)' },

  // --- SATURDAY (Day 5) ---
  { id: 'fs-s1', courseId: '23CISE252', type: 'lab', day: 5, startHour: 9, endHour: 11, label: 'Python Lab (Venue: LB-A001 CAD Lab)' },
  { id: 'fs-s2', courseId: '23CIPC206', type: 'lecture', day: 5, startHour: 11, endHour: 12, label: 'Software Engineering' },
  { id: 'fs-s3', courseId: '23CIPC206', type: 'tutorial', day: 5, startHour: 12, endHour: 13, label: 'Software Engineering (Tutorial)' },
  { id: 'fs-s4', courseId: 'INST-HOURS', type: 'lecture', day: 5, startHour: 14, endHour: 17, label: 'Club Activities' },
];

/**
 * Official MITE Deadlines:
 * 1. Continuous Internal Evaluation (CIE) Test 1 Schedule (Image 1)
 * 2. Dr. Ramya S Mathematics Activity Based Assessment I (ABA 1) (Image 3)
 */
export const MITE_DEFAULT_DEADLINES = [
  // --- MATHS ABA-1 ASSIGNMENT (Image 3) ---
  {
    id: 'dl-math-aba1',
    courseId: '23BSCI201',
    title: 'Activity Based Assessment I (ABA 1)',
    type: 'assignment',
    dueDay: 5, // Saturday
    dueDate: '2026-11-21',
    estimatedHours: 4,
    faculty: 'Dr. Ramya S',
    maxMarks: 50,
    note: 'Submit written ABA 1 component in assignment book on or before 21.11.2026',
    isAssignmentBook: true,
  },

  // --- CIE TEST 1 EXAMS (Image 1) ---
  // 31-10-2026 Saturday
  {
    id: 'dl-cie-math',
    courseId: '23BSCI201',
    title: 'CIE Test 1: Engg Mathematics - III',
    type: 'exam',
    dueDay: 5, // Saturday
    dueDate: '2026-10-31',
    sessionTime: '09:15 AM – 10:45 AM',
    estimatedHours: 3,
  },
  {
    id: 'dl-cie-dsa',
    courseId: '23CIPC203',
    title: 'CIE Test 1: Data Structures & Applications',
    type: 'exam',
    dueDay: 5, // Saturday
    dueDate: '2026-10-31',
    sessionTime: '01:15 PM – 02:45 PM',
    estimatedHours: 3,
  },

  // 02-11-2026 Monday
  {
    id: 'dl-cie-co',
    courseId: '23CIPC205',
    title: 'CIE Test 1: Computer Organization',
    type: 'exam',
    dueDay: 0, // Monday
    dueDate: '2026-11-02',
    sessionTime: '09:15 AM – 10:45 AM',
    estimatedHours: 3,
  },
  {
    id: 'dl-cie-dsd',
    courseId: '23CIPC204',
    title: 'CIE Test 1: Digital Systems Design',
    type: 'exam',
    dueDay: 0, // Monday
    dueDate: '2026-11-02',
    sessionTime: '01:15 PM – 02:45 PM',
    estimatedHours: 3,
  },

  // 03-11-2026 Tuesday
  {
    id: 'dl-cie-uhv',
    courseId: '23HMCC215',
    title: 'CIE Test 1: Universal Human Values',
    type: 'exam',
    dueDay: 1, // Tuesday
    dueDate: '2026-11-03',
    sessionTime: '09:15 AM – 10:45 AM',
    estimatedHours: 2,
  },
  {
    id: 'dl-cie-se',
    courseId: '23CIPC206',
    title: 'CIE Test 1: Software Engineering',
    type: 'exam',
    dueDay: 1, // Tuesday
    dueDate: '2026-11-03',
    sessionTime: '01:15 PM – 02:45 PM',
    estimatedHours: 3,
  },
];

/**
 * ============================================================
 *  Core Scheduling Algorithm & Clash Detection Utilities
 * ============================================================
 */

export function hasClash(a, b) {
  if (a.day !== b.day) return false;
  return a.startHour < b.endHour && b.startHour < a.endHour;
}

export function detectClashes(events) {
  const clashes = [];
  for (let i = 0; i < events.length; i++) {
    for (let j = i + 1; j < events.length; j++) {
      if (hasClash(events[i], events[j])) {
        clashes.push([events[i], events[j]]);
      }
    }
  }
  return clashes;
}

export function toCalendarEvents(courses, fixedSlots, deadlines, studyBlocks) {
  const courseMap = Object.fromEntries(courses.map((c) => [c.id, c]));
  const dlMap = Object.fromEntries(deadlines.map((d) => [d.id, d]));
  const events = [];

  for (const s of fixedSlots) {
    const course = courseMap[s.courseId];
    events.push({
      id: s.id,
      courseId: s.courseId,
      title: s.label || `${s.courseId} ${s.type.charAt(0).toUpperCase() + s.type.slice(1)}`,
      courseName: course?.name ?? s.courseId,
      faculty: course?.faculty ?? '',
      category: s.type,
      isFixed: true,
      day: s.day,
      startHour: s.startHour,
      endHour: s.endHour,
      color: course?.color ?? '#94a3b8',
    });
  }

  for (const sb of studyBlocks) {
    const course = courseMap[sb.courseId];
    const dl = dlMap[sb.deadlineId];
    events.push({
      id: sb.id,
      courseId: sb.courseId,
      deadlineId: sb.deadlineId,
      title: dl?.type === 'exam' ? `🎯 Prep: ${dl.title}` : `📖 Study: ${dl?.title ?? 'Assignment'}`,
      courseName: course?.name ?? sb.courseId,
      deadlineType: dl?.type ?? 'assignment',
      category: 'study',
      isFixed: false,
      day: sb.day,
      startHour: sb.startHour,
      endHour: sb.endHour,
      color: course?.color ? course.color + '99' : '#94a3b899',
      solidColor: course?.color ?? '#94a3b8',
    });
  }

  return events;
}

/**
 * Cycle-Aware Greedy 7x24 Occupancy Grid Study Scheduler
 *
 * - Prioritizes deadlines by urgency (Exams > Quizzes > Assignments)
 * - Correctly handles preparation for any day (including Monday/Tuesday via wrap-around weekend study)
 * - Enforces anti-burnout limit (≤ maxBlock contiguous study hours + 1h rest buffer)
 * - Respects study window [minHour, maxHour)
 */
export function generateStudySchedule(
  fixedSlots,
  deadlines,
  options = {
    minHour: DEFAULT_MIN_HOUR,
    maxHour: DEFAULT_MAX_HOUR,
    maxBlock: DEFAULT_MAX_BLOCK,
    strategy: 'pre-deadline',
  }
) {
  const {
    minHour = DEFAULT_MIN_HOUR,
    maxHour = DEFAULT_MAX_HOUR,
    maxBlock = DEFAULT_MAX_BLOCK,
    strategy = 'pre-deadline',
  } = options;

  const occupied = Array.from({ length: DAYS }, () => Array(24).fill(false));
  const studyOccupied = Array.from({ length: DAYS }, () => Array(24).fill(false));

  // Mark all fixed slots as occupied
  for (const slot of fixedSlots) {
    if (slot.day >= 0 && slot.day < DAYS) {
      for (let h = Math.max(0, slot.startHour); h < Math.min(24, slot.endHour); h++) {
        occupied[slot.day][h] = true;
      }
    }
  }

  // Sort deadlines: Higher weight (exam > quiz > assignment) first, then earlier dueDay
  const sortedDeadlines = [...deadlines].sort((a, b) => {
    const weightA = TYPE_WEIGHT[a.type] || 1;
    const weightB = TYPE_WEIGHT[b.type] || 1;
    if (weightB !== weightA) return weightB - weightA;
    return a.dueDay - b.dueDay;
  });

  const studyBlocks = [];
  const unallocatedByDeadline = {};
  let blockCounter = 1;

  const getPrecedingContiguousStudy = (day, hour) => {
    let count = 0;
    let cur = hour - 1;
    while (cur >= minHour && studyOccupied[day][cur]) {
      count++;
      cur--;
    }
    return count;
  };

  const getFollowingContiguousStudy = (day, hour) => {
    let count = 0;
    let cur = hour + 1;
    while (cur < maxHour && studyOccupied[day][cur]) {
      count++;
      cur++;
    }
    return count;
  };

  const allocateOnDay = (dl, day, remainingNeeded, maxHoursThisPass) => {
    let placedOnDay = 0;
    let h = minHour;

    while (h < maxHour && remainingNeeded - placedOnDay > 0 && placedOnDay < maxHoursThisPass) {
      if (!occupied[day][h]) {
        const prevStudy = getPrecedingContiguousStudy(day, h);
        const nextStudy = getFollowingContiguousStudy(day, h);

        if (prevStudy >= maxBlock || prevStudy + 1 + nextStudy > maxBlock) {
          h++;
          continue;
        }

        const blockStart = h;
        const maxAllowedInBlock = Math.min(
          maxBlock - prevStudy,
          remainingNeeded - placedOnDay,
          maxHoursThisPass - placedOnDay
        );

        let blockLen = 0;
        while (
          h < maxHour &&
          !occupied[day][h] &&
          blockLen < maxAllowedInBlock &&
          getFollowingContiguousStudy(day, h) + blockLen + prevStudy + 1 <= maxBlock
        ) {
          occupied[day][h] = true;
          studyOccupied[day][h] = true;
          blockLen++;
          h++;
        }

        if (blockLen > 0) {
          studyBlocks.push({
            id: `sb-${blockCounter++}`,
            deadlineId: dl.id,
            courseId: dl.courseId,
            day,
            startHour: blockStart,
            endHour: blockStart + blockLen,
          });
          placedOnDay += blockLen;
          h++; // Mandatory 1-hour anti-burnout break
        } else {
          h++;
        }
      } else {
        h++;
      }
    }

    return placedOnDay;
  };

  for (const dl of sortedDeadlines) {
    let remaining = Number(dl.estimatedHours) || 0;

    // Prioritized pre-deadline days (cycle-aware)
    const beforeDays = [];
    if (strategy === 'pre-deadline') {
      // Days closest to the deadline walking backwards (e.g. for Sat: Fri, Thu, Wed; for Mon: Sun, Sat, Fri)
      for (let offset = 1; offset < DAYS; offset++) {
        const d = (dl.dueDay - offset + DAYS) % DAYS;
        beforeDays.push(d);
      }
    } else if (strategy === 'earliest') {
      for (let offset = DAYS - 1; offset >= 1; offset--) {
        const d = (dl.dueDay - offset + DAYS) % DAYS;
        beforeDays.push(d);
      }
    } else {
      // Spaced
      for (let offset = 1; offset < DAYS; offset++) {
        const d = (dl.dueDay - offset + DAYS) % DAYS;
        beforeDays.push(d);
      }
    }

    if (strategy === 'spaced' && beforeDays.length > 0) {
      let madeProgress = true;
      while (remaining > 0 && madeProgress) {
        madeProgress = false;
        for (const d of beforeDays) {
          if (remaining <= 0) break;
          const placed = allocateOnDay(dl, d, remaining, maxBlock);
          if (placed > 0) {
            remaining -= placed;
            madeProgress = true;
          }
        }
      }
    } else {
      for (const d of beforeDays) {
        if (remaining <= 0) break;
        const placed = allocateOnDay(dl, d, remaining, remaining);
        remaining -= placed;
      }
    }

    // Fallback: Day of deadline itself if all preceding days are completely booked
    if (remaining > 0) {
      const placed = allocateOnDay(dl, dl.dueDay, remaining, remaining);
      remaining -= placed;
    }

    unallocatedByDeadline[dl.id] = remaining;
  }

  return {
    studyBlocks,
    unallocatedByDeadline,
  };
}

function formatHour(h) {
  const suffix = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:00 ${suffix}`;
}

function formatHourShort(h) {
  return `${String(h).padStart(2, '0')}:00`;
}

/**
 * ============================================================
 *  Main Application Component — MITE CS&E (AIML) Edition
 * ============================================================
 */
export default function App() {
  // State initialized with official MITE data
  const [courses, setCourses] = useState(MITE_COURSES);
  const [fixedSlots, setFixedSlots] = useState(MITE_FIXED_SLOTS);
  const [deadlines, setDeadlines] = useState(MITE_DEFAULT_DEADLINES);

  // Constraints state
  const [minHour, setMinHour] = useState(DEFAULT_MIN_HOUR);
  const [maxHour, setMaxHour] = useState(DEFAULT_MAX_HOUR);
  const [maxBlock, setMaxBlock] = useState(DEFAULT_MAX_BLOCK);
  const [strategy, setStrategy] = useState('pre-deadline');

  // UI state
  const [leftTab, setLeftTab] = useState('deadlines');
  const [mainTab, setMainTab] = useState('calendar'); // 'calendar' | 'cie' | 'tests' | 'analytics'
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [copiedType, setCopiedType] = useState(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedCourseFilter, setSelectedCourseFilter] = useState('ALL');

  // Controlled Form States
  const [newDeadline, setNewDeadline] = useState({
    courseId: '23BSCI201',
    title: '',
    type: 'assignment',
    dueDay: 5,
    estimatedHours: 3,
  });

  const [newFixedSlot, setNewFixedSlot] = useState({
    courseId: '23BSCI201',
    type: 'lecture',
    day: 0,
    startHour: 9,
    endHour: 10,
    label: '',
  });

  const [newCourse, setNewCourse] = useState({
    id: '',
    name: '',
    faculty: '',
    color: '#3b82f6',
  });

  // Run the core scheduling engine
  const { studyBlocks, unallocatedByDeadline } = useMemo(() => {
    return generateStudySchedule(fixedSlots, deadlines, {
      minHour,
      maxHour,
      maxBlock,
      strategy,
    });
  }, [fixedSlots, deadlines, minHour, maxHour, maxBlock, strategy]);

  // Convert into unified CalendarEvents
  const calendarEvents = useMemo(() => {
    return toCalendarEvents(courses, fixedSlots, deadlines, studyBlocks);
  }, [courses, fixedSlots, deadlines, studyBlocks]);

  // Clash Detection
  const clashes = useMemo(() => {
    return detectClashes(calendarEvents);
  }, [calendarEvents]);

  // Automated Verification Tests
  const verificationReport = useMemo(() => {
    const dlMap = Object.fromEntries(deadlines.map((d) => [d.id, d]));

    // Test 1: Complete Study Hour Allocation
    const totalRequested = deadlines.reduce((acc, d) => acc + Number(d.estimatedHours || 0), 0);
    const totalAllocated = studyBlocks.reduce((acc, b) => acc + (b.endHour - b.startHour), 0);
    const test1Pass = totalAllocated === totalRequested;

    // Test 2: Zero Clashes
    const test2Pass = clashes.length === 0;

    // Test 3: Smart Pre-Deadline Placement (Cycle-aware: strictly scheduled prior to deadline)
    const lateBlocks = studyBlocks.filter((sb) => {
      const dl = dlMap[sb.deadlineId];
      if (!dl) return false;
      const daysBefore = (dl.dueDay - sb.day + DAYS) % DAYS;
      return daysBefore === 0; // Placed on deadline day
    });
    const test3Pass = lateBlocks.length === 0;

    // Test 4: Study Window Compliance
    const outOfWindowBlocks = studyBlocks.filter(
      (sb) => sb.startHour < minHour || sb.endHour > maxHour
    );
    const test4Pass = outOfWindowBlocks.length === 0;

    // Test 5: Anti-Burnout Limit
    const oversizedBlocks = studyBlocks.filter(
      (sb) => sb.endHour - sb.startHour > maxBlock
    );
    const test5Pass = oversizedBlocks.length === 0;

    const tests = [
      {
        id: 'test-1',
        name: 'Test 1: Complete Study Hour Allocation',
        passed: test1Pass,
        detail: `${totalAllocated}h / ${totalRequested}h requested study hours allocated across ${studyBlocks.length} blocks`,
      },
      {
        id: 'test-2',
        name: 'Test 2: Clash-Free Guarantee (MITE Fixed Classes + Study)',
        passed: test2Pass,
        detail:
          clashes.length === 0
            ? '0 overlapping pairs detected by detectClashes(events)'
            : `${clashes.length} clash(es) detected between events!`,
      },
      {
        id: 'test-3',
        name: 'Test 3: Smart Pre-Deadline Placement',
        passed: test3Pass,
        detail:
          lateBlocks.length === 0
            ? 'All study blocks scheduled strictly on prior days leading to each exam & assignment'
            : `${lateBlocks.length} block(s) placed on deadline day`,
      },
      {
        id: 'test-4',
        name: `Test 4: Study Window Compliance (${formatHourShort(minHour)}–${formatHourShort(maxHour)})`,
        passed: test4Pass,
        detail:
          outOfWindowBlocks.length === 0
            ? `All study blocks strictly within ${formatHourShort(minHour)}–${formatHourShort(maxHour)} window`
            : `${outOfWindowBlocks.length} block(s) outside window`,
      },
      {
        id: 'test-5',
        name: `Test 5: Anti-Burnout Limit (≤ ${maxBlock}h Contiguous)`,
        passed: test5Pass,
        detail:
          oversizedBlocks.length === 0
            ? `All study blocks ≤ ${maxBlock} hours with mandatory 1-hour rest buffers`
            : `${oversizedBlocks.length} block(s) exceed ${maxBlock}h limit`,
      },
    ];

    const allPassed = tests.every((t) => t.passed);

    // ASCII Weekly Grid
    const lines = [];
    lines.push(`=== MITE CS&E (AIML) III Sem Weekly Timetable & Study Grid ===`);
    lines.push('Hour   ' + DAY_NAMES.map((d) => d.padEnd(8, ' ')).join(''));
    for (let h = minHour; h < maxHour; h++) {
      let row = `${String(h).padStart(2, '0')}:00  `;
      for (let d = 0; d < DAYS; d++) {
        const fixed = fixedSlots.find((s) => s.day === d && s.startHour <= h && h < s.endHour);
        const study = studyBlocks.find((s) => s.day === d && s.startHour <= h && h < s.endHour);
        if (fixed) {
          row += `[${fixed.courseId.slice(0, 5).padEnd(5, ' ')}]  `;
        } else if (study) {
          row += `(${study.courseId.slice(0, 5).padEnd(5, ' ')})  `;
        } else {
          row += '   ·     ';
        }
      }
      lines.push(row);
    }
    lines.push('\n[XXXXX] = Fixed MITE class slot    (XXXXX) = Auto-scheduled study    · = Free window');

    return {
      tests,
      allPassed,
      passedCount: tests.filter((t) => t.passed).length,
      totalRequested,
      totalAllocated,
      asciiGrid: lines.join('\n'),
    };
  }, [deadlines, studyBlocks, clashes, minHour, maxHour, maxBlock, fixedSlots]);

  // Preset Loaders
  const loadMiteDefault = () => {
    setCourses(MITE_COURSES);
    setFixedSlots(MITE_FIXED_SLOTS);
    setDeadlines(MITE_DEFAULT_DEADLINES);
    setMinHour(DEFAULT_MIN_HOUR);
    setMaxHour(DEFAULT_MAX_HOUR);
    setMaxBlock(DEFAULT_MAX_BLOCK);
    setStrategy('pre-deadline');
    setSelectedEvent(null);
  };

  const loadCieExamWeekPreset = () => {
    // Replaces regular classes on Sat, Mon, Tue with official CIE Test 1 slots
    setCourses(MITE_COURSES);
    const cieFixedSlots = [
      // Sat 31-10-2026
      { id: 'cie-fs-1', courseId: '23BSCI201', type: 'lecture', day: 5, startHour: 9, endHour: 11, label: '🎯 CIE 1: Engineering Maths-III (09:15–10:45 AM)' },
      { id: 'cie-fs-2', courseId: '23CIPC203', type: 'lecture', day: 5, startHour: 13, endHour: 15, label: '🎯 CIE 1: Data Structures (01:15–02:45 PM)' },
      // Mon 02-11-2026
      { id: 'cie-fs-3', courseId: '23CIPC205', type: 'lecture', day: 0, startHour: 9, endHour: 11, label: '🎯 CIE 1: Computer Organization (09:15–10:45 AM)' },
      { id: 'cie-fs-4', courseId: '23CIPC204', type: 'lecture', day: 0, startHour: 13, endHour: 15, label: '🎯 CIE 1: Digital System Design (01:15–02:45 PM)' },
      // Tue 03-11-2026
      { id: 'cie-fs-5', courseId: '23HMCC215', type: 'lecture', day: 1, startHour: 9, endHour: 11, label: '🎯 CIE 1: Universal Human Values (09:15–10:45 AM)' },
      { id: 'cie-fs-6', courseId: '23CIPC206', type: 'lecture', day: 1, startHour: 13, endHour: 15, label: '🎯 CIE 1: Software Engineering (01:15–02:45 PM)' },
    ];
    setFixedSlots(cieFixedSlots);
    setDeadlines([
      MITE_DEFAULT_DEADLINES[0], // Maths ABA 1
      ...MITE_DEFAULT_DEADLINES.slice(1),
    ]);
    setSelectedEvent(null);
  };

  // Handlers for Deadlines & Slots
  const handleAddDeadline = (e) => {
    e.preventDefault();
    if (!newDeadline.title.trim()) return;
    const created = {
      id: `dl-${Date.now()}`,
      courseId: newDeadline.courseId || courses[0]?.id || '23BSCI201',
      title: newDeadline.title.trim(),
      type: newDeadline.type,
      dueDay: Number(newDeadline.dueDay),
      dueDate: `2026-11-${10 + Number(newDeadline.dueDay)}`,
      estimatedHours: Math.max(1, Math.min(16, Number(newDeadline.estimatedHours) || 2)),
    };
    setDeadlines((prev) => [...prev, created]);
    setNewDeadline((prev) => ({ ...prev, title: '' }));
  };

  const handleDeleteDeadline = (id) => {
    setDeadlines((prev) => prev.filter((d) => d.id !== id));
    if (selectedEvent?.deadlineId === id) setSelectedEvent(null);
  };

  const handleAddFixedSlot = (e) => {
    e.preventDefault();
    const start = Number(newFixedSlot.startHour);
    const end = Number(newFixedSlot.endHour);
    if (end <= start) return;

    const created = {
      id: `fs-${Date.now()}`,
      courseId: newFixedSlot.courseId || courses[0]?.id || '23BSCI201',
      type: newFixedSlot.type,
      day: Number(newFixedSlot.day),
      startHour: start,
      endHour: end,
      label: newFixedSlot.label || `${newFixedSlot.courseId} (${newFixedSlot.type})`,
    };
    setFixedSlots((prev) => [...prev, created]);
  };

  const handleDeleteFixedSlot = (id) => {
    setFixedSlots((prev) => prev.filter((s) => s.id !== id));
    if (selectedEvent?.id === id) setSelectedEvent(null);
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    const cleanId = newCourse.id.trim().toUpperCase();
    const cleanName = newCourse.name.trim();
    if (!cleanId || !cleanName) return;
    if (courses.some((c) => c.id === cleanId)) return;

    setCourses((prev) => [
      ...prev,
      { id: cleanId, name: cleanName, faculty: newCourse.faculty || 'Faculty', color: newCourse.color },
    ]);
    setNewCourse({ id: '', name: '', faculty: '', color: '#3b82f6' });
  };

  const handleDeleteCourse = (courseId) => {
    if (courses.length <= 1) return;
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
    setFixedSlots((prev) => prev.filter((s) => s.courseId !== courseId));
    setDeadlines((prev) => prev.filter((d) => d.courseId !== courseId));
  };

  const handleCopyText = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedType(label);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const calendarHours = useMemo(() => {
    const hrs = [];
    for (let h = minHour; h < maxHour; h++) hrs.push(h);
    return hrs;
  }, [minHour, maxHour]);

  const deadlineAllocationSummary = useMemo(() => {
    const summary = {};
    for (const dl of deadlines) {
      const blocks = studyBlocks.filter((b) => b.deadlineId === dl.id);
      const allocatedHours = blocks.reduce((acc, b) => acc + (b.endHour - b.startHour), 0);
      const dayGroups = {};
      for (const b of blocks) {
        dayGroups[DAY_NAMES[b.day]] = (dayGroups[DAY_NAMES[b.day]] || 0) + 1;
      }
      const daySummary = Object.entries(dayGroups)
        .map(([dName, count]) => `${dName} (${count}h)`)
        .join(', ');
      summary[dl.id] = {
        allocatedHours,
        blockCount: blocks.length,
        daySummary: daySummary || 'Pending',
      };
    }
    return summary;
  }, [deadlines, studyBlocks]);

  const totalFixedHours = useMemo(
    () => fixedSlots.reduce((acc, s) => acc + (s.endHour - s.startHour), 0),
    [fixedSlots]
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* ==================== MITE INSTITUTIONAL HEADER ==================== */}
      <header className="border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md sticky top-0 z-30 shadow-lg">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-4">
          {/* MITE Brand & Meta */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 via-blue-600 to-sky-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 border border-indigo-400/40">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                  <span>MITE</span>
                  <span className="text-slate-400 font-normal text-xs sm:text-sm">| CS&E (AIML) Timetable & CIE Hub</span>
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  NAAC A+ Accredited
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                  AY 2026-27 • Sem III
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Classroom: <strong className="text-slate-300">LH - P302</strong> • Advisor:{' '}
                <strong className="text-slate-300">Dr. Yogeesha C B</strong> • VTU Autonomous
              </p>
            </div>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Math ABA-1 Badge */}
            <button
              onClick={() => setMainTab('cie')}
              className="flex items-center gap-1.5 bg-blue-950/80 border border-blue-500/40 hover:bg-blue-900/60 px-2.5 py-1.5 rounded-lg text-xs text-blue-200 transition"
              title="Dr. Ramya S - Engineering Mathematics III ABA 1 Assignment (50 Marks)"
            >
              <Award className="w-3.5 h-3.5 text-blue-400" />
              <span>Maths ABA-1:</span>
              <span className="font-bold text-white">21-11-2026</span>
            </button>

            {/* CIE Test 1 Pill */}
            <button
              onClick={() => setMainTab('cie')}
              className="flex items-center gap-1.5 bg-rose-950/70 border border-rose-500/40 hover:bg-rose-900/60 px-2.5 py-1.5 rounded-lg text-xs text-rose-200 transition"
              title="Continuous Internal Evaluation Test 1 Schedule"
            >
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              <span>CIE 1:</span>
              <span className="font-bold text-white">31 Oct – 03 Nov</span>
            </button>

            {/* Clash Status */}
            <button
              onClick={() => setMainTab('tests')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition ${
                clashes.length === 0
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-500/20 border-rose-500/40 text-rose-300 animate-pulse'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{clashes.length === 0 ? '0 Clashes' : `${clashes.length} Clash!`}</span>
            </button>

            {/* Timetable Preset Switcher */}
            <div className="flex items-center bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/70 text-xs">
              <button
                onClick={loadMiteDefault}
                className="px-2.5 py-1 rounded text-xs font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition flex items-center gap-1"
                title="Reset to official MITE Regular Semester Timetable"
              >
                <RotateCcw className="w-3 h-3 text-indigo-400" />
                Regular Schedule
              </button>
              <button
                onClick={loadCieExamWeekPreset}
                className="px-2.5 py-1 rounded text-xs font-medium text-amber-300 hover:bg-slate-700 transition flex items-center gap-1"
                title="Switch to CIE Test 1 Examination Mode"
              >
                <Flame className="w-3 h-3 text-amber-400" />
                CIE Exam Week
              </button>
            </div>

            {/* Class Rep Share Button */}
            <button
              onClick={() => setShareModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Class Rep Export</span>
            </button>
          </div>
        </div>
      </header>

      {/* ==================== ACTIVE ANNOUNCEMENT BANNER: MATHS ABA 1 ==================== */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 border-b border-indigo-500/30 px-4 py-2">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold border border-blue-400/30 text-[10px] uppercase">
              Classroom Notice
            </span>
            <span className="text-slate-300">
              <strong className="text-white">Dr. Ramya S (Engg Maths - III):</strong> Activity Based Assessment I (ABA 1) component assignment is due on or before{' '}
              <strong className="text-amber-300">21.11.2026 (Saturday)</strong> (written in assignment book • Max Marks: 50).
            </span>
          </div>
          <button
            onClick={() => setMainTab('cie')}
            className="text-xs text-indigo-300 hover:text-white font-semibold underline flex items-center gap-1"
          >
            <span>View CIE Timetable & Assignment Hub</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* ==================== MAIN WORKSPACE ==================== */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ==================== LEFT COLUMN: TIMETABLE INPUTS ==================== */}
        <aside className="lg:col-span-4 xl:col-span-4 flex flex-col gap-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                Schedule Management
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                Auto-Schedules Study Blocks
              </span>
            </div>

            {/* Segmented Switcher */}
            <div className="grid grid-cols-4 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 mb-4">
              <button
                onClick={() => setLeftTab('deadlines')}
                className={`py-2 px-1 rounded-lg text-xs font-semibold transition flex flex-col items-center ${
                  leftTab === 'deadlines' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>Deadlines</span>
                <span className="text-[10px] opacity-80">({deadlines.length})</span>
              </button>
              <button
                onClick={() => setLeftTab('fixed')}
                className={`py-2 px-1 rounded-lg text-xs font-semibold transition flex flex-col items-center ${
                  leftTab === 'fixed' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>MITE Slots</span>
                <span className="text-[10px] opacity-80">({fixedSlots.length})</span>
              </button>
              <button
                onClick={() => setLeftTab('courses')}
                className={`py-2 px-1 rounded-lg text-xs font-semibold transition flex flex-col items-center ${
                  leftTab === 'courses' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>Courses</span>
                <span className="text-[10px] opacity-80">({courses.length})</span>
              </button>
              <button
                onClick={() => setLeftTab('rules')}
                className={`py-2 px-1 rounded-lg text-xs font-semibold transition flex flex-col items-center ${
                  leftTab === 'rules' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>Rules</span>
                <span className="text-[10px] opacity-80">({maxBlock}h max)</span>
              </button>
            </div>

            {/* TAB 1: DEADLINES */}
            {leftTab === 'deadlines' && (
              <div className="space-y-4">
                <form onSubmit={handleAddDeadline} className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-3.5 space-y-3">
                  <div className="text-xs font-semibold text-slate-200 flex items-center justify-between">
                    <span>Add CIE Exam / Assignment</span>
                    <span className="text-[11px] text-indigo-400 font-normal">Urgency Sorted</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Course</label>
                      <select
                        value={newDeadline.courseId}
                        onChange={(e) => setNewDeadline({ ...newDeadline, courseId: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      >
                        {courses.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.id} — {c.name.slice(0, 18)}...
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Type</label>
                      <select
                        value={newDeadline.type}
                        onChange={(e) => setNewDeadline({ ...newDeadline, type: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      >
                        <option value="exam">🔥 Exam / CIE Test</option>
                        <option value="assignment">📄 Assignment / ABA</option>
                        <option value="quiz">⚡ Quiz / Lab Assessment</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Title</label>
                    <input
                      type="text"
                      placeholder="e.g., ABA 2 Assignment, Lab Exam..."
                      value={newDeadline.title}
                      onChange={(e) => setNewDeadline({ ...newDeadline, title: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Due Day</label>
                      <select
                        value={newDeadline.dueDay}
                        onChange={(e) => setNewDeadline({ ...newDeadline, dueDay: Number(e.target.value) })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      >
                        {DAY_FULL_NAMES.map((d, idx) => (
                          <option key={idx} value={idx}>
                            {d} (Day {idx})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">
                        Prep Hours: <strong className="text-indigo-300">{newDeadline.estimatedHours}h</strong>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="12"
                        value={newDeadline.estimatedHours}
                        onChange={(e) => setNewDeadline({ ...newDeadline, estimatedHours: Number(e.target.value) })}
                        className="w-full accent-indigo-500 cursor-pointer mt-1.5"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-lg shadow flex items-center justify-center gap-1.5 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Deadline & Schedule Study
                  </button>
                </form>

                {/* Deadlines List */}
                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                  {deadlines.map((dl) => {
                    const course = courses.find((c) => c.id === dl.courseId);
                    const alloc = deadlineAllocationSummary[dl.id] || { allocatedHours: 0, daySummary: '' };
                    const isComplete = alloc.allocatedHours >= dl.estimatedHours;

                    return (
                      <div
                        key={dl.id}
                        className={`bg-slate-950/90 border rounded-xl p-3 flex flex-col gap-2 transition ${
                          dl.id === 'dl-math-aba1'
                            ? 'border-blue-500/50 bg-blue-950/20'
                            : dl.type === 'exam'
                            ? 'border-rose-500/30'
                            : 'border-slate-800'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2">
                            <span
                              className="w-2.5 h-2.5 rounded-full mt-1 shrink-0"
                              style={{ backgroundColor: course?.color || '#94a3b8' }}
                            />
                            <div>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-xs font-bold text-white">{dl.courseId}</span>
                                <span
                                  className={`text-[9px] px-1.5 py-0.2 rounded uppercase font-semibold ${
                                    dl.type === 'exam'
                                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                      : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                  }`}
                                >
                                  {dl.type}
                                </span>
                                {dl.maxMarks && (
                                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                                    {dl.maxMarks} Marks
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-slate-200 font-medium mt-0.5">{dl.title}</div>
                              <p className="text-[11px] text-slate-400">
                                Due: <strong className="text-slate-300">{DAY_NAMES[dl.dueDay]} ({dl.dueDate})</strong> • Target: {dl.estimatedHours}h
                              </p>
                              {dl.faculty && (
                                <p className="text-[10px] text-indigo-300">Instructor: {dl.faculty}</p>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteDeadline(dl.id)}
                            className="text-slate-500 hover:text-rose-400 p-1 rounded transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Prep Status */}
                        <div className="bg-slate-900 rounded-lg px-2.5 py-1.5 border border-slate-800/80 flex items-center justify-between text-[11px]">
                          <span className="text-slate-400 flex items-center gap-1 truncate mr-2">
                            <CheckCircle2
                              className={`w-3.5 h-3.5 shrink-0 ${
                                isComplete ? 'text-emerald-400' : 'text-amber-400'
                              }`}
                            />
                            <span className="truncate">Allocated: {alloc.daySummary}</span>
                          </span>
                          <span className="font-semibold text-emerald-400 shrink-0">
                            {alloc.allocatedHours}/{dl.estimatedHours}h
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: FIXED SLOTS */}
            {leftTab === 'fixed' && (
              <div className="space-y-4">
                <form onSubmit={handleAddFixedSlot} className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-3.5 space-y-3">
                  <div className="text-xs font-semibold text-slate-200">Add Class / Lab Slot</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Course</label>
                      <select
                        value={newFixedSlot.courseId}
                        onChange={(e) => setNewFixedSlot({ ...newFixedSlot, courseId: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      >
                        {courses.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.id}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Type</label>
                      <select
                        value={newFixedSlot.type}
                        onChange={(e) => setNewFixedSlot({ ...newFixedSlot, type: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      >
                        <option value="lecture">Lecture</option>
                        <option value="lab">Lab</option>
                        <option value="tutorial">Tutorial</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Day</label>
                      <select
                        value={newFixedSlot.day}
                        onChange={(e) => setNewFixedSlot({ ...newFixedSlot, day: Number(e.target.value) })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white"
                      >
                        {DAY_NAMES.map((d, idx) => (
                          <option key={idx} value={idx}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Start</label>
                      <select
                        value={newFixedSlot.startHour}
                        onChange={(e) => setNewFixedSlot({ ...newFixedSlot, startHour: Number(e.target.value) })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white"
                      >
                        {calendarHours.map((h) => (
                          <option key={h} value={h}>
                            {formatHourShort(h)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">End</label>
                      <select
                        value={newFixedSlot.endHour}
                        onChange={(e) => setNewFixedSlot({ ...newFixedSlot, endHour: Number(e.target.value) })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white"
                      >
                        {calendarHours.filter((h) => h > newFixedSlot.startHour).map((h) => (
                          <option key={h} value={h}>
                            {formatHourShort(h)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-lg shadow flex items-center justify-center gap-1.5 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Fixed Slot
                  </button>
                </form>

                <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
                  {fixedSlots.map((slot) => {
                    const course = courses.find((c) => c.id === slot.courseId);
                    return (
                      <div
                        key={slot.id}
                        className="bg-slate-950/90 border border-slate-800 rounded-lg px-3 py-2 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: course?.color || '#94a3b8' }}
                          />
                          <div>
                            <span className="font-bold text-white">{slot.courseId}</span>{' '}
                            <span className="text-slate-400 capitalize">({slot.type})</span>
                            <div className="text-[11px] text-slate-400">
                              {DAY_NAMES[slot.day]} • {formatHourShort(slot.startHour)}–{formatHourShort(slot.endHour)} • {slot.label}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteFixedSlot(slot.id)}
                          className="text-slate-500 hover:text-rose-400 p-1 rounded transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: COURSES */}
            {leftTab === 'courses' && (
              <div className="space-y-4">
                <form onSubmit={handleAddCourse} className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-3.5 space-y-3">
                  <div className="text-xs font-semibold text-slate-200">Add Course</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Course Code</label>
                      <input
                        type="text"
                        placeholder="23CIPC..."
                        value={newCourse.id}
                        onChange={(e) => setNewCourse({ ...newCourse, id: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white uppercase"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Faculty</label>
                      <input
                        type="text"
                        placeholder="Prof. Name"
                        value={newCourse.faculty}
                        onChange={(e) => setNewCourse({ ...newCourse, faculty: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Course Title</label>
                    <input
                      type="text"
                      placeholder="Title"
                      value={newCourse.name}
                      onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-lg shadow flex items-center justify-center gap-1.5 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Course
                  </button>
                </form>

                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                  {courses.map((c) => (
                    <div
                      key={c.id}
                      className="bg-slate-950/90 border border-slate-800 rounded-lg px-3 py-2 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                        <div>
                          <div className="font-bold text-white flex items-center gap-1.5">
                            <span>{c.id}</span>
                            <span className="text-[10px] text-slate-400 font-normal">({c.faculty || 'Faculty'})</span>
                          </div>
                          <div className="text-slate-300 text-[11px]">{c.name}</div>
                        </div>
                      </div>
                      {courses.length > 1 && (
                        <button
                          onClick={() => handleDeleteCourse(c.id)}
                          className="text-slate-500 hover:text-rose-400 p-1 rounded transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: RULES */}
            {leftTab === 'rules' && (
              <div className="space-y-4 bg-slate-950/70 border border-slate-800/90 rounded-xl p-3.5 text-xs">
                <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Study Rules & Anti-Burnout Engine</span>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Placement Strategy</label>
                  <select
                    value={strategy}
                    onChange={(e) => setStrategy(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-white"
                  >
                    <option value="pre-deadline">Cycle-Aware Pre-Deadline (Prioritizes days before exam/assignment)</option>
                    <option value="earliest">Early Bird (Fill earliest available free hours)</option>
                    <option value="spaced">Spaced Repetition (Round-robin pass per day)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">
                    Max Contiguous Study: <strong className="text-indigo-300">{maxBlock} hours</strong>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    value={maxBlock}
                    onChange={(e) => setMaxBlock(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Enforces a mandatory 1-hour rest break after {maxBlock}h of contiguous study.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-400 mb-1">Earliest Study Hour</label>
                    <select
                      value={minHour}
                      onChange={(e) => setMinHour(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-white"
                    >
                      {[6, 7, 8, 9].map((h) => (
                        <option key={h} value={h}>
                          {formatHourShort(h)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Latest Cutoff</label>
                    <select
                      value={maxHour}
                      onChange={(e) => setMaxHour(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-white"
                    >
                      {[20, 21, 22, 23].map((h) => (
                        <option key={h} value={h}>
                          {formatHourShort(h)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Engine Verification Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Algorithm Verification
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold">
                {verificationReport.passedCount}/5 Passed ✅
              </span>
            </div>

            <div className="space-y-1.5">
              {verificationReport.tests.map((test) => (
                <div
                  key={test.id}
                  className="flex items-start gap-2 text-xs bg-slate-950/70 border border-slate-800/80 rounded-lg px-2.5 py-2"
                >
                  {test.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="font-semibold text-slate-200">{test.name}</div>
                    <div className="text-[11px] text-slate-400">{test.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* ==================== RIGHT COLUMN: MAIN VIEWS ==================== */}
        <main className="lg:col-span-8 xl:col-span-8 flex flex-col gap-4">
          {/* Main Navigation Bar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-2.5 flex flex-wrap items-center justify-between gap-3 shadow-xl">
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setMainTab('calendar')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  mainTab === 'calendar' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Weekly Schedule UI</span>
              </button>
              <button
                onClick={() => setMainTab('cie')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  mainTab === 'cie' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-amber-300" />
                <span>CIE 1 & Assignment Hub</span>
              </button>
              <button
                onClick={() => setMainTab('tests')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  mainTab === 'tests' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>ASCII & JSON DevTools</span>
              </button>
              <button
                onClick={() => setMainTab('analytics')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  mainTab === 'analytics' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Workload Balance</span>
              </button>
            </div>

            {/* Course Filter Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 hidden sm:inline">Filter:</span>
              <select
                value={selectedCourseFilter}
                onChange={(e) => setSelectedCourseFilter(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white"
              >
                <option value="ALL">All MITE Courses</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.id} ({c.name.slice(0, 15)}...)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ==================== VIEW 1: WEEKLY CALENDAR UI ==================== */}
          {mainTab === 'calendar' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
              {/* Active Inspector Bar */}
              <div className="px-4 py-2.5 bg-slate-950/70 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-slate-400 font-medium">Department:</span>
                  <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-indigo-300 font-bold">
                    CS&E (AIML)
                  </span>
                  <span className="text-slate-400">Classroom: <strong>LH - P302</strong></span>
                  <span className="text-slate-400 hidden sm:inline">• Class Advisor: <strong>Dr. Yogeesha C B</strong></span>
                </div>

                {selectedEvent ? (
                  <div className="flex items-center gap-2 bg-indigo-950/80 border border-indigo-500/40 px-2.5 py-1 rounded-lg">
                    <span className="text-indigo-200 font-medium truncate max-w-xs">
                      {selectedEvent.title} ({DAY_NAMES[selectedEvent.day]} {formatHourShort(selectedEvent.startHour)}–{formatHourShort(selectedEvent.endHour)})
                    </span>
                    <button onClick={() => setSelectedEvent(null)} className="text-slate-400 hover:text-white">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <span className="text-[11px] text-slate-400">
                    Window: {formatHour(minHour)} – {formatHour(maxHour)} • Anti-Burnout Break Enforced
                  </span>
                )}
              </div>

              {/* Grid */}
              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  {/* Day Column Headers */}
                  <div className="grid grid-cols-8 border-b border-slate-800 bg-slate-950 sticky top-0 z-10">
                    <div className="p-2 text-[11px] font-semibold text-slate-400 border-r border-slate-800 flex items-center justify-center">
                      <Clock className="w-3.5 h-3.5 mr-1 text-slate-500" />
                      Time Slot
                    </div>
                    {DAY_NAMES.map((dayName, dayIdx) => {
                      const dayDeadlines = deadlines.filter((d) => d.dueDay === dayIdx);
                      return (
                        <div
                          key={dayIdx}
                          className="p-2 border-r border-slate-800 last:border-r-0 flex flex-col items-center justify-between min-h-[58px]"
                        >
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-white">{dayName}</span>
                            <span className="text-[10px] text-slate-500 font-mono">D{dayIdx}</span>
                          </div>

                          {/* Deadline Badges on this day */}
                          <div className="w-full flex flex-col gap-1 mt-1">
                            {dayDeadlines.map((dl) => (
                              <div
                                key={dl.id}
                                className={`text-[9px] px-1 py-0.5 rounded font-bold truncate text-center border ${
                                  dl.id === 'dl-math-aba1'
                                    ? 'bg-blue-500/25 text-blue-200 border-blue-400/40'
                                    : dl.type === 'exam'
                                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                }`}
                                title={`${dl.courseId}: ${dl.title} (${dl.dueDate})`}
                              >
                                {dl.type === 'exam' ? '🎯' : '📝'} {dl.courseId}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Hourly Rows */}
                  <div className="divide-y divide-slate-800/60">
                    {calendarHours.map((hour) => (
                      <div
                        key={hour}
                        className="grid grid-cols-8 min-h-[54px] hover:bg-slate-900/40 transition-colors"
                      >
                        {/* Hour & Period Label */}
                        <div className="border-r border-slate-800/80 px-1.5 py-1 text-[10px] font-mono text-slate-400 flex flex-col items-center justify-center bg-slate-950/50">
                          <span className="font-bold text-slate-300">{formatHourShort(hour)}</span>
                          <span className="text-[9px] text-slate-500 text-center leading-tight">
                            {PERIOD_LABELS[hour] || ''}
                          </span>
                        </div>

                        {/* Day Cells */}
                        {Array.from({ length: DAYS }, (_, dayIdx) => {
                          const cellEvents = calendarEvents.filter((ev) => {
                            if (selectedCourseFilter !== 'ALL' && ev.courseId !== selectedCourseFilter) return false;
                            return ev.day === dayIdx && ev.startHour <= hour && hour < ev.endHour;
                          });
                          const isClashingCell = cellEvents.length > 1;

                          return (
                            <div
                              key={dayIdx}
                              className={`border-r border-slate-800/50 last:border-r-0 p-1 relative transition ${
                                isClashingCell ? 'bg-rose-950/60 ring-1 ring-rose-500' : ''
                              }`}
                            >
                              {cellEvents.map((ev) => {
                                const isStartHour = ev.startHour === hour;
                                const duration = ev.endHour - ev.startHour;

                                return (
                                  <div
                                    key={ev.id}
                                    onClick={() => setSelectedEvent(ev)}
                                    style={{
                                      backgroundColor: ev.isFixed
                                        ? `${ev.color}25`
                                        : ev.color,
                                      borderColor: ev.isFixed ? ev.color : ev.solidColor,
                                    }}
                                    className={`w-full h-full rounded-lg px-2 py-1 cursor-pointer transition flex flex-col justify-between ${
                                      ev.isFixed
                                        ? 'border-l-4 border-t border-r border-b shadow-sm'
                                        : 'border-2 border-dashed shadow-md ring-1 ring-indigo-400/20'
                                    } ${selectedEvent?.id === ev.id ? 'ring-2 ring-white scale-[1.01]' : 'hover:brightness-110'}`}
                                  >
                                    {isStartHour ? (
                                      <div className="flex items-start justify-between gap-1">
                                        <span className="text-[11px] font-bold text-white leading-tight line-clamp-1">
                                          {ev.title}
                                        </span>
                                        <span
                                          className={`text-[9px] px-1 py-0.2 rounded font-mono shrink-0 ${
                                            ev.isFixed ? 'bg-slate-950/70 text-slate-300' : 'bg-slate-950/80 text-amber-200 font-bold'
                                          }`}
                                        >
                                          {duration}h
                                        </span>
                                      </div>
                                    ) : (
                                      <div className="flex items-center justify-between opacity-85">
                                        <span className="text-[10px] text-white/90 truncate">↳ {ev.title}</span>
                                        <span className="text-[9px] font-mono text-white/70">
                                          {formatHourShort(ev.startHour)}–{formatHourShort(ev.endHour)}
                                        </span>
                                      </div>
                                    )}

                                    {isStartHour && (
                                      <div className="text-[10px] text-slate-300/90 truncate flex items-center justify-between mt-0.5">
                                        <span className="truncate">{ev.faculty || ev.courseName}</span>
                                        <span className="font-mono text-[9px] opacity-80 shrink-0">
                                          {formatHourShort(ev.startHour)}–{formatHourShort(ev.endHour)}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== VIEW 2: CIE 1 & ASSIGNMENTS HUB ==================== */}
          {mainTab === 'cie' && (
            <div className="space-y-6">
              {/* Mathematics ABA-1 Announcement Card (Matches Image 3) */}
              <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 border border-blue-500/40 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300 font-bold text-xl shadow-inner">
                      D
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-white">Dr. Ramya S</h3>
                        <span className="text-xs text-slate-400 font-medium">posted in Google Classroom</span>
                        <span className="text-[11px] text-indigo-300">Nov 7</span>
                      </div>
                      <p className="text-xs text-indigo-200">
                        Engineering Mathematics III; 2026-27; CS&E (AIML)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-bold flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-blue-400" />
                      Max Marks: 50
                    </span>
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
                      Due: 21.11.2026
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-200 space-y-2">
                  <div className="font-bold text-white text-sm">
                    Activity Based Assessment I (ABA 1):
                  </div>
                  <p className="leading-relaxed text-slate-300">
                    All the students are hereby informed to complete the <strong>ABA 1 component assignment</strong> and submit the same (written in the <strong>assignment book</strong>) on or before <strong className="text-amber-300">21.11.2026 (Saturday)</strong>. The details can be found in the .pdf file attached here.
                  </p>

                  <div className="mt-3 bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-5 h-5 text-rose-400 shrink-0" />
                      <div>
                        <div className="font-bold text-white text-xs">ABA 1 Engineering Mathematics III.pdf</div>
                        <div className="text-[10px] text-slate-400">Assignment Component Book Submission • 50 Marks</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-500/15 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                        4h Study Allocated in Planner ✅
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Official CIE Test 1 Time Table (Matches Image 1) */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                <div className="px-5 py-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-rose-400" />
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                        Continuous Internal Evaluation (CIE) Test 1 Time Table
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Mangalore Institute of Technology & Engineering • Dept. of CS&E (AIML) • Academic Year: 2026-27 • III Semester
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 text-xs font-semibold">
                    Weightage: Priority 3 Exams
                  </span>
                </div>

                <div className="p-5 space-y-4">
                  {/* Table Grid matching Image 1 */}
                  <div className="border border-slate-800 rounded-xl overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-3 bg-slate-950 text-xs font-bold text-slate-300 border-b border-slate-800 p-3">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Date & Day</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Morning (09:15 AM – 10:45 AM)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-400" />
                        <span>Afternoon (01:15 PM – 02:45 PM)</span>
                      </div>
                    </div>

                    {/* Day 1: Saturday 31-10-2026 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 p-3 text-xs border-b border-slate-800/80 bg-slate-900/60 hover:bg-slate-900 gap-2">
                      <div className="font-bold text-white flex flex-col justify-center">
                        <span className="text-sm">31-10-2026</span>
                        <span className="text-indigo-400">Saturday (Day 5)</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-500/30 flex flex-col justify-between">
                        <div>
                          <div className="font-bold text-white">Engineering Mathematics - III</div>
                          <div className="text-[11px] text-blue-300 font-mono">(23BSCI201)</div>
                          <div className="text-[10px] text-slate-400 mt-1">Faculty: Dr. Ramya S</div>
                        </div>
                        <span className="text-[10px] text-emerald-400 font-semibold mt-2">
                          Auto-Scheduled: {deadlineAllocationSummary['dl-cie-math']?.daySummary || '3h pre-exam'}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-violet-950/40 border border-violet-500/30 flex flex-col justify-between">
                        <div>
                          <div className="font-bold text-white">Data Structures and Applications</div>
                          <div className="text-[11px] text-violet-300 font-mono">(23CIPC203)</div>
                          <div className="text-[10px] text-slate-400 mt-1">Faculty: Dr. Yogeesha C B</div>
                        </div>
                        <span className="text-[10px] text-emerald-400 font-semibold mt-2">
                          Auto-Scheduled: {deadlineAllocationSummary['dl-cie-dsa']?.daySummary || '3h pre-exam'}
                        </span>
                      </div>
                    </div>

                    {/* Day 2: Monday 02-11-2026 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 p-3 text-xs border-b border-slate-800/80 bg-slate-900/60 hover:bg-slate-900 gap-2">
                      <div className="font-bold text-white flex flex-col justify-center">
                        <span className="text-sm">02-11-2026</span>
                        <span className="text-indigo-400">Monday (Day 0)</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/30 flex flex-col justify-between">
                        <div>
                          <div className="font-bold text-white">Computer Organization</div>
                          <div className="text-[11px] text-amber-300 font-mono">(23CIPC205)</div>
                          <div className="text-[10px] text-slate-400 mt-1">Faculty: Ms. Poornima</div>
                        </div>
                        <span className="text-[10px] text-emerald-400 font-semibold mt-2">
                          Auto-Scheduled: {deadlineAllocationSummary['dl-cie-co']?.daySummary || '3h pre-exam'}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex flex-col justify-between">
                        <div>
                          <div className="font-bold text-white">Digital Systems Design</div>
                          <div className="text-[11px] text-emerald-300 font-mono">(23CIPC204)</div>
                          <div className="text-[10px] text-slate-400 mt-1">Faculty: Mr. Prakash / Ms. Poornima</div>
                        </div>
                        <span className="text-[10px] text-emerald-400 font-semibold mt-2">
                          Auto-Scheduled: {deadlineAllocationSummary['dl-cie-dsd']?.daySummary || '3h pre-exam'}
                        </span>
                      </div>
                    </div>

                    {/* Day 3: Tuesday 03-11-2026 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 p-3 text-xs bg-slate-900/60 hover:bg-slate-900 gap-2">
                      <div className="font-bold text-white flex flex-col justify-center">
                        <span className="text-sm">03-11-2026</span>
                        <span className="text-indigo-400">Tuesday (Day 1)</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-lime-950/40 border border-lime-500/30 flex flex-col justify-between">
                        <div>
                          <div className="font-bold text-white">Universal Human Values</div>
                          <div className="text-[11px] text-lime-300 font-mono">(23HMCC215)</div>
                          <div className="text-[10px] text-slate-400 mt-1">Faculty: Dr. Umesh S S</div>
                        </div>
                        <span className="text-[10px] text-emerald-400 font-semibold mt-2">
                          Auto-Scheduled: {deadlineAllocationSummary['dl-cie-uhv']?.daySummary || '2h pre-exam'}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 flex flex-col justify-between">
                        <div>
                          <div className="font-bold text-white">Software Engineering</div>
                          <div className="text-[11px] text-cyan-300 font-mono">(23CIPC206)</div>
                          <div className="text-[10px] text-slate-400 mt-1">Faculty: Mr. Vikram</div>
                        </div>
                        <span className="text-[10px] text-emerald-400 font-semibold mt-2">
                          Auto-Scheduled: {deadlineAllocationSummary['dl-cie-se']?.daySummary || '3h pre-exam'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== VIEW 3: ASCII GRID & JSON DEVTOOLS ==================== */}
          {mainTab === 'tests' && (
            <div className="space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white">
                      Console Output — Automated Unit Tests & ASCII Grid
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopyText(verificationReport.asciiGrid, 'ascii')}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition"
                  >
                    {copiedType === 'ascii' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy ASCII Grid</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 bg-slate-950/90 font-mono text-xs overflow-x-auto space-y-3">
                  <div className="space-y-1">
                    {verificationReport.tests.map((t) => (
                      <div key={t.id} className={t.passed ? 'text-emerald-400' : 'text-rose-400'}>
                        [{t.passed ? 'PASS' : 'FAIL'}] {t.name} — {t.detail}
                      </div>
                    ))}
                    <div className="pt-1 font-bold text-white">
                      {verificationReport.allPassed ? '✅ ALL 5 VERIFICATION TESTS PASSED' : '❌ TEST WARNING'}
                    </div>
                  </div>

                  <pre className="text-indigo-200 bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 leading-relaxed">
                    {verificationReport.asciiGrid}
                  </pre>
                </div>
              </div>

              {/* JSON State */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-bold text-white">
                      Full Timetable & StudyBlock JSON Payload
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      handleCopyText(
                        JSON.stringify({ courses, fixedSlots, deadlines, studyBlocks }, null, 2),
                        'json'
                      )
                    }
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition"
                  >
                    {copiedType === 'json' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy JSON</span>
                  </button>
                </div>
                <div className="p-4 bg-slate-950/90 max-h-[300px] overflow-y-auto font-mono text-xs text-slate-300">
                  <pre>
                    {JSON.stringify({ courses, fixedSlots, deadlines, studyBlocks }, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* ==================== VIEW 4: WORKLOAD ANALYTICS ==================== */}
          {mainTab === 'analytics' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-6">
              <div>
                <h3 className="text-sm font-bold text-white">
                  MITE CS&E (AIML) Daily Workload & Anti-Burnout Distribution
                </h3>
                <p className="text-xs text-slate-400">
                  Fixed class commitments (lectures, labs, tutorials) vs. auto-allocated study blocks for CIE 1 & ABA 1.
                </p>
              </div>

              <div className="grid grid-cols-7 gap-3 pt-2">
                {DAY_NAMES.map((dayName, dayIdx) => {
                  const fixedHrs = fixedSlots
                    .filter((s) => s.day === dayIdx)
                    .reduce((acc, s) => acc + (s.endHour - s.startHour), 0);
                  const studyHrs = studyBlocks
                    .filter((b) => b.day === dayIdx)
                    .reduce((acc, b) => acc + (b.endHour - b.startHour), 0);
                  const totalDayHrs = fixedHrs + studyHrs;
                  const maxWindowHrs = maxHour - minHour;

                  return (
                    <div
                      key={dayIdx}
                      className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col items-center justify-between min-h-[200px]"
                    >
                      <div className="text-xs font-bold text-white">{dayName}</div>

                      <div className="w-full flex-1 flex flex-col justify-end py-3">
                        <div className="w-full bg-slate-900 rounded-lg h-32 flex flex-col justify-end overflow-hidden p-1 gap-1 border border-slate-800">
                          {studyHrs > 0 && (
                            <div
                              style={{ height: `${Math.min(100, (studyHrs / maxWindowHrs) * 100)}%` }}
                              className="w-full bg-indigo-500/80 rounded border border-dashed border-indigo-300 flex items-center justify-center text-[10px] font-bold text-white"
                              title={`Study: ${studyHrs}h`}
                            >
                              {studyHrs}h
                            </div>
                          )}
                          {fixedHrs > 0 && (
                            <div
                              style={{ height: `${Math.min(100, (fixedHrs / maxWindowHrs) * 100)}%` }}
                              className="w-full bg-blue-600 rounded flex items-center justify-center text-[10px] font-bold text-white"
                              title={`Fixed Classes: ${fixedHrs}h`}
                            >
                              {fixedHrs}h
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-400 font-mono">
                        {totalDayHrs}h / {maxWindowHrs}h
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Per-Course Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {courses.slice(0, 6).map((course) => {
                  const cFixed = fixedSlots
                    .filter((s) => s.courseId === course.id)
                    .reduce((acc, s) => acc + (s.endHour - s.startHour), 0);
                  const cStudy = studyBlocks
                    .filter((b) => b.courseId === course.id)
                    .reduce((acc, b) => acc + (b.endHour - b.startHour), 0);

                  return (
                    <div
                      key={course.id}
                      className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: course.color }} />
                        <div>
                          <span className="text-xs font-bold text-white">{course.id}</span>
                          <div className="text-[11px] text-slate-400 truncate">{course.name}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                        <span>Class: <strong className="text-white">{cFixed}h</strong></span>
                        <span>Prep: <strong className="text-indigo-300">{cStudy}h</strong></span>
                        <span>Total: <strong className="text-emerald-300">{cFixed + cStudy}h</strong></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ==================== CLASS REP EXPORT MODAL ==================== */}
      {shareModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-indigo-400" />
                <h3 className="text-sm font-bold text-white">
                  MITE CS&E (AIML) Class Representative Export
                </h3>
              </div>
              <button onClick={() => setShareModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Export this verified timetable snapshot with CIE Test 1 schedule & Dr. Ramya S's ABA 1 Mathematics assignment for the class cohort:
            </p>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 font-mono text-[11px] text-slate-300 max-h-64 overflow-y-auto space-y-2">
              <div className="text-indigo-400 font-bold">
                🏫 MANGALORE INSTITUTE OF TECHNOLOGY & ENGINEERING (MITE)
                <br />
                Dept of CS&E (AIML) • III Sem • Classroom: LH - P302 • Advisor: Dr. Yogeesha C B
              </div>

              <div className="text-amber-300 font-semibold pt-1 border-t border-slate-800">
                📝 ASSIGNMENT DEADLINES:
                <br />
                • 23BSCI201 Engg Maths - III: ABA 1 Assignment (Due 21.11.2026, 50 Marks) — Dr. Ramya S
              </div>

              <div className="text-rose-300 font-semibold pt-1 border-t border-slate-800">
                🎯 CIE TEST 1 TIME TABLE:
                <br />
                • 31-10-2026 (Sat): 23BSCI201 (09:15–10:45 AM) & 23CIPC203 (01:15–02:45 PM)
                <br />
                • 02-11-2026 (Mon): 23CIPC205 (09:15–10:45 AM) & 23CIPC204 (01:15–02:45 PM)
                <br />
                • 03-11-2026 (Tue): 23HMCC215 (09:15–10:45 AM) & 23CIPC206 (01:15–02:45 PM)
              </div>

              <div className="text-emerald-400 pt-1 border-t border-slate-800">
                ✅ Verification: 0 Clashes | {verificationReport.totalAllocated}h Prep Allocated | Anti-Burnout Max {maxBlock}h
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() =>
                  handleCopyText(
                    `MITE CS&E (AIML) III Sem Timetable & CIE 1 Schedule\n\n` +
                    `CLASSROOM: LH - P302 | ADVISOR: Dr. Yogeesha C B\n\n` +
                    `ASSIGNMENT:\n- 23BSCI201 Engg Mathematics - III: Activity Based Assessment I (ABA 1) Due 21.11.2026 (50 Marks) - Dr. Ramya S\n\n` +
                    `CIE TEST 1 SCHEDULE:\n` +
                    `- 31-10-2026 Sat: 09:15-10:45 AM (23BSCI201 Maths III) | 01:15-02:45 PM (23CIPC203 DSA)\n` +
                    `- 02-11-2026 Mon: 09:15-10:45 AM (23CIPC205 CO) | 01:15-02:45 PM (23CIPC204 DSD)\n` +
                    `- 03-11-2026 Tue: 09:15-10:45 AM (23HMCC215 UHV) | 01:15-02:45 PM (23CIPC206 SE)\n\n` +
                    verificationReport.asciiGrid,
                    'export-text'
                  )
                }
                className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5"
              >
                {copiedType === 'export-text' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Summary for WhatsApp</span>
              </button>

              <button
                onClick={() =>
                  handleCopyText(
                    JSON.stringify({ courses, fixedSlots, deadlines, studyBlocks }, null, 2),
                    'export-json'
                  )
                }
                className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white flex items-center gap-1.5"
              >
                {copiedType === 'export-json' ? <Check className="w-3.5 h-3.5 text-white" /> : <Code2 className="w-3.5 h-3.5" />}
                <span>Copy JSON Payload</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
