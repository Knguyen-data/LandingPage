import assert from 'node:assert/strict';
import { test } from 'node:test';

import { dashbookingLandingContentByLocale } from '@/content';
import {
  AI_CALL_VISIBLE_BUBBLE_LIMIT,
  aiCallCues,
  aiCallScenarioDemos,
  aiCallTurns,
  getAiCallCalendarState,
  getAiCallClientName,
  getAiCallTurnDisplayText,
  getVisibleAiCallTurns,
} from '@/content/demo/ai-receptionist';
import { aiReceptionistPortraits } from '@/content/shared';
import { normalizedPublicAssets } from '@/lib/assets';
import { supportedLocales } from '@/lib/i18n';

test('ai receptionist content exists for every locale without a see-how-it-works cta', () => {
  for (const locale of supportedLocales) {
    const section = dashbookingLandingContentByLocale[locale].aiReceptionist;

    assert.ok(section.eyebrow.length > 0, `${locale} missing eyebrow`);
    assert.ok(section.headlineLead.length > 0, `${locale} missing headline lead`);
    assert.ok(section.headlineAccent.length > 0, `${locale} missing headline accent`);
    assert.equal(section.benefits.length, 3);
    assert.equal(section.mobileChips.length, 2);
    if (locale === 'vi') {
      assert.equal(section.costTeaser, '');
      assert.equal(section.costNote, '');
      assert.equal(section.playRealCallLabel, 'Nghe thử');
      assert.ok(section.playInvitation?.includes('cuộc hội thoại'));
    } else {
      assert.match(section.costTeaser, /1\/10/);
    }
    assert.doesNotMatch(section.playRealCallLabel, /see how it works/i);
    assert.doesNotMatch(section.playRealCallLabel, /real call/i);
    assert.doesNotMatch(section.askLinkLabel, /see how it works/i);
    assert.equal(section.staff.length, 3);
    assert.equal(section.scenarios.length, 4);
    assert.deepEqual(
      section.scenarios.map((item) => item.id),
      ['check-current-appoinment', 'confirm-address', 'late-appointment', 'rescheduling-appoinment'],
    );
  }
});

test('main call timeline has twenty turns and srt cues stay inside those turns', () => {
  assert.equal(aiCallTurns.length, 20);
  assert.equal(aiCallTurns[0]?.id, 'T01');
  assert.equal(aiCallTurns[19]?.id, 'T20');
  assert.equal(aiCallCues.length, 47);

  for (const cue of aiCallCues) {
    const turn = aiCallTurns.find((item) => item.id === cue.turnId);
    assert.ok(turn, `missing turn ${cue.turnId}`);
    assert.equal(cue.speaker, turn?.speaker);
    assert.ok(cue.start + 0.05 >= (turn?.start ?? 0));
    assert.ok(cue.end - 0.05 <= (turn?.end ?? 0));
  }
});

test('conversation window keeps two current-sentence bubbles', () => {
  assert.equal(getVisibleAiCallTurns(4).map((turn) => turn.id).join(','), 'T01');
  assert.equal(getVisibleAiCallTurns(18).map((turn) => turn.id).join(','), 'T02,T03');
  assert.equal(getVisibleAiCallTurns(50).length, AI_CALL_VISIBLE_BUBBLE_LIMIT);
  assert.deepEqual(
    getVisibleAiCallTurns(110).map((turn) => turn.id),
    ['T19', 'T20'],
  );
  assert.match(getAiCallTurnDisplayText('T01', 2), /Ruby Nail Spa/);
  assert.match(getAiCallTurnDisplayText('T01', 4.7), /How can I help you today/);
  assert.doesNotMatch(getAiCallTurnDisplayText('T01', 4.7), /Ruby Nail Spa/);
  assert.match(getAiCallTurnDisplayText('T03', 16), /preferred staff member/);
  assert.doesNotMatch(getAiCallTurnDisplayText('T03', 16), /Let me open my calendar/);
});

test('calendar stays draft until the name is captured and locks booked at final confirmation', () => {
  assert.equal(getAiCallCalendarState(8).open, false);
  assert.equal(getAiCallCalendarState(10).open, true);
  assert.equal(getAiCallCalendarState(10).serviceLocked, true);
  assert.equal(getAiCallCalendarState(21).staffPreferenceAny, true);
  assert.equal(getAiCallCalendarState(31).dateSelected, true);
  assert.equal(getAiCallCalendarState(53).morningHighlight, true);
  assert.equal(getAiCallCalendarState(62).morningDim, true);
  assert.equal(getAiCallCalendarState(68).slot1300, 'available');
  assert.equal(getAiCallCalendarState(73).slot1300, 'selected');
  assert.equal(getAiCallCalendarState(76).slot1300, 'draft');
  assert.equal(getAiCallClientName(76), '');
  assert.equal(getAiCallClientName(85.8), 'Diane');
  assert.equal(getAiCallClientName(90), 'Diane Bond');
  assert.equal(getAiCallCalendarState(90).slot1300, 'draft');
  assert.equal(getAiCallCalendarState(105).slot1300, 'booked');
  assert.equal(getAiCallCalendarState(109).callComplete, true);
});

test('section c portraits and supporting audio omit a second new-appointment card', () => {
  assert.equal(aiCallScenarioDemos.length, 4);
  assert.equal(
    aiCallScenarioDemos.some((item) => item.audioSrc === normalizedPublicAssets.aiReceptionist.newAppoinment),
    false,
  );
  assert.equal(aiReceptionistPortraits.customer, normalizedPublicAssets.aiReceptionist.customerCaller);
  assert.equal(aiReceptionistPortraits.receptionist, normalizedPublicAssets.aiReceptionist.headsetReceptionist);
  assert.ok(normalizedPublicAssets.aiReceptionist.newAppoinment.startsWith('/assets/ai-receptionist/'));
});
