// Category qualification only. Deliberately has no product or affiliate input.
export type FitAnswer = 'yes' | 'no' | 'unsure';
export type FitOutcome = 'ring' | 'consider' | 'watch' | 'keep';
export function qualifyRing(answers: FitAnswer[]): FitOutcome {
  if (
    answers.length !== 7 ||
    Array.from(answers).some((a) => !['yes', 'no', 'unsure'].includes(a))
  )
    throw new Error('Complete all seven questions');
  const [bed, smartwatch, traditional, recovery, screen, passive, charging] =
    answers;
  if (screen === 'yes') return 'watch';
  if (recovery === 'no' || passive === 'no') return 'keep';
  const motivation =
    (bed === 'yes' ? 2 : 0) +
    (traditional === 'yes' ? 2 : 0) +
    (recovery === 'yes' ? 2 : 0) +
    (passive === 'yes' ? 2 : 0) +
    (charging === 'yes' ? 1 : 0);
  if (
    smartwatch === 'yes' &&
    bed === 'no' &&
    traditional !== 'yes' &&
    charging !== 'yes'
  )
    return 'keep';
  return motivation >= 6 && screen === 'no' && recovery === 'yes' && passive === 'yes' ? 'ring' : 'consider';
}
