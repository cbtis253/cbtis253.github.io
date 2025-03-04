// Modificar la parte donde se llama a DOMContentLoaded para evitar duplicación
document.addEventListener('DOMContentLoaded', function() {
    // Código del acordeón mejorado
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle clase activa en el encabezado
            this.classList.toggle('active');
            
            // Obtener el contenido del acordeón
            const content = this.nextElementSibling;
            
            // Si hay altura máxima establecida, ciérralo; de lo contrario, ábrelo
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                // Calcular la altura total del contenido
                content.style.maxHeight = content.scrollHeight + "px";
            }
            
            // Cerrar otros acordeones
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== this) {
                    otherHeader.classList.remove('active');
                    const otherContent = otherHeader.nextElementSibling;
                    otherContent.style.maxHeight = null;
                }
            });
        });
    });
    
    // Inicializar pestañas
    initializeTabs();
    
    // Inicializar carruseles con carga diferida
    initializeCarousels();
});

// Función para inicializar todas las pestañas
function initializeTabs() {
    document.querySelectorAll('.tab-buttons').forEach(tabGroup => {
        const firstTab = tabGroup.querySelector('.tab-button');
        if (firstTab) {
            // Activar la primera pestaña de cada grupo
            firstTab.classList.add('active');
            
            // Extraer el ID del contenido de la pestaña del atributo onclick
            const onclickAttribute = firstTab.getAttribute('onclick');
            const match = onclickAttribute.match(/openTab\(event,\s*['"]([^'"]+)['"]\)/);
            
            if (match && match[1]) {
                const tabContentId = match[1];
                const tabContent = document.getElementById(tabContentId);
                if (tabContent) {
                    tabContent.classList.add('active');
                }
            }
        }
    });
}

// Función para cambiar entre pestañas
function openTab(evt, tabId) {
    // Obtener el contenedor de pestañas
    const tabContainer = evt.currentTarget.closest('.tab-container');
    
    // Obtener todos los botones de pestaña dentro del mismo grupo
    const tabButtons = tabContainer.querySelectorAll('.tab-button');
    
    // Obtener todos los contenidos de pestaña
    const tabContents = tabContainer.querySelectorAll('.tab-content');
    
    // Quitar la clase active de todos los botones
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Ocultar todos los contenidos
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Marcar el botón actual como activo
    evt.currentTarget.classList.add('active');
    
    // Mostrar el contenido correspondiente
    const currentTab = document.getElementById(tabId);
    if (currentTab) {
        currentTab.classList.add('active');
    }
    
    // Actualizar la altura del contenedor del acordeón para adaptarse al nuevo contenido
    const accordionContent = evt.currentTarget.closest('.accordion-content');
    if (accordionContent && accordionContent.style.maxHeight) {
        // Recalcular la altura con un pequeño retraso para que el contenido tenga tiempo de renderizarse
        setTimeout(() => {
            accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
        }, 50); // Aumentamos el tiempo a 50ms para dar más tiempo al renderizado
    }
}

