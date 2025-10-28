// Resident Dashboard System
let currentResident = null;
let currentVisitorBarcode = null;

// House type labels
const houseTypeLabels = {
    'villa': 'فيلا',
    'apartment': 'شقة',
    'townhouse': 'تاون هاوس',
    'duplex': 'دوبلكس'
};

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Check if logged in
    const residentData = localStorage.getItem('currentResident');
    
    if (!residentData) {
        // Not logged in, redirect to login
        window.location.href = 'resident-login.html';
        return;
    }
    
    currentResident = JSON.parse(residentData);
    
    // Load resident info
    loadResidentInfo();
    
    // Load visitors
    loadVisitorsList();
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('visitDate').min = today;
    document.getElementById('visitDate').value = today;
});

// Load resident information
function loadResidentInfo() {
    document.getElementById('residentName').textContent = `مرحباً ${currentResident.fullName}`;
    document.getElementById('unitNumber').textContent = currentResident.unitNumber;
    document.getElementById('houseType').textContent = houseTypeLabels[currentResident.houseType] || currentResident.houseType;
    document.getElementById('phone').textContent = currentResident.phone;
    document.getElementById('email').textContent = currentResident.email;
    
    // Profile form
    document.getElementById('profileName').value = currentResident.fullName;
    document.getElementById('profilePhone').value = currentResident.phone;
    document.getElementById('profileEmail').value = currentResident.email;
    document.getElementById('profileUnit').value = currentResident.unitNumber;
}

// Switch dashboard tabs
window.switchDashboardTab = function(tab) {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));
    
    if (tab === 'newVisitor') {
        tabs[0].classList.add('active');
        document.getElementById('newVisitorTab').classList.add('active');
    } else if (tab === 'myVisitors') {
        tabs[1].classList.add('active');
        document.getElementById('myVisitorsTab').classList.add('active');
        loadVisitorsList();
    } else if (tab === 'maintenance') {
        tabs[2].classList.add('active');
        document.getElementById('maintenanceTab').classList.add('active');
        loadMaintenanceRequests();
    } else if (tab === 'profile') {
        tabs[3].classList.add('active');
        document.getElementById('profileTab').classList.add('active');
    }
}

// Generate visitor barcode
window.generateVisitorBarcode = function(event) {
    event.preventDefault();
    
    const visitorName = document.getElementById('visitorName').value.trim();
    const visitorPhone = document.getElementById('visitorPhone').value.trim();
    const visitDate = document.getElementById('visitDate').value;
    const visitTime = document.getElementById('visitTime').value;
    const visitDuration = document.getElementById('visitDuration').value;
    const visitorsCount = document.getElementById('visitorsCount').value;
    const visitNotes = document.getElementById('visitNotes').value.trim();
    
    // Validate phone
    if (!visitorPhone.match(/^05\d{8}$/)) {
        alert('رقم الجوال غير صحيح (يجب أن يبدأ بـ 05 ويتكون من 10 أرقام)');
        return;
    }
    
    // Generate unique barcode
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 10000);
    const barcodeNumber = `VIS${timestamp}${randomNum}`;
    
    // Calculate expiry time
    const visitDateTime = new Date(`${visitDate}T${visitTime}`);
    const expiryTime = new Date(visitDateTime.getTime() + (parseInt(visitDuration) * 60 * 60 * 1000));
    
    // Create visitor record
    const visitor = {
        id: barcodeNumber,
        barcodeNumber: barcodeNumber,
        visitorName: visitorName,
        visitorPhone: visitorPhone,
        visitDate: visitDate,
        visitTime: visitTime,
        visitDateTime: visitDateTime.toISOString(),
        duration: parseInt(visitDuration),
        visitorsCount: parseInt(visitorsCount),
        notes: visitNotes,
        expiryTime: expiryTime.toISOString(),
        residentId: currentResident.id,
        residentName: currentResident.fullName,
        unitNumber: currentResident.unitNumber,
        createdAt: new Date().toISOString(),
        status: 'active', // active, used, expired
        usedAt: null
    };
    
    // Save to localStorage
    const visitors = JSON.parse(localStorage.getItem('visitors') || '[]');
    visitors.push(visitor);
    localStorage.setItem('visitors', JSON.stringify(visitors));
    
    currentVisitorBarcode = visitor;
    
    // Generate barcode
    try {
        JsBarcode("#visitorBarcode", barcodeNumber, {
            format: "CODE128",
            width: 2,
            height: 100,
            displayValue: true,
            fontSize: 16,
            fontOptions: "bold",
            textMargin: 10,
            margin: 10
        });
        
        // Display barcode details
        displayVisitorBarcodeDetails();
        
        // Show barcode result
        document.getElementById('visitorBarcodeResult').classList.add('show');
        
        // Scroll to barcode
        document.getElementById('visitorBarcodeResult').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
        
        // Update visitors count
        updateVisitorsCount();
        
        showNotification('✅ تم إصدار باركود الزائر بنجاح!', 'success');
        
    } catch (error) {
        alert('حدث خطأ أثناء إنشاء الباركود');
        console.error(error);
    }
}

