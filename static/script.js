/**
 * JavaScript functionality for the cryptography tool
 */

// Copy text to clipboard function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        // Show success feedback
        showCopyFeedback();
    }).catch(function(err) {
        console.error('Failed to copy text: ', err);
        // Fallback for older browsers
        fallbackCopyTextToClipboard(text);
    });
}

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopyFeedback();
        }
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
    
    document.body.removeChild(textArea);
}

// Show copy feedback
function showCopyFeedback() {
    // Create a temporary toast notification
    const toast = document.createElement('div');
    toast.className = 'alert alert-success position-fixed';
    toast.style.top = '20px';
    toast.style.right = '20px';
    toast.style.zIndex = '9999';
    toast.innerHTML = '<i class="fas fa-check me-2"></i>Copied to clipboard!';
    
    document.body.appendChild(toast);
    
    // Remove after 2 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 2000);
}

// Form validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const messageInput = document.getElementById('message');
    const railFenceInput = document.getElementById('rail_fence_key');
    const rowTranspositionInput = document.getElementById('row_transposition_key');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            let isValid = true;
            
            // Check if message is provided
            if (!messageInput.value.trim()) {
                showValidationError(messageInput, 'Please enter a message to encrypt.');
                isValid = false;
            }
            
            // Check if at least one key is provided
            const hasRailFenceKey = railFenceInput.value.trim() !== '';
            const hasRowTranspositionKey = rowTranspositionInput.value.trim() !== '';
            
            if (!hasRailFenceKey && !hasRowTranspositionKey) {
                showAlert('Please provide at least one cipher key.', 'warning');
                isValid = false;
            }
            
            // Validate rail fence key if provided
            if (hasRailFenceKey) {
                const railFenceValue = parseInt(railFenceInput.value);
                if (isNaN(railFenceValue) || railFenceValue < 2) {
                    showValidationError(railFenceInput, 'Rail Fence key must be a number greater than 1.');
                    isValid = false;
                } else if (railFenceValue > messageInput.value.replace(/\s/g, '').length) {
                    showValidationError(railFenceInput, 'Rail Fence key cannot be greater than message length.');
                    isValid = false;
                }
            }
            
            // Validate row transposition key if provided
            if (hasRowTranspositionKey) {
                if (!/^[A-Za-z]+$/.test(rowTranspositionInput.value)) {
                    showValidationError(rowTranspositionInput, 'Row Transposition key must contain only letters.');
                    isValid = false;
                }
            }
            
            if (!isValid) {
                event.preventDefault();
            }
        });
    }
    
    // Real-time validation feedback
    railFenceInput.addEventListener('input', function() {
        clearValidationError(this);
        const value = parseInt(this.value);
        if (this.value && (isNaN(value) || value < 2)) {
            showValidationError(this, 'Must be a number greater than 1.');
        }
    });
    
    rowTranspositionInput.addEventListener('input', function() {
        clearValidationError(this);
        if (this.value && !/^[A-Za-z]+$/.test(this.value)) {
            showValidationError(this, 'Must contain only letters.');
        }
    });
});

// Validation helper functions
function showValidationError(input, message) {
    clearValidationError(input);
    
    input.classList.add('is-invalid');
    
    const feedback = document.createElement('div');
    feedback.className = 'invalid-feedback';
    feedback.textContent = message;
    
    input.parentNode.appendChild(feedback);
}

function clearValidationError(input) {
    input.classList.remove('is-invalid');
    
    const feedback = input.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.remove();
    }
}

function showAlert(message, type = 'info') {
    const alertContainer = document.createElement('div');
    alertContainer.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertContainer.style.top = '20px';
    alertContainer.style.left = '50%';
    alertContainer.style.transform = 'translateX(-50%)';
    alertContainer.style.zIndex = '9999';
    alertContainer.style.minWidth = '300px';
    
    alertContainer.innerHTML = `
        <i class="fas fa-exclamation-triangle me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertContainer);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alertContainer.parentNode) {
            alertContainer.parentNode.removeChild(alertContainer);
        }
    }, 5000);
}

// Add fade-in animation to results
window.addEventListener('load', function() {
    const results = document.querySelectorAll('.card');
    results.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
});
