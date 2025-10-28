// Resident Authentication System

// Switch between login and register tabs
window.switchTab = function(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabs = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(t => t.classList.remove('active'));
    
    if (tab === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        tabs[0].classList.add('active');
    } else {
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
        tabs[1].classList.add('active');
    }
    
    hideAlert();
}

// Handle Login
window.handleLogin = function(event) {
    event.preventDefault();
    
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    // Get residents from localStorage
    const residents = JSON.parse(localStorage.getItem('residents') || '[]');
    
    // Find resident
    const resident = residents.find(r => 
        (r.email === username || r.phone === username) && r.password === password
    );
    
    if (resident) {
        // Store current resident session
        localStorage.setItem('currentResident', JSON.stringify({
            id: resident.id,
            fullName: resident.fullName,
            email: resident.email,
            phone: resident.phone,
            unitNumber: resident.unitNumber,
            houseType: resident.houseType,
            loginTime: new Date().toISOString()
        }));
        
        showAlert('تم تسجيل الدخول بنجاح! جاري التحويل...', 'success');
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'resident-dashboard.html';
        }, 1500);
    } else {
        showAlert('البريد الإلكتروني أو كلمة المرور غير صحيحة', 'error');
    }
}

// Handle Registration
window.handleRegister = function(event) {
    event.preventDefault();
    
    const fullName = document.getElementById('regFullName').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const email = document.getElementById('regEmail').value.trim().toLowerCase();
    const unitNumber = document.getElementById('regUnit').value.trim().toUpperCase();
    const houseType = document.getElementById('regHouseType').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    
    // Validation
    if (password !== confirmPassword) {
        showAlert('كلمة المرور غير متطابقة', 'error');
        return;
    }
    
    if (password.length < 6) {
        showAlert('كلمة المرور يجب أن تكون 6 أحرف على الأقل', 'error');
        return;
    }
    
    if (!phone.match(/^05\d{8}$/)) {
        showAlert('رقم الجوال غير صحيح (يجب أن يبدأ بـ 05 ويتكون من 10 أرقام)', 'error');
        return;
    }
    
    // Get existing residents
    const residents = JSON.parse(localStorage.getItem('residents') || '[]');
    
    // Check if email or phone already exists
    if (residents.some(r => r.email === email)) {
        showAlert('البريد الإلكتروني مسجل مسبقاً', 'error');
        return;
    }
    
    if (residents.some(r => r.phone === phone)) {
        showAlert('رقم الجوال مسجل مسبقاً', 'error');
        return;
    }
    
    if (residents.some(r => r.unitNumber === unitNumber)) {
        showAlert('رقم الوحدة مسجل مسبقاً', 'error');
        return;
    }
    
    // Create new resident
    const newResident = {
        id: 'RES' + Date.now() + Math.floor(Math.random() * 1000),
        fullName: fullName,
        phone: phone,
        email: email,
        unitNumber: unitNumber,
        houseType: houseType,
        password: password,
        registrationDate: new Date().toISOString(),
        isActive: true
    };
    
    // Add to residents array
    residents.push(newResident);
    
    // Save to localStorage
    localStorage.setItem('residents', JSON.stringify(residents));
    
    showAlert('تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول', 'success');
    
    // Switch to login tab after 2 seconds
    setTimeout(() => {
        switchTab('login');
        document.getElementById('loginUsername').value = email;
    }, 2000);
}

// Show alert message
function showAlert(message, type) {
    const alertBox = document.getElementById('alertBox');
    alertBox.textContent = message;
    alertBox.className = `alert alert-${type} show`;
}

// Hide alert message
function hideAlert() {
    const alertBox = document.getElementById('alertBox');
    alertBox.className = 'alert';
}

// Phone number formatting
document.getElementById('regPhone')?.addEventListener('input', function(e) {
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

// Check if already logged in
document.addEventListener('DOMContentLoaded', function() {
    const currentResident = localStorage.getItem('currentResident');
    if (currentResident) {
        // Already logged in, redirect to dashboard
        window.location.href = 'resident-dashboard.html';
    }
});
