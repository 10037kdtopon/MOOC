/* ================================================================ */
/* ==================== SCREENSHOTS SLIDER JS =================== */
/* ================================================================ */

$(document).ready(function() {
    // Screenshots Slider Functionality
    let currentSlide = 0;
    const totalSlides = $('.screenshots-slide').length;
    const slidesContainer = $('.screenshots-slides');
    
    // Función para mostrar slide específico
    function showSlide(slideIndex) {
        if (slideIndex >= totalSlides) slideIndex = 0;
        if (slideIndex < 0) slideIndex = totalSlides - 1;
        
        currentSlide = slideIndex;
        const translateX = -currentSlide * 100; // Mover 100% por cada slide
        slidesContainer.css('transform', `translateX(${translateX}%)`);
        
        // Actualizar indicadores
        $('.screenshots-dot').removeClass('active');
        $('.screenshots-dot[data-slide="' + currentSlide + '"]').addClass('active');
    }
    
    // Botón siguiente
    $('#screenshots-next').click(function() {
        showSlide(currentSlide + 1);
    });
    
    // Botón anterior
    $('#screenshots-prev').click(function() {
        showSlide(currentSlide - 1);
    });
    
    // Indicadores
    $('.screenshots-dot').click(function() {
        const slideIndex = parseInt($(this).data('slide'));
        showSlide(slideIndex);
    });
    
    // Auto-play (opcional)
    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(function() {
            showSlide(currentSlide + 1);
        }, 5000); // Cambiar cada 5 segundos
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Iniciar auto-play
    startAutoPlay();
    
    // Pausar auto-play al hacer hover
    $('.screenshots-slider').hover(
        function() { stopAutoPlay(); },
        function() { startAutoPlay(); }
    );
    
    // Navegación con teclado
    $(document).keydown(function(e) {
        if (e.which === 37) { // Flecha izquierda
            showSlide(currentSlide - 1);
        } else if (e.which === 39) { // Flecha derecha
            showSlide(currentSlide + 1);
        }
    });
    
    // Touch/swipe support para móviles
    let startX = 0;
    let endX = 0;
    
    $('.screenshots-slider').on('touchstart', function(e) {
        startX = e.originalEvent.touches[0].clientX;
    });
    
    $('.screenshots-slider').on('touchend', function(e) {
        endX = e.originalEvent.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const threshold = 50; // Mínimo de píxeles para considerar swipe
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Swipe izquierda - siguiente slide
                showSlide(currentSlide + 1);
            } else {
                // Swipe derecha - slide anterior
                showSlide(currentSlide - 1);
            }
        }
    }
    
    // Inicializar
    showSlide(0);
});
