import tailwindConfig from '../../../tailwind.config.js';
import resolveConfig from 'tailwindcss/resolveConfig';
import {describe, expect, test, beforeAll} from '@jest/globals';

describe('Tailwind CSS Configuration', () => {
  
  let css;

  beforeAll(() => {
    css = resolveConfig(tailwindConfig as any);
  });

  
  test('should have overflow-x-auto utility class', () => {
    expect(css).toHaveProperty('utilities.overflow.x.auto');
  });
  
  /*
  test('should have a specific color defined', () => {
    expect(css.theme.colors).toHaveProperty('blue.500');
  });

  test('should include custom spacing', () => {
    expect(css.theme.spacing).toHaveProperty('4');
  });

  test('should have responsive design', () => {
    expect(css.theme.screens).toHaveProperty('sm');
  });
  */
});