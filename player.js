/* ===== LTE450 Webinar Player Engine ===== */

// ─── State ───
let currentSlide = 1;
let isPlaying = false;
let transcriptVisible = true;
let sidebarVisible = true;
let shortcutsVisible = false;
let playbackSpeed = 1;
const speedOptions = [0.75, 1, 1.25, 1.5, 2];
let speedIndex = 1;

let visitedSlides = new Set();
let quizScoreCorrect = 0;
let quizScoreTotal = 0;
let completedQuizzes = new Set();
let startTime = Date.now();

// Quiz state
let currentQuiz = null;
let currentQuestionIndex = 0;
let selectedOption = null;
let answerSubmitted = false;

// Timer for simulated playback (used when no audio files available)
let slideTimer = null;
let slideElapsed = 0;
let lastTickTime = 0;

// ─── DOM References ───
const audioPlayer = document.getElementById('audioPlayer');
const slideImage = document.getElementById('slideImage');
const slideInfo = document.getElementById('slideInfo');
const transcriptPanel = document.getElementById('transcriptPanel');
const transcriptText = document.getElementById('transcriptText');
const timelineSlider = document.getElementById('timelineSlider');
const timeDisplay = document.getElementById('timeDisplay');
const sidebarNav = document.getElementById('sidebarNav');
const sidebarProgress = document.getElementById('sidebarProgress');
const progressPercent = document.getElementById('progressPercent');
const progressSlides = document.getElementById('progressSlides');

// ─── Initialization ───
function init() {
    buildSidebar();
    computeTotalDuration();
    checkResume();
    loadSlide(1, false);
    updateTranscript();
    updateTimeline();
    setupAudioEvents();
    setupKeyboard();
    setupVolumeSlider();
    setupTimelineInteraction();

    // Preload next slide image
    preloadImage(2);
}

let totalDuration = 0;
let slideStartTimes = {};

function computeTotalDuration() {
    let cumulative = 0;
    WEBINAR_DATA.slides.forEach(s => {
        slideStartTimes[s.num] = cumulative;
        cumulative += s.duration;
    });
    totalDuration = cumulative;
    timelineSlider.max = totalDuration;
}

// ─── Sidebar ───
function buildSidebar() {
    let html = '';
    WEBINAR_DATA.sections.forEach(section => {
        const isFirst = section.slides[0] === 1;
        html += `<div class="section-group" data-section="${section.id}">
            <div class="section-header ${isFirst ? 'active expanded' : ''}" onclick="toggleSection('${section.id}')">
                <svg class="section-icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">${getSectionIcon(section.icon)}</svg>
                <span>${section.name}</span>
                <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </div>
            <div class="section-slides ${isFirst ? 'expanded' : ''}">`;
        section.slides.forEach(slideNum => {
            const slideData = WEBINAR_DATA.slides[slideNum - 1];
            html += `<div class="slide-item ${slideNum === 1 ? 'active' : ''}" data-slide="${slideNum}" onclick="goToSlide(${slideNum})">
                <span class="slide-num">${slideNum}</span>
                <span class="slide-label" title="${slideData.title}">${slideData.title}</span>
            </div>`;
        });
        html += '</div></div>';
    });
    sidebarNav.innerHTML = html;
}

function getSectionIcon(name) {
    const icons = {
        'play-circle': '<circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon>',
        'target': '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>',
        'shield': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>',
        'check-circle': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>',
        'lock': '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>',
        'trending-up': '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>',
        'server': '<rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line>',
        'smartphone': '<rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>',
        'settings': '<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>',
        'layers': '<polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>',
        'briefcase': '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>',
        'zap': '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>',
        'clipboard': '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>',
        'book-open': '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>',
        'award': '<circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>',
        'file-text': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line>'
    };
    return icons[name] || icons['file-text'];
}

function toggleSection(sectionId) {
    const group = document.querySelector(`[data-section="${sectionId}"]`);
    const header = group.querySelector('.section-header');
    const slides = group.querySelector('.section-slides');
    header.classList.toggle('expanded');
    slides.classList.toggle('expanded');
}