// Display visitor barcode details
function displayVisitorBarcodeDetails() {
    const detailsContainer = document.getElementById('visitorBarcodeDetails');
    const visitor = currentVisitorBarcode;
    
    const visitDateTime = formatDateTime(new Date(visitor.visitDateTime));
    const expiryTime = formatDateTime(new Date(visitor.expiryTime));
    
    detailsContainer.innerHTML = `
        <div class="detail-row">
            <span class="detail-label">رقم الباركود:</span>
            <span class="detail-value">${visitor.barcodeNumber}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">اسم الزائر:</span>
            <span class="detail-value">${visitor.visitorName}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">رقم الجوال:</span>
            <span class="detail-value">${visitor.visitorPhone}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">وقت الزيارة:</span>
            <span class="detail-value">${visitDateTime}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">مدة الزيارة:</span>
            <span class="detail-value">${visitor.duration} ساعة</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">عدد الزوار:</span>
            <span class="detail-value">${visitor.visitorsCount} شخص</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">رقم الوحدة:</span>
            <span class="detail-value">${visitor.unitNumber}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">صالح حتى:</span>
            <span class="detail-value">${expiryTime}</span>
        </div>
        ${visitor.notes ? `
        <div class="detail-row">
            <span class="detail-label">ملاحظات:</span>
            <span class="detail-value">${visitor.notes}</span>
        </div>
        ` : ''}
    `;
}

// Download visitor barcode
window.downloadVisitorBarcode = function() {
    if (!currentVisitorBarcode) return;
    
    try {
        const svg = document.getElementById('visitorBarcode');
        const svgData = new XMLSerializer().serializeToString(svg);
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        const svgSize = svg.getBoundingClientRect();
        canvas.width = svgSize.width * 2;
        canvas.height = svgSize.height * 2 + 200;
        
        const img = new Image();
        const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        
        img.onload = function() {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw header
            ctx.fillStyle = '#1e293b';
            ctx.font = 'bold 32px Cairo';
            ctx.textAlign = 'center';
            ctx.fillText('باركود دخول زائر', canvas.width / 2, 40);
            
            // Draw barcode
            ctx.drawImage(img, 0, 60, canvas.width, svgSize.height * 2);
            
            // Draw visitor info
            const yStart = svgSize.height * 2 + 80;
            ctx.font = 'bold 24px Cairo';
            ctx.fillText(`${currentVisitorBarcode.visitorName}`, canvas.width / 2, yStart);
            
            ctx.font = '20px Cairo';
            ctx.fillText(`وحدة: ${currentVisitorBarcode.unitNumber}`, canvas.width / 2, yStart + 35);
            ctx.fillText(`${formatDate(new Date(currentVisitorBarcode.visitDateTime))}`, canvas.width / 2, yStart + 65);
            
            canvas.toBlob(function(blob) {
                const link = document.createElement('a');
                link.download = `visitor_barcode_${currentVisitorBarcode.visitorName}_${Date.now()}.png`;
                link.href = URL.createObjectURL(blob);
                link.click();
                
                URL.revokeObjectURL(url);
                showNotification('✅ تم تحميل الباركود بنجاح!', 'success');
            });
        };
        
        img.src = url;
        
    } catch (error) {
        alert('حدث خطأ أثناء تحميل الباركود');
        console.error(error);
    }
}

