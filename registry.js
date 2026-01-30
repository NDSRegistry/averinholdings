// ========================================
// REGISTRY PAGE FUNCTIONALITY
// ========================================

// Mock Case Data
const casesData = [
    {
        id: '2025-0147',
        entity: 'BuildCorp Industries',
        category: 'Financial Reporting',
        status: 'Resolved',
        filed: '2025-01-15',
        updated: '2025-01-28',
        reviewer: 'Sarah Chen',
        description: 'Discrepancy identified in Q4 2024 financial disclosures regarding revenue recognition timing. Entity cooperated fully with review process and submitted corrected documentation.',
        timeline: [
            { date: '2025-01-15', event: 'Case opened - Initial report received' },
            { date: '2025-01-17', event: 'Documentation requested from entity' },
            { date: '2025-01-22', event: 'Corrected financial statements submitted' },
            { date: '2025-01-28', event: 'Case resolved - Corrections verified and accepted' }
        ]
    },
    {
        id: '2025-0146',
        entity: 'Quantum Developments',
        category: 'Governance',
        status: 'Under Review',
        filed: '2025-01-20',
        updated: '2025-01-29',
        reviewer: 'David Kurosawa',
        description: 'Review of organizational structure changes and board composition updates. Standard compliance verification in progress.',
        timeline: [
            { date: '2025-01-20', event: 'Case opened - Governance review initiated' },
            { date: '2025-01-24', event: 'Board documentation requested' },
            { date: '2025-01-29', event: 'Initial documentation review completed' }
        ]
    },
    {
        id: '2025-0145',
        entity: 'Nexus Group Holdings',
        category: 'Operational',
        status: 'Open',
        filed: '2025-01-25',
        updated: '2025-01-27',
        reviewer: 'Jennifer Martinez',
        description: 'Inquiry regarding operational protocol changes and impact on partner entities. Information gathering phase.',
        timeline: [
            { date: '2025-01-25', event: 'Case opened - Operational inquiry filed' },
            { date: '2025-01-27', event: 'Initial assessment in progress' }
        ]
    },
    {
        id: '2025-0144',
        entity: 'Meridian Enterprises',
        category: 'Disclosure',
        status: 'Resolved',
        filed: '2025-01-10',
        updated: '2025-01-24',
        reviewer: 'Thomas Richardson',
        description: 'Late disclosure of material operational changes. Entity acknowledged delay and implemented improved notification procedures.',
        timeline: [
            { date: '2025-01-10', event: 'Case opened - Disclosure timing concern' },
            { date: '2025-01-14', event: 'Meeting with entity leadership' },
            { date: '2025-01-20', event: 'Corrective action plan submitted' },
            { date: '2025-01-24', event: 'Case resolved - New procedures approved' }
        ]
    },
    {
        id: '2025-0143',
        entity: 'Sterling Operations',
        category: 'Partner Compliance',
        status: 'Dismissed',
        filed: '2025-01-08',
        updated: '2025-01-18',
        reviewer: 'Robert Taylor',
        description: 'Partner verification concern raised but determined to be based on outdated information. No action required.',
        timeline: [
            { date: '2025-01-08', event: 'Case opened - Partner status inquiry' },
            { date: '2025-01-12', event: 'Current documentation verified' },
            { date: '2025-01-18', event: 'Case dismissed - No issues found' }
        ]
    },
    {
        id: '2025-0142',
        entity: 'Apex Innovations',
        category: 'Financial Reporting',
        status: 'Under Review',
        filed: '2025-01-22',
        updated: '2025-01-30',
        reviewer: 'Sarah Chen',
        description: 'Routine quarterly financial review. Standard verification procedures in progress.',
        timeline: [
            { date: '2025-01-22', event: 'Case opened - Quarterly review cycle' },
            { date: '2025-01-26', event: 'Financial documentation received' },
            { date: '2025-01-30', event: 'Analysis in progress' }
        ]
    },
    {
        id: '2025-0141',
        entity: 'Horizon Holdings',
        category: 'Governance',
        status: 'Resolved',
        filed: '2025-01-05',
        updated: '2025-01-19',
        reviewer: 'David Kurosawa',
        description: 'Board composition update review completed. All changes verified and approved.',
        timeline: [
            { date: '2025-01-05', event: 'Case opened - Board update notification' },
            { date: '2025-01-09', event: 'Background checks initiated' },
            { date: '2025-01-16', event: 'All verifications completed' },
            { date: '2025-01-19', event: 'Case resolved - Changes approved' }
        ]
    },
    {
        id: '2025-0140',
        entity: 'Vertex Corporation',
        category: 'Operational',
        status: 'Open',
        filed: '2025-01-28',
        updated: '2025-01-30',
        reviewer: 'Jennifer Martinez',
        description: 'New operational framework review. Documentation under initial assessment.',
        timeline: [
            { date: '2025-01-28', event: 'Case opened - Framework review requested' },
            { date: '2025-01-30', event: 'Initial documentation received' }
        ]
    },
    {
        id: '2024-1289',
        entity: 'Legacy Systems Inc',
        category: 'Disclosure',
        status: 'Resolved',
        filed: '2024-12-20',
        updated: '2025-01-12',
        reviewer: 'Thomas Richardson',
        description: 'Annual disclosure requirements completed. All documentation verified and archived.',
        timeline: [
            { date: '2024-12-20', event: 'Case opened - Annual disclosure cycle' },
            { date: '2024-12-28', event: 'Documentation submitted' },
            { date: '2025-01-05', event: 'Verification completed' },
            { date: '2025-01-12', event: 'Case resolved - All requirements met' }
        ]
    },
    {
        id: '2024-1288',
        entity: 'Pioneer Developments',
        category: 'Partner Compliance',
        status: 'Resolved',
        filed: '2024-12-15',
        updated: '2025-01-08',
        reviewer: 'Robert Taylor',
        description: 'Annual partner verification completed successfully. Partner status renewed.',
        timeline: [
            { date: '2024-12-15', event: 'Case opened - Annual partner review' },
            { date: '2024-12-22', event: 'Compliance audit completed' },
            { date: '2025-01-03', event: 'Final approval obtained' },
            { date: '2025-01-08', event: 'Case resolved - Partner status renewed' }
        ]
    }
];

