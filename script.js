// Smooth scrolling para links internos
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

// Formulário rápido (Hero Section)
document.getElementById('quick-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const nome = this.querySelector('input[type="text"]').value;
    const telefone = this.querySelector('input[type="tel"]').value;
    
    // Simular envio do formulário
    alert(`Obrigado, ${nome}! Entraremos em contato através do número ${telefone} em breve.`);
    
    // Limpar formulário
    this.reset();
    
    // Rolar para o formulário principal
    document.getElementById('orcamento').scrollIntoView({
        behavior: 'smooth'
    });
});

// Formulário principal
document.getElementById('main-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const nome = formData.get('nome');
    const telefone = formData.get('telefone');
    const idade = formData.get('idade');
    const plano = formData.get('plano');
    
    // Validação básica
    if (!nome || !telefone || !idade || !plano) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Simular envio do formulário
    const planoTexto = {
        'hapvida': 'Hapvida',
        'samel': 'Samel',
        'sulamerica': 'SulAmérica',
        'adventista': 'Adventista Health',
        'outros': 'Outros/Não sei'
    };
    
    // Criar mensagem para WhatsApp
    const mensagem = `Olá! Gostaria de solicitar um orçamento de plano de saúde.
    
Nome: ${nome}
Telefone: ${telefone}
Idade: ${idade}
Plano de interesse: ${planoTexto[plano]}

Aguardo contato. Obrigado!`;
    
    // Codificar mensagem para URL
    const mensagemCodificada = encodeURIComponent(mensagem);
    
    // Número do WhatsApp (substitua pelo número real)
    const numeroWhatsApp = '5592985277918'; // Formato: código do país + DDD + número
    
    // Criar link do WhatsApp
    const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;
    
    // Mostrar mensagem de sucesso
    alert(`Obrigado, ${nome}! Seu formulário foi enviado com sucesso. Você será redirecionado para o WhatsApp para finalizar o contato.`);
    
    // Abrir WhatsApp
    window.open(linkWhatsApp, '_blank');
    
    // Limpar formulário
    this.reset();
});

// Animação de entrada dos elementos quando entram na viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.beneficio-card, .publico-card, .passo');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Header transparente/opaco baseado no scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Máscara para telefone
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length <= 11) {
            if (value.length <= 2) {
                value = value.replace(/(\d{0,2})/, '($1');
            } else if (value.length <= 7) {
                value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
            } else {
                value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
            }
        }
        
        e.target.value = value;
    });
});

// Validação de idade
document.querySelectorAll('input[type="number"]').forEach(input => {
    if (input.name === 'idade') {
        input.addEventListener('input', function(e) {
            const value = parseInt(e.target.value);
            if (value < 0) e.target.value = 0;
            if (value > 120) e.target.value = 120;
        });
    }
});

// Efeito de hover nos cards
document.querySelectorAll('.beneficio-card, .publico-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Loading state para formulários
function showLoading(button) {
    const originalText = button.textContent;
    button.textContent = 'Enviando...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

// Adicionar loading aos botões de submit
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        const submitButton = this.querySelector('button[type="submit"]');
        if (submitButton) {
            showLoading(submitButton);
        }
    });
});

