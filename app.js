// CSE Academic Command Center Client-Side Application Engine
import { SoundEngine } from './sound.js';
import { initialMockData } from './mockData.js';

export const sound = new SoundEngine();

export const state = {
  activeView: 'dashboard',
  summary: null,
  profile: null,
  deadlines: [],
  subjects: [],
  topics: [],
  tests: [],
  goals: [],
  sessions: [],
  pyqs: [],
  timer: {
    isRunning: false,
    mode: 'focus', // focus, short, long
    totalSeconds: 25 * 60,
    remainingSeconds: 25 * 60,
    intervalId: null,
    activeSubject: 'PCC-CS301'
  }
};

// UI Notifications
export function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  const icon = type === 'success' ? 'check_circle' : (type === 'error' ? 'error' : 'info');
  toast.innerHTML = `<span class="material-symbols-outlined text-[18px] text-primary">${icon}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'fadeOutRight 0.3s ease-out forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Storage helpers
function loadStorageData() {
  try {
    const saved = localStorage.getItem('cse_command_center_state');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('LocalStorage unavailable, using defaults');
  }
  return initialMockData;
}

export function saveStorageData() {
  try {
    const dataToSave = {
      profile: state.profile,
      summary: state.summary,
      deadlines: state.deadlines,
      subjects: state.subjects,
      topics: state.topics,
      tests: state.tests,
      goals: state.goals,
      pyqs: state.pyqs
    };
    localStorage.setItem('cse_command_center_state', JSON.stringify(dataToSave));
  } catch (e) {}
}

// Network / Fallback Fetch
async function fetchWithFallback(url, options = {}, fallbackGetter) {
  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...options
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    // Backend offline / static mode - fallback safely
  }
  return fallbackGetter();
}

// Navigation & View Routing
export function switchView(viewName) {
  state.activeView = viewName;

  document.querySelectorAll('.view-pane').forEach(pane => {
    pane.classList.add('hidden');
  });
  const targetPane = document.getElementById(`view-${viewName}`);
  if (targetPane) {
    targetPane.classList.remove('hidden');
  }

  document.querySelectorAll('[data-view-target]').forEach(link => {
    const target = link.getAttribute('data-view-target');
    if (target === viewName) {
      link.classList.add('bg-surface-container-highest', 'text-primary', 'font-semibold');
      link.classList.remove('text-on-surface-variant');
    } else {
      link.classList.remove('bg-surface-container-highest', 'text-primary', 'font-semibold');
      link.classList.add('text-on-surface-variant');
    }
  });

  closeDrawer();

  if (viewName === 'dashboard') loadDashboard();
  if (viewName === 'subjects') loadSubjectsView();
  if (viewName === 'study') loadStudyView();
  if (viewName === 'tests') loadTestsView();
  if (viewName === 'goals') loadGoalsView();
  if (viewName === 'pyq') loadPyqView();
}

export function openDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  if (drawer) drawer.classList.remove('-translate-x-full');
  if (backdrop) backdrop.classList.remove('opacity-0', 'pointer-events-none');
}

export function closeDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  if (drawer) drawer.classList.add('-translate-x-full');
  if (backdrop) backdrop.classList.add('opacity-0', 'pointer-events-none');
}

// ----------------------------------------------------
// Dashboard View Controller
// ----------------------------------------------------
export async function loadDashboard() {
  const data = await fetchWithFallback('/api/dashboard/summary', {}, () => {
    return {
      profile: state.profile || initialMockData.profile,
      summary: state.summary || initialMockData.summary,
      deadlines: state.deadlines?.length ? state.deadlines : initialMockData.deadlines,
      recent_tests: state.tests?.slice(0, 4) || initialMockData.tests.slice(0, 4),
      active_goals: state.goals?.slice(0, 4) || initialMockData.goals.slice(0, 4),
      subjects: state.subjects?.length ? state.subjects : initialMockData.subjects
    };
  });

  state.profile = data.profile;
  state.summary = data.summary;
  state.deadlines = data.deadlines;

  // Profile Header
  const prof = data.profile;
  document.querySelectorAll('.profile-name').forEach(el => el.textContent = prof.name);
  document.querySelectorAll('.profile-degree').forEach(el => el.textContent = `${prof.degree} • ${prof.institute}`);
  document.querySelectorAll('.profile-batch').forEach(el => el.textContent = `${prof.batch} • ${prof.section}`);
  const cgpaEl = document.getElementById('cgpa-display');
  if (cgpaEl) cgpaEl.textContent = Number(prof.current_cgpa).toFixed(2);
  const targetCgpaEl = document.getElementById('target-cgpa-display');
  if (targetCgpaEl) targetCgpaEl.textContent = Number(prof.target_cgpa).toFixed(2);

  if (document.getElementById('pref-name')) document.getElementById('pref-name').value = prof.name;
  if (document.getElementById('pref-cgpa')) document.getElementById('pref-cgpa').value = prof.current_cgpa;
  if (document.getElementById('pref-target')) document.getElementById('pref-target').value = prof.target_cgpa;
  if (document.getElementById('pref-inst')) document.getElementById('pref-inst').value = prof.institute;

  // Velocity bar
  const totalPct = data.summary.completion_percentage || 64.7;
  const pctEl = document.getElementById('curriculum-total-pct');
  if (pctEl) pctEl.textContent = `${totalPct.toFixed(1)}%`;
  const barDone = document.getElementById('curriculum-bar-done');
  if (barDone) barDone.style.width = `${totalPct}%`;

  // Render Impending Deadlines
  const dlContainer = document.getElementById('impending-deadlines-list');
  if (dlContainer && data.deadlines) {
    dlContainer.innerHTML = data.deadlines.map(d => `
      <div class="flex items-center justify-between p-3 rounded-xl bg-surface-container-low cyber-border hover:border-primary/40 transition-colors">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary">
            <span class="material-symbols-outlined text-[18px]">event</span>
          </div>
          <div>
            <div class="font-headline-sm font-semibold text-sm text-on-surface">${d.title}</div>
            <div class="font-label-code-sm text-xs text-outline">${d.subject_code} • ${d.deadline_date}</div>
          </div>
        </div>
        <div class="text-right">
          <span class="px-2.5 py-1 rounded-md text-xs font-label-code-sm ${d.days_remaining <= 14 ? 'bg-error-container text-error font-bold' : 'bg-surface-container-highest text-primary'}">
            ${d.days_remaining}d left
          </span>
        </div>
      </div>
    `).join('');
  }

  // Render Dashboard Active Curriculum Modules
  const subjectsContainer = document.getElementById('dashboard-subjects-list');
  if (subjectsContainer && data.subjects) {
    subjectsContainer.innerHTML = data.subjects.slice(0, 4).map(s => `
      <div class="p-3.5 rounded-xl bg-surface-container-low cyber-border flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <span class="font-label-code-sm text-xs px-2 py-0.5 rounded bg-primary/10 text-primary font-semibold">${s.code}</span>
          <span class="font-label-code-sm text-xs text-outline">${s.completed_topics || 0}/${s.total_topics || 0} Topics</span>
        </div>
        <div class="font-headline-sm font-semibold text-sm text-on-surface">${s.name}</div>
        <div class="text-xs text-on-surface-variant truncate">${s.current_unit_name || 'Active Module'}</div>
        <div class="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden mt-1">
          <div class="h-full bg-primary rounded-full transition-all duration-300" style="width: ${s.completion_percentage || 0}%"></div>
        </div>
      </div>
    `).join('');
  }
}

// ----------------------------------------------------
// Subjects & Curriculum Matrix
// ----------------------------------------------------
export async function loadSubjectsView() {
  const subjects = await fetchWithFallback('/api/subjects', {}, () => {
    return state.subjects?.length ? state.subjects : initialMockData.subjects;
  });
  state.subjects = subjects;

  const topics = await fetchWithFallback('/api/subjects/topics/search', {}, () => {
    return state.topics?.length ? state.topics : initialMockData.topics;
  });
  state.topics = topics;

  // Populate Subject Cards
  const cardsContainer = document.getElementById('subjects-cards-grid');
  if (cardsContainer) {
    cardsContainer.innerHTML = subjects.map(s => `
      <div class="p-4 rounded-xl bg-surface-container-low cyber-border hover:border-primary/50 transition-all flex flex-col justify-between gap-3">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="px-2 py-0.5 rounded font-label-code-sm text-xs bg-surface-container-highest text-primary font-semibold">${s.code}</span>
            <span class="font-label-code-sm text-xs text-outline">${s.credits} Credits</span>
          </div>
          <h4 class="font-headline-sm font-bold text-on-surface">${s.name}</h4>
          <p class="text-xs text-on-surface-variant mt-0.5">${s.professor} • ${s.category}</p>
        </div>
        <div>
          <div class="flex justify-between items-center text-xs font-label-code-sm mb-1">
            <span class="text-outline">Completion</span>
            <span class="text-primary font-bold">${s.completion_percentage}%</span>
          </div>
          <div class="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
            <div class="h-full bg-primary rounded-full" style="width: ${s.completion_percentage}%"></div>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Populate Subject Select Dropdowns in Modals
  const topicSubSelect = document.getElementById('topic-subject-select');
  if (topicSubSelect) {
    topicSubSelect.innerHTML = subjects.map(s => `<option value="${s.id}">${s.code} - ${s.name}</option>`).join('');
  }
  const pomodoroSubSelect = document.getElementById('pomodoro-subject-select');
  if (pomodoroSubSelect) {
    pomodoroSubSelect.innerHTML = subjects.map(s => `<option value="${s.code}">${s.code} - ${s.name}</option>`).join('');
  }

  renderTopicsList(topics);
}

