// Current barcode data
let currentBarcodeData = null;

// Entry type labels in Arabic
const entryTypeLabels = {
    'resident': 'ساكن دائم',
    'visitor': 'زائر',
    'delivery': 'توصيل',
    'maintenance': 'صيانة'
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setupForm();
    updateStats();
    
    // Update stats every 30 seconds
    setInterval(updateStats, 30000);
});

// Setup form submission
function setupForm() {
    const form = document.getElementById('barcodeForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        generateBarcode();
    });
}

// Generate unique barcode
function generateBarcode() {
    // Get form values
    const residentName = document.getElementById('residentName').value;
    const unitNumber = document.getElementById('unitNumber').value;
    const entryType = document.getElementById('entryType').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    
    // Validate inputs
    if (!residentName || !unitNumber || !entryType || !phoneNumber) {
        alert('الرجاء ملء جميع الحقول المطلوبة');
        return;
    }
    
    // Generate unique barcode number
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 10000);
    const barcodeNumber = `AYNA${timestamp}${randomNum}`;
    
    // Calculate expiry time (24 hours from now)
    const creationTime = new Date();
    const expiryTime = new Date(creationTime.getTime() + 24 * 60 * 60 * 1000);
    
    // Store barcode data
    currentBarcodeData = {
        barcodeNumber: barcodeNumber,
        residentName: residentName,
        unitNumber: unitNumber,
        entryType: entryType,
        phoneNumber: phoneNumber,
        creationTime: creationTime,
        expiryTime: expiryTime
    };
    
    // Generate barcode using JsBarcode
    try {
        JsBarcode("#barcode", barcodeNumber, {
            format: "CODE128",
            width: 2,
            height: 100,
            displayValue: true,
            fontSize: 16,
            fontOptions: "bold",
            textMargin: 10,
            margin: 10
        });
        
        // Display barcode info
        displayBarcodeInfo();
        
        // Show barcode display section
        document.getElementById('barcodeDisplay').classList.add('active');
        
        // Scroll to barcode
        document.getElementById('barcodeDisplay').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
        
        // Update stats
        incrementStat('totalBarcodes');
        incrementStat('activeBarcodes');
        
        // Show success notification
        showNotification('✅ تم إنشاء الباركود بنجاح!', 'success');
        
    } catch (error) {
        alert('حدث خطأ أثناء إنشاء الباركود. الرجاء المحاولة مرة أخرى.');
        console.error('Barcode generation error:', error);
    }
}

// Display barcode information
function displayBarcodeInfo() {
    const detailsContainer = document.getElementById('barcodeDetails');
    const expiryTimeElement = document.getElementById('expiryTime');
    
    // Format times
    const creationTimeStr = formatDateTime(currentBarcodeData.creationTime);
    const expiryTimeStr = formatDateTime(currentBarcodeData.expiryTime);
    
    // Display details
    detailsContainer.innerHTML = `
        <div class="detail-row">
            <span class="detail-label">رقم الباركود:</span>
            <span class="detail-value">${currentBarcodeData.barcodeNumber}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">الاسم:</span>
            <span class="detail-value">${currentBarcodeData.residentName}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">رقم الوحدة:</span>
            <span class="detail-value">${currentBarcodeData.unitNumber}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">نوع الدخول:</span>
            <span class="detail-value">${entryTypeLabels[currentBarcodeData.entryType]}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">رقم الجوال:</span>
            <span class="detail-value">${currentBarcodeData.phoneNumber}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">وقت الإنشاء:</span>
            <span class="detail-value">${creationTimeStr}</span>
        </div>
    `;
    
    // Display expiry time
    expiryTimeElement.textContent = expiryTimeStr;
}

// Format date and time
function formatDateTime(date) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };
    
    return date.toLocaleString('ar-SA', options);
}

