/* Reusable, anonymous webinar analytics. No backend required. */
(function (root) {
    'use strict';
    const config = root.NETTECH_ANALYTICS_CONFIG || {};
    const enabled = config.enabled === true && /^phc_[a-zA-Z0-9_-]+$/.test(config.projectToken || '') &&
        ['https://eu.i.posthog.com', 'https://us.i.posthog.com'].includes(config.apiHost);
    const BINS = 100, MAX_JUMP = 2.5, SAVE_INTERVAL = 3000;
    let state = null, last = null, lastSave = 0;

    function capture(event, props) {
        if (!enabled || !root.posthog || !root.posthog.capture) return;
        root.posthog.capture(event, Object.assign({ webinar_id: state.id }, props || {}));
    }
    function initializePostHog() {
        if (!enabled) return;
        // PostHog's standard asynchronous browser snippet, loaded only when enabled.
        !function (t,e) { var o,n,p,r; e.__SV||(root.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split('.');2==o.length&&(t=t[o[0]],e=o[1]);t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))};}(p=t.createElement('script')).type='text/javascript',p.crossOrigin='anonymous',p.async=true,p.src=s.api_host.replace('.i.posthog.com','-assets.i.posthog.com')+'/static/array.js',(r=t.getElementsByTagName('script')[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a='posthog',u.people=u.people||[],Object.defineProperty(u,'toString',{configurable:true,enumerable:true,writable:true,value:function(t){var e='posthog';return 'posthog'!==a&&(e+='.'+a),t||(e+=' (stub)'),e}}),Object.defineProperty(u.people,'toString',{configurable:true,enumerable:true,writable:true,value:function(){return u.toString(1)+'.people (stub)'}}),o='init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagResult isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug'.split(' '),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(root.document,root.posthog||{});
        root.posthog.init(config.projectToken, {
            api_host: config.apiHost,
            defaults: '2026-08-30',
            cookieless_mode: 'always',
            person_profiles: 'never',
            persistence: 'memory',
            autocapture: false,
            capture_pageview: false,
            capture_pageleave: false,
            disable_session_recording: true,
            disable_surveys: true,
            advanced_disable_feature_flags: true,
            disable_external_dependency_loading: true,
            save_referrer: false,
            save_campaign_params: false,
            respect_dnt: true,
            before_send: function(event) {
                if (event && event.properties) {
                    event.properties.$current_url = root.location.origin + root.location.pathname;
                    delete event.properties.$referrer;
                    delete event.properties.$initial_referrer;
                    delete event.properties.$initial_referring_domain;
                    delete event.properties.$referring_domain;
                }
                return event;
            }
        });
    }

    function blank(id, durations, coreSlides) {
        return { id, durations, coreSlides, bins: durations.map(() => []), sent: {},
            coreEnd: false, fullEnd: false };
    }
    function key() { return 'nettech_webinar_analytics_v1_' + state.id; }
    function save(force) {
        if (!enabled || !state) return;
        const now = Date.now();
        if (!force && now - lastSave < SAVE_INTERVAL) return;
        lastSave = now;
        try {
            root.localStorage.setItem(key(), JSON.stringify({
                bins: state.bins, sent: state.sent,
                coreEnd: state.coreEnd, fullEnd: state.fullEnd
            }));
        } catch (e) { /* localStorage may be blocked; tracking remains optional */ }
    }
    function restore() {
        try {
            const data = JSON.parse(root.localStorage.getItem(key()));
            if (!data || !Array.isArray(data.bins) || data.bins.length !== state.durations.length) return;
            state.bins = data.bins.map(x => Array.isArray(x) ?
                [...new Set(x.filter(n => Number.isInteger(n) && n >= 0 && n < BINS))] : []);
            state.sent = data.sent && typeof data.sent === 'object' ? data.sent : {};
            state.coreEnd = data.coreEnd === true;
            state.fullEnd = data.fullEnd === true;
        } catch (e) { /* optional storage */ }
    }
    function coverage(n) {
        let played = 0, total = 0;
        for (let i = 0; i < n; i++) {
            total += state.durations[i];
            played += state.durations[i] * state.bins[i].length / BINS;
        }
        return total ? played / total : 0;
    }
    function once(keyName, event, props) {
        if (state.sent[keyName]) return;
        state.sent[keyName] = true;
        capture(event, props);
        save(true);
    }
    function milestones() {
        const progress = coverage(state.coreSlides);
        [25, 50, 75].forEach(n => {
            if (progress >= n / 100) once('progress_' + n, 'webinar_progress', { milestone_percent: n });
        });
        if (state.coreEnd && progress >= 0.90)
            once('core_completion', 'webinar_completed', { completion_scope: 'core', threshold_percent: 90 });
        if (state.fullEnd && coverage(state.durations.length) >= 0.90)
            once('full_completion', 'webinar_full_completed', { completion_scope: 'all', threshold_percent: 90 });
    }

    function init(slides) {
        if (state || !enabled || !Array.isArray(slides) || !slides.length) return;
        const durations = slides.map(s => Number(s.duration)), core = Number(config.coreSlides);
        if (durations.some(x => !Number.isFinite(x) || x <= 0) ||
            !Number.isInteger(core) || core < 1 || core > slides.length ||
            !/^[a-zA-Z0-9_-]+$/.test(config.webinarId || '')) return;
        state = blank(config.webinarId, durations, core);
        restore();
        initializePostHog();
        capture('$pageview', { $current_url: root.location.origin + root.location.pathname });
        root.addEventListener('pagehide', () => save(true));
    }
    function begin(resume) {
        if (!state) return;
        if (!resume) {
            state = blank(state.id, state.durations, state.coreSlides);
            last = null;
            save(true);
        }
        capture(resume ? 'webinar_resumed' : 'webinar_started');
    }
    function slideChanged() {
        if (!state) return;
        last = null;
        save(true);
    }
    function stopped() { if (state) { last = null; save(true); } }
    function seeked() { if (state) last = null; }

    // Only uninterrupted, forward-playing timeline intervals earn coverage.
    // Tracks 100 fractional bins per slide rather than collecting every playback tick.
    function progressTick(slide, time, duration, playing) {
        if (!state || !playing || !Number.isInteger(slide) || slide < 1 ||
            slide > state.durations.length || !Number.isFinite(time) ||
            !Number.isFinite(duration) || duration <= 0) return;
        const sample = { slide, time, duration };
        if (!last || last.slide !== slide || last.duration !== duration) {
            last = sample;
            return;
        }
        const delta = time - last.time;
        if (delta <= 0 || delta > MAX_JUMP) {
            last = sample;
            return;
        }
        const from = Math.max(0, last.time / duration), to = Math.min(1, time / duration);
        const bins = state.bins[slide - 1];
        let changed = false;
        for (let i = Math.floor(from * BINS); i < Math.ceil(to * BINS); i++) {
            if (i < 0 || i >= BINS) continue;
            const mid = (i + 0.5) / BINS;
            if (mid >= from && mid <= to && !bins.includes(i)) {
                bins.push(i);
                changed = true;
            }
        }
        last = sample;
        if (changed) { milestones(); save(false); }
    }
    function slideEnded(slide) {
        if (!state) return;
        if (slide === state.coreSlides) state.coreEnd = true;
        if (slide === state.durations.length) {
            state.fullEnd = true;
            once('end_reached', 'webinar_end_reached');
        }
        milestones();
        stopped();
    }
    function quizAnswered(afterSlide, correct) {
        if (state) capture('webinar_quiz_answered', { quiz_after_slide: afterSlide, correct: correct === true });
    }
    function quizSkipped(afterSlide) {
        if (state) capture('webinar_quiz_skipped', { quiz_after_slide: afterSlide });
    }
    function restart() {
        if (!state) return;
        state = blank(state.id, state.durations, state.coreSlides);
        last = null;
        save(true);
        capture('webinar_started');
    }
    root.NetTechWebinarAnalytics = Object.freeze({
        init, begin, slideChanged, stopped, seeked, progressTick,
        slideEnded, quizAnswered, quizSkipped, restart
    });
})(window);
