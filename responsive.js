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

// Función para mejorar el comportamiento de los acordeones en móviles
function enhanceAccordionsForMobile() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // En móvil, cierra otros acordeones al abrir uno nuevo
            if (window.innerWidth <= 768) {
                const currentAccordion = this;
                
                accordionHeaders.forEach(otherHeader => {
                    if (otherHeader !== currentAccordion && otherHeader.classList.contains('active')) {
                        otherHeader.click();
                    }
                });
                
                // Hace scroll al acordeón abierto
                setTimeout(() => {
                    this.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300);
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
    // Mantener las funciones originales
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(function(header) {
        header.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
            
            // Solo en escritorio, cerrar otros acordeones
            if (window.innerWidth > 768) {
                accordionHeaders.forEach(function(otherHeader) {
                    if (otherHeader !== this) {
                        otherHeader.classList.remove('active');
                        const otherContent = otherHeader.nextElementSibling;
                        otherContent.style.maxHeight = null;
                    }
                }.bind(this));
            }
        });
    });
    
    // Activar primer tab por defecto
    document.querySelectorAll('.tab-buttons').forEach(function(tabButtons) {
        const firstButton = tabButtons.querySelector('.tab-button');
        if (firstButton) {
            firstButton.classList.add('active');
            const onclick = firstButton.getAttribute('onclick');
            const match = onclick.match(/openTab\(event,\s*['"]([^'"]+)['"]\)/);
            if (match && match[1]) {
                const tabId = match[1];
                const tabContent = document.getElementById(tabId);
                if (tabContent) {
                    tabContent.classList.add('active');
                }
            }
        }
    });
    
    // Nuevas funciones para responsividad
    setupMobileMenu();
    enhanceTabsForMobile();
    enhanceAccordionsForMobile();
    setupLazyLoading();
    enhanceResponsiveTables();
    
    // Ajustar la altura de los acordeones cuando cambia el tamaño de la ventana
    window.addEventListener('resize', function() {
        const activeAccordions = document.querySelectorAll('.accordion-header.active');
        activeAccordions.forEach(function(header) {
            const content = header.nextElementSibling;
            content.style.maxHeight = content.scrollHeight + "px";
        });
        
        enhanceResponsiveTables();
    });
});

// Mantener la función openTab original
window.openTab = function(event, tabId) {
    const tabContainer = event.currentTarget.closest('.tab-container');
    const tabButtons = tabContainer.querySelectorAll('.tab-button');
    const tabContents = tabContainer.querySelectorAll('.tab-content');
    
    tabButtons.forEach(function(button) {
        button.classList.remove('active');
    });
    
    tabContents.forEach(function(content) {
        content.classList.remove('active');
    });
    
    event.currentTarget.classList.add('active');
    
    const targetTab = document.getElementById(tabId);
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    // Ajustar la altura del acordeón cuando se cambia de tab
    const accordionContent = event.currentTarget.closest('.accordion-content');
    if (accordionContent && accordionContent.style.maxHeight) {
        setTimeout(function() {
            accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
        }, 50);
    }
};