const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Docker",
  "AWS",
  "Git",
  "REST & GraphQL",
];

const projects = [
  {
    name: "Task Flow",
    description:
      "A real-time task board with drag-and-drop, optimistic updates and websocket sync across devices.",
    stack: ["Next.js", "PostgreSQL", "WebSockets"],
    link: "https://github.com/",
  },
  {
    name: "DevMetrics",
    description:
      "Dashboard that pulls CI/CD and repo data to surface build times, flaky tests and deploy frequency.",
    stack: ["React", "Node.js", "Docker"],
    link: "https://github.com/",
  },
  {
    name: "Snippet API",
    description:
      "Small code-snippet service with auth, rate limiting and full-text search, deployed on a single container.",
    stack: ["Python", "FastAPI", "AWS"],
    link: "https://github.com/",
  },
];

const experience = [
  {
    role: "Software Engineer",
    company: "Acme Technologies",
    period: "2023 — Present",
    points: [
      "Build and ship features across the frontend and backend of a customer-facing web app.",
      "Cut average API response time by 40% by adding caching and fixing N+1 queries.",
      "Containerized local development, dropping new-hire setup from a day to under an hour.",
    ],
  },
  {
    role: "Junior Software Engineer",
    company: "Bluewave Labs",
    period: "2021 — 2023",
    points: [
      "Delivered reusable UI components used across three internal products.",
      "Wrote integration tests that raised coverage on critical paths from 35% to 80%.",
    ],
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-3xl px-6 py-20 sm:px-10">
        {/* Hero */}
        <section>
          <h1 className="text-4xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            Mizanur Asif
          </h1>
          <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
            Software Engineer · Dhaka, Bangladesh
          </p>
          <p className="mt-6 max-w-xl leading-7 text-zinc-700 dark:text-zinc-300">
            I build web applications end to end — from database schema to the
            last pixel. I care about clean APIs, fast page loads and code that
            the next person can actually read.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium">
            <a
              className="flex h-11 items-center justify-center rounded-full bg-black px-5 text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-300"
              href="mailto:ananto.bhai@gmail.com"
            >
              Email me
            </a>
            <a
              className="flex h-11 items-center justify-center rounded-full border border-black/10 px-5 transition-colors hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              className="flex h-11 items-center justify-center rounded-full border border-black/10 px-5 transition-colors hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </section>

        {/* Skills */}
        <section className="mt-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            Skills
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <li
                key={skill}
                className="rounded-full bg-black/[.06] px-3 py-1.5 font-mono text-sm text-zinc-800 dark:bg-white/[.08] dark:text-zinc-200"
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>

        {/* Projects */}
        <section className="mt-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            Projects
          </h2>
          <div className="mt-5 flex flex-col gap-4">
            {projects.map((project) => (
              <a
                key={project.name}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-black/[.08] bg-white p-5 transition-colors hover:border-black/20 dark:border-white/[.12] dark:bg-zinc-950 dark:hover:border-white/30"
              >
                <h3 className="font-medium text-black dark:text-zinc-50">
                  {project.name}
                </h3>
                <p className="mt-2 leading-7 text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </p>
                <p className="mt-3 font-mono text-xs text-zinc-500 dark:text-zinc-500">
                  {project.stack.join(" · ")}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mt-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            Experience
          </h2>
          <div className="mt-5 flex flex-col gap-8">
            {experience.map((job) => (
              <div key={job.company}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-medium text-black dark:text-zinc-50">
                    {job.role} · {job.company}
                  </h3>
                  <span className="font-mono text-xs text-zinc-500">
                    {job.period}
                  </span>
                </div>
                <ul className="mt-3 flex flex-col gap-2">
                  {job.points.map((point) => (
                    <li
                      key={point}
                      className="pl-5 leading-7 text-zinc-600 before:-ml-5 before:mr-2 before:content-['—'] dark:text-zinc-400"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="mt-16 border-t border-black/[.08] pt-8 dark:border-white/[.12]">
          <p className="leading-7 text-zinc-600 dark:text-zinc-400">
            Open to interesting work.{" "}
            <a
              href="mailto:mizanurasif02@gmail.com"
              className="font-medium text-black underline underline-offset-4 dark:text-zinc-50"
            >
              mizanurasif02@gmail.com
            </a>
          </p>
        </section>
      </main>
    </div>
  );
}
