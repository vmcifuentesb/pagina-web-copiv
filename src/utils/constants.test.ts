import { describe, it, expect } from 'vitest';
import { SITE, NAV_ITEMS } from './constants';

describe('constants', () => {
  it('should have site name', () => {
    expect(SITE.name).toBe('COPIV TIKAL S.A.');
  });

  it('should have site URL', () => {
    expect(SITE.url).toBe('https://copivgt.com');
  });

  it('should have 5 nav items', () => {
    expect(NAV_ITEMS).toHaveLength(5);
  });

  it('should have Inicio as first nav item', () => {
    expect(NAV_ITEMS[0].label).toBe('Inicio');
    expect(NAV_ITEMS[0].href).toBe('/');
  });
});
