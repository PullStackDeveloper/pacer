import { describe, expect, it } from 'bun:test';
import { MAX_LENGTH, normalize, validateCommitMessage } from './commit-msg';

describe('validateCommitMessage', () => {
  it.each([
    'feat(api): add health endpoint',
    'fix: handle empty csv',
    'chore!: drop legacy scripts',
    'refactor(web)!: rename routes',
    'docs: explain setup\n\nAdds the local setup steps.',
    'Merge branch main into feature',
    'Revert "feat: add x"\n\nThis reverts commit abc123.',
  ])('accepts %p', (message) => {
    expect(validateCommitMessage(message)).toEqual([]);
  });

  it.each([
    ['', 'message is empty'],
    ['added stuff', 'header must be'],
    ['feature: add x', 'header must be'],
    ['Feat(api): uppercase type', 'header must be'],
    ['feat:missing space', 'header must be'],
    ['feat(API): uppercase scope', 'header must be'],
    ['feat: Add uppercase description', 'lowercase'],
    ['feat: add trailing period.', 'period'],
    ['feat:  add double space', 'spaces'],
    ['feat: add x\nbody without blank line', 'blank line'],
  ])('rejects %p', (message, expected) => {
    expect(validateCommitMessage(message).join(' | ')).toContain(expected);
  });

  it(`accepts exactly ${MAX_LENGTH} characters`, () => {
    const message = `feat: ${'a'.repeat(MAX_LENGTH - 'feat: '.length)}`;
    expect(message).toHaveLength(MAX_LENGTH);
    expect(validateCommitMessage(message)).toEqual([]);
  });

  it(`rejects ${MAX_LENGTH + 1} characters, counting header and body`, () => {
    const body = 'b'.repeat(MAX_LENGTH + 1 - 'feat: add x\n\n'.length);
    const message = `feat: add x\n\n${body}`;
    expect(message).toHaveLength(MAX_LENGTH + 1);
    expect(validateCommitMessage(message).join(' | ')).toContain('maximum is 150');
  });
});

describe('normalize', () => {
  it('drops comment lines and the scissors section that git discards', () => {
    const raw = [
      'fix: handle empty csv',
      '# Please enter the commit message for your changes.',
      '',
      '# ------------------------ >8 ------------------------',
      'diff --git a/x b/x',
    ].join('\n');
    expect(normalize(raw)).toBe('fix: handle empty csv');
  });
});