export function renderTopicsList(topicsList) {
  const container = document.getElementById('topics-table-body');
  if (!container) return;

  if (!topicsList.length) {
    container.innerHTML = `<div class="p-6 text-center text-outline font-label-code-sm text-sm">No topics match current filter.</div>`;
    return;
  }

  container.innerHTML = topicsList.map(t => {
    const statusBg = t.status === 'done' ? 'bg-tertiary-container/40 text-tertiary' : (t.status === 'in-flight' ? 'bg-primary-container/40 text-primary' : 'bg-surface-container-highest text-outline');
    const diffBg = t.difficulty === 'advanced' ? 'text-error' : (t.difficulty === 'intermediate' ? 'text-secondary' : 'text-tertiary');

    return `
      <div class="p-3.5 rounded-xl bg-surface-container-low cyber-border flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-surface-container transition-colors">
        <div class="flex items-start gap-3 flex-1">
          <button onclick="toggleTopicStatus(${t.id})" class="mt-0.5 text-outline hover:text-primary transition-colors" title="Toggle Done / In-flight / Pending">
            <span class="material-symbols-outlined text-[20px] ${t.status === 'done' ? 'text-tertiary' : ''}">
              ${t.status === 'done' ? 'check_circle' : (t.status === 'in-flight' ? 'pending' : 'radio_button_unchecked')}
            </span>
          </button>
          <div>
            <div class="flex items-center gap-2 flex-wrap mb-1">
              <span class="font-label-code-sm text-[11px] px-2 py-0.5 rounded ${statusBg} uppercase tracking-wider font-semibold">${t.status}</span>
              <span class="font-label-code-sm text-[11px] text-outline">Unit ${t.unit_number}: ${t.unit_name}</span>
              <span class="font-label-code-sm text-[11px] ${diffBg} font-medium">• ${t.difficulty}</span>
            </div>
            <div class="font-headline-sm font-semibold text-sm text-on-surface">${t.title}</div>
            ${t.notes ? `<div class="text-xs text-on-surface-variant mt-1 italic font-body-sm bg-surface-container-lowest/50 px-2 py-1 rounded border-l-2 border-primary/50">${t.notes}</div>` : ''}
          </div>
        </div>
        <div class="flex items-center gap-3 self-end md:self-center">
          <label class="flex items-center gap-1.5 text-xs text-outline cursor-pointer select-none">
            <input type="checkbox" ${t.revision_completed ? 'checked' : ''} onchange="toggleTopicRevision(${t.id}, this.checked)" class="w-3.5 h-3.5 rounded text-primary bg-surface-container-high focus:ring-0">
            <span>Revised</span>
          </label>
        </div>
      </div>
    `;
  }).join('');
}

