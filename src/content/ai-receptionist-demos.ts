import { normalizedPublicAssets } from '@/lib/assets/normalized-public-assets';

export interface AiReceptionistDemo {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly audioSrc: string;
  readonly fallbackLabel: string;
  readonly waveformBars: readonly number[];
}

export const aiReceptionistDemos: readonly AiReceptionistDemo[] = [
  {
    id: 'check-current-appoinment',
    title: 'Check Current Appointment',
    subtitle: 'check-current-appoinment.mp3',
    audioSrc: normalizedPublicAssets.aiReceptionist.checkCurrentAppoinment,
    fallbackLabel: 'Check current appointment demo',
    waveformBars: [38, 62, 48, 76, 54, 82, 58, 72, 46, 66, 52, 78, 44, 68, 50, 74, 56, 64],
  },
  {
    id: 'confirm-address',
    title: 'Confirm Address',
    subtitle: 'confirm-address.mp3',
    audioSrc: normalizedPublicAssets.aiReceptionist.confirmAddress,
    fallbackLabel: 'Confirm address demo',
    waveformBars: [32, 52, 40, 66, 46, 74, 50, 70, 42, 60, 48, 72, 44, 64, 52, 68, 46, 58],
  },
  {
    id: 'late-appointment',
    title: 'Late Appointment',
    subtitle: 'late-appointment.mp3',
    audioSrc: normalizedPublicAssets.aiReceptionist.lateAppointment,
    fallbackLabel: 'Late appointment demo',
    waveformBars: [34, 58, 42, 70, 48, 78, 52, 74, 40, 64, 46, 72, 50, 68, 44, 76, 54, 60],
  },
  {
    id: 'new-appoinment',
    title: 'New Appointment',
    subtitle: 'new-appoinment.mp3',
    audioSrc: normalizedPublicAssets.aiReceptionist.newAppoinment,
    fallbackLabel: 'New appointment demo',
    waveformBars: [30, 46, 36, 62, 42, 70, 48, 64, 38, 56, 44, 68, 40, 60, 46, 66, 42, 52],
  },
  {
    id: 'rescheduling-appoinment',
    title: 'Rescheduling Appointment',
    subtitle: 'rescheduling-appoinment.mp3',
    audioSrc: normalizedPublicAssets.aiReceptionist.reschedulingAppoinment,
    fallbackLabel: 'Rescheduling appointment demo',
    waveformBars: [36, 54, 44, 72, 50, 80, 56, 76, 42, 62, 48, 74, 52, 70, 46, 78, 58, 66],
  },
] as const;
