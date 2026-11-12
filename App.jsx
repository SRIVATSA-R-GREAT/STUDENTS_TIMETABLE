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
  X,
  FileText,
  Building2,
  Award,
  BookmarkCheck,
  UserCheck,
  CalendarDays,
  LogOut,
  User,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  Grid,
  List,
  Target
} from 'lucide-react';

/**
 * =======================================================================
 *  MANGALORE INSTITUTE OF TECHNOLOGY & ENGINEERING (MITE)
 *  DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING (AIML)
 *  III Semester — Academic Year 2026-27
 *  Classroom: LH - P302 | Class Advisor: Dr. Yogeesha C B
 * =======================================================================
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

export const DEFAULT_MIN_HOUR = 8;
export const DEFAULT_MAX_HOUR = 21;
export const DEFAULT_MAX_BLOCK = 2;

const TYPE_WEIGHT = {
  exam: 3,
  quiz: 2,
  assignment: 1,
};

export const MITE_COURSES = [
  { id: '23BSCI201', name: 'Engineering Mathematics - III', faculty: 'Dr. Ramya S', color: '#3b82f6', category: 'Core Maths' },
  { id: '23CIPC203', name: 'Data Structures and Applications', faculty: 'Dr. Yogeesha C B', color: '#8b5cf6', category: 'Core CS' },
  { id: '23CIPC204', name: 'Digital System Design', faculty: 'Mr. Prakash L.S. / Ms. Poornima', color: '#10b981', category: 'Core CS / ADE' },
  { id: '23CIPC205', name: 'Computer Organization', faculty: 'Ms. Poornima', color: '#f59e0b', category: 'Core CS' },
  { id: '23CIPC206', name: 'Software Engineering', faculty: 'Mr. Vikram', color: '#06b6d4', category: 'Core CS' },
  { id: '23CISE252', name: 'Python Programming', faculty: 'Ms. Padmakshi N', color: '#ec4899', category: 'Emerging Tech / CAD Lab' },
  { id: '23HMCC215', name: 'Universal Human Values', faculty: 'Dr. Umesh S S', color: '#84cc16', category: 'Humanities' },
  { id: '23NMCC22X', name: 'Yoga / PE / NSS / Arts - I', faculty: 'Ms. Nisha / Dr. Sameera', color: '#a855f7', category: 'Non-Credit Mandatory' },
  { id: 'INST-HOURS', name: 'Institutional Hours (Library / Mentoring / Clubs)', faculty: 'Faculty & Advisor', color: '#64748b', category: 'Institutional' },
];

export const MITE_FIXED_SLOTS = [
  // MONDAY
  { id: 'fs-m1', courseId: '23CISE252', type: 'lecture', day: 0, startHour: 9, endHour: 10, label: 'Python Programming' },
  { id: 'fs-m2', courseId: '23HMCC215', type: 'lecture', day: 0, startHour: 10, endHour: 11, label: 'Universal Human Values' },
  { id: 'fs-m3', courseId: '23CIPC205', type: 'lecture', day: 0, startHour: 11, endHour: 12, label: 'Computer Organization' },
  { id: 'fs-m4', courseId: '23CIPC204', type: 'lecture', day: 0, startHour: 12, endHour: 13, label: 'Digital System Design' },
  { id: 'fs-m5', courseId: '23BSCI201', type: 'tutorial', day: 0, startHour: 14, endHour: 15, label: 'Engg Maths - III (Practice)' },

  // TUESDAY
  { id: 'fs-t1', courseId: '23CIPC205', type: 'lecture', day: 1, startHour: 9, endHour: 10, label: 'Computer Organization' },
  { id: 'fs-t2', courseId: '23CIPC204', type: 'lecture', day: 1, startHour: 10, endHour: 11, label: 'Digital System Design' },
  { id: 'fs-t3', courseId: '23HMCC215', type: 'lecture', day: 1, startHour: 11, endHour: 12, label: 'Universal Human Values' },
  { id: 'fs-t4', courseId: '23CIPC203', type: 'lecture', day: 1, startHour: 12, endHour: 13, label: 'Data Structures and Applications' },

  // WEDNESDAY
  { id: 'fs-w1', courseId: '23BSCI201', type: 'lecture', day: 2, startHour: 9, endHour: 10, label: 'Engineering Mathematics - III' },
  { id: 'fs-w2', courseId: '23CIPC205', type: 'lecture', day: 2, startHour: 10, endHour: 11, label: 'Computer Organization' },
  { id: 'fs-w3', courseId: 'INST-HOURS', type: 'lecture', day: 2, startHour: 11, endHour: 12, label: 'Library Reading Hour' },
  { id: 'fs-w4', courseId: '23CIPC203', type: 'lecture', day: 2, startHour: 12, endHour: 13, label: 'Data Structures and Applications' },
  { id: 'fs-w5', courseId: '23CIPC204', type: 'lab', day: 2, startHour: 14, endHour: 16, label: 'DSD Lab (LB-A103)' },
  { id: 'fs-w6', courseId: '23NMCC22X', type: 'lecture', day: 2, startHour: 16, endHour: 17, label: 'Yoga / PE / NSS' },

  // THURSDAY
  { id: 'fs-th1', courseId: '23BSCI201', type: 'lecture', day: 3, startHour: 9, endHour: 10, label: 'Engineering Mathematics - III' },
  { id: 'fs-th2', courseId: '23CIPC204', type: 'lecture', day: 3, startHour: 10, endHour: 11, label: 'Digital System Design' },
  { id: 'fs-th3', courseId: '23BSCI201', type: 'lecture', day: 3, startHour: 11, endHour: 12, label: 'Engineering Mathematics - III' },
  { id: 'fs-th4', courseId: 'INST-HOURS', type: 'lecture', day: 3, startHour: 12, endHour: 13, label: 'Communication Training (CT)' },
  { id: 'fs-th5', courseId: '23CIPC203', type: 'lab', day: 3, startHour: 14, endHour: 16, label: 'DSA Lab (LB-A103)' },

  // FRIDAY
  { id: 'fs-f1', courseId: '23CIPC206', type: 'lecture', day: 4, startHour: 9, endHour: 10, label: 'Software Engineering' },
  { id: 'fs-f2', courseId: '23CIPC206', type: 'lecture', day: 4, startHour: 10, endHour: 11, label: 'Software Engineering' },
  { id: 'fs-f3', courseId: '23CIPC205', type: 'lecture', day: 4, startHour: 11, endHour: 12, label: 'Computer Organization' },
  { id: 'fs-f4', courseId: '23CIPC203', type: 'lecture', day: 4, startHour: 12, endHour: 13, label: 'Data Structures and Applications' },
  { id: 'fs-f5', courseId: 'INST-HOURS', type: 'lecture', day: 4, startHour: 14, endHour: 15, label: 'Mentoring Session' },
  { id: 'fs-f6', courseId: '23CIPC206', type: 'tutorial', day: 4, startHour: 15, endHour: 16, label: 'Software Engineering (Tutorial)' },

  // SATURDAY
  { id: 'fs-s1', courseId: '23CISE252', type: 'lab', day: 5, startHour: 9, endHour: 11, label: 'Python Lab (LB-A001 CAD)' },
  { id: 'fs-s2', courseId: '23CIPC206', type: 'lecture', day: 5, startHour: 11, endHour: 12, label: 'Software Engineering' },
  { id: 'fs-s3', courseId: '23CIPC206', type: 'tutorial', day: 5, startHour: 12, endHour: 13, label: 'Software Engineering (Tutorial)' },
  { id: 'fs-s4', courseId: 'INST-HOURS', type: 'lecture', day: 5, startHour: 14, endHour: 17, label: 'Club Activities' },
];

export const MITE_DEFAULT_DEADLINES = [
  {
    id: 'dl-math-aba1',
    courseId: '23BSCI201',
    title: 'Activity Based Assessment I (ABA 1)',
    type: 'assignment',
    dueDay: 5,
    dueDate: '2026-11-21',
    estimatedHours: 4,
    faculty: 'Dr. Ramya S',
    maxMarks: 50,
    note: 'Submit written ABA 1 component in assignment book on or before 21.11.2026',
    isAssignmentBook: true,
  },
  {
    id: 'dl-cie-math',
    courseId: '23BSCI201',
    title: 'CIE Test 1: Engg Mathematics - III',
    type: 'exam',
    dueDay: 5,
    dueDate: '2026-10-31',
    sessionTime: '09:15 AM – 10:45 AM',
    estimatedHours: 3,
  },
  {
    id: 'dl-cie-dsa',
    courseId: '23CIPC203',
    title: 'CIE Test 1: Data Structures & Applications',
    type: 'exam',
    dueDay: 5,
    dueDate: '2026-10-31',
    sessionTime: '01:15 PM – 02:45 PM',
    estimatedHours: 3,
  },
  {
    id: 'dl-cie-co',
    courseId: '23CIPC205',
    title: 'CIE Test 1: Computer Organization',
    type: 'exam',
    dueDay: 0,
    dueDate: '2026-11-02',
    sessionTime: '09:15 AM – 10:45 AM',
    estimatedHours: 3,
  },
  {
    id: 'dl-cie-dsd',
    courseId: '23CIPC204',
    title: 'CIE Test 1: Digital Systems Design',
    type: 'exam',
    dueDay: 0,
    dueDate: '2026-11-02',
    sessionTime: '01:15 PM – 02:45 PM',
    estimatedHours: 3,
  },
  {
    id: 'dl-cie-uhv',
    courseId: '23HMCC215',
    title: 'CIE Test 1: Universal Human Values',
    type: 'exam',
    dueDay: 1,
    dueDate: '2026-11-03',
    sessionTime: '09:15 AM – 10:45 AM',
    estimatedHours: 2,
  },
  {
    id: 'dl-cie-se',
    courseId: '23CIPC206',
    title: 'CIE Test 1: Software Engineering',
    type: 'exam',
    dueDay: 1,
    dueDate: '2026-11-03',
    sessionTime: '01:15 PM – 02:45 PM',
    estimatedHours: 3,
  },
];

export const RECOMMENDED_PLANS = [
  {
    id: 'plan-balanced',
    name: 'Balanced Academic Mastery',
    badge: 'Recommended',
    hours: 8,
    description: 'Evenly distributes 2-hour evening revision sessions across core engineering courses.',
    slots: [
      { courseId: '23BSCI201', title: 'Maths III: Fourier Series Derivations', day: 6, startHour: 17, endHour: 19, notes: 'Formula derivation and practice problems' },
      { courseId: '23CIPC203', title: 'DSA: Tree Traversals & BST Operations', day: 1, startHour: 17, endHour: 19, notes: 'Binary Search Trees & LeetCode problems' },
      { courseId: '23CIPC204', title: 'DSD: K-Map & Logic Gate Minimization', day: 2, startHour: 17, endHour: 19, notes: 'Review ADE lab circuits and timing diagrams' },
      { courseId: '23CIPC205', title: 'CO: Instruction Pipelining & Cache Mapping', day: 3, startHour: 17, endHour: 19, notes: 'Address decoding and register transfers' },
    ],
  },
  {
    id: 'plan-cie-sprint',
    name: 'CIE 1 High-Scorer Sprint',
    badge: 'Exam Focus',
    hours: 10,
    description: 'High-intensity preparation focusing on syllabus modules for the upcoming CIE 1 tests.',
    slots: [
      { courseId: '23BSCI201', title: 'CIE 1 Prep: Numerical Maths & ODEs', day: 0, startHour: 17, endHour: 19, notes: 'Review previous year internal question bank' },
      { courseId: '23CIPC203', title: 'CIE 1 Prep: Stacks, Queues & Linked Lists', day: 1, startHour: 17, endHour: 19, notes: 'Practice algorithm trace & time complexities' },
      { courseId: '23CIPC204', title: 'CIE 1 Prep: Digital Logic & Flip-Flops', day: 2, startHour: 17, endHour: 19, notes: 'Sequential circuit state transition tables' },
      { courseId: '23CIPC205', title: 'CIE 1 Prep: Processor Architecture & Buses', day: 3, startHour: 17, endHour: 19, notes: 'ALU data path and bus arbitration' },
      { courseId: '23CIPC206', title: 'CIE 1 Prep: Software Engineering Agile & UML', day: 4, startHour: 17, endHour: 19, notes: 'Requirements analysis and UML use-case models' },
    ],
  },
  {
    id: 'plan-weekend-deepwork',
    name: 'Weekend Focused Study',
    badge: 'Light Routine',
    hours: 4,
    description: 'Keeps weekdays free and concentrates dedicated study blocks during the weekend.',
    slots: [
      { courseId: '23CISE252', title: 'Python Programming: Scripting & Mini-Project', day: 5, startHour: 17, endHour: 19, notes: 'CAD Lab code completion' },
      { courseId: '23BSCI201', title: 'Maths ABA 1: Assignment Book Solutions', day: 6, startHour: 10, endHour: 12, notes: 'Dr. Ramya S submission preparation' },
    ],
  },
];

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

export function toCalendarEvents(courses, fixedSlots, deadlines, studyBlocks, customStudySlots = []) {
  const courseMap = Object.fromEntries(courses.map((c) => [c.id, c]));
  const dlMap = Object.fromEntries(deadlines.map((d) => [d.id, d]));
  const events = [];

  for (const s of fixedSlots) {
    const course = courseMap[s.courseId];
    events.push({
      id: s.id,
      courseId: s.courseId,
      title: s.label || `${s.courseId} ${s.type}`,
      courseName: course?.name ?? s.courseId,
      faculty: course?.faculty ?? '',
      category: s.type,
      isFixed: true,
      isCustom: false,
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
      isCustom: false,
      day: sb.day,
      startHour: sb.startHour,
      endHour: sb.endHour,
      color: course?.color ? course.color + '99' : '#94a3b899',
      solidColor: course?.color ?? '#94a3b8',
    });
  }

  for (const cs of customStudySlots) {
    const course = courseMap[cs.courseId];
    events.push({
      id: cs.id,
      courseId: cs.courseId,
      title: cs.title || `Self Study: ${course?.name ?? cs.courseId}`,
      courseName: course?.name ?? cs.courseId,
      faculty: course?.faculty ?? '',
      category: 'custom-study',
      notes: cs.notes || '',
      isFixed: false,
      isCustom: true,
      day: cs.day,
      startHour: cs.startHour,
      endHour: cs.endHour,
      color: '#f59e0b',
      solidColor: '#d97706',
    });
  }

  return events;
}

export function generateStudySchedule(
  fixedSlots,
  deadlines,
  options = { minHour: DEFAULT_MIN_HOUR, maxHour: DEFAULT_MAX_HOUR, maxBlock: DEFAULT_MAX_BLOCK, strategy: 'pre-deadline' }
) {
  const { minHour = DEFAULT_MIN_HOUR, maxHour = DEFAULT_MAX_HOUR, maxBlock = DEFAULT_MAX_BLOCK, strategy = 'pre-deadline' } = options;

  const occupied = Array.from({ length: DAYS }, () => Array(24).fill(false));
  const studyOccupied = Array.from({ length: DAYS }, () => Array(24).fill(false));

  for (const slot of fixedSlots) {
    if (slot.day >= 0 && slot.day < DAYS) {
      for (let h = Math.max(0, slot.startHour); h < Math.min(24, slot.endHour); h++) {
        occupied[slot.day][h] = true;
      }
    }
  }

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
        const maxAllowedInBlock = Math.min(maxBlock - prevStudy, remainingNeeded - placedOnDay, maxHoursThisPass - placedOnDay);
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
          h++; // anti-burnout break
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
    const beforeDays = [];

    if (strategy === 'pre-deadline') {
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

    if (remaining > 0) {
      const placed = allocateOnDay(dl, dl.dueDay, remaining, remaining);
      remaining -= placed;
    }

    unallocatedByDeadline[dl.id] = remaining;
  }

  return { studyBlocks, unallocatedByDeadline };
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
 *  MAIN APPLICATION COMPONENT
 * ============================================================
 */
