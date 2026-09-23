import { normalizedPublicAssets } from '@/lib/assets';
import type { AiReceptionistScenarioId, AiReceptionistStaffId } from '@/content/types';

export type AiCallSpeaker = 'AI' | 'CUSTOMER';

export type AiCallTurnId =
  | 'T01'
  | 'T02'
  | 'T03'
  | 'T04'
  | 'T05'
  | 'T06'
  | 'T07'
  | 'T08'
  | 'T09'
  | 'T10'
  | 'T11'
  | 'T12'
  | 'T13'
  | 'T14'
  | 'T15'
  | 'T16'
  | 'T17'
  | 'T18'
  | 'T19'
  | 'T20';

export type AiCallSlot1300State = 'idle' | 'available' | 'selected' | 'draft' | 'booked';
export type AiCallNotesState = 'idle' | 'asking' | 'none';
export type AiCallFocusBand = 'idle' | 'morning' | 'afternoon';

export interface AiCallTurn {
  readonly id: AiCallTurnId;
  readonly speaker: AiCallSpeaker;
  readonly start: number;
  readonly end: number;
  readonly text: string;
}

export interface AiCallCue {
  readonly index: number;
  readonly speaker: AiCallSpeaker;
  readonly start: number;
  readonly end: number;
  readonly text: string;
  readonly turnId: AiCallTurnId;
}

export interface AiCallCalendarSlot {
  readonly id: string;
  readonly label: string;
  readonly minutes: number;
  readonly band: 'morning' | 'afternoon';
  readonly highlightable?: boolean;
  readonly bookable?: boolean;
}

export interface AiCallCalendarState {
  readonly open: boolean;
  readonly serviceLocked: boolean;
  readonly staffPreferenceAny: boolean;
  readonly firstVisit: boolean;
  readonly dateSelected: boolean;
  readonly checking: boolean;
  readonly asap: boolean;
  readonly morningHighlight: boolean;
  readonly morningDim: boolean;
  readonly afternoonFocus: boolean;
  readonly showTransfer: boolean;
  readonly showNameField: boolean;
  readonly clientName: string;
  readonly notes: AiCallNotesState;
  readonly slot1300: AiCallSlot1300State;
  readonly callComplete: boolean;
  readonly focusBand: AiCallFocusBand;
}

export interface AiCallScenarioDemo {
  readonly id: AiReceptionistScenarioId;
  readonly audioSrc: string;
  readonly waveformBars: readonly number[];
}

export const AI_CALL_VISIBLE_BUBBLE_LIMIT = 2;
const AI_CALL_FILLER_CUE_TEXT = new Set([
  'okay',
  'ok',
  'yeah',
  'yep',
  'yup',
  'nope',
  'great',
]);

export const AI_CALL_BOOKING_STAFF_ID: AiReceptionistStaffId = 'amy';
export const AI_CALL_DATE_ISO = '2026-04-29';

