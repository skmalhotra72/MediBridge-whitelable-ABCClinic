export const clinicConfig = {
  name: "ABC Clinic",
  tagline: "Expert Care, Compassionate Service",

  contact: {
    phone: "+91-9876543210",
    appointmentPhone: "+91-9876543211",
    emergencyPhone: "+91-9876543299",
    email: "care@abcdoctorclinic.com",
    appointmentEmail: "appointments@abcdoctorclinic.com",
    whatsapp: "+91-9876543210",
  },

  address: {
    street: "123 Health Street, Medical District",
    city: "Mumbai, Maharashtra 400001",
    full: "ABC Clinic, 123 Health Street, Medical District, Mumbai, Maharashtra 400001",
    googleMapsLink: "https://maps.google.com/?q=ABC+Clinic+Mumbai",
  },

  hours: {
    weekdays: "9:00 AM - 8:00 PM",
    saturday: "9:00 AM - 6:00 PM",
    sunday: "10:00 AM - 2:00 PM (Emergency only)",
  },

  stats: {
    rating: "4.8",
    reviews: "2,500+",
    yearsOfService: "15+",
    doctors: "4",
  },

  medibridge: {
    powered: true,
    webhook: "https://medibridge-api.com/webhook/abc-clinic",
    appUrl: "https://medibridge24x7.com",
  },

  admin: {
    username: "admin",
    password: "ABCClinic2025!",
  },

  adminUsers: [
    {
      username: "admin",
      password: "ABCClinic2025!",
    },
    {
      username: "Clinic_Admin",
      password: "ABC@clinic",
    },
  ],
};

