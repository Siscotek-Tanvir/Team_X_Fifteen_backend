import { IEvent } from "./event.interface";

export const eventSearchableFields = [
  "title",
  "subtitle",
  "category",
  "department",
  "organizer",
  "location",
  "roomNumber",
  "shortDescription",
  "fullDescription",
  "tags",
  "type",
];

export const EVENTS_DATA: IEvent[] = [
  {
    id: "edu-mind-mastery-2026",
    title: "The Psychology of Strategic Living",
    subtitle: "Understand your mind. Design your life. Lead with purpose.",
    type: "workshop",
    category: "Mind Mastery & Psychology",
    department: "Center for Professional Development and Change (CPDC)",
    organizer: "CPDC & School of Business Administration",
    date: "2026-09-10",
    displayDate: "Thursday, September 10, 2026",
    time: "3:00 PM – 5:00 PM",
    location: "East Delta University Permanent Campus",
    roomNumber: "Auditorium & Novus Studio",
    fee: "Free for Registered Students",
    capacity: 120,
    registeredCount: 88,
    coverImage: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
    tags: ["Psychology", "Strategy", "Cognitive Appraisal", "REBT", "Self-Regulation"],
    shortDescription: "Master cognitive tools, emotional calibration, and intentional life planning guided by certified human capital strategists.",
    fullDescription: "The Center for Professional Development and Change (CPDC) at East Delta University presents \"The Psychology of Strategic Living\"—an intensive, transformative workshop engineered to help university scholars, young executives, and future leaders decode cognitive patterns and harness practical behavioral science.\n\nParticipants will dive deep into actionable frameworks including Rational Emotive Behaviour Therapy (REBT) foundations, managing internal emotional friction, and implementing systematic daily domino loops to turn academic potential into career resilience.",
    learningOutcomes: [
      "Interpretation and Cognitive Appraisal Theory in high-pressure decision making",
      "Overthinking deconstruction and REBT (Rational Emotive Behaviour Therapy)",
      "Developing a high-agency Strategic Mindset for leadership",
      "The Domino Effect: Small behavioral shifts driving outsized career momentum",
      "Strategic Planning combined with sustainable emotional Self-Regulation",
      "Energy and biological rhythm management for peak intellectual performance"
    ],
    prerequisites: [
      "Open to all undergraduate and postgraduate EDU students",
      "Notebook or tablet for personal reflection exercises"
    ],
    schedule: [
      { time: "02:45 PM", activity: "Registration & Welcome Coffee", description: "Check-in at the Novus Hall entrance and receive workshop booklet" },
      { time: "03:00 PM", activity: "Session 1: Cognitive Appraisal & Mind Mapping", description: "Deconstructing emotional triggers and mental bottlenecks", speakerName: "Rawnak Afroze, SHRM-CP" },
      { time: "03:50 PM", activity: "Interactive Lab: Overthinking Breakdown & REBT Practice", description: "Hands-on live case simulations in small cohorts" },
      { time: "04:30 PM", activity: "Strategic Blueprinting & Domino Planning", description: "Drafting your personalized 90-day intentional living roadmap" },
      { time: "04:50 PM", activity: "Open Q&A & Certificate Distribution", description: "Direct dialogue with the facilitator" }
    ],
    speakers: [
      {
        id: "spk-rawnak-afroze",
        name: "Rawnak Afroze, SHRM-CP",
        title: "Assistant Professor & Director",
        organization: "Center for Professional Development & Change (CPDC), East Delta University",
        credentials: "BSc Psychology, MA Human Resources Management & Industrial Relations, Certified Professional SHRM",
        avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
        bio: "Rawnak Afroze is an Assistant Professor in the School of Business Administration and Director of the Center for Professional Development and Change (CPDC) at East Delta University. With advanced research credentials in organizational psychology and human resources, she specializes in behavioral therapy frameworks, workplace leadership, and evidence-based self-regulation strategies for emerging professionals.",
        email: "rawnak.afroze@eastdelta.edu.bd",
        linkedin: "https://linkedin.com"
      }
    ],
    featured: true,
    status: "upcoming",
    contactEmail: "cpdc@eastdelta.edu.bd",
    contactPhone: "+880 1311 104531",
    createdAt: "2026-08-01"
  },
  {
    id: "edu-corporate-world-seminar",
    title: "Inside the Corporate World: Skills, Strategy, Success",
    subtitle: "#CampusToCorporate — Navigating Top-Tier Corporate & Banking Hierarchies",
    type: "seminar",
    category: "Career & Corporate Strategy",
    department: "EDU Career Club",
    organizer: "East Delta University Career Club",
    date: "2026-10-08",
    displayDate: "Wednesday, October 08, 2026",
    time: "3:00 PM – 5:30 PM",
    location: "East Delta University Permanent Campus",
    roomNumber: "Seminar Hall 1",
    fee: "Free Registration for EDUvians",
    capacity: 250,
    registeredCount: 215,
    coverImage: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
    tags: ["CampusToCorporate", "Banking", "HR Strategy", "Executive Presence", "Networking"],
    shortDescription: "Join industry heads from BRAC Bank and The Peninsula Chittagong to demystify recruitment criteria, executive presence, and strategic promotion.",
    fullDescription: "The East Delta University Career Club presents \"Inside the Corporate World: Skills, Strategy, Success\" as part of the flagship #CampusToCorporate initiative. This seminar bridges the divide between academia and modern enterprise demands, bringing seasoned senior executives to discuss real corporate dynamics, hiring algorithms, interview psychology, and rapid workplace trajectory.",
    learningOutcomes: [
      "Understanding what senior HR directors look for beyond GPA",
      "Corporate communication, professional ethics, and cross-functional team dynamics",
      "Banking sector career ladders and financial management tracks",
      "Negotiation techniques, portfolio presentation, and LinkedIn optimization"
    ],
    schedule: [
      { time: "03:00 PM", activity: "Opening Remarks & Career Club Keynote", description: "Brief overview of 2026 graduate placement statistics" },
      { time: "03:20 PM", activity: "Executive HR Insights: The Recruiter’s Lens", description: "Navigating selection rounds and interview readiness", speakerName: "Protik Bhattacharjee" },
      { time: "04:05 PM", activity: "Banking & Financial Sector Leadership", description: "Strategy and leadership in modern commercial banking", speakerName: "Aloka Sarah" },
      { time: "04:45 PM", activity: "Panel Discussion & Live Student Q&A", description: "Direct audience interrogation with both panelists" }
    ],
    speakers: [
      {
        id: "spk-protik-bhattacharjee",
        name: "Protik Bhattacharjee",
        title: "Head of HR and Administration",
        organization: "The Peninsula Chittagong",
        credentials: "Senior HR Strategist & Corporate Trainer",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
        bio: "Protik Bhattacharjee is the Head of Human Resources and Administration at The Peninsula Chittagong. With over 14 years of executive leadership in talent acquisition, institutional training, and corporate administration, he has mentored hundreds of university graduates into top corporate placement."
      },
      {
        id: "spk-aloka-sarah",
        name: "Aloka Sarah",
        title: "Cluster Manager",
        organization: "BRAC Bank Ltd.",
        credentials: "Senior Banking Executive & Financial Operations Lead",
        avatarUrl: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=600&q=80",
        bio: "Aloka Sarah is a Cluster Manager at BRAC Bank Ltd., leading major branch operations and corporate client services. She is a dedicated mentor for youth empowerment and banking sector leadership."
      }
    ],
    featured: true,
    status: "upcoming",
    contactEmail: "career.club@eastdelta.edu.bd",
    contactPhone: "+880 1311 104532",
    createdAt: "2026-08-05"
  },
  {
    id: "edu-tech-insights-seminar",
    title: "Tech Insights Seminar: Code, Create, Lead",
    subtitle: "Student Skills for a Modern Software & AI Engineering Career",
    type: "seminar",
    category: "Technology & AI",
    department: "School of Science, Engineering & Technology",
    organizer: "EDU Career Club & Computing Club",
    date: "2026-02-05",
    displayDate: "Thursday, February 05, 2026",
    time: "1:30 PM – 4:00 PM",
    location: "East Delta University Permanent Campus",
    roomNumber: "Seminar Hall 2",
    fee: "Free Registration",
    capacity: 180,
    registeredCount: 164,
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    tags: ["SoftwareEngineering", "RemoteWork", "TechCareer", "AI", "FullStack"],
    shortDescription: "Discover tech career roadmaps, remote global engineering opportunities, and how to avoid early industry pitfalls with global software leaders.",
    fullDescription: "Technology is evolving faster than traditional curricula. In this seminar, high-impact engineers and academy founders will reveal the exact tools, portfolio construction strategies, and remote international workflows required to stand out in the competitive global software ecosystem.",
    learningOutcomes: [
      "Tech Career Roadmaps: Architecting a focused 4-year software trajectory",
      "Industry Pitfalls: Real case lessons from junior to senior engineering",
      "Remote Global Opportunities & asynchronous work culture mastery",
      "Open-source contributions, Git workflows, and technical interview preparation"
    ],
    schedule: [
      { time: "01:30 PM", activity: "Opening Keynote: The 2026 Tech Landscape", description: "Introduction to global developer trends and AI integration" },
      { time: "02:00 PM", activity: "From Code to Product: Real-World Architecture", description: "Building scalable software systems and surviving production", speakerName: "Md Shahriar Alam" },
      { time: "02:50 PM", activity: "Working Remotely for International Tech Giants", description: "Overcoming geographic barriers and mastering async collaboration", speakerName: "Rashedul Alam" },
      { time: "03:35 PM", activity: "Student Code Review & Career AMA", description: "Live questions on tech stacks and hiring tips" }
    ],
    speakers: [
      {
        id: "spk-shahriar-alam",
        name: "Md Shahriar Alam",
        title: "CEO & Founder",
        organization: "CRL Academy",
        credentials: "Tech Entrepreneur, Senior Software Architect",
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
        bio: "Md Shahriar Alam is the CEO & Founder of CRL Academy, empowering thousands of software engineers with advanced programming, systems design, and industry-grade engineering workflows."
      },
      {
        id: "spk-rashedul-alam",
        name: "Rashedul Alam",
        title: "Senior Integration Engineer",
        organization: "SuperAnnotate",
        credentials: "Full-Stack & Cloud Systems Specialist",
        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
        bio: "Rashedul Alam is a Senior Integration Engineer at SuperAnnotate, working at the forefront of AI training data infrastructure and distributed cloud integrations across international teams."
      }
    ],
    featured: true,
    status: "upcoming",
    contactEmail: "career.club@eastdelta.edu.bd",
    createdAt: "2026-08-08"
  },
  {
    id: "edu-mind-mastery-deep-workshop",
    title: "Mind Mastery & Daily Alignment Workshop",
    subtitle: "A Practical Transformation Workshop with Behavioral Therapy Techniques",
    type: "workshop",
    category: "Mind Mastery & Psychology",
    department: "Center for Professional Development and Change (CPDC)",
    organizer: "CPDC East Delta University",
    date: "2026-05-09",
    displayDate: "Saturday, May 09, 2026",
    time: "12:00 PM – 4:00 PM",
    location: "East Delta University Permanent Campus",
    roomNumber: "Novus Executive Room",
    fee: "BDT 2,000 (EDUvians) / BDT 2,500 (Outsiders)",
    capacity: 45,
    registeredCount: 41,
    coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    tags: ["MindMastery", "DichotomyOfControl", "MentalClarity", "BehavioralTherapy", "CPDC"],
    shortDescription: "Intensive 4-hour hands-on masterclass focusing on breaking repetitive stress patterns, emotional calibration, and dichotomy of control.",
    fullDescription: "This comprehensive 4-hour deep-immersion workshop provides hands-on practical tools rooted in cognitive psychology and adult learning methodologies. Co-facilitated by international educator Sunali Singh and Assistant Professor Rawnak Afroze, attendees will engage in personalized behavioral auditing to unlock unwavering daily clarity.",
    learningOutcomes: [
      "Clarity & Focus: Cutting through information paralysis",
      "Fear Mastery & converting anxiety into constructive kinetic action",
      "Life Alignment: Harmonizing academic ambition with mental well-being",
      "Breaking repetitive toxic patterns through behavioral substitution",
      "Applied Dichotomy of Control for high-stake corporate and academic environments"
    ],
    prerequisites: [
      "Registration confirmation & payment verification",
      "Commitment to full 4-hour immersive session"
    ],
    schedule: [
      { time: "12:00 PM", activity: "Module 1: Clarity, Focus & Cognitive Noise Elimination", description: "Diagnosing mental fatigue points", speakerName: "Sunali Singh" },
      { time: "01:15 PM", activity: "Module 2: The Dichotomy of Control & Fear Calibration", description: "Stoic and psychological frameworks applied to modern careers", speakerName: "Rawnak Afroze" },
      { time: "02:30 PM", activity: "Module 3: Behavioral Therapy Techniques in Action", description: "Interactive triad exercises on pattern disruption", speakerName: "Sunali Singh & Rawnak Afroze" },
      { time: "03:30 PM", activity: "Executive Reflection & Action Plan Handover", description: "Personalized feedback and official CPDC certification" }
    ],
    speakers: [
      {
        id: "spk-sunali-singh",
        name: "Sunali Singh",
        title: "International Educator & HR Consultant",
        organization: "CIP Insurance Institute Toronto / British Council CELTA",
        credentials: "B.Com, B.Ed, Adult Ed (St. Francis University, NP, Canada), CIP Toronto, CELTA",
        avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
        bio: "Sunali Singh is a globally credentialed adult educator and HR training specialist with certifications from St. Francis University (Canada), CIP Insurance Institute Toronto, XLRI Jamshedpur, and the British Council. She focuses on cognitive alignment and communicative clarity."
      },
      {
        id: "spk-rawnak-afroze-2",
        name: "Rawnak Afroze, SHRM-CP",
        title: "Assistant Professor & Director CPDC",
        organization: "East Delta University",
        credentials: "BSc Psychology, MA HRM, Certified SHRM-CP",
        avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
        bio: "Assistant Professor of Human Resource Management and Director of CPDC at East Delta University, leading strategic transformation programs for academic and corporate bodies."
      }
    ],
    featured: false,
    status: "upcoming",
    contactEmail: "cpdc@eastdelta.edu.bd",
    contactPhone: "+880 1311 104534",
    createdAt: "2026-08-10"
  },
  {
    id: "edu-career-roadmap-seminar",
    title: "Seminar on Career Roadmap",
    subtitle: "Uncover new opportunities, master innovative strategies, and plan your 4-year tech trajectory",
    type: "seminar",
    category: "Career & Corporate Strategy",
    department: "Department of Computer Science & Engineering",
    organizer: "EDU Computing Club (EUCC)",
    date: "2026-02-25",
    displayDate: "Tuesday, February 25, 2026",
    time: "12:30 PM – 2:30 PM",
    location: "East Delta University Permanent Campus",
    roomNumber: "CSE Department Room-416",
    fee: "Free Registration",
    capacity: 100,
    registeredCount: 95,
    coverImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    tags: ["EUCC", "Roadmap", "CSE", "CompetitiveProgramming", "CareerStrategy"],
    shortDescription: "Practical blueprint designed by computing club leaders for freshmen and sophomores to master competitive programming, project development, and internships.",
    fullDescription: "Organized by the Eastern / EDU Computing Club, this seminar maps out the definitive semester-by-semester tech roadmap. Learn how to balance academic CGPA with open-source engineering, hackathons, and global fellowship opportunities.",
    learningOutcomes: [
      "Mastering data structures & algorithms milestones by semester 4",
      "Crafting production-grade capstone projects that attract recruiter calls",
      "Building competitive programming momentum with Codeforces and LeetCode",
      "How to land high-paying software engineering internships before graduation"
    ],
    schedule: [
      { time: "12:30 PM", activity: "Welcome & Introduction to Computing Wing", speakerName: "Salman Farshe" },
      { time: "12:50 PM", activity: "Competitive Coding & Problem Solving Track", speakerName: "Shahriar Kabir Omi" },
      { time: "01:30 PM", activity: "Software Engineering & Hackathon Strategy", speakerName: "Towsif Ibny Hassan" },
      { time: "02:00 PM", activity: "Club Mentorship Program & Networking", speakerName: "Dibbojit Das Joy" }
    ],
    speakers: [
      {
        id: "spk-salman-farshe",
        name: "Salman Farshe",
        title: "President",
        organization: "EDU Computing Club (EUCC)",
        bio: "Leading the flagship computing association at the university with a focus on student skill acceleration and national competition participation."
      },
      {
        id: "spk-towsif-hassan",
        name: "Towsif Ibny Hassan",
        title: "General Secretary",
        organization: "EDU Computing Club (EUCC)",
        bio: "Full-stack engineering enthusiast and coordinator of university-wide coding bootcamps and industry mentorship pairings."
      },
      {
        id: "spk-shahriar-omi",
        name: "Shahriar Kabir Omi",
        title: "Programming Secretary",
        organization: "EDU Computing Club (EUCC)",
        bio: "Competitive programmer and trainer guiding student cohorts in algorithmic thinking and contest readiness."
      },
      {
        id: "spk-dibbojit-joy",
        name: "Dibbojit Das Joy",
        title: "Organizing Secretary",
        organization: "EDU Computing Club (EUCC)",
        bio: "Organizing lead for university hackathons, robotics showcases, and tech symposia."
      }
    ],
    featured: false,
    status: "upcoming",
    contactEmail: "computing.club@eastdelta.edu.bd",
    createdAt: "2026-08-11"
  },
  {
    id: "edu-leadership-governance-seminar",
    title: "University Leadership & Student Governance Symposium",
    subtitle: "Institutional Policy, Global Fellowships & Youth Leadership Strategies",
    type: "seminar",
    category: "Student Life & Leadership",
    department: "Office of Student Affairs",
    organizer: "East Delta University Student Council & Leadership Wing",
    date: "2026-10-15",
    displayDate: "Thursday, October 15, 2026",
    time: "10:00 AM – 1:00 PM",
    location: "East Delta University Permanent Campus",
    roomNumber: "Main Campus Grand Auditorium",
    fee: "Free Registration for EDUvians",
    capacity: 400,
    registeredCount: 320,
    coverImage: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80",
    tags: ["Leadership", "Governance", "Fellowships", "GlobalPolicy", "Networking"],
    shortDescription: "Flagship academic symposium exploring student governance, international fellowship opportunities, and ethical institutional leadership.",
    fullDescription: "The East Delta University Leadership & Student Governance Symposium brings together faculty deans, student body executives, and international youth leadership alumni to address 21st-century civic strategy, higher education governance, and fellowship pathways.",
    learningOutcomes: [
      "Formulating student-led research initiatives and academic policy proposals",
      "Applying for Rhodes, Erasmus Mundus, and Fulbright youth fellowships",
      "Cross-departmental collaboration and consensus building"
    ],
    schedule: [
      { time: "10:00 AM", activity: "Inauguration & Presidential Keynote", speakerName: "Prof. Dr. M. Sekandar Khan" },
      { time: "11:00 AM", activity: "Panel: High-Impact Governance & Student Societies" },
      { time: "12:00 PM", activity: "Global Fellowships & Higher Education Trajectories" },
      { time: "12:45 PM", activity: "Closing Remarks & Leadership Certification" }
    ],
    speakers: [
      {
        id: "spk-vc-office",
        name: "Prof. Dr. M. Sekandar Khan",
        title: "Vice Chancellor & Keynote Speaker",
        organization: "East Delta University",
        bio: "Eminent academician and economist championing experiential learning, student leadership, and global university partnerships."
      }
    ],
    featured: true,
    status: "upcoming",
    contactEmail: "leadership@eastdelta.edu.bd",
    createdAt: "2026-08-12"
  },
  {
    id: "edu-women-leadership-seminar",
    title: "Women in Enterprise: Leadership & Venture Seminar",
    subtitle: "Celebrating Trailblazing Female Founders & Micro-Grant Opportunities",
    type: "seminar",
    category: "Entrepreneurship & Innovation",
    department: "Center for Professional Development and Change (CPDC)",
    organizer: "CPDC & Women in Enterprise Wing",
    date: "2026-08-19",
    displayDate: "Wednesday, August 19, 2026",
    time: "4:00 PM – 6:30 PM",
    location: "East Delta University Permanent Campus",
    roomNumber: "Grand Auditorium & Novus Hall",
    fee: "Free Registration",
    capacity: 300,
    registeredCount: 290,
    coverImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80",
    tags: ["WomenInLeadership", "Entrepreneurship", "Empowerment", "VentureCapital"],
    shortDescription: "Executive keynote and panel celebrating female trailblazers in Bangladesh and announcing direct seed grants for student-led enterprise ventures.",
    fullDescription: "East Delta University proudly presents the Women in Enterprise Seminar to mentor and financially guide emerging female innovators, researchers, and future enterprise heads. The session features a keynote with celebrated entrepreneur Sadia Taher.",
    learningOutcomes: [
      "Overcoming market barriers in consumer product and digital services sectors",
      "Accessing EDU seed funding and venture grants for young founders",
      "Building sustainable personal branding and community-oriented businesses"
    ],
    schedule: [
      { time: "04:00 PM", activity: "Welcome Address & Venture Charter Presentation" },
      { time: "04:30 PM", activity: "Keynote: The Modern Culinary Venture Journey", speakerName: "Sadia Taher" },
      { time: "05:30 PM", activity: "Student Venture Seed Grant Rollout" },
      { time: "06:15 PM", activity: "Networking High Tea & Faculty Mentorship Circles" }
    ],
    speakers: [
      {
        id: "spk-sadia-taher",
        name: "Sadia Taher",
        title: "Culinary Entrepreneur & Title Winner",
        organization: "Shera Radhuni (1427) & Food Ventures",
        credentials: "National Culinary Champion & Business Mentor",
        avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
        bio: "Sadia Taher is a celebrated national entrepreneur, title winner of Shera Radhuni 1427, and advocate for women’s economic independence through artisanal and food service enterprises."
      }
    ],
    featured: false,
    status: "upcoming",
    contactEmail: "women.fund@eastdelta.edu.bd",
    createdAt: "2026-08-14"
  },
  {
    id: "edu-hult-prize-masterclass",
    title: "Hult Prize at EDU: Pitching for Global Impact",
    subtitle: "Case Studies from 1st Runners Up Team Sustivo on Sustainable Business",
    type: "workshop",
    category: "Entrepreneurship & Innovation",
    department: "School of Business Administration",
    organizer: "Hult Prize On Campus Committee",
    date: "2026-11-12",
    displayDate: "Thursday, November 12, 2026",
    time: "2:00 PM – 5:00 PM",
    location: "East Delta University Permanent Campus",
    roomNumber: "Innovation Studio 3",
    fee: "Free Registration",
    capacity: 60,
    registeredCount: 52,
    coverImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
    tags: ["HultPrize", "Sustivo", "SocialImpact", "StartupPitch", "SDGs"],
    shortDescription: "Master the art of venture pitching, UN SDG alignment, and global competition presentation guided by national finalists.",
    fullDescription: "Team Sustivo, 1st Runners Up at Hult Prize East Delta University, leads an interactive masterclass on converting green ideas into investable social business models. Learn storytelling, unit economics, and slide deck structuring.",
    learningOutcomes: [
      "Formulating a viable SDG-driven business pitch deck",
      "Unit economics and sustainable supply chain validation",
      "Stage presence and handling tough judging panel inquiries"
    ],
    schedule: [
      { time: "02:00 PM", activity: "Hult Prize Global Challenge Briefing" },
      { time: "02:30 PM", activity: "Dissecting the Sustivo Pitch: What Worked & What Failed", speakerName: "Mohammad Maruf Chowdhury" },
      { time: "03:45 PM", activity: "Live 3-Minute Lightning Pitch Workshop with Feedback", speakerName: "Bin Yamin Ibne Yakub Oni" }
    ],
    speakers: [
      {
        id: "spk-maruf-chowdhury",
        name: "Mohammad Maruf Chowdhury",
        title: "Co-Founder & Lead Strategist",
        organization: "Team Sustivo (Hult Prize 1st Runners Up)",
        bio: "Undergraduate innovator specializing in eco-conscious product manufacturing and circular business frameworks."
      },
      {
        id: "spk-bin-yamin",
        name: "Bin Yamin Ibne Yakub Oni",
        title: "Operations & Research Lead",
        organization: "Team Sustivo",
        bio: "Sustainability researcher working on climate impact analysis and student venture acceleration."
      }
    ],
    featured: false,
    status: "upcoming",
    contactEmail: "hultprize@eastdelta.edu.bd",
    createdAt: "2026-08-16"
  },
  {
    id: "edu-pohela-boishakh-cultural",
    title: "Pohela Boishakh Craft & Heritage Workshop",
    subtitle: "Weaving Traditions, Bengali Folk Art & Loom Heritage (1433 Bangabda)",
    type: "workshop",
    category: "Culture & Arts",
    department: "EDU Cultural Club",
    organizer: "East Delta University Cultural & Heritage Society",
    date: "2026-04-14",
    displayDate: "Tuesday, April 14, 2026",
    time: "10:00 AM – 3:00 PM",
    location: "East Delta University Open Courtyard",
    roomNumber: "Loom Studio & Open Pavilion",
    fee: "BDT 500 (Includes Art Kit)",
    capacity: 80,
    registeredCount: 78,
    coverImage: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80",
    tags: ["BengaliHeritage", "Handloom", "FolkArt", "Culture", "PohelaBoishakh"],
    shortDescription: "Hands-on folk art, terracotta painting, and traditional handloom weaving masterclass celebrating Bengali New Year traditions.",
    fullDescription: "Immerse in the rich aesthetic heritage of Bengal. Master artisans and folk painters guide students through hands-on handloom weaving, traditional motif painting, and cultural tapestry crafting.",
    learningOutcomes: [
      "Basics of handloom warp and weft textile mechanics",
      "Traditional Jamdani and Nakshi Kantha iconography",
      "Creation of individual ceramic and canvas folk paintings"
    ],
    schedule: [
      { time: "10:00 AM", activity: "Inaugural Song & Flute Recital" },
      { time: "11:00 AM", activity: "Loom Weaving Demonstration & Student Hands-on" },
      { time: "01:00 PM", activity: "Traditional Boishakhi Panta-Ilish Lunch Break" },
      { time: "02:00 PM", activity: "Folk Art Exhibition & Awarding Best Student Craft" }
    ],
    speakers: [
      {
        id: "spk-folk-artisan",
        name: "Suraiya Rahman",
        title: "Master Craftsman & Folk Art Curator",
        organization: "Chattogram Heritage Craft Guild",
        bio: "Recipient of national folk art awards with four decades of experience preserving traditional Bangladeshi handloom weaving and embroidery techniques."
      }
    ],
    featured: false,
    status: "upcoming",
    contactEmail: "cultural@eastdelta.edu.bd",
    createdAt: "2026-08-18"
  }
];
