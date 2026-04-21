import { describe, it, expect, beforeEach } from 'vitest';

// Simulación de la función de cambio de tema
function toggleDarkTheme(isDark) {
  if (isDark) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
}

describe('Lògica del Mode Clar/Fosc (Unitari)', () => {
  beforeEach(() => {
    document.documentElement.className = '';
    localStorage.clear();
  });

  it('Afegeix la classe .dark a l\\'arrel i es persisteix a localStorage', () => {
    toggleDarkTheme(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('Retira la classe .dark de l\\'arrel i assigna mode light a localStorage', () => {
    toggleDarkTheme(true);
    toggleDarkTheme(false);
    
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
  });
});
