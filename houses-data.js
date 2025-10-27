// بيانات المساكن
const housesData = [
    {
        id: 1,
        title: 'فيلا فاخرة في حي الياسمين',
        location: 'الرياض، حي الياسمين',
        price: 2500000,
        type: 'villa',
        bedrooms: 5,
        bathrooms: 4,
        area: 450,
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
        features: ['مسبح خاص', 'حديقة كبيرة', 'غرفة خادمة', 'مجلس رجال', 'موقف 4 سيارات'],
        description: 'فيلا فاخرة حديثة البناء في أرقى أحياء الرياض مع تشطيبات عالية الجودة',
        lat: 24.7136,
        lng: 46.6753,
        category: 'عائلات',
        nearbyPlaces: ['مدارس عالمية', 'مستشفيات', 'مولات تجارية', 'حدائق عامة']
    },
    {
        id: 2,
        title: 'شقة عصرية في حي العليا',
        location: 'الرياض، حي العليا',
        price: 850000,
        type: 'apartment',
        bedrooms: 3,
        bathrooms: 2,
        area: 180,
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
        features: ['إطلالة بانورامية', 'مسبح مشترك', 'صالة رياضية', 'أمن 24 ساعة', 'موقف مغطى'],
        description: 'شقة راقية في قلب حي العليا التجاري مع جميع المرافق الحديثة',
        lat: 24.7110,
        lng: 46.6750,
        category: 'موظفين',
        nearbyPlaces: ['برج المملكة', 'برج الفيصلية', 'مراكز أعمال', 'بنوك', 'مطاعم فاخرة']
    },
    {
        id: 3,
        title: 'تاون هاوس في حي النرجس',
        location: 'الرياض، حي النرجس',
        price: 1200000,
        type: 'townhouse',
        bedrooms: 4,
        bathrooms: 3,
        area: 320,
        image: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80',
        features: ['حديقة خاصة', 'غرفة خادمة', 'تراس واسع', 'موقف سيارتين', 'مخزن'],
        description: 'تاون هاوس عصري بتصميم معاصر في موقع مميز قريب من جميع الخدمات',
        lat: 24.7750,
        lng: 46.6180,
        category: 'عائلات',
        nearbyPlaces: ['مدارس عالمية', 'عيادات طبية', 'بندة', 'مساجد', 'حدائق']
    },
    {
        id: 4,
        title: 'شقة طلابية في حي المروج',
        location: 'الرياض، حي المروج',
        price: 450000,
        type: 'apartment',
        bedrooms: 2,
        bathrooms: 2,
        area: 120,
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
        features: ['مفروشة بالكامل', 'انترنت عالي السرعة', 'قريب من الجامعات', 'مطبخ مجهز', 'أمن وحراسة'],
        description: 'شقة مثالية للطلاب قريبة من الجامعات مع جميع المرافق الأساسية',
        lat: 24.6478,
        lng: 46.7148,
        category: 'طلاب',
        nearbyPlaces: ['جامعة الأميرة نورة', 'جامعة الملك سعود', 'مكتبات', 'مطاعم اقتصادية', 'محلات تصوير']
    },
    {
        id: 5,
        title: 'دوبلكس راقي في حي الملقا',
        location: 'الرياض، حي الملقا',
        price: 1100000,
        type: 'duplex',
        bedrooms: 4,
        bathrooms: 3,
        area: 280,
        image: 'https://images.unsplash.com/photo-1502672260066-6bc35f0af07e?w=800&q=80',
        features: ['مصعد داخلي', 'غرفة معيشة واسعة', 'مطبخ مجهز', 'شرفات متعددة', 'نظام سمارت'],
        description: 'دوبلكس على طابقين بتشطيبات فاخرة ونظام منزل ذكي في حي راقي',
        lat: 24.7740,
        lng: 46.6410,
        category: 'موظفين',
        nearbyPlaces: ['طريق الملك فهد', 'شركات كبرى', 'مولات', 'صالات رياضية', 'مطاعم']
    },
    {
        id: 6,
        title: 'فيلا كبيرة في حي الربوة',
        location: 'الرياض، حي الربوة',
        price: 1800000,
        type: 'villa',
        bedrooms: 6,
        bathrooms: 5,
        area: 500,
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
        features: ['مسبح خاص', 'حديقة واسعة', 'ملحق خارجي', 'مجلسين', 'غرفة خادمة', 'موقف 5 سيارات'],
        description: 'فيلا فخمة مع مساحات واسعة ومرافق متكاملة في حي راقي',
        lat: 24.7380,
        lng: 46.7230,
        category: 'عائلات',
        nearbyPlaces: ['مدارس دولية', 'مستشفيات خاصة', 'نوادي رياضية', 'حدائق كبيرة', 'مولات فاخرة']
    },
    {
        id: 7,
        title: 'شقة للموظفين في حي الورود',
        location: 'الرياض، حي الورود',
        price: 650000,
        type: 'apartment',
        bedrooms: 3,
        bathrooms: 2,
        area: 170,
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
        features: ['قريب من المترو', 'موقف مظلل', 'صالة رياضية', 'مطبخ حديث', 'انترنت عالي السرعة'],
        description: 'شقة مريحة ومثالية للموظفين مع سهولة الوصول لمناطق العمل',
        lat: 24.7560,
        lng: 46.7020,
        category: 'موظفين',
        nearbyPlaces: ['محطة مترو', 'مراكز أعمال', 'بنوك', 'مقاهي', 'مطاعم متنوعة']
    },
    {
        id: 8,
        title: 'تاون هاوس في حي الغدير',
        location: 'الرياض، حي الغدير',
        price: 980000,
        type: 'townhouse',
        bedrooms: 4,
        bathrooms: 3,
        area: 300,
        image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
        features: ['حديقة أمامية وخلفية', 'مجلس خارجي', 'غرفة ضيوف', 'موقف 3 سيارات', 'مخزن كبير'],
        description: 'تاون هاوس واسع في حي عائلي هادئ مع جميع المرافق',
        lat: 24.6850,
        lng: 46.7290,
        category: 'عائلات',
        nearbyPlaces: ['مدارس حكومية', 'مساجد', 'بقالات', 'صيدليات', 'حدائق']
    },
    {
        id: 9,
        title: 'شقة حديثة في حي السليمانية',
        location: 'الرياض، حي السليمانية',
        price: 750000,
        type: 'apartment',
        bedrooms: 3,
        bathrooms: 2,
        area: 165,
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
        features: ['إطلالة جميلة', 'موقف مغطى', 'أمن وحراسة', 'قريب من الخدمات', 'مصعد'],
        description: 'شقة أنيقة في حي راقي وحيوي مع جميع المرافق الحديثة',
        lat: 24.7080,
        lng: 46.7090,
        category: 'موظفين',
        nearbyPlaces: ['طريق الملك عبدالله', 'مستشفيات', 'مولات', 'مطاعم عالمية', 'بنوك']
    },
    {
        id: 10,
        title: 'فيلا عصرية في حي الواحة',
        location: 'الرياض، حي الواحة',
        price: 2200000,
        type: 'villa',
        bedrooms: 5,
        bathrooms: 4,
        area: 420,
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
        features: ['تصميم معماري حديث', 'حديقة كبيرة', 'مجلس رجال ونساء', 'مطبخ مفتوح', 'غرفة سائق'],
        description: 'فيلا راقية بتصميم عصري ومواصفات عالية في حي مرموق',
        lat: 24.8120,
        lng: 46.6850,
        category: 'عائلات',
        nearbyPlaces: ['مدارس عالمية', 'نوادي صحية', 'مطاعم فاخرة', 'مولات راقية', 'مستشفيات خاصة']
    },
    {
        id: 11,
        title: 'شقة طلابية في حي النسيم',
        location: 'الرياض، حي النسيم الشرقي',
        price: 380000,
        type: 'apartment',
        bedrooms: 2,
        bathrooms: 1,
        area: 100,
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
        features: ['إيجار مناسب', 'قريب من الجامعة', 'انترنت مجاني', 'موقف سيارة', 'بقالة قريبة'],
        description: 'شقة اقتصادية مثالية للطلاب بالقرب من الجامعات الرئيسية',
        lat: 24.6920,
        lng: 46.7550,
        category: 'طلاب',
        nearbyPlaces: ['جامعة الفيصل', 'جامعة اليمامة', 'مكتبات', 'مطاعم وجبات سريعة', 'مقاهي']
    },
    {
        id: 12,
        title: 'دوبلكس في حي الحمراء',
        location: 'الرياض، حي الحمراء',
        price: 1350000,
        type: 'duplex',
        bedrooms: 5,
        bathrooms: 4,
        area: 350,
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
        features: ['طابقين منفصلين', 'سطح واسع', 'مصعد داخلي', 'مطبخان', 'موقف 4 سيارات'],
        description: 'دوبلكس فسيح ومناسب للعائلات الكبيرة في موقع مركزي',
        lat: 24.6650,
        lng: 46.7380,
        category: 'عائلات',
        nearbyPlaces: ['مدارس متعددة', 'مساجد', 'أسواق مركزية', 'عيادات طبية', 'صيدليات']
    }
];

// وظائف مساعدة
function getHouses() {
    return housesData;
}

function getRandomHouses(count = 6) {
    const houses = [...housesData];
    const shuffled = houses.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function formatPrice(price) {
    return price.toLocaleString('ar-SA') + ' ريال';
}

function getTypeLabel(type) {
    const types = {
        'villa': 'فيلا',
        'apartment': 'شقة',
        'townhouse': 'تاون هاوس',
        'duplex': 'دوبلكس'
    };
    return types[type] || type;
}
