// ========================================
// CONTACT PAGE FUNCTIONALITY
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    setupReportForm();
    setupContactForm();
});

// Report Form
function setupReportForm() {
    const form = document.getElementById('reportForm');
    const anonymousCheckbox = document.getElementById('reportAnonymous');
    const reporterInfo = document.getElementById('reporterInfo');
    const submitAnotherBtn = document.getElementById('submitAnotherReport');
    
    if (anonymousCheckbox && reporterInfo) {
        anonymousCheckbox.addEventListener('change', function() {
            if (this.checked) {
                reporterInfo.style.opacity = '0.5';
                reporterInfo.style.pointerEvents = 'none';
                
                // Clear reporter fields
                document.getElementById('reporterName').value = '';
                document.getElementById('reporterEmail').value = '';
                document.getElementById('reporterContact').value = '';
            } else {
                reporterInfo.style.opacity = '1';
                reporterInfo.style.pointerEvents = 'auto';
            }
        });
    }
    
    if (form) {
        form.addEventListener('submit', handleReportSubmission);
    }
    
    if (submitAnotherBtn) {
        submitAnotherBtn.addEventListener('click', resetReportForm);
    }
}

function handleReportSubmission(e) {
    e.preventDefault();
    
    const isAnonymous = document.getElementById('reportAnonymous').checked;
    
    const reportData = {
        type: document.getElementById('reportType').value,
        entity: document.getElementById('reportEntity').value,
        summary: document.getElementById('reportSummary').value,
        details: document.getElementById('reportDetails').value,
        evidence: document.getElementById('reportEvidence').value,
        anonymous: isAnonymous,
        submittedAt: new Date().toISOString()
    };
    
    if (!isAnonymous) {
        reportData.reporter = {
            name: document.getElementById('reporterName').value,
            email: document.getElementById('reporterEmail').value,
            contact: document.getElementById('reporterContact').value
        };
    }
    
    // Generate tracking number
    const trackingNumber = `RPT-${Date.now().toString().slice(-8)}`;
    
    // Store in localStorage (mock submission)
    const reports = JSON.parse(localStorage.getItem('reports') || '[]');
    reports.push({
        ...reportData,
        trackingNumber: trackingNumber,
        status: 'Pending Review'
    });
    localStorage.setItem('reports', JSON.stringify(reports));
    
    // Show success message
    const form = document.getElementById('reportForm');
    const success = document.getElementById('reportSuccess');
    const trackingEl = document.getElementById('trackingNumber');
    
    if (form && success && trackingEl) {
        trackingEl.textContent = trackingNumber;
        form.style.display = 'none';
        success.style.display = 'block';
        
        // Scroll to success message
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function resetReportForm() {
    const form = document.getElementById('reportForm');
    const success = document.getElementById('reportSuccess');
    
    if (form && success) {
        form.reset();
        form.style.display = 'grid';
        success.style.display = 'none';
        
        // Reset anonymous toggle
        const reporterInfo = document.getElementById('reporterInfo');
        if (reporterInfo) {
            reporterInfo.style.opacity = '1';
            reporterInfo.style.pointerEvents = 'auto';
        }
        
        // Scroll to form
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Contact Form
function setupContactForm() {
    const form = document.getElementById('contactForm');
    const sendAnotherBtn = document.getElementById('sendAnotherMessage');
    
    if (form) {
        form.addEventListener('submit', handleContactSubmission);
    }
    
    if (sendAnotherBtn) {
        sendAnotherBtn.addEventListener('click', resetContactForm);
    }
}

function handleContactSubmission(e) {
    e.preventDefault();
    
    const contactData = {
        type: document.getElementById('inquiryType').value,
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        organization: document.getElementById('contactOrganization').value,
        subject: document.getElementById('contactSubject').value,
        message: document.getElementById('contactMessage').value,
        submittedAt: new Date().toISOString()
    };
    
    // Store in localStorage (mock submission)
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    contacts.push({
        ...contactData,
        id: `CNT-${Date.now()}`,
        status: 'Pending Response'
    });
    localStorage.setItem('contacts', JSON.stringify(contacts));
    
    // Show success message
    const form = document.getElementById('contactForm');
    const success = document.getElementById('contactSuccess');
    
    if (form && success) {
        form.style.display = 'none';
        success.style.display = 'block';
        
        // Scroll to success message
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function resetContactForm() {
    const form = document.getElementById('contactForm');
    const success = document.getElementById('contactSuccess');
    
    if (form && success) {
        form.reset();
        form.style.display = 'grid';
        success.style.display = 'none';
        
        // Scroll to form
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