export const aiCallTurns: readonly AiCallTurn[] = [
  {
    id: 'T01',
    speaker: 'AI',
    start: 0.927,
    end: 4.622,
    text: "Hello, I'm the AI receptionist at Ruby Nail Spa. How can I help you today?",
  },
  {
    id: 'T02',
    speaker: 'CUSTOMER',
    start: 5.707,
    end: 7.96,
    text: 'Hi, yes, can I book a pedicure, please?',
  },
  {
    id: 'T03',
    speaker: 'AI',
    start: 9.046,
    end: 18.841,
    text: 'Let me open my calendar. Let me check that service for you. Just a second, please. Okay. Okay. Do you have a preferred staff member for your pedicure or is anyone fine?',
  },
  {
    id: 'T04',
    speaker: 'CUSTOMER',
    start: 20.469,
    end: 26.659,
    text: "Actually, no, I'm— this will be my first time. I'm coming on recommendation of my niece, Amanda Krawczyk.",
  },
  {
    id: 'T05',
    speaker: 'AI',
    start: 28.013,
    end: 29.087,
    text: 'What date would you like to come?',
  },
  {
    id: 'T06',
    speaker: 'CUSTOMER',
    start: 30.32,
    end: 31.602,
    text: 'How does tomorrow look?',
  },
  {
    id: 'T07',
    speaker: 'AI',
    start: 32.9,
    end: 43.604,
    text: "Let me quickly look into that date for you. Okay. What time tomorrow would you like for your pedicure? If you want right now or as soon as possible, say so and I'll pick the nearest available slot.",
  },
  {
    id: 'T08',
    speaker: 'CUSTOMER',
    start: 44.662,
    end: 47.642,
    text: 'As soon as possible on Tuesday— on Wednesday.',
  },
  {
    id: 'T09',
    speaker: 'AI',
    start: 48.748,
    end: 60.04,
    text: 'Let me ask for you. I found these openings tomorrow, April 29th, 9:30, 9:45, or 10:00. Would you like one of these, or do you want me to connect you to a real person?',
  },
  {
    id: 'T10',
    speaker: 'CUSTOMER',
    start: 61.421,
    end: 63.524,
    text: 'Is there anything in the afternoon tomorrow?',
  },
  {
    id: 'T11',
    speaker: 'AI',
    start: 64.231,
    end: 71.922,
    text: 'Let me check that time for you. Just to confirm, your pedicure is scheduled for April 29th, 2026 at 1:00 PM. Is that correct?',
  },
  {
    id: 'T12',
    speaker: 'CUSTOMER',
    start: 72.42,
    end: 73.656,
    text: "Okay, that's good.",
  },
  {
    id: 'T13',
    speaker: 'AI',
    start: 74.925,
    end: 79.228,
    text: 'Let me save your appointment. One moment, please. Your appointment is all set.',
  },
  {
    id: 'T14',
    speaker: 'CUSTOMER',
    start: 80.224,
    end: 81.252,
    text: 'Great. You need my name?',
  },
  {
    id: 'T15',
    speaker: 'AI',
    start: 82.231,
    end: 84.047,
    text: 'Yeah. May I have your full name for the booking?',
  },
  {
    id: 'T16',
    speaker: 'CUSTOMER',
    start: 84.962,
    end: 91.564,
    text: 'Yep. Diane. D-I-A-N-E Bond. B-O-N-D.',
  },
  {
    id: 'T17',
    speaker: 'AI',
    start: 92.994,
    end: 100.351,
    text: 'Thanks, Diane Bond. Would you like to add any notes for your pedicure appointment? For example, allergies, preferences, or special requests?',
  },
  {
    id: 'T18',
    speaker: 'CUSTOMER',
    start: 101.09,
    end: 102.6,
    text: 'Nope. That should be fine.',
  },
  {
    id: 'T19',
    speaker: 'AI',
    start: 103.837,
    end: 108.367,
    text: 'Thanks, Diane. Your pedicure is booked for April 29th at 1:00 PM. Do you need anything else?',
  },
  {
    id: 'T20',
    speaker: 'CUSTOMER',
    start: 108.479,
    end: 109.925,
    text: 'Thank you very much. Nope.',
  },
] as const;