// Print visitor barcode
window.printVisitorBarcode = function() {
    if (!currentVisitorBarcode) return;
    window.print();
    showNotification('📄 جاري إعداد الباركود للطباعة...', 'info');
}

// Share visitor barcode
window.shareVisitorBarcode = function() {
    if (!currentVisitorBarcode) return;
    
    const message = `
مرحباً ${currentVisitorBarcode.visitorName}،

تم إصدار باركود دخول لك لزيارة الوحدة ${currentVisitorBarcode.unitNumber}

تفاصيل الزيارة:
📅 التاريخ: ${formatDate(new Date(currentVisitorBarcode.visitDateTime))}
⏰ الوقت: ${currentVisitorBarcode.visitTime}
⏳ المدة: ${currentVisitorBarcode.duration} ساعة
👥 عدد الزوار: ${currentVisitorBarcode.visitorsCount}

رقم الباركود: ${currentVisitorBarcode.barcodeNumber}

يرجى تحميل الباركود وإظهاره عند البوابة.

منصة أين؟ - خدمات السكان
    `.trim();
    
    if (navigator.share) {
        navigator.share({
            title: 'باركود دخول زائر',
            text: message
        }).then(() => {
            showNotification('✅ تمت المشاركة بنجاح!', 'success');
        }).catch(() => {
            copyToClipboard(message);
        });
    } else {
        copyToClipboard(message);
    }
}

// Copy to clipboard
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showNotification('📋 تم نسخ المعلومات إلى الحافظة!', 'success');
}

// Reset visitor form
window.resetVisitorForm = function() {
    document.querySelector('.visitor-form').reset();
    document.getElementById('visitorBarcodeResult').classList.remove('show');
    
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('visitDate').value = today;
    
    currentVisitorBarcode = null;
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showNotification('✨ جاهز لإصدار باركود جديد', 'info');
}

