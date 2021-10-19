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
    expect(modules[0]).toContain("import(/* webpackIgnore: true */'https://domain.tld/user.js')");
  });

  it('should not touch other modules', () => {
    expect(modules[1]).not.toContain('http');
  });
});

describe('when trying regular import', () => {
  let error;
  beforeEach(async () => {
    error = undefined;
    try {
      await compiler('../fixtures/regularImport.js', {
        imports: {
          user: 'https://domain.tld/user.js',
        },
      });
    } catch (e) {
      [error] = e;
    }
  });
  it('should write expected message', () => {
    expect(error.message).toContain('Error: Only dynamic import supported when trying to rewrite (import { logout } from \'user\';). Please see webpack-import-maps-loader/README.md');
  });
});