function updateSidebar() {
    // Update active slide
    document.querySelectorAll('.slide-item').forEach(el => {
        const n = parseInt(el.dataset.slide);
        el.classList.remove('active');
        if (n === currentSlide) el.classList.add('active');
        if (visitedSlides.has(n) && n !== currentSlide) {
            el.classList.add('completed');
        }
    });

    // Expand section containing current slide
    WEBINAR_DATA.sections.forEach(section => {
        const group = document.querySelector(`[data-section="${section.id}"]`);
        const header = group.querySelector('.section-header');
        const slides = group.querySelector('.section-slides');
        if (section.slides.includes(currentSlide)) {
            header.classList.add('active', 'expanded');
            slides.classList.add('expanded');
        } else {
            header.classList.remove('active');
        }
    });

    // Update progress
    const pct = Math.round((visitedSlides.size / WEBINAR_DATA.totalSlides) * 100);
    progressPercent.textContent = pct + '% complete';
    progressSlides.textContent = visitedSlides.size + ' / ' + WEBINAR_DATA.totalSlides;
    sidebarProgress.style.width = pct + '%';

    // Scroll active slide into view in sidebar
    const activeItem = document.querySelector('.slide-item.active');
    if (activeItem) {
        activeItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
}

// ─── Slide Loading ───
function loadSlide(num, animate = true) {
    if (num < 1 || num > WEBINAR_DATA.totalSlides) return;

    // Stop current playback timer
    stopSlideTimer();

    currentSlide = num;
    visitedSlides.add(num);
    slideElapsed = 0;

    // Update image
    if (animate) slideImage.classList.add('loading');
    slideImage.src = `slides/Slide${num}.PNG`;
    slideImage.alt = `Slide ${num}`;
    slideImage.onload = () => slideImage.classList.remove('loading');

    // Update info bar
    const slideData = WEBINAR_DATA.slides[num - 1];
    slideInfo.innerHTML = `<span>${num} / ${WEBINAR_DATA.totalSlides}</span> ${slideData.title}`;

    // Update navigation buttons
    document.getElementById('btnPrev').disabled = (num === 1);
    document.getElementById('btnPrevSlide').disabled = (num === 1);
    document.getElementById('btnNext').disabled = (num === WEBINAR_DATA.totalSlides);
    document.getElementById('btnNextSlide').disabled = (num === WEBINAR_DATA.totalSlides);

    updateTranscript();
    updateSidebar();
    updateTimeline();
    saveProgress();

    // Load audio for this slide
    loadAudio(num);

    // Preload next
    if (num < WEBINAR_DATA.totalSlides) preloadImage(num + 1);
}

function preloadImage(num) {
    if (num >= 1 && num <= WEBINAR_DATA.totalSlides) {
        const img = new Image();
        img.src = `slides/Slide${num}.PNG`;
    }
}

// ─── Audio ───
let audioAvailable = false;

function loadAudio(num) {
    audioPlayer.pause();
    audioPlayer.src = `audio/slide${num}.mp3`;
    audioPlayer.playbackRate = playbackSpeed;
    audioPlayer.load();

    // Test if audio file exists
    audioAvailable = false;
    audioPlayer.oncanplaythrough = function() {
        audioAvailable = true;
        if (isPlaying) {
            audioPlayer.play().catch(() => {});
        }
    };

    audioPlayer.onerror = function() {
        audioAvailable = false;
        // Use timer-based fallback if no audio
        if (isPlaying) startSlideTimer();
    };
}

function setupAudioEvents() {
    audioPlayer.addEventListener('ended', onSlideEnd);
    audioPlayer.addEventListener('timeupdate', () => {
        if (audioAvailable) {
            slideElapsed = audioPlayer.currentTime;
            updateTimeline();
        }
    });
}

function onSlideEnd() {
    // Check if we need to show a quiz
    const quiz = WEBINAR_DATA.quizzes.find(q => q.afterSlide === currentSlide && !completedQuizzes.has(q.afterSlide));
    if (quiz) {
        pausePlayback();
        showQuiz(quiz);
        return;
    }

    // Advance to next slide
    if (currentSlide < WEBINAR_DATA.totalSlides) {
        loadSlide(currentSlide + 1);
        if (isPlaying) {
            // Auto-play will be triggered by loadAudio
        }
    } else {
        // Webinar complete
        pausePlayback();
        showCompletion();
    }
}

// ─── Timer-based fallback (when no audio files) ───
function startSlideTimer() {
    stopSlideTimer();
    lastTickTime = Date.now();
    slideTimer = setInterval(() => {
        const now = Date.now();
        const delta = (now - lastTickTime) / 1000 * playbackSpeed;
        lastTickTime = now;
        slideElapsed += delta;

        const slideDuration = WEBINAR_DATA.slides[currentSlide - 1].duration;
        updateTimeline();

        if (slideElapsed >= slideDuration) {
            stopSlideTimer();
            onSlideEnd();
        }
    }, 100);
}

function stopSlideTimer() {
    if (slideTimer) {
        clearInterval(slideTimer);
        slideTimer = null;
    }
}

// ─── Playback Controls ───
function togglePlay() {
    if (isPlaying) {
        pausePlayback();
    } else {
        startPlayback();
    }
}

function startPlayback() {
    isPlaying = true;
    document.getElementById('iconPlay').style.display = 'none';
    document.getElementById('iconPause').style.display = 'block';

    if (audioAvailable) {
        audioPlayer.play().catch(() => {
            // Fallback to timer
            startSlideTimer();
        });
    } else {
        startSlideTimer();
    }
}

function pausePlayback() {
    isPlaying = false;
    document.getElementById('iconPlay').style.display = 'block';
    document.getElementById('iconPause').style.display = 'none';

    audioPlayer.pause();
    stopSlideTimer();
}

function nextSlide() {
    if (currentSlide < WEBINAR_DATA.totalSlides) {
        loadSlide(currentSlide + 1);
    }
}

function prevSlide() {
    if (currentSlide > 1) {
        loadSlide(currentSlide - 1);
    }
}

function goToSlide(num) {
    loadSlide(num);
}

function rewind10() {
    if (audioAvailable && audioPlayer.duration) {
        audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 10);
    } else {
        slideElapsed = Math.max(0, slideElapsed - 10);
        updateTimeline();
    }
}

