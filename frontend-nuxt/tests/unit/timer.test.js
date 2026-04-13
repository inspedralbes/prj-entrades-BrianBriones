import { describe, it, expect } from 'vitest';

function formatTimer(totalSeconds) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const s = (totalSeconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

describe('Mòdul de Càlcul de Temps de Reserva', () => {
  it('Retorna l\\'string formatat correctament en minuts i segons (mm:ss)', () => {
    expect(formatTimer(420)).toBe('07:00');
    expect(formatTimer(65)).toBe('01:05');
    expect(formatTimer(9)).toBe('00:09');
    expect(formatTimer(0)).toBe('00:00');
  });
});
