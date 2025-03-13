document.addEventListener('DOMContentLoaded', function() {
    // Timeline data from experience section
    const timelineData = [
        {
            year: 2024,
            endYear: 'Present',
            company: 'FIOCRUZ',
            title: 'Designer & Developer',
            description: 'Working on design and development projects, creating accessible digital solutions and interfaces.'
        },
        {
            year: 2022,
            endYear: 2024,
            company: 'CLIPESCOLA',
            title: 'FullStack Java Developer',
            description: 'FullStack Java Developer'
        },
        {
            year: 2014,
            endYear: 2020,
            company: 'ELEVA EDUCATION',
            title: 'Administrative',
            description: 'Director - Pensi Madureira, Assistant Director - Pensi Friburgo, Administrative support - IT'
        },
        {
            year: 2010,
            endYear: 2014,
            company: 'RW CONSULTORIA / NOVARUM',
            title: 'Web Developer',
            description: 'Website, SEO and Marketing'
        },
        {
            year: 2007,
            endYear: 2010,
            company: 'FIOCRUZ',
            title: 'Web Designer',
            description: 'FrontEnd • HTML (W3C and WCAG), Javascript (AJAX and effects specializing in the Mootools Framework) and Template Toolkit 2 (Perl).'
        },
        {
            year: 2004,
            endYear: 2006,
            company: 'Estrela Guia Consulting & Services',
            title: 'Web Designer',
            description: 'FrontEnd • HTML, CSS, Javascript, Flash and PHP.'
        }
    ];

    // Sort timeline data by year (most recent first)
    timelineData.sort((a, b) => b.year - a.year);

    // Initialize timeline components
    const timelineTrack = document.querySelector('.timeline-track');
    const timelineContent = document.querySelector('.timeline-content');
    const nextButton = document.getElementById('timeline-prev');
    const prevButton = document.getElementById('timeline-next');

    let activeIndex = 0;
    
    // Create timeline markers
    timelineData.forEach((item, index) => {
        // Calculate position percentage based on year
        const minYear = Math.min(...timelineData.map(d => d.year));
        const maxYear = Math.max(...timelineData.map(d => d.year));
        const range = maxYear - minYear;
        const position = range === 0 ? 50 : ((item.year - minYear) / range) * 100;
        
        // Create marker
        const marker = document.createElement('div');
        marker.className = 'timeline-marker';
        marker.setAttribute('data-year', item.year);
        marker.setAttribute('data-index', index);
        marker.style.left = `${position}%`;
        
        marker.addEventListener('click', () => {
            setActiveItem(index);
        });
        
        timelineTrack.appendChild(marker);
        
        // Create timeline item
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.setAttribute('data-index', index);
        
        const itemContent = `
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">${item.company}</h3>
                    <h4 class="card-subtitle mb-2 text-muted">${item.year} - ${item.endYear}</h4>
                    <h5 class="card-subtitle mb-2 text-muted">${item.title}</h5>
                    <p class="card-text">${item.description}</p>
                </div>
            </div>
        `;
        
        timelineItem.innerHTML = itemContent;
        timelineContent.appendChild(timelineItem);
    });

    // Set active timeline item
    function setActiveItem(index) {
        // Ensure index is within bounds
        if (index < 0) index = 0;
        if (index >= timelineData.length) index = timelineData.length - 1;
        
        // Update active index
        activeIndex = index;
        
        // Update marker states
        document.querySelectorAll('.timeline-marker').forEach(marker => {
            marker.classList.remove('active');
            if (parseInt(marker.getAttribute('data-index')) === index) {
                marker.classList.add('active');
            }
        });
        
        // Update timeline item visibility
        document.querySelectorAll('.timeline-item').forEach(item => {
            item.classList.remove('active');
            if (parseInt(item.getAttribute('data-index')) === index) {
                item.classList.add('active');
            }
        });
        
        // Update button states
        prevButton.disabled = index === 0;
        nextButton.disabled = index === timelineData.length - 1;
        
        // Ensure focus is maintained for accessibility
        document.querySelector('.timeline-marker.active').focus();
    }
    
    // Navigation buttons
    prevButton.addEventListener('click', () => {
        setActiveItem(activeIndex - 1);
    });
    
    nextButton.addEventListener('click', () => {
        setActiveItem(activeIndex + 1);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.target.closest('.interactive-timeline-container')) {
            if (e.key === 'ArrowLeft') {
                setActiveItem(activeIndex - 1);
                e.preventDefault();
            } else if (e.key === 'ArrowRight') {
                setActiveItem(activeIndex + 1);
                e.preventDefault();
            }
        }
    });
    
    // Initialize with the first (most recent) item active
    setActiveItem(0);
});