export const aiCallCues: readonly AiCallCue[] = [
  { index: 1, speaker: 'AI', start: 0.927, end: 3.649, text: "Hello, I'm the AI receptionist at Ruby Nail Spa.", turnId: 'T01' },
  { index: 2, speaker: 'AI', start: 3.763, end: 4.622, text: 'How can I help you today?', turnId: 'T01' },
  { index: 3, speaker: 'CUSTOMER', start: 5.707, end: 7.96, text: 'Hi, yes, can I book a pedicure, please?', turnId: 'T02' },
  { index: 4, speaker: 'AI', start: 9.046, end: 9.934, text: 'Let me open my calendar.', turnId: 'T03' },
  { index: 5, speaker: 'AI', start: 11.142, end: 12.286, text: 'Let me check that service for you.', turnId: 'T03' },
  { index: 6, speaker: 'AI', start: 12.35, end: 13.284, text: 'Just a second, please.', turnId: 'T03' },
  { index: 7, speaker: 'AI', start: 13.703, end: 13.896, text: 'Okay.', turnId: 'T03' },
  { index: 8, speaker: 'AI', start: 14.347, end: 14.605, text: 'Okay.', turnId: 'T03' },
  { index: 9, speaker: 'AI', start: 15.41, end: 18.841, text: 'Do you have a preferred staff member for your pedicure or is anyone fine?', turnId: 'T03' },
  { index: 10, speaker: 'CUSTOMER', start: 20.469, end: 22.935, text: "Actually, no, I'm— this will be my first time.", turnId: 'T04' },
  { index: 11, speaker: 'CUSTOMER', start: 22.984, end: 26.659, text: "I'm coming on recommendation of my niece, Amanda Krawczyk.", turnId: 'T04' },
  { index: 12, speaker: 'AI', start: 28.013, end: 29.087, text: 'What date would you like to come?', turnId: 'T05' },
  { index: 13, speaker: 'CUSTOMER', start: 30.32, end: 31.602, text: 'How does tomorrow look?', turnId: 'T06' },
  { index: 14, speaker: 'AI', start: 32.9, end: 34.455, text: 'Let me quickly look into that date for you.', turnId: 'T07' },
  { index: 15, speaker: 'AI', start: 35.48, end: 35.704, text: 'Okay.', turnId: 'T07' },
  { index: 16, speaker: 'AI', start: 35.945, end: 37.868, text: 'What time tomorrow would you like for your pedicure?', turnId: 'T07' },
  { index: 17, speaker: 'AI', start: 38.268, end: 43.604, text: "If you want right now or as soon as possible, say so and I'll pick the nearest available slot.", turnId: 'T07' },
  { index: 18, speaker: 'CUSTOMER', start: 44.662, end: 47.642, text: 'As soon as possible on Tuesday— on Wednesday.', turnId: 'T08' },
  { index: 19, speaker: 'AI', start: 48.748, end: 49.789, text: 'Let me ask for you.', turnId: 'T09' },
  { index: 20, speaker: 'AI', start: 51.087, end: 56.267, text: 'I found these openings tomorrow, April 29th, 9:30, 9:45, or 10:00.', turnId: 'T09' },
  { index: 21, speaker: 'AI', start: 56.7, end: 60.04, text: 'Would you like one of these, or do you want me to connect you to a real person?', turnId: 'T09' },
  { index: 22, speaker: 'CUSTOMER', start: 61.421, end: 63.524, text: 'Is there anything in the afternoon tomorrow?', turnId: 'T10' },
  { index: 23, speaker: 'AI', start: 64.231, end: 65.307, text: 'Let me check that time for you.', turnId: 'T11' },
  { index: 24, speaker: 'AI', start: 66.575, end: 70.959, text: 'Just to confirm, your pedicure is scheduled for April 29th, 2026 at 1:00 PM.', turnId: 'T11' },
  { index: 25, speaker: 'AI', start: 71.312, end: 71.922, text: 'Is that correct?', turnId: 'T11' },
  { index: 26, speaker: 'CUSTOMER', start: 72.42, end: 73.656, text: "Okay, that's good.", turnId: 'T12' },
  { index: 27, speaker: 'AI', start: 74.925, end: 75.92, text: 'Let me save your appointment.', turnId: 'T13' },
  { index: 28, speaker: 'AI', start: 76.273, end: 76.98, text: 'One moment, please.', turnId: 'T13' },
  { index: 29, speaker: 'AI', start: 78.216, end: 79.228, text: 'Your appointment is all set.', turnId: 'T13' },
  { index: 30, speaker: 'CUSTOMER', start: 80.224, end: 80.4, text: 'Great.', turnId: 'T14' },
  { index: 31, speaker: 'CUSTOMER', start: 80.448, end: 81.252, text: 'You need my name?', turnId: 'T14' },
  { index: 32, speaker: 'AI', start: 82.231, end: 82.472, text: 'Yeah.', turnId: 'T15' },
  { index: 33, speaker: 'AI', start: 82.713, end: 84.047, text: 'May I have your full name for the booking?', turnId: 'T15' },
  { index: 34, speaker: 'CUSTOMER', start: 84.962, end: 85.203, text: 'Yep.', turnId: 'T16' },
  { index: 35, speaker: 'CUSTOMER', start: 85.589, end: 86.135, text: 'Diane.', turnId: 'T16' },
  { index: 36, speaker: 'CUSTOMER', start: 86.649, end: 90.054, text: 'D-I-A-N-E Bond.', turnId: 'T16' },
  { index: 37, speaker: 'CUSTOMER', start: 90.504, end: 91.564, text: 'B-O-N-D.', turnId: 'T16' },
  { index: 38, speaker: 'AI', start: 92.994, end: 93.894, text: 'Thanks, Diane Bond.', turnId: 'T17' },
  { index: 39, speaker: 'AI', start: 94.199, end: 96.913, text: 'Would you like to add any notes for your pedicure appointment?', turnId: 'T17' },
  { index: 40, speaker: 'AI', start: 97.411, end: 100.351, text: 'For example, allergies, preferences, or special requests?', turnId: 'T17' },
  { index: 41, speaker: 'CUSTOMER', start: 101.09, end: 101.363, text: 'Nope.', turnId: 'T18' },
  { index: 42, speaker: 'CUSTOMER', start: 101.749, end: 102.6, text: 'That should be fine.', turnId: 'T18' },
  { index: 43, speaker: 'AI', start: 103.837, end: 104.351, text: 'Thanks, Diane.', turnId: 'T19' },
  { index: 44, speaker: 'AI', start: 104.785, end: 107.226, text: 'Your pedicure is booked for April 29th at 1:00 PM.', turnId: 'T19' },
  { index: 45, speaker: 'AI', start: 107.531, end: 108.367, text: 'Do you need anything else?', turnId: 'T19' },
  { index: 46, speaker: 'CUSTOMER', start: 108.479, end: 109.186, text: 'Thank you very much.', turnId: 'T20' },
  { index: 47, speaker: 'CUSTOMER', start: 109.78, end: 109.925, text: 'Nope.', turnId: 'T20' },
] as const;

