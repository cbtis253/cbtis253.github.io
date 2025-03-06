// Función para manejar el menú móvil
function setupMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Cierra el menú cuando se hace clic en un enlace
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Función para mejorar el comportamiento de los tabs en móviles
function enhanceTabsForMobile() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Hace scroll al contenido del tab cuando se selecciona en móvil
            if (window.innerWidth <= 768) {
                const tabContentId = this.getAttribute('onclick').match(/openTab\(event,\s*['"]([^'"]+)['"]\)/)[1];
                const tabContent = document.getElementById(tabContentId);
                
                if (tabContent) {
                    setTimeout(() => {
                        tabContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 100);
                }
            }
        });
    });
}

// Función para cargar imágenes de forma perezosa en móviles
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback para navegadores que no soportan IntersectionObserver
        // Se mantiene la carga original de imágenes
    }
}

// Función para mejorar las tablas responsivas
function enhanceResponsiveTables() {
    const tables = document.querySelectorAll('.directory-table');
    
    tables.forEach(table => {
        const tableHeaders = Array.from(table.querySelectorAll('th')).map(th => th.textContent);
        
        if (window.innerWidth <= 480) {
            const tableRows = table.querySelectorAll('tbody tr');
            
            tableRows.forEach(row => {
                const cells = row.querySelectorAll('td');
                
                cells.forEach((cell, index) => {
                    if (tableHeaders[index]) {
                        cell.setAttribute('data-label', tableHeaders[index]);
                    }
                });
            });
        }
    });
}

// Inicializar todas las funciones cuando se carga el DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // Nuevas funciones para responsividad
    setupMobileMenu();
    enhanceTabsForMobile();
    setupLazyLoading();
    enhanceResponsiveTables();
});

// Si deseas mantener la funcionalidad de redimensionamiento para tablas responsivas
window.addEventListener('resize', function() {
    enhanceResponsiveTables();
});