// Load visitors list
function loadVisitorsList() {
    const container = document.getElementById('visitorsList');
    const allVisitors = JSON.parse(localStorage.getItem('visitors') || '[]');
    
    // Filter visitors for current resident
    const myVisitors = allVisitors.filter(v => v.residentId === currentResident.id);
    
    // Update count
    document.getElementById('visitorsCount').textContent = myVisitors.length;
    
    if (myVisitors.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">👥</div>
                <h3>لا توجد زيارات</h3>
                <p>لم تقم بإصدار أي باركودات للزوار بعد</p>
            </div>
        `;
        return;
    }
    
    // Sort by creation date (newest first)
    myVisitors.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    container.innerHTML = myVisitors.map(visitor => {
        const status = getVisitorStatus(visitor);
        const statusClass = status === 'active' ? 'status-active' : 
                          status === 'expired' ? 'status-expired' : 'status-used';
        const statusText = status === 'active' ? 'نشط' : 
                         status === 'expired' ? 'منتهي' : 'مستخدم';
        
        return `
            <div class="visitor-card">
                <div class="visitor-header">
                    <div>
                        <div class="visitor-name">${visitor.visitorName}</div>
                        <div class="visitor-date">${formatDate(new Date(visitor.visitDateTime))}</div>
                    </div>
                    <div class="status-badge ${statusClass}">${statusText}</div>
                </div>
                
                <div class="visitor-info-grid">
                    <div class="visitor-info-item">
                        <div class="visitor-info-label">رقم الجوال</div>
                        <div class="visitor-info-value">${visitor.visitorPhone}</div>
                    </div>
                    <div class="visitor-info-item">
                        <div class="visitor-info-label">وقت الزيارة</div>
                        <div class="visitor-info-value">${visitor.visitTime}</div>
                    </div>
                    <div class="visitor-info-item">
                        <div class="visitor-info-label">مدة الزيارة</div>
                        <div class="visitor-info-value">${visitor.duration} ساعة</div>
                    </div>
                    <div class="visitor-info-item">
                        <div class="visitor-info-label">عدد الزوار</div>
                        <div class="visitor-info-value">${visitor.visitorsCount} شخص</div>
                    </div>
                    <div class="visitor-info-item">
                        <div class="visitor-info-label">رقم الباركود</div>
                        <div class="visitor-info-value" style="font-size: 12px;">${visitor.barcodeNumber}</div>
                    </div>
                </div>
                
                ${visitor.notes ? `
                    <div style="margin-top: 15px; padding: 12px; background: #f8fafc; border-radius: 10px; font-size: 14px; color: #64748b;">
                        📝 ${visitor.notes}
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

// Get visitor status
function getVisitorStatus(visitor) {
    if (visitor.usedAt) return 'used';
    
    const now = new Date();
    const expiry = new Date(visitor.expiryTime);
    
    if (now > expiry) return 'expired';
    
    return 'active';
}

// Update visitors count
function updateVisitorsCount() {
    const allVisitors = JSON.parse(localStorage.getItem('visitors') || '[]');
    const myVisitors = allVisitors.filter(v => v.residentId === currentResident.id);
    document.getElementById('visitorsCount').textContent = myVisitors.length;
}

// Update profile
window.updateProfile = function(event) {
    event.preventDefault();
    
    const newName = document.getElementById('profileName').value.trim();
    
    if (newName !== currentResident.fullName) {
        currentResident.fullName = newName;
        localStorage.setItem('currentResident', JSON.stringify(currentResident));
        
        // Update in residents database
        const residents = JSON.parse(localStorage.getItem('residents') || '[]');
        const index = residents.findIndex(r => r.id === currentResident.id);
        if (index !== -1) {
            residents[index].fullName = newName;
            localStorage.setItem('residents', JSON.stringify(residents));
        }
        
        loadResidentInfo();
        showNotification('✅ تم تحديث المعلومات بنجاح!', 'success');
    }
}

// Logout
window.logout = function() {
    if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
        localStorage.removeItem('currentResident');
        window.location.href = 'resident-login.html';
    }
}

// Format date and time
function formatDateTime(date) {
    return date.toLocaleString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

// Format date only
function formatDate(date) {
    return date.toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Show notification
function showNotification(message, type = 'info') {
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
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// Phone number validation
document.getElementById('visitorPhone')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 0 && !value.startsWith('05')) {
        if (value.startsWith('5')) {
            value = '0' + value;
        } else if (value.startsWith('0') && value.length > 1 && value[1] !== '5') {
            value = '05';
        }
    }
    
    if (value.length > 10) {
        value = value.substring(0, 10);
    }
    
    e.target.value = value;
});

// Add animations
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
`;
document.head.appendChild(style);

// ============================================
// MAINTENANCE SYSTEM
// ============================================

// Maintenance type labels
const maintenanceTypeLabels = {
    'plumbing': '🚰 سباكة',
    'electrical': '⚡ كهرباء',
    'ac': '❄️ تكييف',
    'carpentry': '🪚 نجارة',
    'painting': '🎨 دهان',
    'appliances': '🔌 أجهزة كهربائية',
    'doors': '🚪 أبواب ونوافذ',
    'flooring': '🏠 أرضيات',
    'garden': '🌳 حدائق',
    'pest': '🐛 مكافحة حشرات',
    'other': '🔧 أخرى'
};

// Priority labels
const priorityLabels = {
    'urgent': '🔴 عاجل',
    'high': '🟠 عالية',
    'medium': '🟡 متوسطة',
    'low': '🟢 منخفضة'
};

// Time slot labels
const timeSlotLabels = {
    'morning': '🌅 صباحاً (8:00 - 12:00)',
    'afternoon': '☀️ ظهراً (12:00 - 16:00)',
    'evening': '🌆 مساءً (16:00 - 20:00)',
    'anytime': '⏰ أي وقت'
};

// Status labels
const maintenanceStatusLabels = {
    'pending': 'قيد الانتظار',
    'confirmed': 'تم التأكيد',
    'in-progress': 'جاري العمل',
    'completed': 'مكتمل',
    'cancelled': 'ملغي'
};

// Submit maintenance request
window.submitMaintenanceRequest = function(event) {
    event.preventDefault();
    
    const maintenanceType = document.getElementById('maintenanceType').value;
    const priority = document.getElementById('maintenancePriority').value;
    const date = document.getElementById('maintenanceDate').value;
    const timeSlot = document.getElementById('maintenanceTime').value;
    const title = document.getElementById('maintenanceTitle').value.trim();
    const description = document.getElementById('maintenanceDescription').value.trim();
    const phone = document.getElementById('maintenancePhone').value.trim() || currentResident.phone;
    const allowEntry = document.getElementById('allowEntry').checked;
    
    // Validate
    if (!maintenanceType || !priority || !date || !timeSlot || !title || !description) {
        alert('الرجاء ملء جميع الحقول المطلوبة');
        return;
    }
    
    // Generate request number
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000);
    const requestNumber = `REQ${timestamp}${randomNum}`;
    
    // Create maintenance request
    const request = {
        id: requestNumber,
        requestNumber: requestNumber,
        residentId: currentResident.id,
        residentName: currentResident.fullName,
        unitNumber: currentResident.unitNumber,
        maintenanceType: maintenanceType,
        priority: priority,
        preferredDate: date,
        timeSlot: timeSlot,
        title: title,
        description: description,
        contactPhone: phone,
        allowEntry: allowEntry,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        technicianNotes: null,
        completedAt: null
    };
    
    // Save to localStorage
    const requests = JSON.parse(localStorage.getItem('maintenanceRequests') || '[]');
    requests.push(request);
    localStorage.setItem('maintenanceRequests', JSON.stringify(requests));
    
    // Show success message
    document.getElementById('requestNumber').textContent = requestNumber;
    document.querySelector('.visitor-form').style.display = 'none';
    document.getElementById('maintenanceSuccess').style.display = 'block';
    
    // Update count
    updateMaintenanceCount();
    
    // Scroll to success message
    document.getElementById('maintenanceSuccess').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
    });
    
    showNotification('✅ تم إرسال طلب الصيانة بنجاح!', 'success');
    
    // Load updated list
    setTimeout(() => {
        loadMaintenanceRequests();
    }, 500);
}

