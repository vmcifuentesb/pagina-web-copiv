import { describe, it, expect } from 'vitest';

describe('types', () => {
  it('should compile without errors (type check)', () => {
    const service = {
      id: 'test',
      title: 'Test',
      category: 'physical' as const,
      categoryLabel: 'Física',
      description: 'Test',
      image: 'test.jpg',
      features: ['a', 'b'],
      ctaLabel: 'Info',
    };
    expect(service.title).toBe('Test');
    expect(service.category).toBe('physical');
  });

  it('should define QuizResult correctly', () => {
    const result = {
      score: 5,
      level: 'medium' as const,
      label: 'Medio',
      recommendations: ['Refuerce perímetros'],
    };
    expect(result.level).toBe('medium');
    expect(result.recommendations).toHaveLength(1);
  });
});
