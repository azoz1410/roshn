// Filter state
let currentStep = 1;
const totalSteps = 4;
let filterData = {
    category: null,
    facilities: [],
    propertyTypes: [],
    minBedrooms: 1,
    maxBedrooms: 5,
    minBathrooms: 1,
    maxBathrooms: 4,
    minPrice: 0,
    maxPrice: 3000000
};

// Facilities by category
const facilitiesByCategory = {
    'طلاب': [
        { value: 'جامعات', label: 'قريب من الجامعات', icon: '🎓' },
        { value: 'مدارس', label: 'قريب من المدارس', icon: '🏫' },
        { value: 'مكتبات', label: 'قريب من المكتبات', icon: '📚' },
        { value: 'مطاعم اقتصادية', label: 'مطاعم وجبات سريعة', icon: '🍔' },
        { value: 'مقاهي', label: 'مقاهي ومراكز دراسية', icon: '☕' },
        { value: 'مواصلات', label: 'قريب من المواصلات', icon: '🚌' }
    ],
    'موظفين': [
        { value: 'أعمال', label: 'قريب من مراكز الأعمال', icon: '🏢' },
        { value: 'شركات', label: 'قريب من الشركات', icon: '🏭' },
        { value: 'بنوك', label: 'قريب من البنوك', icon: '🏦' },
        { value: 'مترو', label: 'قريب من محطة المترو', icon: '🚇' },
        { value: 'مطاعم', label: 'مطاعم ومقاهي', icon: '🍽️' },
        { value: 'صالات رياضية', label: 'صالات رياضية', icon: '💪' }
    ],
    'عائلات': [
        { value: 'مدارس', label: 'قريب من المدارس', icon: '🏫' },
        { value: 'مستشفيات', label: 'قريب من المستشفيات', icon: '🏥' },
        { value: 'مولات', label: 'مولات ومراكز تسوق', icon: '🛍️' },
        { value: 'حدائق', label: 'حدائق ومنتزهات', icon: '🌳' },
        { value: 'مساجد', label: 'قريب من المساجد', icon: '🕌' },
        { value: 'صيدليات', label: 'صيدليات وعيادات', icon: '⚕️' }
    ]
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setupCategorySelection();
    setupPropertyTypeSelection();
});

// Setup category selection
function setupCategorySelection() {
    const categoryCards = document.querySelectorAll('[data-step="1"] .option-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            categoryCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            filterData.category = this.getAttribute('data-value');
            updateFacilitiesOptions();
        });
    });
}

// Setup property type selection
function setupPropertyTypeSelection() {
    const typeCards = document.querySelectorAll('[data-type]');
    typeCards.forEach(card => {
        card.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
                filterData.propertyTypes = filterData.propertyTypes.filter(t => t !== type);
            } else {
                this.classList.add('selected');
                filterData.propertyTypes.push(type);
            }
        });
    });
}

// Update facilities based on category
function updateFacilitiesOptions() {
    const container = document.getElementById('facilitiesOptions');
    container.innerHTML = '';
    
    if (!filterData.category) return;
    
    const facilities = facilitiesByCategory[filterData.category];
    facilities.forEach(facility => {
        const option = document.createElement('div');
        option.className = 'checkbox-option';
        option.innerHTML = `
            <input type="checkbox" id="facility-${facility.value}" value="${facility.value}">
            <div class="checkbox-label">
                <div class="checkbox-title">${facility.icon} ${facility.label}</div>
                <div class="checkbox-desc">تصفية حسب القرب من ${facility.label}</div>
            </div>
        `;
        
        option.addEventListener('click', function(e) {
            if (e.target.tagName !== 'INPUT') {
                const checkbox = this.querySelector('input');
                checkbox.checked = !checkbox.checked;
            }
            this.classList.toggle('selected');
            updateFacilitiesFilter();
        });
        
        container.appendChild(option);
    });
}

// Update facilities filter
function updateFacilitiesFilter() {
    filterData.facilities = [];
    document.querySelectorAll('#facilitiesOptions input:checked').forEach(checkbox => {
        filterData.facilities.push(checkbox.value);
    });
}

// Change step
window.changeStep = function(direction) {
    // Validate current step
    if (direction > 0 && !validateStep(currentStep)) {
        return;
    }
    
    const newStep = currentStep + direction;
    
    if (newStep < 1 || newStep > totalSteps + 1) return;
    
    // Update current step
    currentStep = newStep;
    
    // Update UI
    updateStepUI();
    
    // Show results if finished
    if (currentStep > totalSteps) {
        showResults();
    }
}