export function handleTopicSearch(event) {
  const query = (event.target.value || '').toLowerCase().trim();
  if (!query) {
    renderTopicsList(state.topics);
    return;
  }
  const filtered = state.topics.filter(t => 
    t.title.toLowerCase().includes(query) || 
    t.unit_name.toLowerCase().includes(query) ||
    (t.notes && t.notes.toLowerCase().includes(query))
  );
  renderTopicsList(filtered);
}

export function toggleTopicStatus(topicId) {
  const topic = state.topics.find(t => t.id === topicId);
  if (!topic) return;

  const nextStatus = topic.status === 'pending' ? 'in-flight' : (topic.status === 'in-flight' ? 'done' : 'pending');
  topic.status = nextStatus;

  // Recalculate subject completion percentage
  const sub = state.subjects.find(s => s.id === topic.subject_id);
  if (sub) {
    const subTopics = state.topics.filter(t => t.subject_id === sub.id);
    const comp = subTopics.filter(t => t.status === 'done').length;
    sub.completed_topics = comp;
    sub.completion_percentage = subTopics.length ? Math.round((comp / subTopics.length) * 100) : 0;
  }

  saveStorageData();
  renderTopicsList(state.topics);
  showToast(`Topic marked as ${nextStatus.toUpperCase()}`, 'success');
}