export const aiCallCalendarSlots: readonly AiCallCalendarSlot[] = [
  { id: '09:00', label: '9:00 AM', minutes: 540, band: 'morning' },
  { id: '09:30', label: '9:30 AM', minutes: 570, band: 'morning', highlightable: true },
  { id: '09:45', label: '9:45 AM', minutes: 585, band: 'morning', highlightable: true },
  { id: '10:00', label: '10:00 AM', minutes: 600, band: 'morning', highlightable: true },
  { id: '12:00', label: '12:00 PM', minutes: 720, band: 'afternoon', bookable: true },
] as const;

export const aiCallStaffColumnOrder: readonly AiReceptionistStaffId[] = ['amy', 'lisa', 'mai'];

export const aiCallScenarioDemos: readonly AiCallScenarioDemo[] = [
  {
    id: 'check-current-appoinment',
    audioSrc: normalizedPublicAssets.aiReceptionist.checkCurrentAppoinment,
    waveformBars: [38, 62, 48, 76, 54, 82, 58, 72, 46, 66, 52, 78, 44, 68, 50, 74, 56, 64],
  },
  {
    id: 'confirm-address',
    audioSrc: normalizedPublicAssets.aiReceptionist.confirmAddress,
    waveformBars: [32, 52, 40, 66, 46, 74, 50, 70, 42, 60, 48, 72, 44, 64, 52, 68, 46, 58],
  },
  {
    id: 'late-appointment',
    audioSrc: normalizedPublicAssets.aiReceptionist.lateAppointment,
    waveformBars: [34, 58, 42, 70, 48, 78, 52, 74, 40, 64, 46, 72, 50, 68, 44, 76, 54, 60],
  },
  {
    id: 'rescheduling-appoinment',
    audioSrc: normalizedPublicAssets.aiReceptionist.reschedulingAppoinment,
    waveformBars: [36, 54, 44, 72, 50, 80, 56, 76, 42, 62, 48, 74, 52, 70, 46, 78, 58, 66],
  },
] as const;

