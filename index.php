<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="منصة أين؟ للمساكن الفاخرة - اكتشف منزل أحلامك من بين مجموعة مختارة من أفضل المساكن">
    <meta name="keywords" content="مساكن، عقارات، فلل، شقق، تاون هاوس، السعودية">
    <title>منصة أين؟ للمساكن الفاخرة</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <!-- Header -->
    <header>
        <div class="header-container">
            <div class="logo">
                <div class="logo-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7zm16 0V5a2 2 0 00-2-2H7a2 2 0 00-2 2v2h14z" />
                    </svg>
                </div>
                <div class="logo-text">
                    <h1>أين؟</h1>
                    <p>منصة المساكن الفاخرة</p>
                </div>
            </div>
            <nav>
                <ul>
                    <li><a href="#home">الرئيسية</a></li>
                    <li><a href="#houses">المساكن</a></li>
                    <li><a href="map.php">الخريطة</a></li>
                    <li><a href="#about">عنا</a></li>
                    <li><a href="#contact">اتصل بنا</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <!-- Main Container -->
    <div class="container">
        <!-- Hero Section -->
        <section class="hero" id="home">
            <div class="hero-content">
                <div class="hero-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7zm16 0V5a2 2 0 00-2-2H7a2 2 0 00-2 2v2h14z" />
                    </svg>
                </div>
                <h1>منصة أين؟</h1>
                <h2>للمساكن الفاخرة</h2>
                <p>اكتشف منزل أحلامك من بين مجموعة مختارة بعناية من أفضل المساكن الفاخرة في جميع أنحاء المملكة العربية السعودية</p>
                <button id="loadHousesBtn" class="btn-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    استكشف مساكن جديدة الآن
                </button>
            </div>
        </section>

        <?php
        require_once 'data/houses.php';
        
        // جلب المساكن إذا تم الضغط على الزر
        $houses = [];
        if (isset($_GET['load']) || isset($_SERVER['HTTP_REFERER'])) {
            $houses = getRandomHouses(6);
        }
        ?>

        <!-- Houses Section -->
        <?php if (count($houses) > 0): ?>
        <section id="housesSection">
            <div class="section-title">
                <h2>مجموعة مختارة لك</h2>
                <div class="title-divider"></div>
            </div>
            
            <div class="houses-grid" id="housesContainer">
                <?php foreach ($houses as $house): ?>
                <div class="house-card">
                    <div class="house-image">
                        <img src="<?php echo $house['image']; ?>" alt="<?php echo htmlspecialchars($house['title']); ?>">
                        <div class="house-type"><?php echo getTypeLabel($house['type']); ?></div>
                        <div class="house-area"><?php echo $house['area']; ?> م²</div>
                    </div>
                    
                    <div class="house-content">
                        <h3 class="house-title"><?php echo htmlspecialchars($house['title']); ?></h3>
                        
                        <div class="house-location">
                            <div class="location-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <span><?php echo htmlspecialchars($house['location']); ?></span>
                        </div>
                        
                        <div class="house-price">
                            <div class="price-amount"><?php echo formatPrice($house['price']); ?></div>
                            <div class="price-label">السعر الإجمالي</div>
                        </div>
                        
                        <div class="house-details">
                            <div class="detail-item">
                                <div class="detail-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 3L4 9v12h5v-7h6v7h5V9l-8-6z"/>
                                    </svg>
                                </div>
                                <div class="detail-info">
                                    <div class="detail-value"><?php echo $house['bedrooms']; ?></div>
                                    <div class="detail-label">غرف نوم</div>
                                </div>
                            </div>
                            
                            <div class="detail-item">
                                <div class="detail-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 2v2h6V2h2v2h1a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h1V2h2z"/>
                                    </svg>
                                </div>
                                <div class="detail-info">
                                    <div class="detail-value"><?php echo $house['bathrooms']; ?></div>
                                    <div class="detail-label">حمامات</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="house-features">
                            <h4 class="features-title">المميزات</h4>
                            <div class="features-list">
                                <?php foreach (array_slice($house['features'], 0, 3) as $feature): ?>
                                <span class="feature-tag"><?php echo htmlspecialchars($feature); ?></span>
                                <?php endforeach; ?>
                                <?php if (count($house['features']) > 3): ?>
                                <span class="feature-tag">+<?php echo count($house['features']) - 3; ?> المزيد</span>
                                <?php endif; ?>
                            </div>
                        </div>
                        
                        <p class="house-description"><?php echo htmlspecialchars($house['description']); ?></p>
                        
                        <button class="view-details-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            عرض التفاصيل
                        </button>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </section>
        <?php else: ?>
        <section class="empty-state">
            <div class="empty-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            </div>
            <h3>مرحباً بك في منصة روشن</h3>
            <p>اضغط على الزر أعلاه لاستكشاف مجموعة رائعة من المساكن الفاخرة</p>
        </section>
        <?php endif; ?>
    </div>

    <!-- Footer -->
    <footer>
        <div class="footer-content">
            <div class="footer-section">
                <h3>أين؟</h3>
                <p>منصة متخصصة في عرض أفضل المساكن الفاخرة بتصميم عصري وجودة عالية. نساعدك في العثور على منزل أحلامك بسهولة ويسر مع أفضل الخدمات المتكاملة.</p>
                <div class="social-links">
                    <a href="#" class="social-link">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                    </a>
                    <a href="#" class="social-link">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                    </a>
                    <a href="#" class="social-link">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                    </a>
                </div>
            </div>
            
            <div class="footer-section">
                <h3>روابط سريعة</h3>
                <ul class="footer-links">
                    <li><a href="#home">← الرئيسية</a></li>
                    <li><a href="#houses">← المساكن</a></li>
                    <li><a href="#about">← عنا</a></li>
                    <li><a href="#contact">← اتصل بنا</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h3>تواصل معنا</h3>
                <div class="contact-item">
                    <div class="contact-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <span>info@roshn.com</span>
                </div>
                <div class="contact-item">
                    <div class="contact-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                    </div>
                    <span>+966 11 234 5678</span>
                </div>
                <div class="contact-item">
                    <div class="contact-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <span>الرياض، المملكة العربية السعودية</span>
                </div>
            </div>
        </div>
        
        <div class="footer-bottom">
            <p>&copy; 2025 منصة أين؟. جميع الحقوق محفوظة. ❤️ صُنع بـ في السعودية</p>
        </div>
    </footer>

    <script src="assets/js/main.js"></script>
</body>
</html>