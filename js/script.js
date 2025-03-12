document.addEventListener('DOMContentLoaded', function() {
    // Get the navbar links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Function to set active class based on scroll position
    function setActiveNavLink() {
        const scrollPosition = window.scrollY;
        
        // Get all sections
        const sections = document.querySelectorAll('section');
        
        // Check each section's position
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Offset for better UX
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    link.removeAttribute('aria-current');
                });
                
                // Add active class to the corresponding link
                const activeLink = document.querySelector(`.navbar-nav .nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                    activeLink.setAttribute('aria-current', 'page');
                }
            }
        });
    }
    
    // Update active link on page load
    setActiveNavLink();
    
    // Update active link on scroll
    window.addEventListener('scroll', setActiveNavLink);
    
    // Handle click events
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(innerLink => {
                innerLink.classList.remove('active');
                innerLink.removeAttribute('aria-current');
            });
            
            // Add active class to clicked link
            this.classList.add('active');
            this.setAttribute('aria-current', 'page');
            
            // Close the mobile navbar when a link is clicked
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                bootstrap.Collapse.getInstance(navbarCollapse).hide();
            }
        });
    });

    // Fix anchor links to account for fixed header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Calculate position considering the header height
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                // Smooth scroll to the adjusted position
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL hash without jumping
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });

    // Accessibility Menu Functionality
    
    // Toggle accessibility panel
    const a11yToggle = document.querySelector('.a11y-toggle');
    const a11yPanel = document.querySelector('.a11y-panel');
    
    a11yToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        a11yPanel.style.display = isExpanded ? 'none' : 'block';
    });

    // Close panel when clicking outside
    document.addEventListener('click', function(event) {
        if (!a11yPanel.contains(event.target) && !a11yToggle.contains(event.target)) {
            a11yPanel.style.display = 'none';
            a11yToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Font size controls
    const fontIncrease = document.getElementById('font-increase');
    const fontDecrease = document.getElementById('font-decrease');
    const fontReset = document.getElementById('font-reset');
    
    fontIncrease.addEventListener('click', function() {
        if (document.body.classList.contains('font-size-large')) {
            document.body.classList.remove('font-size-large');
            document.body.classList.add('font-size-x-large');
            localStorage.setItem('fontSize', 'x-large');
        } else if (!document.body.classList.contains('font-size-x-large')) {
            document.body.classList.add('font-size-large');
            localStorage.setItem('fontSize', 'large');
        }
    });
    
    fontDecrease.addEventListener('click', function() {
        if (document.body.classList.contains('font-size-x-large')) {
            document.body.classList.remove('font-size-x-large');
            document.body.classList.add('font-size-large');
            localStorage.setItem('fontSize', 'large');
        } else if (document.body.classList.contains('font-size-large')) {
            document.body.classList.remove('font-size-large');
            localStorage.setItem('fontSize', 'normal');
        }
    });
    
    fontReset.addEventListener('click', function() {
        document.body.classList.remove('font-size-large', 'font-size-x-large');
        localStorage.setItem('fontSize', 'normal');
    });
    
    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
    });
    
    // High contrast toggle
    const highContrastToggle = document.getElementById('high-contrast-toggle');
    
    highContrastToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('high-contrast');
            localStorage.setItem('highContrast', 'enabled');
        } else {
            document.body.classList.remove('high-contrast');
            localStorage.setItem('highContrast', 'disabled');
        }
    });
    
    // Load saved preferences
    function loadSavedPreferences() {
        // Font size
        const savedFontSize = localStorage.getItem('fontSize');
        if (savedFontSize === 'large') {
            document.body.classList.add('font-size-large');
        } else if (savedFontSize === 'x-large') {
            document.body.classList.add('font-size-x-large');
        }
        
        // Dark mode
        if (localStorage.getItem('darkMode') === 'enabled') {
            darkModeToggle.checked = true;
            document.body.classList.add('dark-mode');
        }
        
        // High contrast
        if (localStorage.getItem('highContrast') === 'enabled') {
            highContrastToggle.checked = true;
            document.body.classList.add('high-contrast');
        }
    }
    
    loadSavedPreferences();
});
