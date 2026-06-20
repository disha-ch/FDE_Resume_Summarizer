import { TeamMember, RawMessage } from "../types";

export const TEAM_MEMBERS: TeamMember[] = [
  { id: "kunal", name: "Kunal", avatar: "👨‍💻", initialCount: 10 },
  { id: "jamuna", name: "Jamuna", avatar: "👩‍💻", initialCount: 7 },
  { id: "pushpak", name: "Pushpak", avatar: "🧔", initialCount: 17 },
  { id: "vaibhali", name: "Vaibhali", avatar: "👩‍🎨", initialCount: 20 },
  { id: "adarsh", name: "Adarsh", avatar: "👨‍💼", initialCount: 6 },
  { id: "usha", name: "Usha", avatar: "👩‍🔬", initialCount: 15 },
  { id: "naga", name: "Naga", avatar: "🧓", initialCount: 11 },
];

export const INITIAL_MESSAGES: RawMessage[] = [
  // --- Kunal (10 messages) ---
  {
    id: "k-1",
    sender: "Kunal",
    text: "COMPLETED the initial database schema migration for the client dashboard in local dev.",
    timestamp: "8:45 AM",
    keyword: "Completed"
  },
  {
    id: "k-2",
    sender: "Kunal",
    text: "IN PROGRESS with setting up the Express API controllers for fetching real-time alerts.",
    timestamp: "9:02 AM",
    keyword: "IN PROGRESS"
  },
  {
    id: "k-3",
    sender: "Kunal",
    text: "BLOCKER: Supabase credentials from the dev lead are currently throwing an invalid handshake error.",
    timestamp: "9:15 AM",
    keyword: "BLOCKER"
  },
  {
    id: "k-4",
    sender: "Kunal",
    text: "TO BE DONE: I need to write integration test cases for the login proxy server this afternoon.",
    timestamp: "10:00 AM",
    keyword: "TO BE DONE"
  },
  {
    id: "k-5",
    sender: "Kunal",
    text: "COMPLETED fixing the CORS warning on the dev server by configuring credentials headers.",
    timestamp: "11:20 AM",
    keyword: "Completed"
  },
  {
    sender: "Kunal",
    id: "k-6",
    text: "IN PROGRESS reading the new API specifications to map request payloads for Vikram's summary generator.",
    timestamp: "11:45 AM",
    keyword: "IN PROGRESS"
  },
  {
    id: "k-7",
    sender: "Kunal",
    text: "BLOCKER: Running out of memory in Docker containers on high-intensity batch runs.",
    timestamp: "1:15 PM",
    keyword: "BLOCKER"
  },
  {
    id: "k-8",
    sender: "Kunal",
    text: "TO BE DONE: Schedule the DB backup cron jobs. This will be my priority once auth is completely solved.",
    timestamp: "2:30 PM",
    keyword: "TO BE DONE"
  },
  {
    id: "k-9",
    sender: "Kunal",
    text: "COMPLETED the SSL certificate rotation for our development hostname.",
    timestamp: "3:45 PM",
    keyword: "Completed"
  },
  {
    id: "k-10",
    sender: "Kunal",
    text: "IN PROGRESS compiling unit tests for postgres helper classes.",
    timestamp: "4:50 PM",
    keyword: "IN PROGRESS"
  },

  // --- Jamuna (7 messages) ---
  {
    id: "j-1",
    sender: "Jamuna",
    text: "COMPLETED the wireframes and visual UI design for the team dashboard analytics view.",
    timestamp: "8:50 AM",
    keyword: "Completed"
  },
  {
    id: "j-2",
    sender: "Jamuna",
    text: "IN PROGRESS styling the ticket history log card components with responsive tailwind columns.",
    timestamp: "10:10 AM",
    keyword: "IN PROGRESS"
  },
  {
    id: "j-3",
    sender: "Jamuna",
    text: "BLOCKER: The client has not confirmed the color codes for the status badges yet; awaiting their branding guide.",
    timestamp: "10:40 AM",
    keyword: "BLOCKER"
  },
  {
    id: "j-4",
    sender: "Jamuna",
    text: "TO BE DONE: Connect client review comments into the active design layout.",
    timestamp: "11:30 AM",
    keyword: "TO BE DONE"
  },
  {
    id: "j-5",
    sender: "Jamuna",
    text: "COMPLETED exporting the high-resolution dashboard assets to our assets folder.",
    timestamp: "1:05 PM",
    keyword: "Completed"
  },
  {
    id: "j-6",
    sender: "Jamuna",
    text: "IN PROGRESS with standard layout optimizations for mobile screen heights.",
    timestamp: "2:45 PM",
    keyword: "IN PROGRESS"
  },
  {
    id: "j-7",
    sender: "Jamuna",
    text: "TO BE DONE: Redraw the network connection flow diagram once the architecture receives final approval.",
    timestamp: "4:00 PM",
    keyword: "TO BE DONE"
  },

  // --- Pushpak (17 messages) ---
  {
    id: "p-1",
    sender: "Pushpak",
    text: "COMPLETED the installation and config of the node_modules cache inside GitHub actions workflow.",
    timestamp: "8:30 AM",
    keyword: "Completed"
  },
  {
    id: "p-2",
    sender: "Pushpak",
    text: "IN PROGRESS debugging the intermittent build failures during Vite compilation.",
    timestamp: "9:05 AM",
    keyword: "IN PROGRESS"
  },
  {
    id: "p-3",
    sender: "Pushpak",
    text: "BLOCKER: Google Cloud build system limit exceeded on active concurrent workers; need Vikram to upgrade quota.",
    timestamp: "9:40 AM",
    keyword: "BLOCKER"
  },
  {
    id: "p-4",
    sender: "Pushpak",
    text: "TO BE DONE: Write the shell scripts for automated daily database sanity reporting.",
    timestamp: "10:15 AM",
    keyword: "TO BE DONE"
  },
  {
    id: "p-5",
    sender: "Pushpak",
    text: "COMPLETED cleaning up stale sandbox docker volumes from the host nodes.",
    timestamp: "10:55 AM",
    keyword: "Completed"
  },
  {
    id: "p-6",
    sender: "Pushpak",
    text: "IN PROGRESS reviewing security group rules for our private SQL databases.",
    timestamp: "11:25 AM",
    keyword: "IN PROGRESS"
  },
  {
    id: "p-7",
    sender: "Pushpak",
    text: "BLOCKER: Our developer staging site domain is returning a 502 Bad Gateway response; troubleshooting reverse proxy config.",
    timestamp: "12:10 PM",
    keyword: "BLOCKER"
  },
  {
    id: "p-8",
    sender: "Pushpak",
    text: "TO BE DONE: Set up health checkers for our primary cloud run containers.",
    timestamp: "1:15 PM",
    keyword: "TO BE DONE"
  },
  {
    id: "p-9",
    sender: "Pushpak",
    text: "COMPLETED migrating static assets to Google CDN storage buckets.",
    timestamp: "1:45 PM",
    keyword: "Completed"
  },
  {
    id: "p-10",
    sender: "Pushpak",
    text: "IN PROGRESS fine-tuning the restart criteria for node process managers.",
    timestamp: "2:10 PM",
    keyword: "IN PROGRESS"
  },
  {
    id: "p-11",
    sender: "Pushpak",
    text: "BLOCKER: Certbot fails on challenge verification due to firewall restriction on port 80.",
    timestamp: "2:50 PM",
    keyword: "BLOCKER"
  },
  {
    id: "p-12",
    sender: "Pushpak",
    text: "TO BE DONE: Create an admin panel access policy template for team roles.",
    timestamp: "3:15 PM",
    keyword: "TO BE DONE"
  },
  {
    id: "p-13",
    sender: "Pushpak",
    text: "COMPLETED configuring logging scopes inside our development environment.",
    timestamp: "3:40 PM",
    keyword: "Completed"
  },
  {
    id: "p-14",
    sender: "Pushpak",
    text: "IN PROGRESS configuring a lightweight backup worker thread in Node.",
    timestamp: "4:05 PM",
    keyword: "IN PROGRESS"
  },
  {
    id: "p-15",
    sender: "Pushpak",
    text: "BLOCKER: High latency reported across Asian region server clusters; reviewing routing targets.",
    timestamp: "4:30 PM",
    keyword: "BLOCKER"
  },
  {
    id: "p-16",
    sender: "Pushpak",
    text: "TO BE DONE: Test performance of auto-scaling metrics under load.",
    timestamp: "4:45 PM",
    keyword: "TO BE DONE"
  },
  {
    id: "p-17",
    sender: "Pushpak",
    text: "COMPLETED updating Node engine constraints inside package.json to v22 LTS.",
    timestamp: "5:00 PM",
    keyword: "Completed"
  },

  // --- Vaibhali (20 messages) ---
  {
    id: "v-1",
    sender: "Vaibhali",
    text: "COMPLETED the responsive draft for the team leader dashboard homepage.",
    timestamp: "8:10 AM",
    keyword: "Completed"
  },
  {
    id: "v-2",
    sender: "Vaibhali",
    text: "IN PROGRESS adding Framer Motion layout transitions for selected state views.",
    timestamp: "8:40 AM",
    keyword: "IN PROGRESS"
  },
  {
    id: "v-3",
    sender: "Vaibhali",
    text: "BLOCKER: Recharts bar chart colors are clashing horribly with dark theme requirements.",
    timestamp: "9:10 AM",
    keyword: "BLOCKER"
  },
  {
    id: "v-4",
    sender: "Vaibhali",
    text: "TO BE DONE: Implement the list navigation structure for the user selection sidebar.",
    timestamp: "9:35 AM",
    keyword: "TO BE DONE"
  },
  {
    id: "v-5",
    sender: "Vaibhali",
    text: "COMPLETED creating reusable button sets with tailwind transition duration configs.",
    timestamp: "10:00 AM",
    keyword: "Completed"
  },
  {
    id: "v-6",
    sender: "Vaibhali",
    text: "IN PROGRESS refining the loading spinners with custom-styled keyframes.",
    timestamp: "10:30 AM",
    keyword: "IN PROGRESS"
  },
  {
    id: "v-7",
    sender: "Vaibhali",
    text: "BLOCKER: Touch targets on the mobile drawer represent less than 44px; need to rewrite spacing rules.",
    timestamp: "11:00 AM",
    keyword: "BLOCKER"
  },
  {
    id: "v-8",
    sender: "Vaibhali",
    text: "TO BE DONE: Configure custom font weights for Inter display styles across layout cards.",
    timestamp: "11:30 AM",
    keyword: "TO BE DONE"
  },
  {
    id: "v-9",
    sender: "Vaibhali",
    text: "COMPLETED cleaning the duplicate Tailwind layers within the main stylesheet.",
    timestamp: "12:00 PM",
    keyword: "Completed"
  },
  {
    id: "v-10",
    sender: "Vaibhali",
    text: "IN PROGRESS connecting mock state inputs with active client viewports.",
    timestamp: "1:00 PM",
    keyword: "IN PROGRESS"
  },
  {
    id: "v-11",
    sender: "Vaibhali",
    text: "BLOCKER: The SVG generator is dropping linear attributes on standard iOS builds.",
    timestamp: "1:30 PM",
    keyword: "BLOCKER"
  },
  {
    id: "v-12",
    sender: "Vaibhali",
    text: "TO BE DONE: Re-adjust grid columns inside the history listing section.",
    timestamp: "2:00 PM",
    keyword: "TO BE DONE"
  },
  {
    id: "v-13",
    sender: "Vaibhali",
    text: "COMPLETED implementing responsive paddings to fit 13-inch laptop viewports nicely.",
    timestamp: "2:30 PM",
    keyword: "Completed"
  },
  {
    id: "v-14",
    sender: "Vaibhali",
    text: "IN PROGRESS mapping interactive user details into the top-right header view.",
    timestamp: "3:00 PM",
    keyword: "IN PROGRESS"
  },
  {
    id: "v-15",
    sender: "Vaibhali",
    text: "BLOCKER: React re-renders infinitely when selecting users fast due to un-memoized context filters.",
    timestamp: "3:30 PM",
    keyword: "BLOCKER"
  },
  {
    id: "v-16",
    sender: "Vaibhali",
    text: "TO BE DONE: Introduce standard keyboard accessibility handlers for drawer toggles.",
    timestamp: "4:00 PM",
    keyword: "TO BE DONE"
  },
  {
    id: "v-17",
    sender: "Vaibhali",
    text: "COMPLETED the high fidelity wireframes for audit record print screens.",
    timestamp: "4:30 PM",
    keyword: "Completed"
  },
  {
    id: "v-18",
    sender: "Vaibhali",
    text: "IN PROGRESS adjusting border-radius properties to align with modern Swiss minimal theme.",
    timestamp: "4:50 PM",
    keyword: "IN PROGRESS"
  },
  {
    id: "v-19",
    sender: "Vaibhali",
    text: "BLOCKER: Hover scales trigger scrollbars on 1080p outputs.",
    timestamp: "5:10 PM",
    keyword: "BLOCKER"
  },
  {
    id: "v-20",
    sender: "Vaibhali",
    text: "TO BE DONE: Discuss modal exit transitions with design team layout specialists.",
    timestamp: "5:30 PM",
    keyword: "TO BE DONE"
  },

  // --- Adarsh (6 messages) ---
  {
    id: "a-1",
    sender: "Adarsh",
    text: "COMPLETED drafting the service level agreement files (SLA) for active review.",
    timestamp: "9:00 AM",
    keyword: "Completed"
  },
  {
    id: "a-2",
    sender: "Adarsh",
    text: "IN PROGRESS reviewing security compliance criteria to make sure credentials are kept server-side.",
    timestamp: "10:30 AM",
    keyword: "IN PROGRESS"
  },
  {
    id: "a-3",
    sender: "Adarsh",
    text: "BLOCKER: Client feedback is delayed by 2 days; still waiting for validation on the billing API flow.",
    timestamp: "12:00 PM",
    keyword: "BLOCKER"
  },
  {
    id: "a-4",
    sender: "Adarsh",
    text: "TO BE DONE: Clean the master spreadsheet data columns before uploading back into Supabase tables.",
    timestamp: "1:30 PM",
    keyword: "TO BE DONE"
  },
  {
    id: "a-5",
    sender: "Adarsh",
    text: "COMPLETED generating standard API response error documentation rules.",
    timestamp: "3:00 PM",
    keyword: "Completed"
  },
  {
    id: "a-6",
    sender: "Adarsh",
    text: "IN PROGRESS writing standard guidelines templates for daily standup keywords.",
    timestamp: "4:30 PM",
    keyword: "IN PROGRESS"
  },

  // --- Usha (15 messages) ---
  {
    id: "u-1",
    sender: "Usha",
    text: "COMPLETED writing unit tests for our customized Gemini prompt sanitizers.",
    timestamp: "8:00 AM",
    keyword: "Completed"
  },
  {
    id: "u-2",
    sender: "Usha",
    text: "IN PROGRESS designing a validation matrix for JSON response structure mapping.",
    timestamp: "8:50 AM",
    keyword: "IN PROGRESS"
  },
  {
    id: "u-3",
    sender: "Usha",
    text: "BLOCKER: Testing server quota has been hit; calls to gemini-3.5-flash are failing on client keys.",
    timestamp: "9:40 AM",
    keyword: "BLOCKER"
  },
  {
    id: "u-4",
    sender: "Usha",
    text: "TO BE DONE: Update schema mappings inside PostgreSQL schemas to accommodate detailed summary ticket fields.",
    timestamp: "10:30 AM",
    keyword: "TO BE DONE"
  },
  {
    id: "u-5",
    sender: "Usha",
    text: "COMPLETED auditing user authentication routines to secure token headers.",
    timestamp: "11:10 AM",
    keyword: "Completed"
  },
  {
    id: "u-6",
    sender: "Usha",
    text: "IN PROGRESS measuring response generation latency of Gemini vs structural prompt formats.",
    timestamp: "11:50 AM",
    keyword: "IN PROGRESS"
  },
  {
    id: "u-7",
    sender: "Usha",
    text: "BLOCKER: Standard test dataset is returning null value categories on specific edge-case standup entries.",
    timestamp: "1:00 PM",
    keyword: "BLOCKER"
  },
  {
    id: "u-8",
    sender: "Usha",
    text: "TO BE DONE: Test dynamic batch processing using small sliding windows.",
    timestamp: "1:45 PM",
    keyword: "TO BE DONE"
  },
  {
    id: "u-9",
    sender: "Usha",
    text: "COMPLETED checking code structures against strict linter guidelines.",
    timestamp: "2:30 PM",
    keyword: "Completed"
  },
  {
    id: "u-10",
    sender: "Usha",
    text: "IN PROGRESS mapping the structural JSON parser endpoints with Express routes.",
    timestamp: "3:15 PM",
    keyword: "IN PROGRESS"
  },
  {
    id: "u-11",
    sender: "Usha",
    text: "BLOCKER: Missing env configs for standard JWT security keys inside build system container variables.",
    timestamp: "3:50 PM",
    keyword: "BLOCKER"
  },
  {
    id: "u-12",
    sender: "Usha",
    text: "TO BE DONE: Refactor response helper helper functions for generic reuse.",
    timestamp: "4:15 PM",
    keyword: "TO BE DONE"
  },
  {
    id: "u-13",
    sender: "Usha",
    text: "COMPLETED the optimization of raw input prompts reducing input tokens size by 30%.",
    timestamp: "4:40 PM",
    keyword: "Completed"
  },
  {
    id: "u-14",
    sender: "Usha",
    text: "IN PROGRESS benchmarking parallel API dispatch triggers.",
    timestamp: "5:00 PM",
    keyword: "IN PROGRESS"
  },
  {
    id: "u-15",
    sender: "Usha",
    text: "TO BE DONE: Sync standard unit test assertions with actual model responses.",
    timestamp: "5:15 PM",
    keyword: "TO BE DONE"
  },

  // --- Naga (11 messages) ---
  {
    id: "n-1",
    sender: "Naga",
    text: "COMPLETED deploying the frontend codebase to the server staging server node.",
    timestamp: "8:40 AM",
    keyword: "Completed"
  },
  {
    id: "n-2",
    sender: "Naga",
    text: "IN PROGRESS monitoring system health graphs on active memory utilization.",
    timestamp: "9:50 AM",
    keyword: "IN PROGRESS"
  },
  {
    id: "n-3",
    sender: "Naga",
    text: "BLOCKER: Live websockets are periodically disconnecting on poor wifi connections with no automatic reconnection.",
    timestamp: "10:30 AM",
    keyword: "BLOCKER"
  },
  {
    id: "n-4",
    sender: "Naga",
    text: "TO BE DONE: Code clean re-try capabilities to prevent web socket drop failures.",
    timestamp: "11:20 AM",
    keyword: "TO BE DONE"
  },
  {
    id: "n-5",
    sender: "Naga",
    text: "COMPLETED setting up standard redirect rules with ssl redirection targets.",
    timestamp: "12:50 PM",
    keyword: "Completed"
  },
  {
    id: "n-6",
    sender: "Naga",
    text: "IN PROGRESS writing shell script routines to clean tmp logging folder data.",
    timestamp: "2:00 PM",
    keyword: "IN PROGRESS"
  },
  {
    id: "n-7",
    sender: "Naga",
    text: "BLOCKER: Nginx rejects large standup update inputs with 413 payload too large errors.",
    timestamp: "2:50 PM",
    keyword: "BLOCKER"
  },
  {
    id: "n-8",
    sender: "Naga",
    text: "TO BE DONE: Readjust reverse-proxy max client body attributes.",
    timestamp: "3:40 PM",
    keyword: "TO BE DONE"
  },
  {
    id: "n-9",
    sender: "Naga",
    text: "COMPLETED cleaning the dev branch directory to minimize file diffs before merging.",
    timestamp: "4:20 PM",
    keyword: "Completed"
  },
  {
    id: "n-10",
    sender: "Naga",
    text: "IN PROGRESS optimizing DNS resolution timeouts within standard routes.",
    timestamp: "4:50 PM",
    keyword: "IN PROGRESS"
  },
  {
    id: "n-11",
    sender: "Naga",
    text: "TO BE DONE: Update deployment scripts to support dynamic database credentials fetching.",
    timestamp: "5:10 PM",
    keyword: "TO BE DONE"
  }
];
