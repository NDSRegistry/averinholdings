// ========================================
// CAREERS PAGE FUNCTIONALITY
// ========================================

// Mock job openings data
const jobOpenings = [
    {
        id: 'JOB-001',
        title: 'Senior Compliance Analyst',
        department: 'Compliance',
        type: 'Full-time',
        location: 'Remote',
        experience: '3-5 years',
        description: 'Lead compliance reviews, case investigations, and policy development for Roblox-native entities. Work directly with partners to ensure adherence to institutional standards.',
        responsibilities: [
            'Conduct comprehensive compliance audits and case reviews',
            'Develop and maintain compliance frameworks and policies',
            'Provide guidance to partners on regulatory requirements',
            'Prepare detailed investigation reports and recommendations'
        ],
        requirements: [
            'Experience in compliance, audit, or regulatory roles',
            'Strong analytical and investigative skills',
            'Excellent written and verbal communication',
            'Understanding of Roblox platform and economy preferred'
        ]
    },
    {
        id: 'JOB-002',
        title: 'Registry Operations Specialist',
        department: 'Operations',
        type: 'Full-time',
        location: 'Remote',
        experience: '2-4 years',
        description: 'Manage case intake, processing, and database administration for the Integrity Registry. Ensure data accuracy and timely case resolution.',
        responsibilities: [
            'Process and categorize incoming case submissions',
            'Maintain accurate registry database records',
            'Coordinate with reviewers on case assignments',
            'Generate reports and analytics on case trends'
        ],
        requirements: [
            'Experience with database management and data entry',
            'Strong organizational and time management skills',
            'Attention to detail and accuracy',
            'Proficiency with spreadsheets and data tools'
        ]
    },
    {
        id: 'JOB-003',
        title: 'Full Stack Developer',
        department: 'Technology',
        type: 'Full-time',
        location: 'Remote',
        experience: '4-6 years',
        description: 'Build and maintain our web platform, registry systems, and internal tools. Work on challenging technical problems in a growing institutional infrastructure.',
        responsibilities: [
            'Develop and maintain web applications and APIs',
            'Design and implement database schemas and queries',
            'Build automation tools for compliance workflows',
            'Ensure security and performance of systems'
        ],
        requirements: [
            'Strong experience with modern web technologies',
            'Backend development skills (Node.js, Python, or similar)',
            'Database design and optimization expertise',
            'Security-conscious development practices'
        ]
    },
    {
        id: 'JOB-004',
        title: 'Partner Relations Manager',
        department: 'Partner Relations',
        type: 'Full-time',
        location: 'Remote',
        experience: '3-5 years',
        description: 'Manage relationships with verified partners, conduct verification reviews, and provide ongoing support and guidance.',
        responsibilities: [
            'Oversee partner verification and onboarding processes',
            'Serve as primary contact for partner inquiries',
            'Conduct periodic partner compliance reviews',
            'Develop partner resources and documentation'
        ],
        requirements: [
            'Experience in account management or client relations',
            'Strong interpersonal and communication skills',
            'Understanding of compliance and governance frameworks',
            'Ability to manage multiple relationships simultaneously'
        ]
    },
    {
        id: 'JOB-005',
        title: 'Policy Analyst',
        department: 'Legal',
        type: 'Full-time',
        location: 'Remote',
        experience: '2-4 years',
        description: 'Research, draft, and analyze organizational policies and governance frameworks. Ensure compliance with platform regulations and best practices.',
        responsibilities: [
            'Draft and update organizational policies and procedures',
            'Research regulatory requirements and industry standards',
            'Provide policy guidance to internal teams',
            'Monitor policy effectiveness and recommend improvements'
        ],
        requirements: [
            'Experience in policy development or legal research',
            'Excellent research and writing skills',
            'Understanding of regulatory compliance',
            'Analytical thinking and problem-solving abilities'
        ]
    },
    {
        id: 'JOB-006',
        title: 'Junior Compliance Reviewer',
        department: 'Compliance',
        type: 'Part-time',
        location: 'Remote',
        experience: '1-2 years',
        description: 'Assist with case reviews, documentation analysis, and compliance monitoring. Great entry-level opportunity in institutional oversight.',
        responsibilities: [
            'Review and categorize case submissions',
            'Conduct preliminary documentation analysis',
            'Assist senior reviewers with investigations',
            'Maintain case files and records'
        ],
        requirements: [
            'Entry-level compliance or audit experience',
            'Strong attention to detail',
            'Good communication skills',
            'Willingness to learn and grow'
        ]
    },
    {
        id: 'JOB-007',
        title: 'Data Engineer',
        department: 'Technology',
        type: 'Contract',
        location: 'Remote',
        experience: '3-5 years',
        description: 'Design and implement data pipelines, analytics systems, and reporting infrastructure. 6-month contract with potential for extension.',
        responsibilities: [
            'Build data pipelines and ETL processes',
            'Design analytics and reporting systems',
            'Optimize database performance',
            'Create data visualization dashboards'
        ],
        requirements: [
            'Experience with data engineering and ETL',
            'SQL and database optimization skills',
            'Python or similar scripting language',
            'Experience with BI tools and visualization'
        ]
    },
    {
        id: 'JOB-008',
        title: 'Operations Coordinator',
        department: 'Operations',
        type: 'Part-time',
        location: 'Remote',
        experience: '1-3 years',
        description: 'Support day-to-day operations, coordinate meetings, manage documentation, and assist with project tracking.',
        responsibilities: [
            'Coordinate team meetings and schedules',
            'Maintain operational documentation',
            'Track project milestones and deadlines',
            'Provide administrative support to leadership'
        ],
        requirements: [
            'Strong organizational skills',
            'Excellent written and verbal communication',
            'Proficiency with productivity tools',
            'Ability to multitask and prioritize'
        ]
    }
];

