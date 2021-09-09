import {
  describe, beforeEach, it, expect,
} from '@jest/globals';
import compiler from '../utils/compiler';

describe('When compiling files', () => {
  let modules;
  beforeEach(async () => {
    modules = await compiler('../fixtures/app.js', {
      imports: {
        user: 'https://domain.tld/user.js',
      },
    }).then((t) => t.toJson({ source: true }).modules.map((m) => m.source).filter((f) => !!f));
  });

  it('should replace matching imports', () => {
    expect(modules[0]).toContain("__non_webpack_require__('https://domain.tld/user.js');");
  });

  it('should not touch other modules', () => {
    expect(modules[1]).not.toContain('__non_webpack_require__');
  });
});
