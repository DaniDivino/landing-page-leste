// Função para rolar suavemente até o formulário
function scrollToForm() {
    document.getElementById("orcamento").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// Função para trocar a imagem promocional
function changePromotionalImage(imagePath) {
    const img = document.getElementById("promotional-image");
    img.src = imagePath;
}

// Function to show the modal
function showModal(imagePath = null, title = null, text = null) {
    const modal = document.getElementById('promo-modal');
    
    // Update modal content if provided
    if (imagePath) {
        document.getElementById('modal-image').src = imagePath;
    }
    
    if (title) {
        document.querySelector('.modal-title').textContent = title;
    }
    
    if (text) {
        document.querySelector('.modal-text').textContent = text;
    }
    
    // Show the modal
    modal.classList.add('active');
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('promo-modal');
    modal.classList.remove('active');
    
    // Re-enable body scrolling
    document.body.style.overflow = '';
}

// Function to close modal and scroll to form
function closeModalAndScrollToForm() {
    closeModal();
    
    // Use the existing scrollToForm function
    scrollToForm();
}

// Function to customize modal content
function setModalContent(options) {
    const defaults = {
        imagePath: 'a.png',
        title: 'Promoção Especial',
        text: 'Aproveite nossa oferta exclusiva! Preencha o formulário para garantir seu desconto.',
        delay: 2000, // 3 seconds
        showOnLoad: true
    };

    // Merge defaults with provided options
    const settings = {...defaults, ...options};
    
    // Update modal content
    document.getElementById('modal-image').src = settings.imagePath;
    document.querySelector('.modal-title').textContent = settings.title;
    document.querySelector('.modal-text').textContent = settings.text;
    
    // Show modal after specified delay if showOnLoad is true
    if (settings.showOnLoad) {
        setTimeout(function() {
            showModal();
        }, settings.delay);
    }
}

// Smooth scrolling para links internos e outras funcionalidades
document.addEventListener('DOMContentLoaded', function() {
    // Create modal HTML structure and append to body
    const modalHTML = `
        <div id="promo-modal" class="modal-overlay">
            <div class="modal-container">
                <div class="modal-close" onclick="closeModal()">
                    <i class="fas fa-times"></i>
                </div>
                <div class="modal-image-container">
                    <img id="modal-image" src="a.png" alt="Promoção Especial" class="modal-image">
                </div>
                <div class="modal-content">
                    <h3 class="modal-title">Promoção Especial</h3>
                    <p class="modal-text">Aproveite nossa oferta exclusiva! Preencha o formulário para garantir seu desconto.</p>
                    <button class="modal-button" onclick="closeModalAndScrollToForm()">
                        <i class="fas fa-arrow-down"></i>
                        Quero aproveitar!
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal after a delay (3 seconds by default)
    setTimeout(function() {
        showModal();
    }, 3000);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Resto do seu código original...
    // Formulário principal
    const mainForm = document.getElementById('main-form');
    if (mainForm) {
        mainForm.addEventListener('submit', function(e) {
            // ... seu código de formulário ...
        });
    }

    // ... resto do seu código ...
});

// Header transparente/opaco baseado no scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    }
});