// Validate step
function validateStep(step) {
    if (step === 1 && !filterData.category) {
        alert('الرجاء اختيار الفئة المناسبة');
        return false;
    }
    return true;
}

// Update step UI
function updateStepUI() {
    // Update step indicators
    document.querySelectorAll('.step').forEach(step => {
        const stepNum = parseInt(step.getAttribute('data-step'));
        step.classList.remove('active', 'completed');
        if (stepNum === currentStep) {
            step.classList.add('active');
        } else if (stepNum < currentStep) {
            step.classList.add('completed');
        }
    });
    
    // Update step content
    document.querySelectorAll('.filter-step').forEach(step => {
        step.classList.remove('active');
    });
    const activeStep = document.querySelector(`.filter-step[data-step="${currentStep}"]`);
    if (activeStep) {
        activeStep.classList.add('active');
    }
    
    // Update buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.style.display = currentStep > 1 ? 'flex' : 'none';
    
    if (currentStep === totalSteps) {
        nextBtn.innerHTML = `
            عرض النتائج
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        `;
    } else {
        nextBtn.innerHTML = `
            التالي
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
        `;
    }
}

// Show results
function showResults() {
    // Get filter values from inputs
    filterData.minBedrooms = parseInt(document.getElementById('minBedrooms').value) || 1;
    filterData.maxBedrooms = parseInt(document.getElementById('maxBedrooms').value) || 10;
    filterData.minBathrooms = parseInt(document.getElementById('minBathrooms').value) || 1;
    filterData.maxBathrooms = parseInt(document.getElementById('maxBathrooms').value) || 10;
    filterData.minPrice = parseInt(document.getElementById('minPrice').value) || 0;
    filterData.maxPrice = parseInt(document.getElementById('maxPrice').value) || 10000000;
    
    // Filter houses
    const houses = getHouses();
    let filteredHouses = houses.filter(house => {
        // Filter by category
        if (filterData.category && house.category !== filterData.category) {
            return false;
        }
        
        // Filter by property type
        if (filterData.propertyTypes.length > 0 && !filterData.propertyTypes.includes(house.type)) {
            return false;
        }
        
        // Filter by bedrooms
        if (house.bedrooms < filterData.minBedrooms || house.bedrooms > filterData.maxBedrooms) {
            return false;
        }
        
        // Filter by bathrooms
        if (house.bathrooms < filterData.minBathrooms || house.bathrooms > filterData.maxBathrooms) {
            return false;
        }
        
        // Filter by price
        if (house.price < filterData.minPrice || house.price > filterData.maxPrice) {
            return false;
        }
        
        // Filter by facilities
        if (filterData.facilities.length > 0) {
            const hasMatchingFacility = filterData.facilities.some(facility => {
                return house.nearbyPlaces.some(place => 
                    place.toLowerCase().includes(facility.toLowerCase()) ||
                    facility.toLowerCase().includes(place.toLowerCase())
                );
            });
            if (!hasMatchingFacility) {
                return false;
            }
        }
        
        return true;
    });
    
    // Hide wizard, show results
    document.getElementById('filterWizard').style.display = 'none';
    document.getElementById('resultsSection').classList.add('active');
    
    // Update results count
    document.getElementById('resultsCount').textContent = filteredHouses.length;
    
    // Show filter summary
    displayFilterSummary();
    
    // Display houses or no results
    if (filteredHouses.length > 0) {
        displayFilteredHouses(filteredHouses);
        document.getElementById('noResults').style.display = 'none';
    } else {
        document.getElementById('filteredHouses').innerHTML = '';
        document.getElementById('noResults').style.display = 'block';
    }
    
    // Scroll to results
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Display filter summary
function displayFilterSummary() {
    const container = document.getElementById('filterSummary');
    container.innerHTML = '';
    
    const tags = [];
    
    // Category
    if (filterData.category) {
        const categoryLabels = {
            'طلاب': '🎓 سكن للطلاب',
            'موظفين': '💼 سكن للموظفين',
            'عائلات': '👨‍👩‍👧‍👦 سكن للعائلات'
        };
        tags.push(categoryLabels[filterData.category]);
    }
    
    // Property types
    if (filterData.propertyTypes.length > 0) {
        const typeLabels = {
            'apartment': 'شقة',
            'villa': 'فيلا',
            'townhouse': 'تاون هاوس',
            'duplex': 'دوبلكس'
        };
        filterData.propertyTypes.forEach(type => {
            tags.push(typeLabels[type]);
        });
    }
    
    // Bedrooms
    tags.push(`${filterData.minBedrooms}-${filterData.maxBedrooms} غرف نوم`);
    
    // Bathrooms
    tags.push(`${filterData.minBathrooms}-${filterData.maxBathrooms} حمامات`);
    
    // Price
    tags.push(`${formatPrice(filterData.minPrice)} - ${formatPrice(filterData.maxPrice)}`);
    
    // Facilities
    filterData.facilities.forEach(facility => {
        tags.push(`قريب من ${facility}`);
    });
    
    tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'filter-tag';
        tagElement.textContent = tag;
        container.appendChild(tagElement);
    });
}