export function toggleTopicRevision(topicId, isRevised) {
  const topic = state.topics.find(t => t.id === topicId);
  if (topic) {
    topic.revision_completed = isRevised ? 1 : 0;
    saveStorageData();
    showToast(isRevised ? 'Marked for revision mastery' : 'Revision cleared', 'info');
  }
}

// ----------------------------------------------------
// Deep Work / Pomodoro & Audio Engine
// ----------------------------------------------------
export function updateTimerDisplay() {
  const min = Math.floor(state.timer.remainingSeconds / 60);
  const sec = state.timer.remainingSeconds % 60;
  const timeStr = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  
  const displayEl = document.getElementById('timer-time-display');
  if (displayEl) displayEl.textContent = timeStr;

  // Update SVG Ring offset (circumference = 2 * PI * 88 = 552.92)
  const circle = document.getElementById('timer-progress-ring');
  if (circle) {
    const totalCircumference = 552.92;
    const progress = (state.timer.totalSeconds - state.timer.remainingSeconds) / state.timer.totalSeconds;
    const offset = totalCircumference * (1 - progress);
    circle.style.strokeDashoffset = offset;
  }
}

export function setTimerMode(mode) {
  state.timer.mode = mode;
  if (mode === 'focus') state.timer.totalSeconds = 25 * 60;
  if (mode === 'short') state.timer.totalSeconds = 5 * 60;
  if (mode === 'long') state.timer.totalSeconds = 15 * 60;

  state.timer.remainingSeconds = state.timer.totalSeconds;
  stopTimer();

  document.querySelectorAll('[data-timer-mode]').forEach(btn => {
    if (btn.getAttribute('data-timer-mode') === mode) {
      btn.classList.add('bg-primary', 'text-on-primary', 'font-bold');
      btn.classList.remove('bg-surface-container-high', 'text-on-surface-variant');
    } else {
      btn.classList.remove('bg-primary', 'text-on-primary', 'font-bold');
      btn.classList.add('bg-surface-container-high', 'text-on-surface-variant');
    }
  });

  updateTimerDisplay();
}

export function toggleTimer() {
  if (state.timer.isRunning) {
    stopTimer();
  } else {
    startTimer();
  }
}

export function startTimer() {
  state.timer.isRunning = true;
  const toggleBtn = document.getElementById('timer-toggle-btn');
  if (toggleBtn) {
    toggleBtn.innerHTML = `<span class="material-symbols-outlined text-[20px]">pause</span><span>Pause Focus</span>`;
    toggleBtn.classList.replace('bg-primary', 'bg-error-container');
    toggleBtn.classList.replace('text-on-primary', 'text-error');
  }

  state.timer.intervalId = setInterval(() => {
    if (state.timer.remainingSeconds > 0) {
      state.timer.remainingSeconds--;
      updateTimerDisplay();
    } else {
      stopTimer();
      sound.playCompletionChime();
      showToast('Pomodoro interval complete! Take a break.', 'success');
    }
  }, 1000);
}

export function stopTimer() {
  state.timer.isRunning = false;
  if (state.timer.intervalId) {
    clearInterval(state.timer.intervalId);
    state.timer.intervalId = null;
  }
  const toggleBtn = document.getElementById('timer-toggle-btn');
  if (toggleBtn) {
    toggleBtn.innerHTML = `<span class="material-symbols-outlined text-[20px]">play_arrow</span><span>Start Focus (25m)</span>`;
    toggleBtn.classList.replace('bg-error-container', 'bg-primary');
    toggleBtn.classList.replace('text-error', 'text-on-primary');
  }
}