export default function App() {
  // Student Login State (null = Intro / Login page)
  const [currentUser, setCurrentUser] = useState(null);

  // Core Data
  const [courses, setCourses] = useState(MITE_COURSES);
  const [fixedSlots, setFixedSlots] = useState(MITE_FIXED_SLOTS);
  const [deadlines, setDeadlines] = useState(MITE_DEFAULT_DEADLINES);
  const [customStudySlots, setCustomStudySlots] = useState([]);

  // Constraints
  const [minHour, setMinHour] = useState(DEFAULT_MIN_HOUR);
  const [maxHour, setMaxHour] = useState(DEFAULT_MAX_HOUR);
  const [maxBlock, setMaxBlock] = useState(DEFAULT_MAX_BLOCK);
  const [strategy, setStrategy] = useState('pre-deadline');

  // Navigation: Dedicated Pages
  // 'schedule' | 'study-hours' | 'cie-deadlines' | 'analytics' | 'settings'
  const [activePage, setActivePage] = useState('schedule');

  // View Filter in Schedule Page:
  // 'ALL' | 'classes' | 'study-hours' | 'prep'
  const [scheduleFilter, setScheduleFilter] = useState('ALL');
  const [viewFormat, setViewFormat] = useState('grid'); // 'grid' | 'agenda'
  const [courseFilter, setCourseFilter] = useState('ALL');

  // Modals & Feedback
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [copiedType, setCopiedType] = useState(null);

  // Controlled Form for Scheduling Personal Study
  const [newCustomSlot, setNewCustomSlot] = useState({
    courseId: '23BSCI201',
    title: '',
    day: 0,
    startHour: 17,
    endHour: 18,
    notes: '',
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Run Scheduling Algorithm
  const { studyBlocks } = useMemo(() => {
    return generateStudySchedule(fixedSlots, deadlines, {
      minHour,
      maxHour,
      maxBlock,
      strategy,
    });
  }, [fixedSlots, deadlines, minHour, maxHour, maxBlock, strategy]);

  // Combine All Calendar Events
  const calendarEvents = useMemo(() => {
    return toCalendarEvents(courses, fixedSlots, deadlines, studyBlocks, customStudySlots);
  }, [courses, fixedSlots, deadlines, studyBlocks, customStudySlots]);

  // Detect Clashes
  const clashes = useMemo(() => {
    return detectClashes(calendarEvents);
  }, [calendarEvents]);

  // Verification Tests
  const verificationReport = useMemo(() => {
    const totalRequested = deadlines.reduce((acc, d) => acc + Number(d.estimatedHours || 0), 0);
    const totalAllocated = studyBlocks.reduce((acc, b) => acc + (b.endHour - b.startHour), 0);
    const test1Pass = totalAllocated === totalRequested;
    const test2Pass = clashes.length === 0;

    const lines = [];
    lines.push(`=== MITE CS&E (AIML) Timetable & Study Grid ===`);
    lines.push('Hour   ' + DAY_NAMES.map((d) => d.padEnd(8, ' ')).join(''));
    for (let h = minHour; h < maxHour; h++) {
      let row = `${String(h).padStart(2, '0')}:00  `;
      for (let d = 0; d < DAYS; d++) {
        const fixed = fixedSlots.find((s) => s.day === d && s.startHour <= h && h < s.endHour);
        const study = studyBlocks.find((s) => s.day === d && s.startHour <= h && h < s.endHour);
        const custom = customStudySlots.find((s) => s.day === d && s.startHour <= h && h < s.endHour);
        if (fixed) row += `[${fixed.courseId.slice(0, 5).padEnd(5, ' ')}]  `;
        else if (custom) row += `{${custom.courseId.slice(0, 5).padEnd(5, ' ')}}  `;
        else if (study) row += `(${study.courseId.slice(0, 5).padEnd(5, ' ')})  `;
        else row += '   ·     ';
      }
      lines.push(row);
    }

    return {
      allPassed: test1Pass && test2Pass,
      totalRequested,
      totalAllocated,
      asciiGrid: lines.join('\n'),
    };
  }, [deadlines, studyBlocks, clashes, minHour, maxHour, fixedSlots, customStudySlots]);

  // Presets
  const loadMiteDefault = () => {
    setCourses(MITE_COURSES);
    setFixedSlots(MITE_FIXED_SLOTS);
    setDeadlines(MITE_DEFAULT_DEADLINES);
    setSelectedEvent(null);
    showToast('Loaded MITE Regular Schedule');
  };

  const loadCieExamWeekPreset = () => {
    setCourses(MITE_COURSES);
    const cieFixedSlots = [
      { id: 'cie-fs-1', courseId: '23BSCI201', type: 'lecture', day: 5, startHour: 9, endHour: 11, label: '🎯 CIE 1: Maths-III (09:15–10:45 AM)' },
      { id: 'cie-fs-2', courseId: '23CIPC203', type: 'lecture', day: 5, startHour: 13, endHour: 15, label: '🎯 CIE 1: DSA (01:15–02:45 PM)' },
      { id: 'cie-fs-3', courseId: '23CIPC205', type: 'lecture', day: 0, startHour: 9, endHour: 11, label: '🎯 CIE 1: CO (09:15–10:45 AM)' },
      { id: 'cie-fs-4', courseId: '23CIPC204', type: 'lecture', day: 0, startHour: 13, endHour: 15, label: '🎯 CIE 1: DSD (01:15–02:45 PM)' },
      { id: 'cie-fs-5', courseId: '23HMCC215', type: 'lecture', day: 1, startHour: 9, endHour: 11, label: '🎯 CIE 1: UHV (09:15–10:45 AM)' },
      { id: 'cie-fs-6', courseId: '23CIPC206', type: 'lecture', day: 1, startHour: 13, endHour: 15, label: '🎯 CIE 1: SE (01:15–02:45 PM)' },
    ];
    setFixedSlots(cieFixedSlots);
    setDeadlines([MITE_DEFAULT_DEADLINES[0], ...MITE_DEFAULT_DEADLINES.slice(1)]);
    setSelectedEvent(null);
    showToast('Switched to CIE Test 1 Exam Mode');
  };

  // User Custom Study Slot Handlers
  const handleScheduleCustomSlot = (e) => {
    e.preventDefault();
    const start = Number(newCustomSlot.startHour);
    const end = Number(newCustomSlot.endHour);
    if (end <= start) {
      alert('End hour must be later than start hour.');
      return;
    }

    const createdSlot = {
      id: `custom-${Date.now()}`,
      courseId: newCustomSlot.courseId || courses[0]?.id || '23BSCI201',
      title: newCustomSlot.title.trim() || `Study: ${newCustomSlot.courseId}`,
      day: Number(newCustomSlot.day),
      startHour: start,
      endHour: end,
      notes: newCustomSlot.notes.trim(),
    };

    setCustomStudySlots((prev) => [...prev, createdSlot]);
    setScheduleModalOpen(false);
    setNewCustomSlot({ courseId: courses[0]?.id || '23BSCI201', title: '', day: 0, startHour: 17, endHour: 18, notes: '' });
    showToast(`Study slot scheduled for ${DAY_FULL_NAMES[createdSlot.day]}!`);
  };

  const handleDeleteCustomSlot = (id) => {
    setCustomStudySlots((prev) => prev.filter((s) => s.id !== id));
    if (selectedEvent?.id === id) setSelectedEvent(null);
    showToast('Study slot deleted');
  };

  const handleApplyRecommendedPlan = (plan) => {
    const formatted = plan.slots.map((s, idx) => ({
      id: `custom-rec-${Date.now()}-${idx}`,
      courseId: s.courseId,
      title: s.title,
      day: s.day,
      startHour: s.startHour,
      endHour: s.endHour,
      notes: s.notes || '',
    }));
    setCustomStudySlots(formatted);
    showToast(`Applied ${plan.name} (${plan.hours}h scheduled)!`);
  };

  const handleAutoGeneratePlan = () => {
    const targetCourses = [
      { id: '23BSCI201', title: 'Maths III: Self Revision & Practice' },
      { id: '23CIPC203', title: 'DSA: Tree & Graph Problem Solving' },
      { id: '23CIPC204', title: 'Digital Systems: Circuit Analysis' },
      { id: '23CIPC205', title: 'Computer Org: Architecture Review' },
    ];

    const generated = [];
    const candidateDays = [1, 2, 3, 6, 0, 4, 5];
    let courseIdx = 0;

    for (const day of candidateDays) {
      if (courseIdx >= targetCourses.length) break;
      const testStart = 17;
      const testEnd = 19;
      const hasConflict =
        fixedSlots.some((s) => s.day === day && s.startHour < testEnd && testStart < s.endHour) ||
        studyBlocks.some((s) => s.day === day && s.startHour < testEnd && testStart < s.endHour);

      if (!hasConflict) {
        generated.push({
          id: `custom-auto-${Date.now()}-${courseIdx}`,
          courseId: targetCourses[courseIdx].id,
          title: targetCourses[courseIdx].title,
          day,
          startHour: testStart,
          endHour: testEnd,
          notes: 'Auto-recommended study session based on weekly timetable',
        });
        courseIdx++;
      }
    }

    setCustomStudySlots(generated);
    showToast(`Auto-generated smart clash-free study plan (${generated.length * 2}h scheduled)!`);
  };

  const handleClearCustomSlots = () => {
    setCustomStudySlots([]);
    showToast('Cleared custom study plan');
  };

  const handleOpenSlotModalForCell = (day, hour) => {
    setNewCustomSlot({
      courseId: courses[0]?.id || '23BSCI201',
      day,
      startHour: hour,
      endHour: Math.min(hour + 1, 23),
      title: '',
      notes: '',
    });
    setScheduleModalOpen(true);
  };

  const handleCopyText = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedType(label);
    showToast('Copied to clipboard');
    setTimeout(() => setCopiedType(null), 2000);
  };

  // Hours array for grid
  const calendarHours = useMemo(() => {
    const hrs = [];
    for (let h = minHour; h < maxHour; h++) hrs.push(h);
    return hrs;
  }, [minHour, maxHour]);

  // Aggregated Metric Totals
  const totalClassHours = useMemo(
    () => fixedSlots.reduce((acc, s) => acc + (s.endHour - s.startHour), 0),
    [fixedSlots]
  );
  const totalAutoPrepHours = useMemo(
    () => studyBlocks.reduce((acc, b) => acc + (b.endHour - b.startHour), 0),
    [studyBlocks]
  );
  const totalMyStudyHours = useMemo(
    () => customStudySlots.reduce((acc, s) => acc + (s.endHour - s.startHour), 0),
    [customStudySlots]
  );

  // Filtered Events for Schedule Page
  const filteredScheduleEvents = useMemo(() => {
    return calendarEvents.filter((ev) => {
      if (courseFilter !== 'ALL' && ev.courseId !== courseFilter) return false;
      if (scheduleFilter === 'classes' && !ev.isFixed) return false;
      if (scheduleFilter === 'study-hours' && !ev.isCustom) return false;
      if (scheduleFilter === 'prep' && (ev.isFixed || ev.isCustom)) return false;
      return true;
    });
  }, [calendarEvents, scheduleFilter, courseFilter]);

  // =========================================================================
  //  1. INTRO / STUDENT LOGIN PAGE
  // =========================================================================
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans selection:bg-indigo-500 selection:text-white">
        {/* Subtle background glow */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-indigo-600/15 via-blue-600/10 to-transparent blur-3xl rounded-full" />
        </div>

        {/* Minimal Header */}
        <header className="relative z-10 max-w-5xl w-full mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 border border-indigo-400/30">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold tracking-tight text-white text-sm">MITE Mangalore</span>
              <span className="text-[11px] text-slate-400 ml-2">CS&E (AIML)</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              NAAC A+ Accredited
            </span>
          </div>
        </header>

        {/* Hero & Login Card */}
        <main className="relative z-10 max-w-md w-full mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Smart Timetable <span className="text-indigo-400">&</span> Study Hub
            </h1>
            <p className="text-xs text-slate-400 mt-2">
              Autonomous VTU CS&E (AIML) • III Semester • AY 2026-27
            </p>
          </div>

          {/* Clean Student Login Box */}
          <div className="bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-2xl shadow-black/60 space-y-5 animate-slide-down">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-indigo-400" />
                Student Portal Sign In
              </span>
              <span className="text-[11px] text-indigo-400 font-medium">LH - P302</span>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                const usn = form.usn.value.trim().toUpperCase() || '4MT23AI042';
                const name = form.name.value.trim() || 'Student';
                setCurrentUser({
                  usn,
                  name,
                  semester: 'III Sem',
                  section: 'AIML',
                  room: 'LH - P302',
                  advisor: 'Dr. Yogeesha C B',
                });
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block text-slate-300 font-medium mb-1.5">University Seat Number (USN)</label>
                <input
                  type="text"
                  name="usn"
                  defaultValue="4MT23AI042"
                  placeholder="e.g. 4MT23AI001"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white uppercase placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1.5">Full Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue="Namit Naik"
                  placeholder="e.g. Namit Naik"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/25 transition flex items-center justify-center gap-2"
                >
                  <span>Enter Student Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentUser({
                      usn: '4MT23AI042',
                      name: 'Namit Naik',
                      semester: 'III Sem',
                      section: 'AIML',
                      room: 'LH - P302',
                      advisor: 'Dr. Yogeesha C B',
                    });
                  }}
                  className="w-full py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 text-xs font-semibold transition"
                >
                  Quick Demo Sign-In
                </button>
              </div>
            </form>

            <div className="pt-2 border-t border-slate-800/60 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center justify-between">
                <span>Class Advisor:</span>
                <strong className="text-slate-300">Dr. Yogeesha C B</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Next Deadline:</span>
                <span className="text-amber-300">Maths ABA 1 (21.11.2026)</span>
              </div>
            </div>
          </div>
        </main>

        {/* Minimal Footer */}
        <footer className="relative z-10 py-4 text-center text-[11px] text-slate-500">
          Mangalore Institute of Technology & Engineering • Autonomous Under VTU Belagavi
        </footer>
      </div>
    );
  }

  // =========================================================================
  //  2. MAIN LOGGED-IN APPLICATION SHELL
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-indigo-600 text-white px-4 py-2 rounded-xl shadow-xl border border-indigo-400/30 flex items-center gap-2 text-xs font-semibold animate-slide-down">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ==================== MINIMAL TOP NAVBAR ==================== */}
      <header className="border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
          {/* Brand & Greeting */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white tracking-tight">{currentUser.name}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  {currentUser.usn}
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                CS&E (AIML) • {currentUser.room}
              </p>
            </div>
          </div>

          {/* PRIMARY NAVIGATION TABS (Directs to separate pages) */}
          <nav className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 overflow-x-auto text-xs">
            <button
              onClick={() => setActivePage('schedule')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
                activePage === 'schedule' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule</span>
            </button>

            <button
              onClick={() => setActivePage('study-hours')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
                activePage === 'study-hours' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookmarkCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>My Study Hours</span>
              {customStudySlots.length > 0 && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-bold ml-0.5">
                  {customStudySlots.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActivePage('cie-deadlines')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
                activePage === 'cie-deadlines' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              <span>CIE & Deadlines</span>
            </button>

            <button
              onClick={() => setActivePage('analytics')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
                activePage === 'analytics' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Analytics</span>
            </button>

            <button
              onClick={() => setActivePage('settings')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
                activePage === 'settings' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-purple-400" />
              <span>Settings & Export</span>
            </button>
          </nav>

          {/* Quick Schedule CTA & Sign Out */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setNewCustomSlot({ courseId: courses[0]?.id || '23BSCI201', title: '', day: 0, startHour: 17, endHour: 18, notes: '' });
                setScheduleModalOpen(true);
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition shadow-sm"
              title="Schedule a custom study slot"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Plan Study</span>
            </button>

            <button
              onClick={() => setCurrentUser(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ==================== PAGE CONTAINER ==================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-5">
        {/* =========================================================================
            PAGE 1: SCHEDULE (WITH REQUESTED VIEW FILTERS)
        ========================================================================= */}
        {activePage === 'schedule' && (
          <div className="space-y-4 animate-page-enter">
            {/* Minimal Filter Toolbar */}
            <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-lg">
              {/* REQUESTED VIEW FILTERS: All, Classes, My Study Hours, Exam Prep */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 overflow-x-auto text-xs">
                <button
                  onClick={() => setScheduleFilter('ALL')}
                  className={`px-3 py-1 rounded-lg font-medium transition ${
                    scheduleFilter === 'ALL' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  All Items ({calendarEvents.length})
                </button>
                <button
                  onClick={() => setScheduleFilter('classes')}
                  className={`px-3 py-1 rounded-lg font-medium transition ${
                    scheduleFilter === 'classes' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  📚 Class Timetable ({totalClassHours}h)
                </button>
                <button
                  onClick={() => setScheduleFilter('study-hours')}
                  className={`px-3 py-1 rounded-lg font-medium transition ${
                    scheduleFilter === 'study-hours' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  ⏱️ My Study Hours ({totalMyStudyHours}h)
                </button>
                <button
                  onClick={() => setScheduleFilter('prep')}
                  className={`px-3 py-1 rounded-lg font-medium transition ${
                    scheduleFilter === 'prep' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  🎯 Exam & ABA Prep ({totalAutoPrepHours}h)
                </button>
              </div>

              {/* View Format (Grid vs Agenda) & Subject Filter */}
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-slate-950 rounded-lg border border-slate-800 p-0.5 text-xs">
                  <button
                    onClick={() => setViewFormat('grid')}
                    className={`p-1.5 rounded ${viewFormat === 'grid' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
                    title="Weekly Grid View"
                  >
                    <Grid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setViewFormat('agenda')}
                    className={`p-1.5 rounded ${viewFormat === 'agenda' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
                    title="Daily Feed View"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>

                <select
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white"
                >
                  <option value="ALL">All Subjects</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.id}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Selected Event Details Banner */}
            {selectedEvent && (
              <div className="bg-indigo-950/60 border border-indigo-500/40 rounded-xl px-4 py-2.5 flex items-center justify-between gap-3 text-xs animate-slide-down">
                <div className="flex items-center gap-2 truncate">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: selectedEvent.color }} />
                  <span className="font-bold text-white truncate">{selectedEvent.title}</span>
                  <span className="text-slate-300">
                    • {DAY_NAMES[selectedEvent.day]} {formatHourShort(selectedEvent.startHour)}–{formatHourShort(selectedEvent.endHour)}
                  </span>
                  <span className="text-slate-400 hidden sm:inline">
                    ({selectedEvent.isCustom ? 'My Custom Study' : selectedEvent.faculty || selectedEvent.category})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {selectedEvent.isCustom && (
                    <button
                      onClick={() => handleDeleteCustomSlot(selectedEvent.id)}
                      className="px-2 py-1 rounded bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 text-[11px] font-semibold"
                    >
                      Delete Slot
                    </button>
                  )}
                  <button onClick={() => setSelectedEvent(null)} className="text-slate-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* FORMAT A: WEEKLY GRID VIEW */}
            {viewFormat === 'grid' && (
              <div className="bg-slate-900 border border-slate-800/80 rounded-2xl shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <div className="min-w-[850px]">
                    {/* Day Column Headers */}
                    <div className="grid grid-cols-8 border-b border-slate-800 bg-slate-950/80 sticky top-0 z-10 text-xs">
                      <div className="p-2.5 font-bold text-slate-400 border-r border-slate-800 text-center">
                        Period / Time
                      </div>
                      {DAY_NAMES.map((dayName, idx) => {
                        const dayDls = deadlines.filter((d) => d.dueDay === idx);
                        return (
                          <div key={idx} className="p-2 border-r border-slate-800 last:border-r-0 flex flex-col items-center">
                            <span className="font-bold text-white">{dayName}</span>
                            <span className="text-[10px] text-slate-500">{DAY_FULL_NAMES[idx].slice(0, 3)}</span>
                            {dayDls.map((dl) => (
                              <span
                                key={dl.id}
                                className="mt-1 text-[9px] px-1 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 truncate max-w-[95px] text-center"
                                title={dl.title}
                              >
                                {dl.type === 'exam' ? '🎯 CIE' : '📝 ABA'}
                              </span>
                            ))}
                          </div>
                        );
                      })}
                    </div>

                    {/* Hourly Rows */}
                    <div className="divide-y divide-slate-800/50">
                      {calendarHours.map((hour) => (
                        <div key={hour} className="grid grid-cols-8 min-h-[50px] hover:bg-slate-900/40 transition">
                          {/* Hour Label */}
                          <div className="border-r border-slate-800/80 px-2 py-1 text-[11px] font-mono text-slate-400 flex flex-col items-center justify-center bg-slate-950/40">
                            <span className="font-bold text-slate-300">{formatHourShort(hour)}</span>
                            <span className="text-[9px] text-slate-500 text-center leading-tight">
                              {PERIOD_LABELS[hour] ? PERIOD_LABELS[hour].split(' ')[0] : ''}
                            </span>
                          </div>

                          {/* Day Cells */}
                          {Array.from({ length: DAYS }, (_, dayIdx) => {
                            const cellEvents = filteredScheduleEvents.filter(
                              (ev) => ev.day === dayIdx && ev.startHour <= hour && hour < ev.endHour
                            );

                            return (
                              <div
                                key={dayIdx}
                                className="border-r border-slate-800/40 last:border-r-0 p-1 relative group min-h-[50px]"
                              >
                                {cellEvents.length > 0 ? (
                                  cellEvents.map((ev) => {
                                    const isStart = ev.startHour === hour;
                                    const duration = ev.endHour - ev.startHour;

                                    return (
                                      <div
                                        key={ev.id}
                                        onClick={() => setSelectedEvent(ev)}
                                        style={{
                                          backgroundColor: ev.isFixed
                                            ? `${ev.color}20`
                                            : ev.isCustom
                                            ? '#f59e0b20'
                                            : ev.color,
                                          borderColor: ev.isFixed ? ev.color : ev.isCustom ? '#f59e0b' : ev.solidColor,
                                        }}
                                        className={`w-full h-full rounded-lg px-2 py-1 cursor-pointer transition text-xs flex flex-col justify-between ${
                                          ev.isFixed
                                            ? 'border-l-4 border-slate-800'
                                            : ev.isCustom
                                            ? 'border-2 border-amber-500 shadow-sm'
                                            : 'border-2 border-dashed'
                                        } hover:brightness-125`}
                                      >
                                        {isStart ? (
                                          <div className="flex items-center justify-between gap-1">
                                            <span className="font-bold text-white truncate text-[11px]">{ev.title}</span>
                                            <span className="text-[9px] font-mono px-1 rounded bg-slate-950/80 text-slate-300 shrink-0">
                                              {duration}h
                                            </span>
                                          </div>
                                        ) : (
                                          <span className="text-[10px] text-white/80 truncate">↳ {ev.title}</span>
                                        )}
                                      </div>
                                    );
                                  })
                                ) : (
                                  /* Empty Cell Hover Action */
                                  <button
                                    onClick={() => handleOpenSlotModalForCell(dayIdx, hour)}
                                    className="w-full h-full rounded-lg border border-transparent hover:border-slate-800 hover:bg-slate-800/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-[10px] text-slate-400 hover:text-amber-300 gap-1"
                                  >
                                    <Plus className="w-3 h-3 text-amber-400" />
                                    <span>Plan Study</span>
                                  </button>
                                )}
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

            {/* FORMAT B: DAY-BY-DAY AGENDA FEED */}
            {viewFormat === 'agenda' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {DAY_FULL_NAMES.map((dName, dayIdx) => {
                  const dayEvents = filteredScheduleEvents
                    .filter((e) => e.day === dayIdx)
                    .sort((a, b) => a.startHour - b.startHour);

                  return (
                    <div key={dayIdx} className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                          <span className="font-bold text-white text-sm">{dName}</span>
                          <span className="text-xs text-slate-400">{dayEvents.length} events</span>
                        </div>

                        {dayEvents.length === 0 ? (
                          <div className="py-6 text-center text-xs text-slate-500">No events match filter</div>
                        ) : (
                          <div className="space-y-2">
                            {dayEvents.map((ev) => (
                              <div
                                key={ev.id}
                                onClick={() => setSelectedEvent(ev)}
                                className={`p-2 rounded-xl border text-xs cursor-pointer transition ${
                                  ev.isFixed
                                    ? 'bg-slate-950 border-slate-800 hover:border-slate-700'
                                    : ev.isCustom
                                    ? 'bg-amber-950/20 border-amber-500/30 hover:border-amber-400'
                                    : 'bg-indigo-950/20 border-indigo-500/30 hover:border-indigo-400'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-white truncate mr-2">{ev.title}</span>
                                  <span className="text-[10px] font-mono text-slate-400 shrink-0">
                                    {formatHourShort(ev.startHour)}–{formatHourShort(ev.endHour)}
                                  </span>
                                </div>
                                <div className="text-[10px] text-slate-400 mt-0.5 flex items-center justify-between">
                                  <span>{ev.isCustom ? '⭐ Self-Study' : ev.faculty || ev.category}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => handleOpenSlotModalForCell(dayIdx, 17)}
                        className="mt-3 w-full py-1.5 rounded-lg border border-dashed border-slate-800 hover:border-amber-500/40 text-slate-400 hover:text-amber-300 text-xs flex items-center justify-center gap-1 transition"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Schedule Study</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            PAGE 2: MY STUDY HOURS (DEDICATED PERSONAL STUDY PLANNER)
        ========================================================================= */}
        {activePage === 'study-hours' && (
          <div className="space-y-5 animate-page-enter">
            {/* Minimal Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <span className="text-xs text-slate-400 block mb-1">Total Personal Study</span>
                <div className="text-2xl font-extrabold text-amber-300">{totalMyStudyHours} Hours</div>
                <span className="text-[11px] text-slate-500 mt-1 block">Scheduled across {customStudySlots.length} sessions</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <span className="text-xs text-slate-400 block mb-1">Anti-Burnout Safety</span>
                <div className="text-2xl font-extrabold text-emerald-400">100% Protected</div>
                <span className="text-[11px] text-slate-500 mt-1 block">Max {maxBlock}h contiguous study enforced</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <span className="text-xs text-slate-400 block mb-1">CIE 1 Readiness</span>
                <div className="text-2xl font-extrabold text-indigo-400">{totalAutoPrepHours}h Auto Prep</div>
                <span className="text-[11px] text-slate-500 mt-1 block">Scheduled strictly prior to exam days</span>
              </div>
            </div>

            {/* Automatic & Recommended Study Plans */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800/80 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <h3 className="text-sm font-bold text-white">Automatic & Recommended Study Plans</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      1-Click Apply
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Select a tailored curriculum revision plan or let the engine auto-schedule clash-free slots.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAutoGeneratePlan}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-300" />
                    <span>Auto-Generate Smart Plan</span>
                  </button>

                  {customStudySlots.length > 0 && (
                    <button
                      onClick={handleClearCustomSlots}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
                    >
                      Clear Plan
                    </button>
                  )}
                </div>
              </div>

              {/* Recommended Plan Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {RECOMMENDED_PLANS.map((plan) => (
                  <div
                    key={plan.id}
                    className="bg-slate-950 border border-slate-800/90 hover:border-amber-500/40 rounded-xl p-4 flex flex-col justify-between transition group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className="font-bold text-white text-xs">{plan.name}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                          {plan.hours}h / week
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                        {plan.description}
                      </p>
                      <div className="space-y-1 mb-3.5">
                        {plan.slots.map((s, idx) => (
                          <div key={idx} className="text-[10px] text-slate-400 flex items-center gap-1.5 truncate">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                            <span className="font-mono text-slate-300">{DAY_NAMES[s.day]} {s.startHour}:00:</span>
                            <span className="truncate">{s.title.split(':')[0]}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleApplyRecommendedPlan(plan)}
                      className="w-full py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-slate-950 font-bold text-xs border border-amber-500/30 transition flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Apply This Plan</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* List & Quick Add Form */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Form */}
              <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Plus className="w-4 h-4 text-amber-400" />
                    <span>Book Personal Study Session</span>
                  </h3>
                </div>

                <form onSubmit={handleScheduleCustomSlot} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Subject</label>
                    <select
                      value={newCustomSlot.courseId}
                      onChange={(e) => setNewCustomSlot({ ...newCustomSlot, courseId: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-2 text-white"
                    >
                      {courses.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.id} — {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Topic / Revision Goal</label>
                    <input
                      type="text"
                      placeholder="e.g. Tree Traversals, Numerical Problems..."
                      value={newCustomSlot.title}
                      onChange={(e) => setNewCustomSlot({ ...newCustomSlot, title: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-2 text-white"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-slate-400 mb-1">Day</label>
                      <select
                        value={newCustomSlot.day}
                        onChange={(e) => setNewCustomSlot({ ...newCustomSlot, day: Number(e.target.value) })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-2 text-white"
                      >
                        {DAY_FULL_NAMES.map((d, i) => (
                          <option key={i} value={i}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Start</label>
                      <select
                        value={newCustomSlot.startHour}
                        onChange={(e) => setNewCustomSlot({ ...newCustomSlot, startHour: Number(e.target.value) })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-2 text-white"
                      >
                        {calendarHours.map((h) => (
                          <option key={h} value={h}>
                            {formatHourShort(h)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">End</label>
                      <select
                        value={newCustomSlot.endHour}
                        onChange={(e) => setNewCustomSlot({ ...newCustomSlot, endHour: Number(e.target.value) })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-2 text-white"
                      >
                        {calendarHours
                          .filter((h) => h > newCustomSlot.startHour)
                          .concat([maxHour])
                          .map((h) => (
                            <option key={h} value={h}>
                              {formatHourShort(h)}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Notes (Optional)</label>
                    <textarea
                      rows={2}
                      placeholder="Notes or checklist..."
                      value={newCustomSlot.notes}
                      onChange={(e) => setNewCustomSlot({ ...newCustomSlot, notes: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition"
                  >
                    Add Study Slot
                  </button>
                </form>
              </div>

              {/* Sessions List */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <BookmarkCheck className="w-4 h-4 text-amber-400" />
                    <span>My Scheduled Study Sessions</span>
                  </h3>
                  <span className="text-xs text-slate-400">{customStudySlots.length} Total</span>
                </div>

                {customStudySlots.length === 0 ? (
                  <div className="py-12 text-center text-xs text-slate-500 space-y-2">
                    <BookOpen className="w-8 h-8 text-slate-600 mx-auto" />
                    <p>No personal study slots booked yet.</p>
                    <p className="text-[11px] text-slate-600">Use the form or click on any free calendar cell to schedule your revision.</p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {customStudySlots.map((slot) => {
                      const course = courses.find((c) => c.id === slot.courseId);
                      return (
                        <div
                          key={slot.id}
                          className="bg-slate-950 border border-amber-500/30 rounded-xl p-3 flex items-start justify-between text-xs"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white">{slot.courseId}</span>
                              <span className="text-amber-300 font-mono text-[11px]">
                                {DAY_FULL_NAMES[slot.day]} • {formatHourShort(slot.startHour)}–{formatHourShort(slot.endHour)}
                              </span>
                            </div>
                            <div className="text-slate-200 font-medium mt-1">{slot.title}</div>
                            {slot.notes && <div className="text-slate-400 text-[11px] mt-0.5 italic">"{slot.notes}"</div>}
                          </div>
                          <button
                            onClick={() => handleDeleteCustomSlot(slot.id)}
                            className="text-slate-500 hover:text-rose-400 p-1 transition"
                            title="Delete slot"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            PAGE 3: CIE EXAMS & ABA DEADLINES
        ========================================================================= */}
        {activePage === 'cie-deadlines' && (
          <div className="space-y-5 animate-page-enter">
            {/* Dr. Ramya S Mathematics Announcement Notice */}
            <div className="bg-slate-900 border border-blue-500/40 rounded-2xl p-5 shadow-lg relative overflow-hidden">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold text-[10px] uppercase">
                      Classroom Assignment
                    </span>
                    <h3 className="text-sm font-bold text-white">Dr. Ramya S — Engineering Mathematics III</h3>
                  </div>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    All students are informed to complete the <strong>Activity Based Assessment I (ABA 1)</strong> assignment component and submit in the <strong>assignment book</strong> on or before <strong className="text-amber-300">21.11.2026 (Saturday)</strong>. Max Marks: 50.
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/30 text-xs font-bold block">
                    Max Marks: 50
                  </span>
                  <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">
                    4h Auto-Scheduled Prep
                  </span>
                </div>
              </div>
            </div>

            {/* Official CIE Test 1 Time Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
              <div className="px-5 py-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-rose-400" />
                    CIE Test 1 Examination Schedule (AY 2026-27)
                  </h3>
                  <p className="text-[11px] text-slate-400">Department of Computer Science & Engineering (AIML)</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/20 font-semibold">
                  Exam Mode Available
                </span>
              </div>

              <div className="divide-y divide-slate-800/60 text-xs">
                {/* 31 Oct */}
                <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="font-bold text-white">
                    <div className="text-sm">31-10-2026</div>
                    <div className="text-indigo-400">Saturday (Day 5)</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-emerald-400 font-mono block">Morning: 09:15 – 10:45 AM</span>
                    <span className="font-bold text-white">Engineering Mathematics - III (23BSCI201)</span>
                    <span className="text-[11px] text-slate-400 block">Faculty: Dr. Ramya S</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-blue-400 font-mono block">Afternoon: 01:15 – 02:45 PM</span>
                    <span className="font-bold text-white">Data Structures and Applications (23CIPC203)</span>
                    <span className="text-[11px] text-slate-400 block">Faculty: Dr. Yogeesha C B</span>
                  </div>
                </div>

                {/* 02 Nov */}
                <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="font-bold text-white">
                    <div className="text-sm">02-11-2026</div>
                    <div className="text-indigo-400">Monday (Day 0)</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-emerald-400 font-mono block">Morning: 09:15 – 10:45 AM</span>
                    <span className="font-bold text-white">Computer Organization (23CIPC205)</span>
                    <span className="text-[11px] text-slate-400 block">Faculty: Ms. Poornima</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-blue-400 font-mono block">Afternoon: 01:15 – 02:45 PM</span>
                    <span className="font-bold text-white">Digital Systems Design (23CIPC204)</span>
                    <span className="text-[11px] text-slate-400 block">Faculty: Mr. Prakash / Ms. Poornima</span>
                  </div>
                </div>

                {/* 03 Nov */}
                <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="font-bold text-white">
                    <div className="text-sm">03-11-2026</div>
                    <div className="text-indigo-400">Tuesday (Day 1)</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-emerald-400 font-mono block">Morning: 09:15 – 10:45 AM</span>
                    <span className="font-bold text-white">Universal Human Values (23HMCC215)</span>
                    <span className="text-[11px] text-slate-400 block">Faculty: Dr. Umesh S S</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-blue-400 font-mono block">Afternoon: 01:15 – 02:45 PM</span>
                    <span className="font-bold text-white">Software Engineering (23CIPC206)</span>
                    <span className="text-[11px] text-slate-400 block">Faculty: Mr. Vikram</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            PAGE 4: WORKLOAD & ANALYTICS
        ========================================================================= */}
        {activePage === 'analytics' && (
          <div className="space-y-5 animate-page-enter">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white">Weekly Workload Distribution</h3>
                <p className="text-xs text-slate-400">Class hours vs. Personal study vs. Auto-allocated exam prep</p>
              </div>

              {/* Day Distribution Bars */}
              <div className="grid grid-cols-7 gap-2.5 pt-2">
                {DAY_NAMES.map((dName, dayIdx) => {
                  const fixed = fixedSlots.filter((s) => s.day === dayIdx).reduce((a, s) => a + (s.endHour - s.startHour), 0);
                  const autoPrep = studyBlocks.filter((b) => b.day === dayIdx).reduce((a, b) => a + (b.endHour - b.startHour), 0);
                  const myStudy = customStudySlots.filter((s) => s.day === dayIdx).reduce((a, s) => a + (s.endHour - s.startHour), 0);
                  const total = fixed + autoPrep + myStudy;

                  return (
                    <div key={dayIdx} className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col items-center justify-between min-h-[180px]">
                      <span className="text-xs font-bold text-white">{dName}</span>
                      <div className="w-full flex-1 flex flex-col justify-end gap-1 py-2">
                        {myStudy > 0 && <div style={{ height: `${myStudy * 12}px` }} className="w-full bg-amber-500 rounded text-[9px] text-slate-950 font-bold flex items-center justify-center">{myStudy}h</div>}
                        {autoPrep > 0 && <div style={{ height: `${autoPrep * 12}px` }} className="w-full bg-indigo-500/80 rounded border border-dashed border-indigo-300 text-[9px] text-white font-bold flex items-center justify-center">{autoPrep}h</div>}
                        {fixed > 0 && <div style={{ height: `${fixed * 12}px` }} className="w-full bg-blue-600 rounded text-[9px] text-white font-bold flex items-center justify-center">{fixed}h</div>}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{total}h total</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Course Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {courses.slice(0, 6).map((c) => {
                const cFixed = fixedSlots.filter((s) => s.courseId === c.id).reduce((a, s) => a + (s.endHour - s.startHour), 0);
                const cPrep = studyBlocks.filter((b) => b.courseId === c.id).reduce((a, b) => a + (b.endHour - b.startHour), 0);
                const cMine = customStudySlots.filter((s) => s.courseId === c.id).reduce((a, s) => a + (s.endHour - s.startHour), 0);

                return (
                  <div key={c.id} className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white">{c.id}</span>
                      <div className="text-[11px] text-slate-400 truncate max-w-[180px]">{c.name}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-white font-bold">{cFixed + cPrep + cMine}h</span>
                      <span className="text-[10px] text-slate-400 block">total</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            PAGE 5: SETTINGS & CLASS REP EXPORT
        ========================================================================= */}
        {activePage === 'settings' && (
          <div className="space-y-5 animate-page-enter">
            {/* Presets & Schedule Modes */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-indigo-400" />
                <span>Timetable Modes & Presets</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <button
                  onClick={loadMiteDefault}
                  className="p-3.5 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-950 text-left transition flex items-center justify-between"
                >
                  <div>
                    <strong className="text-white block">Regular Semester Schedule</strong>
                    <span className="text-slate-400 text-[11px]">Official MITE classes, labs and tutorials</span>
                  </div>
                  <RotateCcw className="w-4 h-4 text-indigo-400" />
                </button>

                <button
                  onClick={loadCieExamWeekPreset}
                  className="p-3.5 rounded-xl border border-amber-500/30 hover:border-amber-400 bg-slate-950 text-left transition flex items-center justify-between"
                >
                  <div>
                    <strong className="text-amber-300 block">CIE 1 Exam Week Mode</strong>
                    <span className="text-slate-400 text-[11px]">Replaces regular classes with official CIE Test 1 exams</span>
                  </div>
                  <Flame className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </div>

            {/* Class Rep WhatsApp Export */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Class Representative Cohort Export</h3>
                  <p className="text-xs text-slate-400">Copy formatted summary for WhatsApp group or JSON state</p>
                </div>
                <button
                  onClick={() => setShareModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                >
                  Open Export Window
                </button>
              </div>
            </div>

            {/* Automated Engine Verification */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Algorithm Verification Guarantee</span>
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-bold border border-emerald-500/20">
                  {clashes.length === 0 ? '0 Clashes Detected ✅' : `${clashes.length} Clashes!`}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                All 5 scheduling constraints verified: Complete hour allocation ({verificationReport.totalAllocated}h / {verificationReport.totalRequested}h), clash-free separation, pre-deadline placement, and anti-burnout limit (≤ 2 hours contiguous study).
              </p>
            </div>
          </div>
        )}
      </main>

      {/* ==================== MODAL: SCHEDULE CUSTOM STUDY SLOT ==================== */}
      {scheduleModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-slide-down">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <BookmarkCheck className="w-4 h-4 text-amber-400" />
                <span>Schedule Study Slot</span>
              </h3>
              <button onClick={() => setScheduleModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleScheduleCustomSlot} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Subject</label>
                <select
                  value={newCustomSlot.courseId}
                  onChange={(e) => setNewCustomSlot({ ...newCustomSlot, courseId: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-2 text-white"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.id} — {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Study Goal / Topic</label>
                <input
                  type="text"
                  placeholder="e.g. Maths Unit 2 Fourier Series, DSA BST Trees..."
                  value={newCustomSlot.title}
                  onChange={(e) => setNewCustomSlot({ ...newCustomSlot, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-2 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-300 mb-1">Day</label>
                  <select
                    value={newCustomSlot.day}
                    onChange={(e) => setNewCustomSlot({ ...newCustomSlot, day: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-2 text-white"
                  >
                    {DAY_FULL_NAMES.map((d, i) => (
                      <option key={i} value={i}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Start</label>
                  <select
                    value={newCustomSlot.startHour}
                    onChange={(e) => setNewCustomSlot({ ...newCustomSlot, startHour: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-2 text-white"
                  >
                    {calendarHours.map((h) => (
                      <option key={h} value={h}>
                        {formatHourShort(h)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">End</label>
                  <select
                    value={newCustomSlot.endHour}
                    onChange={(e) => setNewCustomSlot({ ...newCustomSlot, endHour: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-2 text-white"
                  >
                    {calendarHours
                      .filter((h) => h > newCustomSlot.startHour)
                      .concat([maxHour])
                      .map((h) => (
                        <option key={h} value={h}>
                          {formatHourShort(h)}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Checklist / Notes (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Tasks to finish..."
                  value={newCustomSlot.notes}
                  onChange={(e) => setNewCustomSlot({ ...newCustomSlot, notes: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                />
              </div>

              {calendarEvents.some(
                (ev) =>
                  ev.day === Number(newCustomSlot.day) &&
                  ev.startHour < Number(newCustomSlot.endHour) &&
                  Number(newCustomSlot.startHour) < ev.endHour
              ) && (
                <div className="p-2 rounded-lg bg-amber-950/40 border border-amber-500/40 text-amber-300 text-[11px] flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>Notice: Another session already exists at this time.</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setScheduleModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  Save Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL: CLASS REP EXPORT ==================== */}
      {shareModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-5 shadow-2xl space-y-4 animate-slide-down">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-indigo-400" />
                <span>Class Rep Export Snapshot</span>
              </h3>
              <button onClick={() => setShareModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 max-h-56 overflow-y-auto">
              {`🏫 MITE CS&E (AIML) III Sem Timetable & CIE 1 Schedule\n` +
                `Classroom: LH - P302 | Advisor: Dr. Yogeesha C B\n\n` +
                `ASSIGNMENT:\n• 23BSCI201 Maths III: ABA 1 Due 21.11.2026 (50 Marks) - Dr. Ramya S\n\n` +
                `CIE TEST 1 SCHEDULE:\n` +
                `• 31-10-2026 Sat: 09:15-10:45 AM (Maths III) | 01:15-02:45 PM (DSA)\n` +
                `• 02-11-2026 Mon: 09:15-10:45 AM (CO) | 01:15-02:45 PM (DSD)\n` +
                `• 03-11-2026 Tue: 09:15-10:45 AM (UHV) | 01:15-02:45 PM (SE)\n\n` +
                verificationReport.asciiGrid}
            </pre>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() =>
                  handleCopyText(
                    `MITE CS&E (AIML) III Sem Timetable\n\nASSIGNMENT:\n• 23BSCI201 Maths III: ABA 1 Due 21.11.2026 (50 Marks)\n\nCIE TEST 1:\n• 31-10 Sat: Maths III & DSA\n• 02-11 Mon: CO & DSD\n• 03-11 Tue: UHV & SE\n\n` +
                      verificationReport.asciiGrid,
                    'export-text'
                  )
                }
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 flex items-center gap-1.5"
              >
                {copiedType === 'export-text' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy for WhatsApp</span>
              </button>

              <button
                onClick={() =>
                  handleCopyText(
                    JSON.stringify({ courses, fixedSlots, deadlines, studyBlocks, customStudySlots }, null, 2),
                    'export-json'
                  )
                }
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white flex items-center gap-1.5"
              >
                {copiedType === 'export-json' ? <Check className="w-3.5 h-3.5 text-white" /> : <Code2 className="w-3.5 h-3.5" />}
                <span>Copy JSON</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