function forward10() {
    const dur = WEBINAR_DATA.slides[currentSlide - 1].duration;
    if (audioAvailable && audioPlayer.duration) {
        const newTime = audioPlayer.currentTime + 10;
        if (newTime >= audioPlayer.duration) {
            onSlideEnd();
        } else {
            audioPlayer.currentTime = newTime;
        }
    } else {
        slideElapsed += 10;
        if (slideElapsed >= dur) {
            onSlideEnd();
        }
        updateTimeline();
    }
}

// ─── Speed ───
function cycleSpeed() {
    speedIndex = (speedIndex + 1) % speedOptions.length;
    playbackSpeed = speedOptions[speedIndex];
    audioPlayer.playbackRate = playbackSpeed;
    document.getElementById('btnSpeed').textContent = playbackSpeed + 'x';
    showToast('Playback speed: ' + playbackSpeed + 'x');
}

function speedUp() {
    if (speedIndex < speedOptions.length - 1) {
        speedIndex++;
        playbackSpeed = speedOptions[speedIndex];
        audioPlayer.playbackRate = playbackSpeed;
        document.getElementById('btnSpeed').textContent = playbackSpeed + 'x';
        showToast('Speed: ' + playbackSpeed + 'x');
    }
}

function speedDown() {
    if (speedIndex > 0) {
        speedIndex--;
        playbackSpeed = speedOptions[speedIndex];
        audioPlayer.playbackRate = playbackSpeed;
        document.getElementById('btnSpeed').textContent = playbackSpeed + 'x';
        showToast('Speed: ' + playbackSpeed + 'x');
    }
}

// ─── Volume ───
function setupVolumeSlider() {
    const slider = document.getElementById('volumeSlider');
    slider.addEventListener('input', () => {
        audioPlayer.volume = parseFloat(slider.value);
        updateMuteIcon();
    });
}

function toggleMute() {
    audioPlayer.muted = !audioPlayer.muted;
    updateMuteIcon();
}

