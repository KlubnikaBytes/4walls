const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const PROPERTIES_FILE = path.join(DATA_DIR, 'properties.json');
const INTERIOR_FILE = path.join(DATA_DIR, 'interior.json');
const BLOGS_FILE = path.join(DATA_DIR, 'blogs.json');
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.json');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
const ABOUT_FILE = path.join(DATA_DIR, 'about.json');

// Initial seed for Mani Casadona
const seedManiCasadona = [
  {
    id: 1,
    name: "Office Space",
    folder: "3rd floor office",
    size: "1052 sq.ft",
    workstation: 16,
    cabin: 2,
    conferenceRoom: 1,
    reception: "Yes",
    pantry: "Yes",
    carParking: 1,
    rent: "65 K onwards",
    images: ["10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "8.jpg", "9.jpg"]
  },
  {
    id: 2,
    name: "Office Space",
    folder: "3rd floor",
    size: "900 sq.ft",
    workstation: 10,
    cabin: 1,
    conferenceRoom: 1,
    reception: "Yes",
    pantry: "Yes",
    carParking: 1,
    rent: "55 K onwards",
    images: ["10.jpg", "11.jpg", "13.jpg", "14.jpg", "15.jpg", "16.jpg", "18.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg"]
  },
  {
    id: 3,
    name: "Office Space",
    folder: "4th floor office",
    size: "1127 sq.ft",
    workstation: 18,
    cabin: 2,
    conferenceRoom: 0,
    reception: "Yes",
    pantry: "Yes",
    carParking: 1,
    rent: "70 K onwards",
    images: ["10.jpg", "11.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg"]
  },
  {
    id: 4,
    name: "Office Space",
    folder: "6th floor n",
    size: "623 sq.ft",
    workstation: 8,
    cabin: 1,
    conferenceRoom: 1,
    reception: "Yes",
    pantry: "Yes",
    carParking: 1,
    rent: "50 K onwards",
    images: ["18.jpg", "19.jpg", "20.jpg", "21.jpg", "22.jpg", "23.jpg", "24.jpg", "25.jpg", "26.jpg"]
  },
  {
    id: 5,
    name: "Office Space",
    folder: "6th Mani",
    size: "807 sq.ft",
    workstation: 13,
    cabin: 1,
    conferenceRoom: 1,
    reception: "Yes",
    pantry: "Yes",
    carParking: 1,
    rent: "60 K onwards",
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg"]
  },
  {
    id: 6,
    name: "Office Space",
    folder: "7th floor office",
    size: "525 sq.ft",
    workstation: 10,
    cabin: 1,
    conferenceRoom: 0,
    reception: "Yes",
    pantry: "Yes",
    carParking: 1,
    rent: "40 K onwards",
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg"]
  },
  {
    id: 7,
    name: "Office Space",
    folder: "11th floor office",
    size: "1550 sq.ft",
    workstation: 30,
    cabin: 2,
    conferenceRoom: 1,
    reception: "Yes",
    pantry: "Yes",
    carParking: 1,
    rent: "1.15 lac onwards",
    images: ["1.jpg", "10.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg"]
  },
  {
    id: 8,
    name: "Office Space",
    folder: "Option 8",
    size: "4700 sq.ft",
    workstation: 100,
    cabin: 7,
    conferenceRoom: 2,
    reception: "Yes",
    pantry: "Yes",
    carParking: 1,
    rent: "3 lac onwards",
    images: ["10.jpg", "11.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg"]
  }
];

// Initial seed for Ecospace
const seedEcospace = [
  {
    id: 1,
    name: "Office Space",
    folder: "Option 1",
    size: "1850 sq.ft",
    workstation: 20,
    cabin: 2,
    conferenceRoom: 1,
    reception: "Yes",
    pantry: "Cafeteria",
    carParking: 1,
    rent: "1,15,000",
    images: ["1.jpg", "10.jpg", "11.jpg", "12.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg"]
  },
  {
    id: 2,
    name: "Office Space",
    folder: "Option 2",
    size: "970 sq.ft",
    workstation: 22,
    cabin: 2,
    conferenceRoom: 1,
    reception: "Yes",
    pantry: "Yes",
    carParking: 1,
    rent: "65 K",
    images: ["1.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg"]
  },
  {
    id: 3,
    name: "Office Space",
    folder: "Option 3",
    size: "600 sq.ft",
    workstation: 9,
    cabin: 2,
    conferenceRoom: "No",
    reception: "Yes",
    pantry: "Yes",
    carParking: 1,
    rent: "50 K",
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg"]
  },
  {
    id: 4,
    name: "Office Space",
    folder: "Option 4",
    size: "938 sq.ft",
    workstation: 20,
    cabin: 3,
    conferenceRoom: 1,
    reception: "Yes",
    pantry: "Yes",
    carParking: 1,
    rent: "70 K",
    images: ["1.jpeg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "video.mp4"]
  }
];

// Initial seed for Interior Assets
const seedInterior = [
  { id: 1, path: "/interior/Interior designing 1/WhatsApp Image 2026-07-27 at 11.11.53.jpeg", type: "image", title: "Modern Reception Fit-out" },
  { id: 2, path: "/interior/Interior designing 1/WhatsApp Image 2026-07-27 at 11.11.55 (1).jpeg", type: "image", title: "Executive Cabin Suite" },
  { id: 3, path: "/interior/Interior designing 1/WhatsApp Image 2026-07-27 at 11.11.55.jpeg", type: "image", title: "Open Workstation Hall" },
  { id: 4, path: "/interior/Interior designing 1/WhatsApp Image 2026-07-27 at 11.11.56 (1).jpeg", type: "image", title: "Boardroom Conference Zone" },
  { id: 5, path: "/interior/Interior designing 1/WhatsApp Image 2026-07-27 at 11.11.56.jpeg", type: "image", title: "Collaborative Breakout Area" },
  { id: 6, path: "/interior/Interior designing 1/WhatsApp Image 2026-07-27 at 11.11.57 (1).jpeg", type: "image", title: "Ergonomic Desk Setup" },
  { id: 7, path: "/interior/Interior designing 1/WhatsApp Image 2026-07-27 at 11.11.57 (2).jpeg", type: "image", title: "Acoustic Meeting Pod" },
  { id: 8, path: "/interior/Interior designing 1/WhatsApp Image 2026-07-27 at 11.11.57.jpeg", type: "image", title: "Director Cabin Interior" },
  { id: 9, path: "/interior/Interior designing 1/WhatsApp Image 2026-07-27 at 11.11.58 (1).jpeg", type: "image", title: "Lounge and Waiting Foyer" },
  { id: 10, path: "/interior/Interior designing 1/WhatsApp Image 2026-07-27 at 11.11.58 (2).jpeg", type: "image", title: "Cafeteria and Pantry Zone" },
  { id: 11, path: "/interior/Interior designing 1/WhatsApp Image 2026-07-27 at 11.11.58.jpeg", type: "image", title: "Modern Lighting Concept" },
  { id: 12, path: "/interior/Interior designing 1/WhatsApp Image 2026-07-27 at 11.11.59 (1).jpeg", type: "image", title: "Minimalist Corridor View" },
  { id: 13, path: "/interior/Interior designing 1/WhatsApp Image 2026-07-27 at 11.11.59 (2).jpeg", type: "image", title: "Managerial Cabin Setup" },
  { id: 14, path: "/interior/Interior designing 1/WhatsApp Image 2026-07-27 at 11.11.59 (3).jpeg", type: "image", title: "Reception Counter Close-up" },
  { id: 15, path: "/interior/Interior designing 1/WhatsApp Image 2026-07-27 at 11.11.59.jpeg", type: "image", title: "Glazed Partition Styling" },
  { id: 16, path: "/interior/Interior designing 1/WhatsApp Image 2026-07-27 at 11.12.00 (1).jpeg", type: "image", title: "Modern Office Ceiling Work" },
  { id: 17, path: "/interior/Interior designing 1/WhatsApp Image 2026-07-27 at 11.12.00 (2).jpeg", type: "image", title: "Team Discussion Table" },
  { id: 18, path: "/interior/Interior designing 1/WhatsApp Image 2026-07-27 at 11.12.00.jpeg", type: "image", title: "Custom Woodwork & Storage" },
  { id: 19, path: "/interior/Interior designing 1/WhatsApp Image 2026-07-27 at 11.12.01 (1).jpeg", type: "image", title: "Premium Flooring & Finishes" },
  { id: 20, path: "/interior/Interior designing 1/WhatsApp Image 2026-07-27 at 11.12.01.jpeg", type: "image", title: "Branded Entrance Lobby" },
  { id: 21, path: "/interior/Interior designing 2/WhatsApp Image 2026-07-27 at 11.06.45 (1).jpeg", type: "image", title: "Contemporary Desk Array" },
  { id: 22, path: "/interior/Interior designing 2/WhatsApp Image 2026-07-27 at 11.06.45 (2).jpeg", type: "image", title: "Executive Meeting Room" },
  { id: 23, path: "/interior/Interior designing 2/WhatsApp Image 2026-07-27 at 11.06.45 (3).jpeg", type: "image", title: "Glass Partitions & Lighting" },
  { id: 24, path: "/interior/Interior designing 2/WhatsApp Image 2026-07-27 at 11.06.45.jpeg", type: "image", title: "High-Density Workstations" },
  { id: 25, path: "/interior/Interior designing 2/WhatsApp Image 2026-07-27 at 11.06.46 (1).jpeg", type: "image", title: "Private Huddle Room" },
  { id: 26, path: "/interior/Interior designing 2/WhatsApp Image 2026-07-27 at 11.06.46 (2).jpeg", type: "image", title: "Custom Storage Units" },
  { id: 27, path: "/interior/Interior designing 2/WhatsApp Image 2026-07-27 at 11.06.46 (3).jpeg", type: "image", title: "Warm Tone Foyer Design" },
  { id: 28, path: "/interior/Interior designing 2/WhatsApp Image 2026-07-27 at 11.06.46.jpeg", type: "image", title: "Executive Lounge Seating" },
  { id: 29, path: "/interior/Interior designing 2/WhatsApp Video 2026-07-27 at 11.06.44.mp4", type: "video", title: "Full Commercial Fit-out Video Tour" }
];

// Initial seed for Knowledge Centre Blogs
const seedBlogs = [
  {
    id: 1,
    cat: 'Leasing',
    title: 'How to lease your first commercial office in Kolkata',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&h=400&q=80',
    excerpt: 'Essential checklist on lock-in periods, CAM charges, stamp duty, and location strategy in Kolkata commercial hubs.',
    content: 'Commercial leasing requires strategic evaluation of location, accessibility, statutory compliances, and rental costs. Whether looking at Salt Lake Sector V or New Town Action Area II, ensure thorough lease deed verification, lock-in period negotiation, clarity on common area maintenance (CAM) charges, and municipal occupancy certificates.',
    date: '2026-10-15',
    readTime: '5 min read',
    author: 'Nitin Baheti'
  },
  {
    id: 2,
    cat: 'Legal',
    title: 'GST on commercial property, explained simply',
    img: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&h=400&q=80',
    excerpt: 'Comprehensive overview of reverse charge, forward charge, and Input Tax Credit (ITC) for business tenants.',
    content: 'GST on commercial property leases is applicable at 18% under reverse charge or forward charge mechanisms depending on registration status. Corporate tenants can claim Input Tax Credit (ITC) on commercial rent, reducing their net tax burden significantly compared to unregistered operations.',
    date: '2026-10-10',
    readTime: '4 min read',
    author: 'Legal Team'
  },
  {
    id: 3,
    cat: 'Legal',
    title: 'The ultimate commercial rental agreement guide',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=400&q=80',
    excerpt: 'Key clauses every tenant and landlord should include in a commercial lease contract to prevent disputes.',
    content: 'From annual rental escalation clauses (typically 5% every year or 15% every 3 years) to force majeure, security deposit refund terms, and rent-free fit-out periods, a solid commercial agreement protects both parties against unexpected operational liabilities.',
    date: '2026-10-05',
    readTime: '6 min read',
    author: 'Sneha Baheti'
  },
  {
    id: 4,
    cat: 'Market',
    title: 'Sector V vs New Town: where should you lease in 2026?',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&h=400&q=80',
    excerpt: 'Comparative analysis of Kolkata top commercial tech business corridors for IT and corporate tenants.',
    content: 'While Sector V offers established enterprise infrastructure and seamless metro connectivity, New Town provides Grade-A modern IT parks like Mani Casadona and Ecospace with superior parking, greener environments, wider access roads, and competitive rental yields.',
    date: '2026-09-28',
    readTime: '7 min read',
    author: 'Research Desk'
  },
  {
    id: 5,
    cat: 'Market',
    title: 'Understanding rental yields in premium IT parks',
    img: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&w=600&h=400&q=80',
    excerpt: 'How institutional and private investors calculate net rental returns in commercial IT assets.',
    content: 'Commercial IT parks in Kolkata consistently generate 7.5% - 8.5% gross rental yields, significantly higher than residential yields of 2.5% - 3%. Factors include creditworthy corporate tenants, long-term 9-year lease commitments, and built-in periodic rent appreciations.',
    date: '2026-09-20',
    readTime: '5 min read',
    author: 'Nitin Baheti'
  },
  {
    id: 6,
    cat: 'Interior',
    title: 'Office interior costing: bare shell to move-in ready',
    img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=600&h=400&q=80',
    excerpt: 'Budgeting guide for civil work, MEP, acoustic panels, and ergonomic furniture installations.',
    content: 'Transforming a bare shell commercial office into a productive workplace requires detailed budgeting across HVAC, electrical distribution, fire fighting systems, network cabling, glazed acoustic partitions, and ergonomic modular workstations. Expect ₹1,800 to ₹3,500 per sq.ft depending on specifications.',
    date: '2026-09-12',
    readTime: '8 min read',
    author: 'Design Studio'
  }
];

// Initial seed for Knowledge Centre Categories
const seedCategories = [
  'Leasing',
  'Legal & GST',
  'Market Reports',
  'Interior',
  'Investment'
];

// Initial seed for About Us section
const seedAbout = {
  heading: "We don't just broker properties—we build lasting value through expertise, integrity, and execution.",
  p1: "Founded with the vision to simplify commercial real estate in Kolkata. We provide end-to-end solutions from finding the right bare shell space to designing and delivering a fully functional, inspiring workplace for your team.",
  p2: "Together with a dedicated team, 4Walls Property Solutions delivers trusted expertise in commercial leasing, sales, investments, interiors, and asset management.",
  leaders: [
    {
      id: 1,
      name: "Nitin Baheti",
      role: "Managing Director | 4Walls Property Solutions",
      image: "/team/nitin.jpg",
      bio: "With over 20 years of experience in commercial real estate, Nitin Baheti founded 4Walls Property Solutions to provide end-to-end commercial real estate solutions. He has successfully developed 10+ commercial office assets and advised clients on the leasing, sale, investment, and management of 100+ commercial properties, with expertise in commercial interiors and workspace planning. He is also passionate about interior designing and workspace aesthetics."
    },
    {
      id: 2,
      name: "Sneha Baheti",
      role: "Director | 4Walls Property Solutions",
      image: "/team/sneha.jpg",
      bio: "With over 15 years of experience at TCS, ICICI Bank, and other leading organisations, Sneha Baheti leads business operations and client relationships at 4Walls. Her focus on operational excellence and customer experience ensures seamless delivery across every project."
    }
  ]
};

function readJson(file, defaultVal) {
  try {
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, JSON.stringify(defaultVal, null, 2), 'utf-8');
      return defaultVal;
    }
    const data = fs.readFileSync(file, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${file}:`, err);
    return defaultVal;
  }
}

function writeJson(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${file}:`, err);
    return false;
  }
}

