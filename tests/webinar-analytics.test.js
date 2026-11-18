/* Run: node --test tests/webinar-analytics.test.js (Node 18+) */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '..', 'webinar-analytics.js'), 'utf8');
function fixture(enabled = true, storage = new Map()) {
    const events = [];
    const posthog = {
        __SV: 1,
        init: function (_token, config) { this.config = config; },
        capture: (event, props) => events.push({ event, props })
    };
    const window = {
        NETTECH_ANALYTICS_CONFIG: {
            enabled, projectToken: 'phc_test', apiHost: 'https://eu.i.posthog.com',
            webinarId: 'lte450_part1', coreSlides: 2
        },
        posthog,
        location: { origin: 'https://example.com', pathname: '/webinar/' },
        localStorage: {
            getItem: key => storage.get(key) || null,
            setItem: (key, value) => storage.set(key, value)
        },
        addEventListener: () => {}
    };
    vm.runInNewContext(source, { window });
    const analytics = window.NetTechWebinarAnalytics;
    analytics.init([{duration: 10}, {duration: 10}, {duration: 10}]);
    return { analytics, events, posthog, storage };
}
function play(a, slide) {
    a.slideChanged();
    for (let t = 0; t < 10; t += 0.2) a.progressTick(slide, t, 10, true);
    a.progressTick(slide, 10, 10, true);
}
const count = (events, event) => events.filter(e => e.event === event).length;

test('disabled configuration records no events or local state', () => {
    const { analytics: a, events, storage } = fixture(false);
    a.begin(false);
    a.progressTick(1, 2, 10, true);
    assert.equal(events.length, 0);
    assert.equal(storage.size, 0);
});
test('anonymous pageview, milestones and real core completion', () => {
    const { analytics: a, events, posthog } = fixture();
    a.begin(false);
    play(a, 1); play(a, 2);
    assert.equal(count(events, 'webinar_completed'), 0);
    a.slideEnded(2);
    assert.equal(count(events, '$pageview'), 1);
    assert.equal(count(events, 'webinar_started'), 1);
    assert.deepEqual(events.filter(e => e.event === 'webinar_progress').map(e => e.props.milestone_percent), [25, 50, 75]);
    assert.equal(count(events, 'webinar_completed'), 1);
    assert.equal(posthog.config.cookieless_mode, 'always');
    assert.equal(posthog.config.person_profiles, 'never');
    assert.equal(posthog.config.autocapture, false);
    assert.equal(posthog.config.disable_session_recording, true);
});
test('seeking to end does not count completion', () => {
    const { analytics: a, events } = fixture();
    a.begin(false); a.progressTick(2, 0, 10, true);
    a.seeked(); a.progressTick(2, 9.9, 10, true);
    a.progressTick(2, 10, 10, true);
    a.slideEnded(2);
    a.slideEnded(3);
    assert.equal(count(events, 'webinar_completed'), 0);
    assert.equal(count(events, 'webinar_full_completed'), 0);
    assert.equal(count(events, 'webinar_end_reached'), 1);
});
test('repeated slide completion does not duplicate events; restart begins new run', () => {
    const { analytics: a, events } = fixture();
    a.begin(false); play(a, 1); play(a, 2);
    a.slideEnded(2); a.slideEnded(2);
    assert.equal(count(events, 'webinar_completed'), 1);
    a.restart(); play(a, 1); play(a, 2); a.slideEnded(2);
    assert.equal(count(events, 'webinar_completed'), 2);
    assert.equal(count(events, 'webinar_started'), 2);
});
test('resume uses locally saved coverage and avoids duplicate milestones', () => {
    const store = new Map(), first = fixture(true, store);
    first.analytics.begin(false); play(first.analytics, 1); first.analytics.stopped();
    const second = fixture(true, store);
    second.analytics.begin(true); play(second.analytics, 2); second.analytics.slideEnded(2);
    assert.deepEqual(second.events.filter(e => e.event === 'webinar_progress').map(e => e.props.milestone_percent), [75]);
    assert.equal(count(second.events, 'webinar_completed'), 1);
});
test('appendix playback required for full completion', () => {
    const { analytics: a, events } = fixture();
    a.begin(false); play(a, 1); play(a, 2); play(a, 3);
    a.slideEnded(2);
    assert.equal(count(events, 'webinar_full_completed'), 0);
    a.slideEnded(3);
    assert.equal(count(events, 'webinar_full_completed'), 1);
});
test('quiz events include only section and correctness', () => {
    const { analytics: a, events } = fixture();
    a.quizAnswered(7, true); a.quizSkipped(14);
    assert.equal(count(events, 'webinar_quiz_answered'), 1);
    assert.equal(count(events, 'webinar_quiz_skipped'), 1);
    assert.equal(events.find(e => e.event === 'webinar_quiz_answered').props.correct, true);
});