// Reset maintenance form
window.resetMaintenanceForm = function() {
    document.querySelector('#maintenanceTab .visitor-form').reset();
    document.getElementById('maintenanceSuccess').style.display = 'none';
    document.querySelector('#maintenanceTab .visitor-form').style.display = 'block';
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('maintenanceDate').min = today;
    document.getElementById('maintenanceDate').value = today;
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Load maintenance requests
function loadMaintenanceRequests() {
    const container = document.getElementById('maintenanceRequestsList');
    const allRequests = JSON.parse(localStorage.getItem('maintenanceRequests') || '[]');
    
    // Filter requests for current resident
    const myRequests = allRequests.filter(r => r.residentId === currentResident.id);
    
    if (myRequests.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🔧</div>
                <h3>لا توجد طلبات صيانة</h3>
                <p>لم تقم بتقديم أي طلبات صيانة بعد</p>
            </div>
        `;
        return;
    }
    
    // Sort by creation date (newest first)
    myRequests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    container.innerHTML = myRequests.map(request => {
        const statusClass = getMaintenanceStatusClass(request.status);
        
        return `
            <div class="maintenance-request-card">
                <div class="maintenance-header">
                    <div>
                        <div class="maintenance-title">${request.title}</div>
                        <div class="maintenance-request-number">رقم الطلب: ${request.requestNumber}</div>
                    </div>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                        <span class="maintenance-type-badge">${maintenanceTypeLabels[request.maintenanceType]}</span>
                        <span class="priority-badge priority-${request.priority}">${priorityLabels[request.priority]}</span>
                        <span class="maintenance-status-badge status-${statusClass}">${maintenanceStatusLabels[request.status]}</span>
                    </div>
                </div>
                
                <div class="maintenance-description">
                    ${request.description}
                </div>
                
                <div class="visitor-info-grid">
                    <div class="visitor-info-item">
                        <div class="visitor-info-label">التاريخ المفضل</div>
                        <div class="visitor-info-value">${formatDate(new Date(request.preferredDate))}</div>
                    </div>
                    <div class="visitor-info-item">
                        <div class="visitor-info-label">الوقت المفضل</div>
                        <div class="visitor-info-value">${timeSlotLabels[request.timeSlot]}</div>
                    </div>
                    <div class="visitor-info-item">
                        <div class="visitor-info-label">رقم الاتصال</div>
                        <div class="visitor-info-value">${request.contactPhone}</div>
                    </div>
                    <div class="visitor-info-item">
                        <div class="visitor-info-label">السماح بالدخول</div>
                        <div class="visitor-info-value">${request.allowEntry ? 'نعم ✅' : 'لا ❌'}</div>
                    </div>
                    <div class="visitor-info-item">
                        <div class="visitor-info-label">تاريخ التقديم</div>
                        <div class="visitor-info-value">${formatDateTime(new Date(request.createdAt))}</div>
                    </div>
                </div>
                
                ${request.technicianNotes ? `
                    <div style="margin-top: 15px; padding: 12px; background: #eff6ff; border-radius: 10px; border-right: 4px solid #3b82f6;">
                        <div style="font-size: 13px; font-weight: 600; color: #1e40af; margin-bottom: 5px;">📝 ملاحظات الفني:</div>
                        <div style="font-size: 14px; color: #1e40af;">${request.technicianNotes}</div>
                    </div>
                ` : ''}
                
                ${request.status === 'pending' ? `
                    <button onclick="cancelMaintenanceRequest('${request.id}')" style="margin-top: 15px; padding: 10px 20px; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; font-family: 'Cairo', sans-serif;">
                        ❌ إلغاء الطلب
                    </button>
                ` : ''}
            </div>
        `;
    }).join('');
}

// Get maintenance status class
function getMaintenanceStatusClass(status) {
    const classMap = {
        'pending': 'pending',
        'confirmed': 'in-progress',
        'in-progress': 'in-progress',
        'completed': 'completed',
        'cancelled': 'cancelled'
    };
    return classMap[status] || 'pending';
}

// Update maintenance count
function updateMaintenanceCount() {
    const allRequests = JSON.parse(localStorage.getItem('maintenanceRequests') || '[]');
    const myRequests = allRequests.filter(r => r.residentId === currentResident.id);
    document.getElementById('maintenanceCount').textContent = myRequests.length;
}

// Cancel maintenance request
window.cancelMaintenanceRequest = function(requestId) {
    if (!confirm('هل أنت متأكد من إلغاء طلب الصيانة؟')) {
        return;
    }
    
    const requests = JSON.parse(localStorage.getItem('maintenanceRequests') || '[]');
    const index = requests.findIndex(r => r.id === requestId);
    
    if (index !== -1) {
        requests[index].status = 'cancelled';
        requests[index].updatedAt = new Date().toISOString();
        localStorage.setItem('maintenanceRequests', JSON.stringify(requests));
        
        showNotification('✅ تم إلغاء طلب الصيانة', 'success');
        loadMaintenanceRequests();
    }
}

// Initialize maintenance
document.addEventListener('DOMContentLoaded', function() {
    // Set minimum date to today for maintenance
    const today = new Date().toISOString().split('T')[0];
    const maintenanceDateInput = document.getElementById('maintenanceDate');
    if (maintenanceDateInput) {
        maintenanceDateInput.min = today;
        maintenanceDateInput.value = today;
    }
    
    // Update maintenance count
    if (currentResident) {
        updateMaintenanceCount();
    }
});

