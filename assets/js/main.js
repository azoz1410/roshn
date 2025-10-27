// روشن - منصة المساكن الفاخرة
// JavaScript للتفاعلات والأنيميشن

document.addEventListener('DOMContentLoaded', function() {
    // تهيئة المتغيرات
    const loadBtn = document.getElementById('loadHousesBtn');
    const housesContainer = document.getElementById('housesContainer');
    const housesSection = document.getElementById('housesSection');
    
    // دالة تحميل المساكن
    if (loadBtn) {
        loadBtn.addEventListener('click', function() {
            loadRandomHouses();
        });
    }
    
    function loadRandomHouses() {
        // تغيير حالة الزر
        loadBtn.disabled = true;
        loadBtn.classList.add('loading');
        loadBtn.innerHTML = '<span class="spinner"></span> جاري التحميل...';
        
        // محاكاة تأخير التحميل
        setTimeout(() => {
            // إعادة تحميل الصفحة لجلب مساكن عشوائية جديدة
            window.location.href = 'index.php?load=1';
        }, 500);
    }
    
    // أنيميشن ظهور البطاقات
    function animateCards() {
        const cards = document.querySelectorAll('.house-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }
    
    // تطبيق الأنيميشن عند تحميل الصفحة
    if (housesContainer && housesContainer.children.length > 0) {
        animateCards();
    }
    
    // Smooth Scroll للروابط
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // أنيميشن العناصر عند ال scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // مراقبة البطاقات
    document.querySelectorAll('.house-card').forEach(card => {
        observer.observe(card);
    });
    
    // تأثير Hover على البطاقات
    document.querySelectorAll('.house-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // تأثير النقر على زر عرض التفاصيل
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const houseCard = this.closest('.house-card');
            const houseTitle = houseCard.querySelector('.house-title').textContent;
            
            // يمكن هنا فتح modal أو الانتقال لصفحة التفاصيل
            showNotification(`جاري تحميل تفاصيل: ${houseTitle}`);
            
            // محاكاة التحميل
            this.innerHTML = '<span class="spinner"></span> جاري التحميل...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> عرض التفاصيل';
                this.disabled = false;
            }, 1500);
        });
    });
    
    // دالة عرض الإشعارات
    function showNotification(message) {
        // إنشاء عنصر الإشعار
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
            color: white;
            padding: 1rem 2rem;
            border-radius: 1rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            font-weight: 600;
            animation: slideDown 0.5s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        // إزالة الإشعار بعد 3 ثواني
        setTimeout(() => {
            notification.style.animation = 'slideUp 0.5s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }
    
    // إضافة أنيميشن الإشعارات في CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translate(-50%, -100%);
            }
            to {
                opacity: 1;
                transform: translate(-50%, 0);
            }
        }
        
        @keyframes slideUp {
            from {
                opacity: 1;
                transform: translate(-50%, 0);
            }
            to {
                opacity: 0;
                transform: translate(-50%, -100%);
            }
        }
    `;
    document.head.appendChild(style);
    
    // تأثير parallax بسيط للخلفية
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero');
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // عداد تنازلي لأيقونة التحميل
    let loadCount = 0;
    const loadIcons = ['🏠', '🏡', '🏘️', '🏢'];
    
    setInterval(() => {
        const heroIcon = document.querySelector('.hero-icon svg');
        if (heroIcon && window.scrollY === 0) {
            loadCount = (loadCount + 1) % loadIcons.length;
        }
    }, 3000);
    
    console.log('🏠 منصة روشن - تم تحميل JavaScript بنجاح!');
});