export function resetTimer() {
  stopTimer();
  state.timer.remainingSeconds = state.timer.totalSeconds;
  updateTimerDisplay();
}

export function setAmbientSound(type) {
  document.querySelectorAll('[data-sound-preset]').forEach(btn => {
    btn.classList.remove('border-primary', 'bg-primary/20', 'text-primary');
  });

  if (sound.currentMode === type && sound.isPlaying) {
    sound.stop();
    return;
  }

  if (type === 'rain') sound.playRain();
  if (type === 'drone') sound.playCyberDrone();
  if (type === 'white') sound.playWhiteNoise();
  if (type === 'off') sound.stop();

  const activeBtn = document.querySelector(`[data-sound-preset="${type}"]`);
  if (activeBtn) {
    activeBtn.classList.add('border-primary', 'bg-primary/20', 'text-primary');
  }
}

export async function loadStudyView() {
  updateTimerDisplay();
}

// ----------------------------------------------------
// Tests & Academic Evaluation Ledger
// ----------------------------------------------------
export async function loadTestsView() {
  const tests = await fetchWithFallback('/api/tests', {}, () => {
    return state.tests?.length ? state.tests : initialMockData.tests;
  });
  state.tests = tests;

  const listContainer = document.getElementById('evaluations-ledger-list');
  if (listContainer) {
    listContainer.innerHTML = tests.map(t => {
      const gradeColor = t.grade === 'O' ? 'bg-tertiary-container text-tertiary' : (t.grade === 'E' ? 'bg-primary-container text-primary' : 'bg-secondary-container text-secondary');
      return `
        <div class="p-3.5 rounded-xl bg-surface-container-low cyber-border flex items-center justify-between gap-3 hover:border-primary/40 transition-colors">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center font-label-code-lg font-bold text-sm ${gradeColor}">
              ${t.grade}
            </div>
            <div>
              <div class="font-headline-sm font-semibold text-sm text-on-surface">${t.test_type} • <span class="text-primary">${t.subject_code}</span></div>
              <div class="text-xs text-outline font-label-code-sm">${t.eval_date} • ${t.notes || 'Curriculum unit exam'}</div>
            </div>
          </div>
          <div class="text-right">
            <div class="font-headline-sm font-bold text-sm text-on-surface">${t.obtained_marks}/${t.max_marks}</div>
            <div class="text-xs text-tertiary font-label-code-sm font-semibold">${t.percentage}%</div>
          </div>
        </div>
      `;
    }).join('');
  }
}

// ----------------------------------------------------
// Goals View
// ----------------------------------------------------
export async function loadGoalsView() {
  const goals = await fetchWithFallback('/api/goals', {}, () => {
    return state.goals?.length ? state.goals : initialMockData.goals;
  });
  state.goals = goals;

  const listContainer = document.getElementById('daily-goals-list');
  if (listContainer) {
    listContainer.innerHTML = goals.map(g => `
      <div class="p-3.5 rounded-xl bg-surface-container-low cyber-border flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <button onclick="toggleGoalStatus(${g.id})" class="text-outline hover:text-primary transition-colors">
            <span class="material-symbols-outlined text-[20px] ${g.status === 'completed' ? 'text-tertiary' : ''}">
              ${g.status === 'completed' ? 'check_circle' : 'radio_button_unchecked'}
            </span>
          </button>
          <span class="text-sm font-body-md ${g.status === 'completed' ? 'line-through text-outline' : 'text-on-surface'}">${g.title}</span>
        </div>
        <span class="font-label-code-sm text-xs px-2 py-0.5 rounded bg-surface-container-highest text-primary">${g.subject_code}</span>
      </div>
    `).join('');
  }
}

export function toggleGoalStatus(goalId) {
  const goal = state.goals.find(g => g.id === goalId);
  if (goal) {
    goal.status = goal.status === 'completed' ? 'pending' : 'completed';
    saveStorageData();
    loadGoalsView();
    showToast(`Goal updated: ${goal.status}`, 'info');
  }
}

