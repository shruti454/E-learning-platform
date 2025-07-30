function navigateTo(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    const targetLink = document.querySelector(`a[href="#${sectionId}"]`);
    if (targetLink) {
        targetLink.classList.add('active');
    }
}

// Course data
const coursesData = [
    {
        id: 1,
        title: "React Development",
        description: "Learn modern React development with hooks and context",
        duration: "8 weeks",
        level: "Intermediate",
        progress: 75,
        icon: "fab fa-react",
        videoUrl: "https://www.youtube.com/embed/Ke90Tje7VS0"
    },
    {
        id: 2,
        title: "Python Programming",
        description: "Master Python from basics to advanced concepts",
        duration: "12 weeks",
        level: "Beginner",
        progress: 45,
        icon: "fab fa-python",
        videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw"
    },
    {
        id: 3,
        title: "UI/UX Design",
        description: "Create beautiful and functional user interfaces",
        duration: "6 weeks",
        level: "Intermediate",
        progress: 60,
        icon: "fas fa-palette",
        videoUrl: "https://www.youtube.com/embed/c9Wg6Cb_YlU"
    },
    {
        id: 4,
        title: "Digital Marketing",
        description: "Learn effective digital marketing strategies",
        duration: "10 weeks",
        level: "Beginner",
        progress: 30,
        icon: "fas fa-bullhorn",
        videoUrl: "https://www.youtube.com/embed/nU-IIXBWlS4"
    },
    {
        id: 5,
        title: "JavaScript Fundamentals",
        description: "Master the fundamentals of JavaScript programming",
        duration: "8 weeks",
        level: "Beginner",
        progress: 90,
        icon: "fab fa-js-square",
        videoUrl: "https://www.youtube.com/embed/PkZNo7MFNFg"
    },
    {
        id: 6,
        title: "Data Science",
        description: "Analyze data and build machine learning models",
        duration: "16 weeks",
        level: "Advanced",
        progress: 25,
        icon: "fas fa-chart-line",
        videoUrl: "https://www.youtube.com/embed/ua-CiDNNj30"
    }
];

// Populate courses
function populateCourses() {
    const coursesGrid = document.getElementById('coursesGrid');
    if (!coursesGrid) return;
    
    coursesGrid.innerHTML = coursesData.map(course => `
        <div class="course-card" onclick="openCourseVideo('${course.videoUrl}')">
            <div class="course-image">
                <i class="${course.icon}"></i>
            </div>
            <div class="course-content">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <div class="course-meta">
                    <span class="course-duration">
                        <i class="fas fa-clock"></i> ${course.duration}
                    </span>
                    <span class="course-level">${course.level}</span>
                </div>
                <div class="course-progress-bar">
                    <div class="course-progress-fill" style="width: ${course.progress}%"></div>
                </div>
                <p style="color: rgba(255,255,255,0.8); font-size: 0.9rem; margin-top: 0.5rem;">
                    Progress: ${course.progress}%
                </p>
            </div>
        </div>
    `).join('');
}

// Populate progress section
function populateProgress() {
    const courseProgress = document.getElementById('courseProgress');
    if (!courseProgress) return;
    
    const progressItems = coursesData.filter(course => course.progress > 0).map(course => `
        <div class="progress-item">
            <h4>${course.title}</h4>
            <p>${course.description}</p>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${course.progress}%"></div>
            </div>
            <div class="progress-percentage">${course.progress}% Complete</div>
        </div>
    `).join('');
    
    courseProgress.innerHTML = progressItems;
}

// Draw progress chart
function drawProgressChart() {
    const canvas = document.getElementById('progressChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Chart data
    const data = [
        { label: 'Week 1', value: 20 },
        { label: 'Week 2', value: 35 },
        { label: 'Week 3', value: 45 },
        { label: 'Week 4', value: 60 },
        { label: 'Week 5', value: 75 },
        { label: 'Week 6', value: 85 }
    ];
    
    const maxValue = Math.max(...data.map(d => d.value));
    const barWidth = width / data.length;
    const chartHeight = height - 60;
    
    // Draw bars
    data.forEach((item, index) => {
        const barHeight = (item.value / maxValue) * chartHeight;
        const x = index * barWidth + 20;
        const y = height - barHeight - 40;
        
        // Create gradient
        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        
        // Draw bar
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth - 40, barHeight);
        
        // Draw labels
        ctx.fillStyle = 'white';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(item.label, x + (barWidth - 40) / 2, height - 20);
        ctx.fillText(item.value + '%', x + (barWidth - 40) / 2, y - 10);
    });
    
    // Draw title
    ctx.fillStyle = 'white';
    ctx.font = 'bold 16px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('Weekly Learning Progress', width / 2, 25);
}

// Video modal functions
function openCourseVideo(videoUrl) {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    
    videoFrame.src = videoUrl;
    modal.style.display = 'block';
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    
    videoFrame.src = '';
    modal.style.display = 'none';
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('videoModal');
    if (event.target === modal) {
        closeVideoModal();
    }
}

// Navigation event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add click listeners to navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const sectionId = href.substring(1);
                navigateTo(sectionId);
            }
        });
    });
    
    // Initialize page content
    populateCourses();
    populateProgress();
    
    // Draw chart after a small delay to ensure canvas is ready
    setTimeout(drawProgressChart, 100);
    
    // Animate progress bars
    setTimeout(() => {
        const progressFills = document.querySelectorAll('.course-progress-fill, .progress-fill');
        progressFills.forEach(fill => {
            const width = fill.style.width;
            fill.style.width = '0%';
            setTimeout(() => {
                fill.style.width = width;
            }, 100);
        });
    }, 500);
});

// Smooth scrolling for navigation
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth'
    });
}

// Add some interactive animations
function addHoverAnimations() {
    const cards = document.querySelectorAll('.course-card, .stat-card, .progress-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addHoverAnimations, 1000);
});

// Add search functionality
function searchCourses(query) {
    const coursesGrid = document.getElementById('coursesGrid');
    if (!coursesGrid) return;
    
    const filteredCourses = coursesData.filter(course => 
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.description.toLowerCase().includes(query.toLowerCase())
    );
    
    coursesGrid.innerHTML = filteredCourses.map(course => `
        <div class="course-card" onclick="openCourseVideo('${course.videoUrl}')">
            <div class="course-image">
                <i class="${course.icon}"></i>
            </div>
            <div class="course-content">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <div class="course-meta">
                    <span class="course-duration">
                        <i class="fas fa-clock"></i> ${course.duration}
                    </span>
                    <span class="course-level">${course.level}</span>
                </div>
                <div class="course-progress-bar">
                    <div class="course-progress-fill" style="width: ${course.progress}%"></div>
                </div>
                <p style="color: rgba(255,255,255,0.8); font-size: 0.9rem; margin-top: 0.5rem;">
                    Progress: ${course.progress}%
                </p>
            </div>
        </div>
    `).join('');
}

// Local storage for user preferences
function saveUserPreferences() {
    const preferences = {
        theme: 'default',
        notifications: true,
        autoplay: false
    };
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
}

function loadUserPreferences() {
    const saved = localStorage.getItem('userPreferences');
    if (saved) {
        return JSON.parse(saved);
    }
    return null;
}