// Storage Interface
const Storage = {
  getProperties() {
    return readJson(PROPERTIES_FILE, {
      buildings: ["Mani Casadona", "Ecospace"],
      properties: {
        "Mani Casadona": seedManiCasadona,
        "Ecospace": seedEcospace
      }
    });
  },
  saveProperties(data) {
    return writeJson(PROPERTIES_FILE, data);
  },

  getInterior() {
    return readJson(INTERIOR_FILE, seedInterior);
  },
  saveInterior(data) {
    return writeJson(INTERIOR_FILE, data);
  },

  getBlogs() {
    return readJson(BLOGS_FILE, seedBlogs);
  },
  saveBlogs(data) {
    return writeJson(BLOGS_FILE, data);
  },

  getCategories() {
    return readJson(CATEGORIES_FILE, seedCategories);
  },
  saveCategories(data) {
    return writeJson(CATEGORIES_FILE, data);
  },
  addCategory(name) {
    const cats = this.getCategories();
    const clean = String(name || '').trim();
    if (clean && !cats.some((c) => c.toLowerCase() === clean.toLowerCase())) {
      cats.push(clean);
      this.saveCategories(cats);
    }
    return cats;
  },
  deleteCategory(name) {
    let cats = this.getCategories();
    const clean = String(name || '').trim();
    cats = cats.filter((c) => c.toLowerCase() !== clean.toLowerCase());
    this.saveCategories(cats);
    return cats;
  },

  getAbout() {
    return readJson(ABOUT_FILE, seedAbout);
  },
  saveAbout(data) {
    return writeJson(ABOUT_FILE, data);
  },

  getLeads() {
    return readJson(LEADS_FILE, []);
  },
  saveLead(lead) {
    const leads = this.getLeads();
    const newLead = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: 'New',
      ...lead
    };
    leads.unshift(newLead);
    writeJson(LEADS_FILE, leads);
    return newLead;
  },
  deleteLead(id) {
    let leads = this.getLeads();
    leads = leads.filter(l => l.id !== Number(id));
    return writeJson(LEADS_FILE, leads);
  },
  updateLeadStatus(id, status) {
    const leads = this.getLeads();
    const lead = leads.find(l => l.id === Number(id));
    if (lead) {
      lead.status = status;
      writeJson(LEADS_FILE, leads);
      return lead;
    }
    return null;
  }
};

module.exports = { Storage, UPLOADS_DIR };
