import { navlist, quizzes } from "@/lib/data";
import { AuthUserRole } from "@/types/auth-user";

/**
 * Helper: converts ISO date string to epoch ms
 * Accepts ISO with timezone offsets. Returns Number (ms).
 */
function toMs(isoOrDate: Date) {
    if (isoOrDate instanceof Date) return isoOrDate.getTime();
    return new Date(isoOrDate).getTime();
}

/**
 * Determine whether a quiz is currently running at reference time `now`
 * @param {Object} quiz
 * @param {Date|String|Number} [now=new Date()]
 * @returns {boolean}
 */
function isRunning(quiz: typeof quizzes[number], now = new Date()): boolean {
    const n = toMs(now);
    const start = toMs(new Date(quiz.startAt));
    const end = toMs(new Date(quiz.endAt));
    return n >= start && n <= end;
}

/**
 * Determine whether a quiz is upcoming (starts in the future from `now`)
 * @param {Object} quiz
 * @param {Date|String|Number} [now=new Date()]
 * @returns {boolean}
 */
function isUpcoming(quiz: typeof quizzes[number], now = new Date()) {
    const n = toMs(now);
    const start = toMs(new Date(quiz.startAt));
    return start > n;
}


/**
 * Pretty-print a quiz summary
 */
function summarize(quiz: typeof quizzes[number]) {
    return {
        id: quiz.id,
        title: quiz.title,
        startAt: quiz.startAt,
        endAt: quiz.endAt,
        durationHours: Math.round((toMs(new Date(quiz.endAt)) - toMs(new Date(quiz.startAt))) / (1000 * 60 * 60) * 100) / 100,
        questions: quiz.totalQuestions,
        maxMarks: quiz.maxMarks,
    };
}

/**
 * Get page information from navlist
 * n.b. check data.ts
 * 
 * @param {string} title 
 * @param {object} role 
 * @returns 
 */
function getPageData(title: string, role: AuthUserRole) {
    return navlist[role as 'admin'].find(i => i.title.toLowerCase() === title.toLowerCase())
}


export { summarize, isRunning, isUpcoming, toMs, getPageData }