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
        });
    });
});
