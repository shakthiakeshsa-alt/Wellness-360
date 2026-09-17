// lib/scheduler.ts
import { addMinutes, format, parse } from "date-fns";

export interface StallConfig {
  id: string;
  name: string;
  codePrefix: string;
  isMandatory: boolean;
  sessionDuration: number;
  capacity: number;
  startTime: string;
  endTime: string;
}

export interface ParticipantInput {
  tempId: string;
  name: string;
  phone: string;
  selectedStallIds: string[];
}

export interface ScheduledAppointment {
  stallId: string;
  stallName: string;
  queueNumber: string;
  scheduledTime: Date;
  slotTimeStr: string;
}

export interface ParticipantScheduleResult {
  tempId: string;
  name: string;
  phone: string;
  appointments: ScheduledAppointment[];
}

export function runSchedulingEngine(
  participants: ParticipantInput[],
  stalls: StallConfig[],
  eventDate: Date = new Date()
): { schedules: ParticipantScheduleResult[] } {
  const mandatoryStalls = stalls.filter((s) => s.isMandatory);
  const mandatoryIds = new Set(mandatoryStalls.map((s) => s.id));

  const stallSlotLoad: Record<string, Record<string, number>> = {};
  stalls.forEach((s) => {
    stallSlotLoad[s.id] = {};
  });

  const baseStartTimeStr = stalls[0]?.startTime || "11:00 AM";
  const baseDateStr = format(eventDate, "yyyy-MM-dd");
  const baseDateTime = parse(`${baseDateStr} ${baseStartTimeStr}`, "yyyy-MM-dd h:mm a", new Date());

  const queueCounters: Record<string, number> = {};
  stalls.forEach((s) => {
    queueCounters[s.codePrefix] = 1;
  });

  const schedules: ParticipantScheduleResult[] = [];

  participants.forEach((p) => {
    const stallIdsSet = new Set(p.selectedStallIds);
    mandatoryIds.forEach((id) => stallIdsSet.add(id));
    const assignedStallIds = Array.from(stallIdsSet);

    const participantAppointments: ScheduledAppointment[] = [];
    let currentTime = new Date(baseDateTime);

    const participantStalls = stalls.filter((s) => assignedStallIds.includes(s.id));

    participantStalls.forEach((stall) => {
      let slotFound = false;
      let slotIterTime = new Date(currentTime);

      while (!slotFound) {
        const slotStr = format(slotIterTime, "h:mm a");
        const currentLoad = stallSlotLoad[stall.id][slotStr] || 0;

        if (currentLoad < stall.capacity) {
          stallSlotLoad[stall.id][slotStr] = currentLoad + 1;
          const num = queueCounters[stall.codePrefix]++;
          const queueNumber = `${stall.codePrefix}-${String(num).padStart(3, "0")}`;

          participantAppointments.push({
            stallId: stall.id,
            stallName: stall.name,
            queueNumber,
            scheduledTime: new Date(slotIterTime),
            slotTimeStr: slotStr,
          });

          slotFound = true;
          currentTime = addMinutes(slotIterTime, stall.sessionDuration);
        } else {
          slotIterTime = addMinutes(slotIterTime, stall.sessionDuration);
        }
      }
    });

    schedules.push({
      tempId: p.tempId,
      name: p.name,
      phone: p.phone,
      appointments: participantAppointments,
    });
  });

  return { schedules };
}