const emptyCalendarState: AiCallCalendarState = {
  open: false,
  serviceLocked: false,
  staffPreferenceAny: false,
  firstVisit: false,
  dateSelected: false,
  checking: false,
  asap: false,
  morningHighlight: false,
  morningDim: false,
  afternoonFocus: false,
  showTransfer: false,
  showNameField: false,
  clientName: '',
  notes: 'idle',
  slot1300: 'idle',
  callComplete: false,
  focusBand: 'idle',
};

export function getStartedAiCallTurns(currentTime: number): readonly AiCallTurn[] {
  return aiCallTurns.filter((turn) => currentTime >= turn.start);
}

export function getVisibleAiCallTurns(currentTime: number): readonly AiCallTurn[] {
  return getStartedAiCallTurns(currentTime).slice(-AI_CALL_VISIBLE_BUBBLE_LIMIT);
}

export function getActiveAiCallTurn(currentTime: number): AiCallTurn | null {
  const started = getStartedAiCallTurns(currentTime);
  if (started.length === 0) {
    return null;
  }

  const speaking = [...started].reverse().find((turn) => currentTime <= turn.end);
  return speaking ?? started[started.length - 1] ?? null;
}

export function getSpeakingAiCallSpeaker(currentTime: number): AiCallSpeaker | null {
  const turn = aiCallTurns.find((item) => currentTime >= item.start && currentTime <= item.end);
  return turn?.speaker ?? null;
}

function isFillerAiCallCue(text: string): boolean {
  return AI_CALL_FILLER_CUE_TEXT.has(text.replace(/[.!?]/g, '').trim().toLowerCase());
}

export function getAiCallTurnDisplayText(turnId: AiCallTurnId, currentTime: number): string {
  const cues = aiCallCues.filter((cue) => cue.turnId === turnId && cue.start <= currentTime);
  const latestMeaningful = [...cues].reverse().find((cue) => !isFillerAiCallCue(cue.text));
  return latestMeaningful?.text ?? cues[cues.length - 1]?.text ?? '';
}

export function getAiCallClientName(currentTime: number): string {
  if (currentTime >= 86.649) {
    return 'Diane Bond';
  }

  if (currentTime >= 85.589) {
    return 'Diane';
  }

  return '';
}

export function getAiCallSlot1300State(currentTime: number): AiCallSlot1300State {
  if (currentTime >= 103.837) {
    return 'booked';
  }

  if (currentTime >= 74.925) {
    return 'draft';
  }

  if (currentTime >= 72.42) {
    return 'selected';
  }

  if (currentTime >= 66.575) {
    return 'available';
  }

  return 'idle';
}

export function getAiCallCalendarState(currentTime: number): AiCallCalendarState {
  if (currentTime < 5.707) {
    return emptyCalendarState;
  }

  const open = currentTime >= 9.046;
  const afternoonFocus = currentTime >= 61.421;
  const morningHighlight = currentTime >= 51.087 && !afternoonFocus;
  const slot1300 = getAiCallSlot1300State(currentTime);
  const clientName = getAiCallClientName(currentTime);

  return {
    open,
    serviceLocked: currentTime >= 5.707,
    staffPreferenceAny: currentTime >= 20.469,
    firstVisit: currentTime >= 20.469,
    dateSelected: currentTime >= 30.32,
    checking: (currentTime >= 32.9 && currentTime < 51.087) || (currentTime >= 64.231 && currentTime < 66.575),
    asap: currentTime >= 44.662,
    morningHighlight,
    morningDim: afternoonFocus,
    afternoonFocus,
    showTransfer: currentTime >= 56.7 && currentTime < 61.421,
    showNameField: currentTime >= 82.231 && currentTime < 103.837,
    clientName,
    notes: currentTime >= 101.09 ? 'none' : currentTime >= 92.994 ? 'asking' : 'idle',
    slot1300,
    callComplete: currentTime >= 108.479,
    focusBand: afternoonFocus ? 'afternoon' : currentTime >= 32.9 ? 'morning' : open ? 'morning' : 'idle',
  };
}

export function formatAiCallClock(value: number): string {
  if (!Number.isFinite(value) || value < 0) {
    return '0:00';
  }

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