export const doctors = [
  {
    id: "rajesh-kumar",
    name: "Dr. Rajesh Kumar",
    designation: "MD, DM (Cardiology)",
    specialty: "Interventional Cardiologist",
    experience: 18,
    education: "MBBS, MD (Medicine), DM (Cardiology) - AIIMS Delhi",
    about: "Dr. Rajesh Kumar is a renowned interventional cardiologist with expertise in complex coronary procedures. He has performed over 5,000 successful angioplasties and is known for his patient-centric approach.",
    achievements: [
      "Gold Medalist, DM Cardiology, AIIMS",
      "Published 25+ research papers in international journals",
      "Chief Cardiologist Award 2022 - Maharashtra Medical Association",
      "Visiting Faculty at Mumbai Medical College"
    ],
    timings: {
      weekdays: "5 PM - 8 PM",
      saturday: "10 AM - 2 PM",
      availability: [
        { day: "Monday", slots: ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30"] },
        { day: "Tuesday", slots: ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30"] },
        { day: "Wednesday", slots: ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30"] },
        { day: "Thursday", slots: ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30"] },
        { day: "Friday", slots: ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30"] },
        { day: "Saturday", slots: ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"] },
      ]
    },
    languages: ["English", "Hindi", "Marathi"],
    photo: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "priya-sharma",
    name: "Dr. Priya Sharma",
    designation: "MS Orthopedics, DNB",
    specialty: "Joint Replacement & Sports Medicine",
    experience: 12,
    education: "MBBS, MS (Orthopedics), DNB - Grant Medical College, Mumbai",
    about: "Dr. Priya Sharma specializes in minimally invasive joint replacement surgeries and sports injury management. She has successfully treated hundreds of athletes and elderly patients with joint problems.",
    achievements: [
      "Fellowship in Joint Replacement - Germany",
      "Best Young Surgeon Award 2020 - Indian Orthopedic Association",
      "Expert in Arthroscopic Surgeries",
      "Published 15+ papers on joint care"
    ],
    timings: {
      weekdays: "6 PM - 8 PM (Mon, Wed, Fri)",
      saturday: "2 PM - 6 PM",
      availability: [
        { day: "Monday", slots: ["18:00", "18:30", "19:00", "19:30"] },
        { day: "Wednesday", slots: ["18:00", "18:30", "19:00", "19:30"] },
        { day: "Friday", slots: ["18:00", "18:30", "19:00", "19:30"] },
        { day: "Saturday", slots: ["14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"] },
      ]
    },
    languages: ["English", "Hindi", "Gujarati"],
    photo: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "amit-patel",
    name: "Dr. Amit Patel",
    designation: "MD Dermatology, DDVL",
    specialty: "Medical & Cosmetic Dermatology",
    experience: 10,
    education: "MBBS, MD (Dermatology) - KEM Hospital, Mumbai",
    about: "Dr. Amit Patel is an expert in treating skin conditions ranging from acne to complex dermatological diseases. He also specializes in cosmetic procedures including laser treatments and anti-aging therapies.",
    achievements: [
      "Fellowship in Cosmetic Dermatology - USA",
      "Pioneer in Laser Hair Removal techniques in Mumbai",
      "10,000+ satisfied patients",
      "Speaker at National Dermatology Conferences"
    ],
    timings: {
      weekdays: "4 PM - 7 PM (Tue, Thu)",
      weekend: "Sat 4-7 PM, Sun 10 AM-1 PM",
      availability: [
        { day: "Tuesday", slots: ["16:00", "16:30", "17:00", "17:30", "18:00", "18:30"] },
        { day: "Thursday", slots: ["16:00", "16:30", "17:00", "17:30", "18:00", "18:30"] },
        { day: "Saturday", slots: ["16:00", "16:30", "17:00", "17:30", "18:00", "18:30"] },
        { day: "Sunday", slots: ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30"] },
      ]
    },
    languages: ["English", "Hindi", "Gujarati"],
    photo: "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "meera-iyer",
    name: "Dr. Meera Iyer",
    designation: "MD (General Medicine)",
    specialty: "Family Medicine & Preventive Healthcare",
    experience: 15,
    education: "MBBS, MD (Internal Medicine) - CMC Vellore",
    about: "Dr. Meera Iyer is a compassionate general physician who believes in holistic healthcare. She specializes in managing chronic conditions like diabetes, hypertension, and thyroid disorders while focusing on preventive care.",
    achievements: [
      "Best Family Physician Award 2021 - Mumbai Health Forum",
      "Expert in Diabetes Management",
      "Conducted 100+ health camps in underserved areas",
      "Published research on preventive healthcare"
    ],
    timings: {
      weekdays: "9 AM - 12 PM & 5 PM - 8 PM",
      saturday: "9 AM - 12 PM & 5 PM - 8 PM",
      availability: [
        { day: "Monday", slots: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"] },
        { day: "Tuesday", slots: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"] },
        { day: "Wednesday", slots: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"] },
        { day: "Thursday", slots: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"] },
        { day: "Friday", slots: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"] },
        { day: "Saturday", slots: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"] },
      ]
    },
    languages: ["English", "Hindi", "Tamil", "Kannada"],
    photo: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Ramesh Gupta",
    role: "Cardiac Patient, Age 58",
    rating: 5,
    text: "Dr. Rajesh Kumar saved my life during a heart emergency. His quick decision-making and expertise are unmatched. The entire staff at ABC Clinic is professional and caring.",
  },
  {
    id: 2,
    name: "Anjali Deshmukh",
    role: "Caregiver, Age 35",
    rating: 5,
    text: "Dr. Priya Sharma performed my mother's knee replacement surgery. She's walking without pain now! Dr. Sharma's skill and compassionate care made all the difference.",
  },
  {
    id: 3,
    name: "Suresh Iyer",
    role: "Diabetic Patient, Age 62",
    rating: 5,
    text: "I've been consulting Dr. Meera Iyer for my diabetes management for 5 years. She's not just a doctor but a health partner who genuinely cares about her patients.",
  },
  {
    id: 4,
    name: "Priya Mehta",
    role: "Parent, Age 42",
    rating: 5,
    text: "My teenage son had severe acne. Dr. Amit Patel's treatment worked wonders! His confidence is back, and the results are amazing. Highly recommend!",
  },
  {
    id: 5,
    name: "Sneha Rao",
    role: "New Mother, Age 29",
    rating: 5,
    text: "The teleconsultation service is fantastic! I consulted Dr. Iyer from home during my pregnancy. The AI prescription assistant also helped me understand my medicines clearly.",
  },
  {
    id: 6,
    name: "Vikram Singh",
    role: "Corporate Professional, Age 34",
    rating: 5,
    text: "Best clinic in Mumbai! Clean, modern, and doctors actually listen to you. The diagnostic lab is quick and accurate. Highly professional experience.",
  },
];

export const diagnosticPackages = [
  { id: "basic", name: "Basic Health Checkup", price: 1200 },
  { id: "diabetes", name: "Diabetes Profile", price: 800 },
  { id: "thyroid", name: "Thyroid Profile", price: 600 },
  { id: "lipid", name: "Lipid Profile", price: 500 },
  { id: "liver", name: "Liver Function Test", price: 900 },
  { id: "kidney", name: "Kidney Function Test", price: 850 },
];