// Display filtered houses
function displayFilteredHouses(houses) {
    const container = document.getElementById('filteredHouses');
    container.innerHTML = '';
    
    houses.forEach((house, index) => {
        const houseCard = createHouseCard(house, index);
        container.innerHTML += houseCard;
    });
    
    // Animate cards
    setTimeout(() => {
        const cards = document.querySelectorAll('#filteredHouses .house-card');
        cards.forEach((card, i) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, i * 100);
        });
    }, 100);
}

// Create house card (reuse from index.html)
function createHouseCard(house, index) {
    const featuresHTML = house.features.slice(0, 3).map(feature => 
        `<span class="feature-tag">${feature}</span>`
    ).join('');

    const moreFeatures = house.features.length > 3 ? 
        `<span class="feature-tag">+${house.features.length - 3} المزيد</span>` : '';
    
    const categoryBadge = getCategoryBadge(house.category);

    return `
        <div class="house-card" style="opacity: 0; transform: translateY(20px); transition: all 0.6s ease ${index * 0.1}s;">
            <div class="house-image">
                <img src="${house.image}" alt="${house.title}">
                <div class="house-type">${getTypeLabel(house.type)}</div>
                <div class="house-area">${house.area} م²</div>
            </div>
            
            <div class="house-content">
                ${categoryBadge}
                <h3 class="house-title">${house.title}</h3>
                
                <div class="house-location">
                    <div class="location-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <span>${house.location}</span>
                </div>
                
                <div class="house-price">
                    <div class="price-amount">${formatPrice(house.price)}</div>
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
                            <div class="detail-value">${house.bedrooms}</div>
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
                            <div class="detail-value">${house.bathrooms}</div>
                            <div class="detail-label">حمامات</div>
                        </div>
                    </div>
                </div>
                
                <div class="house-features">
                    <h4 class="features-title">المميزات</h4>
                    <div class="features-list">
                        ${featuresHTML}
                        ${moreFeatures}
                    </div>
                </div>
                
                <div style="margin: 15px 0; padding: 12px; background: #f8fafc; border-radius: 10px;">
                    <div style="font-size: 13px; font-weight: 600; color: #475569; margin-bottom: 8px;">📍 المرافق القريبة:</div>
                    <div style="font-size: 12px; color: #64748b;">${house.nearbyPlaces.slice(0, 3).join(' • ')}</div>
                </div>
                
                <button class="view-details-btn" onclick="alert('تفاصيل المسكن رقم ${house.id}')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    عرض التفاصيل
                </button>
            </div>
        </div>
    `;
}

// Get category badge
function getCategoryBadge(category) {
    const badges = {
        'طلاب': '<div style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; padding: 6px 12px; border-radius: 15px; font-size: 12px; font-weight: 600; display: inline-block; margin-bottom: 10px;">🎓 سكن للطلاب</div>',
        'موظفين': '<div style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 6px 12px; border-radius: 15px; font-size: 12px; font-weight: 600; display: inline-block; margin-bottom: 10px;">💼 سكن للموظفين</div>',
        'عائلات': '<div style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 6px 12px; border-radius: 15px; font-size: 12px; font-weight: 600; display: inline-block; margin-bottom: 10px;">👨‍👩‍👧‍👦 سكن للعائلات</div>'
    };
    return badges[category] || '';
}

// Reset search
window.resetSearch = function() {
    // Reset filter data
    filterData = {
        category: null,
        facilities: [],
        propertyTypes: [],
        minBedrooms: 1,
        maxBedrooms: 5,
        minBathrooms: 1,
        maxBathrooms: 4,
        minPrice: 0,
        maxPrice: 3000000
    };
    
    // Reset step
    currentStep = 1;
    
    // Show wizard, hide results
    document.getElementById('filterWizard').style.display = 'block';
    document.getElementById('resultsSection').classList.remove('active');
    
    // Reset UI
    document.querySelectorAll('.option-card').forEach(card => card.classList.remove('selected'));
    document.querySelectorAll('.checkbox-option').forEach(opt => opt.classList.remove('selected'));
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    
    updateStepUI();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