function updateMuteIcon() {
    const btn = document.getElementById('btnMute');
    const vol = audioPlayer.muted ? 0 : audioPlayer.volume;
    let icon;
    if (vol === 0) {
        icon = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>';
    } else if (vol < 0.5) {
        icon = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>';
    } else {
        icon = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>';
    }
    btn.innerHTML = `<svg class="icon-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">${icon}</svg>`;
}

// ─── Timeline ───
function setupTimelineInteraction() {
    timelineSlider.addEventListener('input', () => {
        const targetTime = parseInt(timelineSlider.value);
        seekToGlobalTime(targetTime);
    });
}

function seekToGlobalTime(seconds) {
    // Find which slide this time falls into
    for (let i = WEBINAR_DATA.slides.length - 1; i >= 0; i--) {
        const s = WEBINAR_DATA.slides[i];
        if (seconds >= slideStartTimes[s.num]) {
            const offset = seconds - slideStartTimes[s.num];
            if (s.num !== currentSlide) {
                loadSlide(s.num, false);
            }
            slideElapsed = Math.min(offset, s.duration);
            if (audioAvailable && audioPlayer.duration) {
                audioPlayer.currentTime = slideElapsed;
            }
            updateTimeline();
            break;
        }
    }
}

function updateTimeline() {
    const globalTime = (slideStartTimes[currentSlide] || 0) + slideElapsed;
    timelineSlider.value = globalTime;

    const current = formatTime(globalTime);
    const total = formatTime(totalDuration);
    timeDisplay.textContent = `${current} / ${total}`;

    // Update slider background for progress visualization
    const pct = (globalTime / totalDuration) * 100;
    timelineSlider.style.background = `linear-gradient(to right, #f59e0b ${pct}%, #1a2236 ${pct}%)`;
}

function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}

// ─── Transcript ───
function updateTranscript() {
    const text = WEBINAR_DATA.transcripts[currentSlide] || '';
    transcriptText.textContent = text;
}

function toggleTranscript() {
    transcriptVisible = !transcriptVisible;
    transcriptPanel.classList.toggle('visible', transcriptVisible);
    document.getElementById('btnTranscript').classList.toggle('active', transcriptVisible);
}

// ─── Sidebar Toggle ───
function toggleSidebar() {
    sidebarVisible = !sidebarVisible;
    document.getElementById('sidebar').classList.toggle('collapsed', !sidebarVisible);
}

// ─── Fullscreen ───
function toggleFullscreen() {
    const container = document.getElementById('webinarContainer');
    if (!document.fullscreenElement) {
        container.requestFullscreen().catch(() => {});
    } else {
        document.exitFullscreen();
    }
}

// ─── Shortcuts ───
function toggleShortcuts() {
    shortcutsVisible = !shortcutsVisible;
    document.getElementById('shortcutsTooltip').classList.toggle('visible', shortcutsVisible);
    document.getElementById('btnShortcuts').classList.toggle('active', shortcutsVisible);
}

// ─── Keyboard ───
function setupKeyboard() {
    document.addEventListener('keydown', (e) => {
        // Don't capture if quiz is open and user is interacting
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        switch (e.code) {
            case 'Space':
                e.preventDefault();
                togglePlay();
                break;
            case 'ArrowRight':
                e.preventDefault();
                nextSlide();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                prevSlide();
                break;
            case 'KeyJ':
                rewind10();
                break;
            case 'KeyL':
                forward10();
                break;
            case 'KeyM':
                toggleMute();
                break;
            case 'KeyT':
                toggleTranscript();
                break;
            case 'KeyS':
                toggleSidebar();
                break;
            case 'KeyF':
                toggleFullscreen();
                break;
            case 'Period':
                if (e.shiftKey) speedUp();
                break;
            case 'Comma':
                if (e.shiftKey) speedDown();
                break;
            case 'Escape':
                if (shortcutsVisible) toggleShortcuts();
                break;
        }
    });
}

// ─── Quiz System ───
function showQuiz(quiz) {
    currentQuiz = quiz;
    currentQuestionIndex = 0;
    document.getElementById('quizTitle').textContent = quiz.title;
    document.getElementById('quizOverlay').classList.add('active');
    loadQuizQuestion();
}