// ----------------------------------------------------
// PYQ Vault View
// ----------------------------------------------------
export async function loadPyqView() {
  const pyqs = await fetchWithFallback('/api/subjects/pyq/bank', {}, () => {
    return state.pyqs?.length ? state.pyqs : initialMockData.pyqs;
  });
  state.pyqs = pyqs;

  const container = document.getElementById('pyq-vault-list');
  if (container) {
    container.innerHTML = pyqs.map(p => `
      <div class="p-4 rounded-xl bg-surface-container-low cyber-border flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded bg-primary/20 text-primary font-label-code-sm text-xs font-bold">${p.subject_code}</span>
            <span class="font-label-code-sm text-xs text-outline">${p.year} • ${p.module_unit}</span>
          </div>
          <span class="font-label-code-sm text-xs px-2 py-0.5 rounded bg-surface-container-highest text-tertiary">${p.marks} Marks</span>
        </div>
        <p class="font-body-md text-sm text-on-surface">${p.question_text}</p>
        <div class="p-2.5 rounded-lg bg-surface-container-lowest/60 cyber-border text-xs text-on-surface-variant font-body-sm">
          <span class="font-bold text-primary">Core Solution Strategy: </span>${p.solution_summary}
        </div>
      </div>
    `).join('');
  }
}

// ----------------------------------------------------
// Modal Handlers & Forms
// ----------------------------------------------------
export function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('hidden');
}

export function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('hidden');
}

export function handleCreateSubject(e) {
  e.preventDefault();
  const code = document.getElementById('new-sub-code').value.trim().toUpperCase();
  const name = document.getElementById('new-sub-name').value.trim();
  const credits = parseFloat(document.getElementById('new-sub-credits').value) || 3.0;
  const category = document.getElementById('new-sub-category').value;
  const professor = document.getElementById('new-sub-prof').value.trim() || 'Faculty';

  const newSub = {
    id: Date.now(),
    code,
    name,
    credits,
    category,
    professor,
    color_theme: 'primary',
    total_modules: 4,
    total_topics: 0,
    completed_topics: 0,
    completion_percentage: 0
  };

  state.subjects.push(newSub);
  saveStorageData();
  closeModal('modal-add-subject');
  loadSubjectsView();
  showToast(`Subject ${code} created successfully`, 'success');
}

export function handleCreateTopic(e) {
  e.preventDefault();
  const subId = parseInt(document.getElementById('topic-subject-select').value);
  const unitNum = parseInt(document.getElementById('topic-unit-num').value);
  const unitName = document.getElementById('topic-unit-name').value.trim();
  const title = document.getElementById('topic-title').value.trim();
  const difficulty = document.getElementById('topic-difficulty').value;

  const newTopic = {
    id: Date.now(),
    subject_id: subId,
    unit_number: unitNum,
    unit_name: unitName,
    title,
    difficulty,
    status: 'pending',
    priority: 'normal',
    revision_completed: 0,
    notes: ''
  };

  state.topics.push(newTopic);
  const sub = state.subjects.find(s => s.id === subId);
  if (sub) {
    sub.total_topics = (sub.total_topics || 0) + 1;
    sub.completion_percentage = Math.round(((sub.completed_topics || 0) / sub.total_topics) * 100);
  }

  saveStorageData();
  closeModal('modal-add-topic');
  loadSubjectsView();
  showToast(`Topic added to curriculum`, 'success');
}

export function handleProfileUpdate(e) {
  e.preventDefault();
  const name = document.getElementById('pref-name').value.trim();
  const cgpa = parseFloat(document.getElementById('pref-cgpa').value) || 8.84;
  const target = parseFloat(document.getElementById('pref-target').value) || 9.20;
  const inst = document.getElementById('pref-inst').value.trim();

  state.profile.name = name;
  state.profile.current_cgpa = cgpa;
  state.profile.target_cgpa = target;
  state.profile.institute = inst;

  saveStorageData();
  closeModal('modal-profile-edit');
  loadDashboard();
  showToast('Preferences updated successfully', 'success');
}

// Initialize Application
export function initApp() {
  const local = loadStorageData();
  state.profile = local.profile || initialMockData.profile;
  state.summary = local.summary || initialMockData.summary;
  state.deadlines = local.deadlines || initialMockData.deadlines;
  state.subjects = local.subjects || initialMockData.subjects;
  state.topics = local.topics || initialMockData.topics;
  state.tests = local.tests || initialMockData.tests;
  state.goals = local.goals || initialMockData.goals;
  state.pyqs = local.pyqs || initialMockData.pyqs;

  loadDashboard();
  loadSubjectsView();
  updateTimerDisplay();

  const searchInput = document.getElementById('topicSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', handleTopicSearch);
  }
}

