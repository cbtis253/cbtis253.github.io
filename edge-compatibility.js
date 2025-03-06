// Detección de Edge y aplicación de clase específica
(function() {
    function detectEdge() {
        // Detectar si es Edge
        const isEdge = navigator.userAgent.indexOf('Edge') !== -1 || 
                      navigator.userAgent.indexOf('Edg/') !== -1;
        
        // Detectar si es móvil
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
        
        if (isEdge) {
            document.body.classList.add('edge-browser');
            
            if (isMobile) {
                document.body.classList.add('edge-mobile');
                
                // Ajustar el menú de navegación para Edge Mobile
                const nav = document.querySelector('nav');
                if (nav) {
                    // Aplicar estilos específicos para Edge Mobile
                    nav.style.overflowX = 'auto';
                    nav.style.WebkitOverflowScrolling = 'touch';
                    
                    const navUl = nav.querySelector('ul');
                    if (navUl) {
                        navUl.style.display = 'flex';
                        navUl.style.flexWrap = 'nowrap';
                        navUl.style.justifyContent = 'flex-start';
                        navUl.style.width = 'max-content';
                        navUl.style.margin = '0 auto';
                        
                        // Centrar el menú horizontalmente
                        const navItems = navUl.querySelectorAll('li');
                        const totalWidth = Array.from(navItems).reduce((sum, item) => sum + item.offsetWidth + parseInt(getComputedStyle(item).marginLeft) + parseInt(getComputedStyle(item).marginRight), 0);
                        
                        if (totalWidth <= window.innerWidth) {
                            navUl.style.justifyContent = 'center';
                        }
                    }
                }
                
                // Ajustar el header para Edge Mobile
                const headerFlexContainer = document.querySelector('.header-flex-container');
                if (headerFlexContainer) {
                    headerFlexContainer.style.display = 'block';
                    
                    const womanLogoContainer = headerFlexContainer.querySelector('.woman-logo-container');
                    const headerText = headerFlexContainer.querySelector('.header-text');
                    
                    if (womanLogoContainer) {
                        womanLogoContainer.style.width = '100%';
                        womanLogoContainer.style.textAlign = 'center';
                        womanLogoContainer.style.marginBottom = '20px';
                    }
                    
                    if (headerText) {
                        headerText.style.width = '100%';
                        headerText.style.textAlign = 'center';
                    }
                }
            }
        }
    }
    
    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', detectEdge);
    } else {
        detectEdge();
    }
    
    // También ejecutar en el resize para manejar cambios de orientación
    window.addEventListener('resize', function() {
        // Usar debounce para no ejecutar demasiadas veces
        if (this.resizeTimer) clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(detectEdge, 300);
    });
})();