function loadQuizQuestion() {
    const q = currentQuiz.questions[currentQuestionIndex];
    const total = currentQuiz.questions.length;
    const modalEl = document.getElementById('quizModal');

    document.getElementById('quizCounter').textContent = `Question ${currentQuestionIndex + 1} of ${total}`;
    document.getElementById('quizQuestion').textContent = q.question;
    document.getElementById('quizExplanation').classList.remove('visible');
    document.getElementById('quizExplanation').textContent = '';
    if (modalEl) modalEl.scrollTop = 0;

    selectedOption = null;
    answerSubmitted = false;

    // Reset buttons
    document.getElementById('btnSubmitQuiz').style.display = 'inline-flex';
    document.getElementById('btnSubmitQuiz').disabled = true;
    document.getElementById('btnNextQuestion').style.display = 'none';
    document.getElementById('btnContinueQuiz').style.display = 'none';
    document.getElementById('btnSkipQuiz').style.display = 'inline-flex';

    // Build options
    const letters = ['A', 'B', 'C', 'D'];
    let html = '';
    q.options.forEach((opt, i) => {
        html += `<div class="quiz-option" data-index="${i}" onclick="selectQuizOption(${i})">
            <span class="option-letter">${letters[i]}</span>
            <span>${opt}</span>
        </div>`;
    });
    document.getElementById('quizOptions').innerHTML = html;
}

function selectQuizOption(index) {
    if (answerSubmitted) return;
    selectedOption = index;

    document.querySelectorAll('.quiz-option').forEach(el => {
        el.classList.remove('selected');
    });
    document.querySelector(`.quiz-option[data-index="${index}"]`).classList.add('selected');
    document.getElementById('btnSubmitQuiz').disabled = false;
}

function submitQuizAnswer() {
    if (selectedOption === null || answerSubmitted) return;
    answerSubmitted = true;

    const q = currentQuiz.questions[currentQuestionIndex];
    const isCorrect = selectedOption === q.correct;

    quizScoreTotal++;
    if (isCorrect) quizScoreCorrect++;

    // Show correct/incorrect
    document.querySelectorAll('.quiz-option').forEach(el => {
        const idx = parseInt(el.dataset.index);
        if (idx === q.correct) el.classList.add('correct');
        if (idx === selectedOption && !isCorrect) el.classList.add('incorrect');
    });

    // Show explanation
    const expEl = document.getElementById('quizExplanation');
    expEl.textContent = (isCorrect ? 'Correct! ' : 'Not quite. ') + q.explanation;
    expEl.classList.add('visible');

    // Update buttons
    document.getElementById('btnSubmitQuiz').style.display = 'none';
    document.getElementById('btnSkipQuiz').style.display = 'none';

    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
        document.getElementById('btnNextQuestion').style.display = 'inline-flex';
    } else {
        document.getElementById('btnContinueQuiz').style.display = 'inline-flex';
    }

    keepQuizActionVisible();
}

function keepQuizActionVisible() {
    const actionButton = currentQuestionIndex < currentQuiz.questions.length - 1
        ? document.getElementById('btnNextQuestion')
        : document.getElementById('btnContinueQuiz');

    if (!actionButton) return;

    requestAnimationFrame(() => {
        actionButton.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        try {
            actionButton.focus({ preventScroll: true });
        } catch (error) {
            actionButton.focus();
        }
    });
}

function nextQuizQuestion() {
    currentQuestionIndex++;
    loadQuizQuestion();
}

function skipQuiz() {
    completedQuizzes.add(currentQuiz.afterSlide);
    closeQuiz();
}

function closeQuiz() {
    completedQuizzes.add(currentQuiz.afterSlide);
    document.getElementById('quizOverlay').classList.remove('active');
    currentQuiz = null;

    // Continue to next slide
    if (currentSlide < WEBINAR_DATA.totalSlides) {
        loadSlide(currentSlide + 1);
        if (isPlaying) {
            // Playback continues automatically
        } else {
            startPlayback();
        }
    }
}