// State management
let currentPage = 1;
const itemsPerPage = 10;
let filteredCases = [...casesData];
let currentView = 'table';

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    renderCases();
    setupEventListeners();
});

// Event listeners
function setupEventListeners() {
    // Search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(filterCases, 300));
    }
    
    // Filters
    const categoryFilter = document.getElementById('categoryFilter');
    const statusFilter = document.getElementById('statusFilter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterCases);
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', filterCases);
    }
    
    // Clear filters
    const clearBtn = document.getElementById('clearFilters');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearFilters);
    }
    
    // View toggle
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentView = this.dataset.view;
            toggleView();
        });
    });
    
    // Pagination
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => changePage(-1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => changePage(1));
    }
    
    // Modal
    const closeModalBtn = document.getElementById('closeModal');
    const closeModalBtn2 = document.getElementById('closeModalBtn');
    const modal = document.getElementById('caseModal');
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => closeModal());
    }
    
    if (closeModalBtn2) {
        closeModalBtn2.addEventListener('click', () => closeModal());
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
}

// Filter cases
function filterCases() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    
    filteredCases = casesData.filter(caseItem => {
        const matchesSearch = 
            caseItem.id.toLowerCase().includes(searchTerm) ||
            caseItem.entity.toLowerCase().includes(searchTerm) ||
            caseItem.category.toLowerCase().includes(searchTerm);
        
        const matchesCategory = !categoryFilter || caseItem.category === categoryFilter;
        const matchesStatus = !statusFilter || caseItem.status === statusFilter;
        
        return matchesSearch && matchesCategory && matchesStatus;
    });
    
    currentPage = 1;
    renderCases();
}

// Clear filters
function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('categoryFilter').value = '';
    document.getElementById('statusFilter').value = '';
    filterCases();
}

// Render cases
function renderCases() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageCases = filteredCases.slice(start, end);
    
    // Update results count
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        resultsCount.textContent = `Showing ${filteredCases.length} cases`;
    }
    
    if (currentView === 'table') {
        renderTable(pageCases);
    } else {
        renderCards(pageCases);
    }
    
    renderPagination();
}

