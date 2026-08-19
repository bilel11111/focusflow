/**
 * FocusFlow / Quiet Ledger page: editorial-paper task desk with ink structure,
 * Verdigris Note active states, an asymmetric binder spine, and small margin notes.
 */
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Circle,
  Clock3,
  Command,
  Flame,
  LayoutList,
  ListFilter,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Settings2,
  Sparkles,
  Target,
  Trash2,
  X,
} from "lucide-react";

type Priority = "high" | "medium" | "low";
type View = "Today" | "Tasks" | "Calendar" | "Insights";

type Task = {
  id: string;
  title: string;
  note: string;
  tag: string;
  priority: Priority;
  time: string;
  complete: boolean;
};

const seedTasks: Task[] = [
  { id: "01", title: "Outline the Q3 product narrative", note: "Give the idea a clear beginning, tension, and landing.", tag: "Deep work", priority: "high", time: "09:30", complete: false },
  { id: "02", title: "Review studio notes with Mara", note: "Bring the visual references and the open questions.", tag: "Collaborate", priority: "medium", time: "11:00", complete: false },
  { id: "03", title: "Block a quiet hour for research", note: "Read without opening another tab.", tag: "Thinking", priority: "low", time: "14:00", complete: false },
  { id: "04", title: "Send the follow-up to the design partner", note: "Keep it short; ask for their Friday preference.", tag: "Admin", priority: "medium", time: "16:30", complete: true },
  { id: "05", title: "Close the loop on expense receipts", note: "A small job worth finishing before tomorrow.", tag: "Admin", priority: "low", time: "17:15", complete: true },
];

const taskStoreKey = "focusflow-quiet-ledger-tasks";

const navItems: { label: View; icon: typeof LayoutList }[] = [
  { label: "Today", icon: LayoutList },
  { label: "Tasks", icon: ListFilter },
  { label: "Calendar", icon: CalendarDays },
  { label: "Insights", icon: BarChart3 },
];

function priorityLabel(priority: Priority) {
  return priority === "high" ? "High focus" : priority === "medium" ? "Steady" : "Gentle";
}

function priorityTone(priority: Priority) {
  return priority === "high" ? "high" : priority === "medium" ? "medium" : "low";
}

function shortWeekday(offset: number) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);
}

