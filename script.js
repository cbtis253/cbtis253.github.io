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
            
            // Cerrar otros acordeones (opcional, comenta estas líneas si quieres que múltiples acordeones puedan estar abiertos)
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== this) {
                    otherHeader.classList.remove('active');
                    const otherContent = otherHeader.nextElementSibling;
                    otherContent.style.maxHeight = null;
                }
            });
        });
    });
    
    // Abrir el primer acordeón por defecto (opcional)
    // Si deseas que el primer acordeón esté abierto al cargar la página, descomenta las siguientes líneas
    /*
    if (accordionHeaders.length > 0) {
        const firstHeader = accordionHeaders[0];
        firstHeader.classList.add('active');
        const firstContent = firstHeader.nextElementSibling;
        firstContent.style.maxHeight = firstContent.scrollHeight + "px";
    }
    */
    
    // Inicializar pestañas
    initializeTabs();
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