// Download barcode as image
function downloadBarcode() {
    if (!currentBarcodeData) {
        alert('لا يوجد باركود لتحميله');
        return;
    }
    
    try {
        // Get the SVG element
        const svg = document.getElementById('barcode');
        const svgData = new XMLSerializer().serializeToString(svg);
        
        // Create canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        const svgSize = svg.getBoundingClientRect();
        canvas.width = svgSize.width * 2;
        canvas.height = svgSize.height * 2;
        
        // Create image from SVG
        const img = new Image();
        const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        
        img.onload = function() {
            // Fill white background
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw barcode
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            // Add additional info
            ctx.fillStyle = '#1e293b';
            ctx.font = 'bold 24px Cairo';
            ctx.textAlign = 'center';
            ctx.fillText(`${currentBarcodeData.residentName}`, canvas.width / 2, canvas.height - 80);
            
            ctx.font = '20px Cairo';
            ctx.fillText(`وحدة: ${currentBarcodeData.unitNumber}`, canvas.width / 2, canvas.height - 50);
            ctx.fillText(`${entryTypeLabels[currentBarcodeData.entryType]}`, canvas.width / 2, canvas.height - 20);
            
            // Convert to image and download
            canvas.toBlob(function(blob) {
                const link = document.createElement('a');
                link.download = `barcode_${currentBarcodeData.unitNumber}_${Date.now()}.png`;
                link.href = URL.createObjectURL(blob);
                link.click();
                
                // Clean up
                URL.revokeObjectURL(url);
                
                showNotification('✅ تم تحميل الباركود بنجاح!', 'success');
            });
        };
        
        img.src = url;
        
    } catch (error) {
        alert('حدث خطأ أثناء تحميل الباركود');
        console.error('Download error:', error);
    }
}

// Print barcode
function printBarcode() {
    if (!currentBarcodeData) {
        alert('لا يوجد باركود للطباعة');
        return;
    }
    
    window.print();
    showNotification('📄 جاري إعداد الباركود للطباعة...', 'info');
}

// Reset form and create new barcode
function resetForm() {
    // Reset form
    document.getElementById('barcodeForm').reset();
    
    // Hide barcode display
    document.getElementById('barcodeDisplay').classList.remove('active');
    
    // Clear current data
    currentBarcodeData = null;
    
    // Scroll to form
    document.getElementById('barcodeForm').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
    
    showNotification('✨ جاهز لإنشاء باركود جديد', 'info');
}

// Update statistics
function updateStats() {
    // Simulate real-time stats (in production, this would fetch from API)
    const stats = {
        totalBarcodes: parseInt(localStorage.getItem('totalBarcodes') || '247'),
        activeBarcodes: parseInt(localStorage.getItem('activeBarcodes') || '89'),
        todayEntries: parseInt(localStorage.getItem('todayEntries') || '34')
    };
    
    document.getElementById('totalBarcodes').textContent = stats.totalBarcodes;
    document.getElementById('activeBarcodes').textContent = stats.activeBarcodes;
    document.getElementById('todayEntries').textContent = stats.todayEntries;
}

// Increment a statistic
function incrementStat(statName) {
    const currentValue = parseInt(localStorage.getItem(statName) || '0');
    const newValue = currentValue + 1;
    localStorage.setItem(statName, newValue.toString());
    document.getElementById(statName).textContent = newValue;
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 
                     type === 'error' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 
                     'linear-gradient(135deg, #3b82f6, #2563eb)'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 600;
        animation: slideInRight 0.4s ease;
        max-width: 350px;
        font-size: 15px;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes float {
        0%, 100% {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(180deg);
        }
    }
`;
document.head.appendChild(style);

// Phone number validation
document.getElementById('phoneNumber').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    // Ensure it starts with 05
    if (value.length > 0 && !value.startsWith('05')) {
        if (value.startsWith('5')) {
            value = '0' + value;
        } else if (value.startsWith('0') && value.length > 1 && value[1] !== '5') {
            value = '05';
        }
    }
    
    // Limit to 10 digits
    if (value.length > 10) {
        value = value.substring(0, 10);
    }
    
    e.target.value = value;
});

// Initialize stats from localStorage if not exists
if (!localStorage.getItem('totalBarcodes')) {
    localStorage.setItem('totalBarcodes', '247');
    localStorage.setItem('activeBarcodes', '89');
    localStorage.setItem('todayEntries', '34');
}