// ─── Completion ───
function showCompletion() {
    document.getElementById('statSlides').textContent = visitedSlides.size;
    document.getElementById('statQuiz').textContent = quizScoreCorrect + '/' + quizScoreTotal;

    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById('statTime').textContent = formatTime(elapsed);

    document.getElementById('completionOverlay').classList.add('active');

    // Clear saved progress
    localStorage.removeItem('lte450_webinar_progress');
}

function restartWebinar() {
    document.getElementById('completionOverlay').classList.remove('active');
    visitedSlides.clear();
    quizScoreCorrect = 0;
    quizScoreTotal = 0;
    completedQuizzes.clear();
    startTime = Date.now();
    loadSlide(1);
}

function downloadCertificate() {
    const text = `LTE450 for Critical Communications - Webinar Completion Summary
${'='.repeat(60)}

Completed: ${new Date().toLocaleDateString()}
Slides Viewed: ${visitedSlides.size} / ${WEBINAR_DATA.totalSlides}
Quiz Score: ${quizScoreCorrect} / ${quizScoreTotal}

Key Topics Covered:
- Why 450 MHz matters for critical communications
- Mission Critical Voice (MCPTT), Data, and Video services
- Network architecture, resilience, and security
- Spectrum, standards, and interoperability
- Deployment roadmaps, business models, and funding
- Future evolution and 5G interplay

Next Steps:
1. Assess spectrum availability in your region
2. Engage with 450 Alliance partners
3. Plan a pilot deployment
4. Define funding and procurement strategy

For more information: www.450alliance.org
`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'LTE450_Webinar_Summary.txt';
    a.click();
    URL.revokeObjectURL(url);
}

function downloadResources() {
    showToast('Download: Use the voice_script.txt and slide_timing.csv in the webinar folder for reference materials.');
}

// ─── Progress Persistence ───
function saveProgress() {
    const data = {
        slide: currentSlide,
        visited: Array.from(visitedSlides),
        quizCorrect: quizScoreCorrect,
        quizTotal: quizScoreTotal,
        completedQuizzes: Array.from(completedQuizzes),
        timestamp: Date.now()
    };
    try {
        localStorage.setItem('lte450_webinar_progress', JSON.stringify(data));
    } catch (e) { /* localStorage unavailable */ }
}

function checkResume() {
    try {
        const saved = localStorage.getItem('lte450_webinar_progress');
        if (saved) {
            const data = JSON.parse(saved);
            if (data.slide && data.slide > 1) {
                document.getElementById('resumePrompt').style.display = 'block';
                document.getElementById('resumeSlide').textContent = data.slide;
            }
        }
    } catch (e) { /* ignore */ }
}

function loadSavedProgress() {
    try {
        const saved = localStorage.getItem('lte450_webinar_progress');
        if (saved) {
            const data = JSON.parse(saved);
            visitedSlides = new Set(data.visited || []);
            quizScoreCorrect = data.quizCorrect || 0;
            quizScoreTotal = data.quizTotal || 0;
            completedQuizzes = new Set(data.completedQuizzes || []);
            return data.slide || 1;
        }
    } catch (e) { /* ignore */ }
    return 1;
}

// ─── Welcome / Start ───
function startWebinar() {
    const overlay = document.getElementById('welcomeOverlay');
    overlay.classList.add('hiding');
    setTimeout(() => { overlay.style.display = 'none'; }, 500);

    // Enable transcript by default
    transcriptPanel.classList.add('visible');
    document.getElementById('btnTranscript').classList.add('active');

    // Auto-play first slide
    setTimeout(() => startPlayback(), 600);
}

function resumeWebinar() {
    const slideNum = loadSavedProgress();
    const overlay = document.getElementById('welcomeOverlay');
    overlay.classList.add('hiding');
    setTimeout(() => { overlay.style.display = 'none'; }, 500);

    transcriptPanel.classList.add('visible');
    document.getElementById('btnTranscript').classList.add('active');

    setTimeout(() => {
        loadSlide(slideNum);
        startPlayback();
    }, 600);
}

// ─── Toast ───
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 3000);
}

// ─── Initialize ───
document.addEventListener('DOMContentLoaded', init);
