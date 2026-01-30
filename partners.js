// ========================================
// PARTNERS PAGE FUNCTIONALITY
// ========================================

// Mock partner data
const partnersData = [
    { id: 'AVH-P-001', name: 'Quantum Developments', type: 'Corporation', since: '2024-03', status: 'Verified' },
    { id: 'AVH-P-002', name: 'Nexus Group Holdings', type: 'Holdings', since: '2024-05', status: 'Verified' },
    { id: 'AVH-P-003', name: 'Meridian Enterprises', type: 'Corporation', since: '2025-01', status: 'Verified' },
    { id: 'AVH-P-004', name: 'Apex Innovations', type: 'Development', since: '2024-07', status: 'Verified' },
    { id: 'AVH-P-005', name: 'Horizon Holdings', type: 'Holdings', since: '2024-09', status: 'Verified' }
];

document.addEventListener('DOMContentLoaded', function() {
    setupPartnerVerification();
    setupPartnerApplication();
});

// Partner Verification Lookup
function setupPartnerVerification() {
    const verifyBtn = document.getElementById('verifyBtn');
    const searchInput = document.getElementById('partnerSearchInput');
    
    if (verifyBtn && searchInput) {
        verifyBtn.addEventListener('click', performVerification);
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performVerification();
            }
        });
    }
}

function performVerification() {
    const searchInput = document.getElementById('partnerSearchInput');
    const resultDiv = document.getElementById('verificationResult');
    
    if (!searchInput || !resultDiv) return;
    
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (!searchTerm) {
        resultDiv.style.display = 'none';
        return;
    }
    
    // Search for partner
    const partner = partnersData.find(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.id.toLowerCase() === searchTerm
    );
    
    if (partner) {
        displayVerificationResult(partner, true);
    } else {
        displayVerificationResult(null, false);
    }
}

function displayVerificationResult(partner, found) {
    const resultDiv = document.getElementById('verificationResult');
    
    if (found && partner) {
        resultDiv.innerHTML = `
            <div class="verification-header">
                <div class="verification-icon verified">✓</div>
                <div>
                    <h3 style="margin-bottom: 0.5rem; font-size: 1.5rem;">${partner.name}</h3>
                    <p style="color: var(--color-text-muted); margin: 0;">Verified Partner</p>
                </div>
            </div>
            <div class="verification-details">
                <div class="verification-row">
                    <span class="visual-key">Partner ID</span>
                    <span class="visual-value">${partner.id}</span>
                </div>
                <div class="verification-row">
                    <span class="visual-key">Entity Type</span>
                    <span class="visual-value">${partner.type}</span>
                </div>
                <div class="verification-row">
                    <span class="visual-key">Partner Since</span>
                    <span class="visual-value">${formatPartnerDate(partner.since)}</span>
                </div>
                <div class="verification-row">
                    <span class="visual-key">Status</span>
                    <span class="visual-value"><span class="status-badge status-resolved">${partner.status}</span></span>
                </div>
            </div>
        `;
        resultDiv.className = 'verification-result verified';
    } else {
        resultDiv.innerHTML = `
            <div class="verification-header">
                <div class="verification-icon not-found">✕</div>
                <div>
                    <h3 style="margin-bottom: 0.5rem; font-size: 1.5rem;">Not Found</h3>
                    <p style="color: var(--color-text-muted); margin: 0;">No verified partner matches your search</p>
                </div>
            </div>
            <p style="color: var(--color-text-secondary); margin-top: 1.5rem;">
                The entity you searched for is not currently a verified Averin Holdings partner. 
                If you believe this is an error, please contact our partner relations team.
            </p>
        `;
        resultDiv.className = 'verification-result not-found';
    }
    
    resultDiv.style.display = 'block';
}

function formatPartnerDate(dateStr) {
    const [year, month] = dateStr.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

// Partner Application Form
function setupPartnerApplication() {
    const form = document.getElementById('partnerApplicationForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handlePartnerApplication();
        });
    }
}

function handlePartnerApplication() {
    const formData = {
        entityName: document.getElementById('entityName').value,
        entityType: document.getElementById('entityType').value,
        contactName: document.getElementById('contactName').value,
        contactEmail: document.getElementById('contactEmail').value,
        robloxGroup: document.getElementById('robloxGroup').value,
        operationalHistory: document.getElementById('operationalHistory').value,
        termsAccept: document.getElementById('termsAccept').checked
    };
    
    // Validate
    if (!formData.termsAccept) {
        alert('Please accept the terms to continue.');
        return;
    }
    
    // Store in localStorage (mock submission)
    const applications = JSON.parse(localStorage.getItem('partnerApplications') || '[]');
    applications.push({
        ...formData,
        id: `APP-${Date.now()}`,
        submittedAt: new Date().toISOString(),
        status: 'Pending Review'
    });
    localStorage.setItem('partnerApplications', JSON.stringify(applications));
    
    // Show success message
    const form = document.getElementById('partnerApplicationForm');
    const successDiv = document.getElementById('applicationSuccess');
    
    if (form && successDiv) {
        form.style.display = 'none';
        successDiv.style.display = 'block';
        
        // Scroll to success message
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}