function dayNumber(offset: number) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.getDate();
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(seedTasks);
  const [hydrated, setHydrated] = useState(false);
  const [activeView, setActiveView] = useState<View>("Today");
  const [filter, setFilter] = useState<"All" | "Focus" | "High" | "Complete">("All");
  const [query, setQuery] = useState("");
  const [composerOpen, setComposerOpen] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [newPriority, setNewPriority] = useState<Priority>("medium");
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(taskStoreKey);
    if (saved) {
      try {
        setTasks(JSON.parse(saved) as Task[]);
      } catch {
        window.localStorage.removeItem(taskStoreKey);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(taskStoreKey, JSON.stringify(tasks));
  }, [tasks, hydrated]);

  const today = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(new Date());
  const completedCount = tasks.filter((task) => task.complete).length;
  const focusCount = tasks.filter((task) => !task.complete && task.priority === "high").length;
  const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  const visibleTasks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return tasks.filter((task) => {
      const matchSearch = !normalizedQuery || `${task.title} ${task.note} ${task.tag}`.toLowerCase().includes(normalizedQuery);
      const matchFilter = filter === "All" || (filter === "Focus" && !task.complete && task.priority !== "low") || (filter === "High" && task.priority === "high") || (filter === "Complete" && task.complete);
      return matchSearch && matchFilter;
    });
  }, [filter, query, tasks]);

  const openTasks = visibleTasks.filter((task) => !task.complete);
  const doneTasks = visibleTasks.filter((task) => task.complete);

  function toggleTask(id: string) {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, complete: !task.complete } : task));
  }

  function removeTask(id: string) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  function createTask() {
    const title = newTask.trim();
    if (!title) return;
    setTasks((current) => [{ id: String(Date.now()), title, note: "A fresh line on today’s page.", tag: "Captured", priority: newPriority, time: "Any time", complete: false }, ...current]);
    setNewTask("");
    setComposerOpen(false);
    setActiveView("Tasks");
  }

  const renderTask = (task: Task) => (
    <article className={`task-row ${task.complete ? "is-complete" : ""}`} key={task.id}>
      <button className="task-check" aria-label={task.complete ? `Mark ${task.title} incomplete` : `Complete ${task.title}`} onClick={() => toggleTask(task.id)}>
        {task.complete ? <Check size={15} strokeWidth={3} /> : <Circle size={17} />}
      </button>
      <div className="task-time">{task.time}</div>
      <div className="task-copy">
        <div className="task-title-line">
          <h3>{task.title}</h3>
          <span className={`priority-dot ${priorityTone(task.priority)}`} aria-label={priorityLabel(task.priority)} />
        </div>
        <p>{task.note}</p>
      </div>
      <span className="task-tag">{task.tag}</span>
      <button className="task-delete" aria-label={`Remove ${task.title}`} onClick={() => removeTask(task.id)}><Trash2 size={15} /></button>
    </article>
  );

  return (
    <div className="focusflow-app">
      <aside className={`spine ${mobileMenu ? "mobile-open" : ""}`}>
        <div className="spine-brand">
          <img src="/manus-storage/focusflow-mark_2172dc21.png" alt="FocusFlow" />
          <span className="wordmark"><strong>Focus</strong>Flow</span>
          <button className="mobile-close" aria-label="Close navigation" onClick={() => setMobileMenu(false)}><X size={18} /></button>
        </div>

        <div className="mini-date"><span>{new Intl.DateTimeFormat("en-US", { month: "short" }).format(new Date())}</span><strong>{dayNumber(0)}</strong><i>{new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(new Date())}</i></div>

        <nav className="primary-nav" aria-label="Workspace navigation">
          <p className="nav-eyebrow">Your desk</p>
          {navItems.map(({ label, icon: Icon }) => (
            <button key={label} onClick={() => { setActiveView(label); setMobileMenu(false); }} className={activeView === label ? "active" : ""}>
              <Icon size={18} /> <span>{label}</span>{label === "Today" && <em>4</em>}
            </button>
          ))}
        </nav>

        <div className="spine-bottom">
          <button className="spine-utility"><Settings2 size={17} /> Settings</button>
          <div className="profile-chip"><span>JR</span><div><b>Jules Reed</b><small>Personal desk</small></div><MoreHorizontal size={16} /></div>
        </div>
      </aside>

      <main className="daily-sheet">
        <header className="sheet-header">
          <button className="menu-trigger" aria-label="Open navigation" onClick={() => setMobileMenu(true)}><Menu size={20} /></button>
          <div className="crumb"><span>My desk</span><ChevronRight size={14} /><b>{activeView}</b></div>
          <div className="header-actions">
            <label className="search-box"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a task" /></label>
            <button className="command-button" aria-label="Keyboard shortcut"><Command size={15} /> K</button>
            <button className="add-button" onClick={() => setComposerOpen(true)}><Plus size={17} /> Add task</button>
          </div>
        </header>

        {activeView === "Today" && (
          <>
            <section className="welcome-section">
              <div>
                <p className="date-line">{today}</p>
                <h1>Make room for<br /><em>what matters.</em></h1>
                <p className="intro">You have <b>{tasks.filter((task) => !task.complete).length} open threads</b> on the page. Choose one and give it your full attention.</p>
              </div>
              <div className="intention-card">
                <span className="paper-clip" aria-hidden="true" />
                <span className="intention-number">01 / NOTE</span>
                <img src="/manus-storage/focusflow-desk-stilllife_6ae4064c.jpg" alt="A quiet paper desk" />
                <div className="intention-content"><Sparkles size={16} /><p>Today’s intention</p><strong>Protect the first clear hour.</strong><i>circled in green ink</i></div>
              </div>
            </section>

            <section className="focus-strip" aria-label="Daily focus summary">
              <div className="focus-stat"><div className="stat-icon flame"><Flame size={18} /></div><div><small>Focus first</small><b>{focusCount || "No high-focus tasks"}</b><span>{focusCount ? "Priority thread waiting" : "The page is clear"}</span></div></div>
              <div className="focus-stat"><div className="stat-icon target"><Target size={18} /></div><div><small>Daily rhythm</small><b>{progress}% complete</b><span>{completedCount} of {tasks.length} marks made</span></div></div>
              <div className="mini-progress"><div className="progress-label"><span>Flow meter</span><b>{progress}%</b></div><div className="progress-track"><i style={{ width: `${progress}%` }} /></div><span>Small, finished things count.</span></div>
            </section>

            <section className="task-section">
              <div className="section-head"><div><p className="section-kicker">Main page</p><h2>On your desk</h2></div><div className="filter-pills">{(["All", "Focus", "High", "Complete"] as const).map((item) => <button onClick={() => setFilter(item)} className={filter === item ? "selected" : ""} key={item}>{item}</button>)}</div></div>
              <div className="tasks-paper daily-paper">
                <span className="sheet-tab">Daily sheet</span>
                <div className="paper-line-label"><span>Time</span><span>Task</span><span>Context</span></div>
                {openTasks.length ? openTasks.map(renderTask) : <div className="empty-state"><Check size={20} /><p>Nothing asking for your attention here.</p></div>}
                {doneTasks.length > 0 && <><div className="completion-divider"><span>Settled today</span></div>{doneTasks.map(renderTask)}</>}
              </div>
            </section>
          </>
        )}

        {activeView === "Tasks" && (
          <section className="alternate-view"><div className="alternate-heading"><p className="section-kicker">A complete list</p><h1>Every open thread.</h1><p>Filter, finish, or remove the details that no longer deserve space.</p></div><div className="tasks-paper all-tasks">{visibleTasks.length ? visibleTasks.map(renderTask) : <div className="empty-state"><Circle size={20} /><p>No tasks match this view.</p></div>}</div></section>
        )}

        {activeView === "Calendar" && (
          <section className="alternate-view calendar-view"><div className="alternate-heading"><p className="section-kicker">A seven-day glance</p><h1>Let the week breathe.</h1><p>Only a few commitments need to be visible at once.</p></div><div className="week-board">{[-2, -1, 0, 1, 2, 3, 4].map((offset) => <div key={offset} className={`week-day ${offset === 0 ? "today" : ""}`}><small>{shortWeekday(offset)}</small><b>{dayNumber(offset)}</b><div className="day-mark">{offset === 0 ? "Focus" : offset === 2 ? "Review" : ""}</div></div>)}</div><div className="calendar-note"><CalendarDays size={18} /><div><b>Leave Thursday spacious.</b><p>Your design review needs a clean lead-in, not a packed run-up.</p></div></div></section>
        )}

        {activeView === "Insights" && (
          <section className="alternate-view insights-view"><div className="alternate-heading"><p className="section-kicker">A softer kind of evidence</p><h1>Notice the rhythm.</h1><p>Completion is not the only useful signal; attention has a shape, too.</p></div><div className="insight-feature"><img src="/manus-storage/focusflow-weekly-abstract_4c40b57e.jpg" alt="Abstract layers representing a productive week" /><div><span>Week in view</span><b>{completedCount} tasks settled with intention.</b><p>Your clearest work tends to happen before lunch. Protect that window for the hard thing.</p><button onClick={() => setActiveView("Today")}>Return to today <ArrowRight size={15} /></button></div></div><div className="insight-numbers"><div><small>Focus marks</small><b>3.8<span>/5</span></b><p>Good room for deep work.</p></div><div><small>Open loops</small><b>{tasks.length - completedCount}</b><p>Keep the list deliberately small.</p></div><div><small>Steady streak</small><b>06<span> days</span></b><p>Finish a gentle task to continue.</p></div></div></section>
        )}
      </main>

      <aside className="margin-notes">
        <div className="notes-header"><span>Margin notes</span><button aria-label="More margin note options"><MoreHorizontal size={17} /></button></div>
        <section className="little-calendar"><div className="calendar-heading"><button aria-label="Previous month"><ChevronLeft size={16} /></button><b>{new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(new Date())}</b><button aria-label="Next month"><ChevronRight size={16} /></button></div><div className="weekday-row"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div><div className="calendar-grid">{Array.from({ length: 35 }, (_, index) => { const day = index - 2; return <span className={day === dayNumber(0) ? "calendar-today" : day < 1 || day > 31 ? "muted-day" : ""} key={index}>{day > 0 && day <= 31 ? day : ""}</span>; })}</div></section>
        <section className="note-card quote-note"><span className="tape" /><span className="pin-dot" /><p>“The day becomes easier when the next thing is obvious.”</p><small>— A note to self</small></section>
        <section className="note-card collage-note"><span className="mini-paperclip" /><img src="/manus-storage/focusflow-collage_ae020321.jpg" alt="Abstract paper collage" /><div><span>Small win</span><b>{completedCount ? "You made your first mark." : "The page is ready."}</b><p>{completedCount ? "Completion changes the texture of a day." : "Capture one task when it appears."}</p></div></section>
        <button className="capture-button" onClick={() => setComposerOpen(true)}><Plus size={18} /><span>Capture a thought</span></button>
      </aside>

      {composerOpen && <div className="composer-backdrop" role="presentation" onMouseDown={() => setComposerOpen(false)}><section className="task-composer" role="dialog" aria-modal="true" aria-labelledby="composer-title" onMouseDown={(event) => event.stopPropagation()}><div className="composer-top"><div><p className="section-kicker">A fresh line</p><h2 id="composer-title">Capture the next thing.</h2></div><button aria-label="Close task composer" onClick={() => setComposerOpen(false)}><X size={19} /></button></div><input autoFocus value={newTask} onChange={(event) => setNewTask(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") createTask(); }} placeholder="What deserves a place on today’s page?" /><div className="composer-bottom"><div className="priority-picker">{(["high", "medium", "low"] as Priority[]).map((priority) => <button className={newPriority === priority ? `chosen ${priority}` : ""} key={priority} onClick={() => setNewPriority(priority)}><span className={`priority-dot ${priority}`} /> {priorityLabel(priority)}</button>)}</div><button className="create-button" onClick={createTask}>Add to desk <ArrowRight size={16} /></button></div></section></div>}
    </div>
  );
}
