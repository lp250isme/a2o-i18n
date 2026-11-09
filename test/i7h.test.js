import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { convertSentenceToI18n, toI18nFormat } from '../src/i7h.js';

describe('toI18nFormat', () => {
    it('compresses a word to first letter, middle count, and last letter', () => {
        assert.equal(toI18nFormat('Internationalization'), 'I18n');
        assert.equal(toI18nFormat('localization'), 'l10n');
        assert.equal(toI18nFormat('accessibility'), 'a11y');
        assert.equal(toI18nFormat('kubernetes'), 'k8s');
    });

    it('leaves words of two letters or fewer unchanged', () => {
        assert.equal(toI18nFormat(''), '');
        assert.equal(toI18nFormat('a'), 'a');
        assert.equal(toI18nFormat('is'), 'is');
        assert.equal(toI18nFormat('to'), 'to');
    });

    it('returns null and undefined unchanged', () => {
        assert.equal(toI18nFormat(null), null);
        assert.equal(toI18nFormat(undefined), undefined);
    });

    it('keeps the original case of the first and last letters', () => {
        assert.equal(toI18nFormat('The'), 'T1e');
        assert.equal(toI18nFormat('fox'), 'f1x');
    });

    it('counts every character between the ends, including digits', () => {
        assert.equal(toI18nFormat('HTML5'), 'H35');
    });
});

describe('convertSentenceToI18n', () => {
    it('returns empty, null, and undefined input unchanged', () => {
        assert.equal(convertSentenceToI18n(''), '');
        assert.equal(convertSentenceToI18n(null), null);
        assert.equal(convertSentenceToI18n(undefined), undefined);
    });

    it('converts the sample sentences used in the app', () => {
        assert.equal(
            convertSentenceToI18n('Internationalization is hard'),
            'I18n is h2d',
        );
        assert.equal(
            convertSentenceToI18n('The quick brown fox jumps over the lazy dog'),
            'T1e q3k b3n f1x j3s o2r t1e l2y d1g',
        );
        assert.equal(
            convertSentenceToI18n('Localization & Accessibility'),
            'L10n & A11y',
        );
    });

    it('preserves spaces, punctuation, and short words', () => {
        assert.equal(convertSentenceToI18n('Hello,  world!'), 'H3o,  w3d!');
        assert.equal(convertSentenceToI18n('Hello, world! (Yes.)'), 'H3o, w3d! (Y1s.)');
        assert.equal(convertSentenceToI18n('...'), '...');
        assert.equal(convertSentenceToI18n('   '), '   ');
        assert.equal(convertSentenceToI18n('foo\nbar'), 'f1o\nb1r');
    });

    it('splits on apostrophes and hyphens, which are not word characters', () => {
        assert.equal(convertSentenceToI18n("don't"), "d1n't");
        assert.equal(convertSentenceToI18n('well-known'), 'w2l-k3n');
    });

    it('leaves non-ASCII text outside word characters untouched', () => {
        assert.equal(convertSentenceToI18n('你好 world'), '你好 w3d');
    });
});
