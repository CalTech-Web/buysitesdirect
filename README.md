# Buy Sites Direct

Next.js 16, React 19, Drizzle ORM, Neon Postgres, shadcn/ui, Tailwind CSS, Resend
Deployed on Vercel: https://buysitesdirect.vercel.app
Production: https://buysitesdirect.com
Local dev: http://localhost:3000

## Run Agents

WORK=/Users/brandonhopkins/Projects/buysitesdirect/agents/design-agent MODEL="sonnet" MAX_LOOPS=5 bash ~/Projects/claude-lab/ENGINE/run.sh
WORK=/Users/brandonhopkins/Projects/buysitesdirect/agents/content-agent MODEL="sonnet" MAX_LOOPS=5 bash ~/Projects/claude-lab/ENGINE/run.sh
WORK=/Users/brandonhopkins/Projects/buysitesdirect/agents/marketing-agent MODEL="sonnet" MAX_LOOPS=5 bash ~/Projects/claude-lab/ENGINE/run.sh
WORK=/Users/brandonhopkins/Projects/buysitesdirect/agents/seo-agent MODEL="sonnet" MAX_LOOPS=5 bash ~/Projects/claude-lab/ENGINE/run.sh
WORK=/Users/brandonhopkins/Projects/buysitesdirect/agents/pagespeed-agent MODEL="sonnet" MAX_LOOPS=5 bash ~/Projects/claude-lab/ENGINE/run.sh
