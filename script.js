document.addEventListener('DOMContentLoaded', function() {
    // Loader - Removemos o timeout e escondemos imediatamente
    document.querySelector('.loader').classList.add('fade-out');
    setTimeout(function() {
        document.querySelector('.loader').style.display = 'none';
    }, 500);

    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    burger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
        });
    });

    // Sticky Header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({top: 0, behavior: 'smooth'});
    });

    // --- Efeito de Máquina de Escrever com Múltiplos Textos ---
    const typingText = document.querySelector('.typing-text');
    
    // 1. Array de textos a serem exibidos (ADICIONE OU REMOVA TEXTOS AQUI)
    const texts = [
        "Desenvolvedor em formação",
        "Apaixonado por JavaScript",
        "Aprender é crescer",
        "Eu crio animações incríveis!",
        "Dominando o front-end",
        "Pronto para o próximo desafio!"
    ];
    
    let textIndex = 0; // Índice do array de textos
    let charIndex = 0; // Índice do caractere dentro do texto atual
    const typingSpeed = 100; // Velocidade de digitação (milissegundos)
    const erasingSpeed = 50; // Velocidade para apagar
    const newTextDelay = 2000; // Tempo de pausa antes de apagar/digitar
    
    if (typingText) {
        
        // Função principal para iniciar o ciclo
        function startTypingCycle() {
            if (texts.length > 0) {
                setTimeout(type, 500);
            }
        }

        // 2. Função Type (Digitar)
        function type() {
            const currentText = texts[textIndex];
            
            if (charIndex < currentText.length) {
                // Adiciona o próximo caractere
                typingText.textContent += currentText.charAt(charIndex);
                charIndex++;
                setTimeout(type, typingSpeed);
            } else {
                // Terminou de digitar, espera e começa a apagar
                setTimeout(erase, newTextDelay);
            }
        }
        
        // 3. Função Erase (Apagar)
        function erase() {
            const currentText = texts[textIndex];
            
            if (charIndex > 0) {
                // Remove o último caractere
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingSpeed);
            } else {
                // Terminou de apagar, move para o próximo texto
                textIndex++;
                
                // Se for o último texto, volta para o primeiro (loop infinito)
                if (textIndex >= texts.length) {
                    textIndex = 0;
                }
                
                // Começa a digitar o novo texto
                setTimeout(type, 500);
            }
        }
        
        startTypingCycle(); // Inicia o processo
    }
    // --------------------------------------------------------------------

    // Animate Skill Bars
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-level');
        
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.width = level + '%';
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
                
                if (entry.target.id === 'education') {
                    const timelineItems = document.querySelectorAll('.timeline-item');
                    timelineItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 200);
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
            this.reset();
        });
    }
});