// State
let filteredJobs = [...jobOpenings];
let selectedJobId = null;

document.addEventListener('DOMContentLoaded', function() {
    renderJobs();
    setupFilters();
    setupApplicationModal();
});

// Render job listings
function renderJobs() {
    const grid = document.getElementById('positionsGrid');
    const noResults = document.getElementById('noPositions');
    
    if (!grid) return;
    
    if (filteredJobs.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    grid.style.display = 'grid';
    noResults.style.display = 'none';
    
    grid.innerHTML = filteredJobs.map(job => `
        <div class="position-opening" onclick="openApplicationModal('${job.id}')">
            <div class="position-opening-header">
                <div>
                    <h3 class="position-opening-title">${job.title}</h3>
                    <div class="position-opening-meta">
                        <span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="3" width="18" height="18" rx="2"/>
                                <path d="M3 9h18"/>
                                <path d="M9 21V9"/>
                            </svg>
                            ${job.department}
                        </span>
                        <span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                                <circle cx="12" cy="10" r="3"/>
                            </svg>
                            ${job.location}
                        </span>
                    </div>
                </div>
                <span class="position-badge">${job.type}</span>
            </div>
            <p class="position-opening-description">${job.description}</p>
            <div class="position-opening-footer">
                <div class="position-requirements">
                    <span>Experience: ${job.experience}</span>
                </div>
                <button class="btn btn-primary" onclick="event.stopPropagation(); openApplicationModal('${job.id}')">
                    Apply Now
                </button>
            </div>
        </div>
    `).join('');
}

// Setup filters
function setupFilters() {
    const deptFilter = document.getElementById('departmentFilter');
    const typeFilter = document.getElementById('typeFilter');
    
    if (deptFilter) {
        deptFilter.addEventListener('change', applyFilters);
    }
    
    if (typeFilter) {
        typeFilter.addEventListener('change', applyFilters);
    }
}

function applyFilters() {
    const dept = document.getElementById('departmentFilter').value;
    const type = document.getElementById('typeFilter').value;
    
    filteredJobs = jobOpenings.filter(job => {
        const matchesDept = !dept || job.department === dept;
        const matchesType = !type || job.type === type;
        return matchesDept && matchesType;
    });
    
    renderJobs();
}

// Application modal
function setupApplicationModal() {
    const modal = document.getElementById('applicationModal');
    const closeBtn = document.getElementById('closeApplicationModal');
    const cancelBtn = document.getElementById('cancelApplication');
    const form = document.getElementById('jobApplicationForm');
    const closeSuccess = document.getElementById('closeSuccessMessage');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeApplicationModal);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeApplicationModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeApplicationModal();
            }
        });
    }
    
    if (form) {
        form.addEventListener('submit', handleApplication);
    }
    
    if (closeSuccess) {
        closeSuccess.addEventListener('click', closeApplicationModal);
    }
}

function openApplicationModal(jobId) {
    const job = jobOpenings.find(j => j.id === jobId);
    if (!job) return;
    
    selectedJobId = jobId;
    
    document.getElementById('modalJobTitle').textContent = `Apply for ${job.title}`;
    
    const modal = document.getElementById('applicationModal');
    const form = document.getElementById('jobApplicationForm');
    const success = document.getElementById('applicationSubmitted');
    
    // Reset form
    if (form) {
        form.reset();
        form.style.display = 'grid';
    }
    
    if (success) {
        success.style.display = 'none';
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeApplicationModal() {
    const modal = document.getElementById('applicationModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    selectedJobId = null;
}

function handleApplication(e) {
    e.preventDefault();
    
    const formData = {
        jobId: selectedJobId,
        name: document.getElementById('applicantName').value,
        email: document.getElementById('applicantEmail').value,
        discord: document.getElementById('applicantDiscord').value,
        roblox: document.getElementById('applicantRoblox').value,
        experience: document.getElementById('applicantExperience').value,
        motivation: document.getElementById('applicantMotivation').value,
        availability: document.getElementById('applicantAvailability').value,
        portfolio: document.getElementById('applicantPortfolio').value,
        additional: document.getElementById('applicantAdditional').value,
        submittedAt: new Date().toISOString()
    };
    
    // Store in localStorage (mock submission)
    const applications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
    applications.push({
        ...formData,
        id: `APP-${Date.now()}`,
        status: 'Under Review'
    });
    localStorage.setItem('jobApplications', JSON.stringify(applications));
    
    // Show success message
    const form = document.getElementById('jobApplicationForm');
    const success = document.getElementById('applicationSubmitted');
    
    if (form && success) {
        form.style.display = 'none';
        success.style.display = 'block';
    }
}