// Render table view
function renderTable(cases) {
    const tbody = document.getElementById('casesTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = cases.map(caseItem => `
        <tr onclick="openCaseModal('${caseItem.id}')">
            <td><span class="case-id">${caseItem.id}</span></td>
            <td>${caseItem.entity}</td>
            <td>${caseItem.category}</td>
            <td><span class="status-badge status-${getStatusClass(caseItem.status)}">${caseItem.status}</span></td>
            <td>${formatDate(caseItem.filed)}</td>
            <td>${formatDate(caseItem.updated)}</td>
        </tr>
    `).join('');
}

// Render cards view
function renderCards(cases) {
    const container = document.getElementById('cardsContainer');
    if (!container) return;
    
    container.innerHTML = cases.map(caseItem => `
        <div class="case-card" onclick="openCaseModal('${caseItem.id}')">
            <div class="case-card-header">
                <span class="case-card-id">${caseItem.id}</span>
                <span class="status-badge status-${getStatusClass(caseItem.status)}">${caseItem.status}</span>
            </div>
            <div class="case-card-body">
                <div class="case-row">
                    <span class="case-row-label">Entity:</span>
                    <span class="case-row-value">${caseItem.entity}</span>
                </div>
                <div class="case-row">
                    <span class="case-row-label">Category:</span>
                    <span class="case-row-value">${caseItem.category}</span>
                </div>
                <div class="case-row">
                    <span class="case-row-label">Filed:</span>
                    <span class="case-row-value">${formatDate(caseItem.filed)}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Toggle view
function toggleView() {
    const tableContainer = document.querySelector('.registry-table-container');
    const cardsContainer = document.getElementById('cardsContainer');
    
    if (currentView === 'table') {
        tableContainer.style.display = 'block';
        cardsContainer.style.display = 'none';
    } else {
        tableContainer.style.display = 'none';
        cardsContainer.style.display = 'grid';
    }
    
    renderCases();
}

// Pagination
function renderPagination() {
    const totalPages = Math.ceil(filteredCases.length / itemsPerPage);
    const pagesContainer = document.getElementById('paginationPages');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    
    if (!pagesContainer) return;
    
    // Update button states
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages;
    }
    
    // Render page numbers
    let pages = [];
    if (totalPages <= 7) {
        pages = Array.from({length: totalPages}, (_, i) => i + 1);
    } else {
        if (currentPage <= 4) {
            pages = [1, 2, 3, 4, 5, '...', totalPages];
        } else if (currentPage >= totalPages - 3) {
            pages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        } else {
            pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
        }
    }
    
    pagesContainer.innerHTML = pages.map(page => {
        if (page === '...') {
            return '<span class="page-ellipsis">...</span>';
        }
        return `<button class="page-number ${page === currentPage ? 'active' : ''}" onclick="goToPage(${page})">${page}</button>`;
    }).join('');
}

function changePage(delta) {
    const totalPages = Math.ceil(filteredCases.length / itemsPerPage);
    const newPage = currentPage + delta;
    
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        renderCases();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function goToPage(page) {
    currentPage = page;
    renderCases();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Modal
function openCaseModal(caseId) {
    const caseData = casesData.find(c => c.id === caseId);
    if (!caseData) return;
    
    document.getElementById('modalCaseId').textContent = `Case #${caseData.id}`;
    document.getElementById('modalEntity').textContent = caseData.entity;
    document.getElementById('modalCategory').textContent = caseData.category;
    document.getElementById('modalStatus').innerHTML = `<span class="status-badge status-${getStatusClass(caseData.status)}">${caseData.status}</span>`;
    document.getElementById('modalFiled').textContent = formatDate(caseData.filed);
    document.getElementById('modalUpdated').textContent = formatDate(caseData.updated);
    document.getElementById('modalReviewer').textContent = caseData.reviewer;
    document.getElementById('modalDescription').textContent = caseData.description;
    
    // Render timeline
    const timeline = document.getElementById('modalTimeline');
    timeline.innerHTML = caseData.timeline.map(item => `
        <div class="timeline-item">
            <div class="timeline-date">${formatDate(item.date)}</div>
            <div class="timeline-content">${item.event}</div>
        </div>
    `).join('');
    
    const modal = document.getElementById('caseModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('caseModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Utility functions
function getStatusClass(status) {
    const statusMap = {
        'Resolved': 'resolved',
        'Open': 'open',
        'Under Review': 'review',
        'Dismissed': 'resolved'
    };
    return statusMap[status] || 'open';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