// Configuración e inicialización del carrusel con carga diferida
function initializeCarousels() {
    // Configuración para cada carrera (mantener igual)
    const carouselConfig = {
        "programacion": ["duo_pr.jpg", "prog_img1.jpg", "prog_img2.jpg", "prog_img3.jpg", "prog_img4.jpg"],
        "laboratorista": ["duo_lc.jpg", "lab_img1.jpg", "lab_img2.jpg", "lab_img3.jpg", "lab_img4.jpg"],
        "alimentos": ["duo_ab.png", "ali_img1.jpg", "ali_img2.jpg", "ali_img3.jpg", "ali_img4.jpg"],
        "recursos": ["duo_rh.jpg", "rh_img1.jpg", "rh_img2.jpg", "rh_img3.jpg", "rh_img4.jpg"]
    };
    
    // Crear elementos de imagen para cada carrera
    const careerIds = ["prog", "lab", "ayb", "arh"];
    const basePath = "./assets/images/";
    
    careerIds.forEach((careerId, index) => {
        try {
            const careerKeys = ["programacion", "laboratorista", "alimentos", "recursos"];
            const careerKey = careerKeys[index];
            const carouselImages = carouselConfig[careerKey];
            
            // Obtener el contenedor donde está la imagen actual
            const imgSelector = `.accordion-content-inner img[alt*="${careerId === 'prog' ? 'Programación' : 
                                                  careerId === 'lab' ? 'Laboratorista' : 
                                                  careerId === 'ayb' ? 'Alimentos' : 'Recursos'}"]`;
            const imgElement = document.querySelector(imgSelector);
            
            if (!imgElement) return; // Si no encuentra la imagen, salir de esta iteración
            
            const container = imgElement.parentNode;
            
            // Crear el contenedor del carrusel
            const carouselContainer = document.createElement('div');
            carouselContainer.className = 'carousel-container';
            carouselContainer.style.width = '150px'; 
            carouselContainer.style.height = '150px';
            carouselContainer.style.position = 'relative';
            carouselContainer.style.overflow = 'hidden';
            carouselContainer.style.marginBottom = '15px';
            
            // Mostrar sólo la primera imagen inicialmente
            const firstImgElement = document.createElement('img');
            firstImgElement.src = `${basePath}${carouselImages[0]}`;
            firstImgElement.alt = `Imagen 1 de ${careerId === 'prog' ? 'Programación' : 
                               careerId === 'lab' ? 'Laboratorista Clínico' : 
                               careerId === 'ayb' ? 'Alimentos y Bebidas' : 'Recursos Humanos'}`;
            firstImgElement.style.width = '100%';
            firstImgElement.style.height = '100%';
            firstImgElement.style.objectFit = 'cover';
            firstImgElement.style.position = 'absolute';
            firstImgElement.style.top = '0';
            firstImgElement.style.left = '0';
            firstImgElement.style.opacity = '1';
            firstImgElement.style.transition = 'opacity 0.5s ease-in-out';
            firstImgElement.dataset.index = 0;
            carouselContainer.appendChild(firstImgElement);
            
            // Crear placeholders para el resto de imágenes con data-src en lugar de src
            for(let i = 1; i < carouselImages.length; i++) {
                const lazyImgElement = document.createElement('img');
                // Usar data-src para carga diferida
                lazyImgElement.dataset.src = `${basePath}${carouselImages[i]}`;
                lazyImgElement.alt = `Imagen ${i+1} de ${careerId === 'prog' ? 'Programación' : 
                                   careerId === 'lab' ? 'Laboratorista Clínico' : 
                                   careerId === 'ayb' ? 'Alimentos y Bebidas' : 'Recursos Humanos'}`;
                lazyImgElement.style.width = '100%';
                lazyImgElement.style.height = '100%';
                lazyImgElement.style.objectFit = 'cover';
                lazyImgElement.style.position = 'absolute';
                lazyImgElement.style.top = '0';
                lazyImgElement.style.left = '0';
                lazyImgElement.style.opacity = '0';
                lazyImgElement.style.transition = 'opacity 0.5s ease-in-out';
                lazyImgElement.dataset.index = i;
                carouselContainer.appendChild(lazyImgElement);
            }
            
            // Reemplazar la imagen estática por el carrusel
            const staticImg = container.querySelector('img');
            container.replaceChild(carouselContainer, staticImg);
            
            // Cargar perezosamente las siguientes dos imágenes después de un segundo
            setTimeout(() => {
                const lazyImages = carouselContainer.querySelectorAll('img[data-src]');
                const imagesToLoad = Math.min(2, lazyImages.length);
                
                for(let i = 0; i < imagesToLoad; i++) {
                    lazyImages[i].src = lazyImages[i].dataset.src;
                }
            }, 1000);
            
            // Iniciar el ciclo del carrusel con carga diferida
            startLazyCarousel(carouselContainer, carouselImages.length);
        } catch (error) {
            console.error(`Error en carrusel ${careerId}:`, error);
        }
    });
}

// Función para carrusel con carga diferida
function startLazyCarousel(container, imageCount) {
    let currentIndex = 0;
    let loadedCount = 1; // Empezamos con 1 (primera imagen)
    
    const interval = setInterval(() => {
        const images = container.querySelectorAll('img');
        
        // Ocultar imagen actual
        if (images[currentIndex]) {
            images[currentIndex].style.opacity = '0';
        }
        
        // Avanzar al siguiente índice
        currentIndex = (currentIndex + 1) % imageCount;
        
        // Si la siguiente imagen no está cargada todavía, cargarla ahora
        if (images[currentIndex] && !images[currentIndex].src && images[currentIndex].dataset.src) {
            images[currentIndex].src = images[currentIndex].dataset.src;
            loadedCount++;
            
            // También precargar la siguiente imagen si existe
            const nextIndex = (currentIndex + 1) % imageCount;
            if (images[nextIndex] && !images[nextIndex].src && images[nextIndex].dataset.src) {
                setTimeout(() => {
                    if (images[nextIndex]) {
                        images[nextIndex].src = images[nextIndex].dataset.src;
                        loadedCount++;
                    }
                }, 500);
            }
        }
        
        // Mostrar la siguiente imagen
        if (images[currentIndex]) {
            images[currentIndex].style.opacity = '1';
        }
        
        // Cuando todas las imágenes están cargadas, simplificar la función
        if (loadedCount >= imageCount) {
            clearInterval(interval);
            
            // Cambiar a un carrusel simple
            setInterval(() => {
                const allImages = container.querySelectorAll('img');
                allImages[currentIndex].style.opacity = '0';
                currentIndex = (currentIndex + 1) % imageCount;
                allImages[currentIndex].style.opacity = '1';
            }, 3000);
        }
    }, 3000);
}