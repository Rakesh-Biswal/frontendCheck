document.addEventListener('DOMContentLoaded', function() {
    const introAnimation = document.querySelector('.intro-animation');
    const introContent = document.querySelector('.intro-content');
    const words = document.querySelectorAll('.word');

    // Trigger the intro animation
    setTimeout(() => {
        introAnimation.style.opacity = '1';
        introContent.style.opacity = '1';
        words.forEach((word, index) => {
            setTimeout(() => {
                word.style.opacity = '1';
            }, index * 500);
        });
    }, 500);

    // After intro animation, fade out and display the main content
    setTimeout(() => {
        introAnimation.style.animation = 'fadeOut 1s forwards';
        document.querySelector('.home_page').style.display = 'flex';
    }, 4000);

    // Open popup on button click
    const openPopupBtn = document.getElementById('openPopup');
    const popup = document.querySelector('.popup');

    openPopupBtn.addEventListener('click', () => {
        popup.style.display = 'block';
    });

    // Close popup on close button click
    const closePopupBtn = document.getElementById('closePopup');

    closePopupBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Hamburger menu toggle for mobile
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Typing animation for the text
    const typedText = document.getElementById('typed-text');
    const texts = ['Welcome to Click & Win', 'Explore our platform', 'Start earning today'];

    let index = 0;
    let charIndex = 0;
    let currentText = '';
    let isDeleting = false;

    function type() {
        const text = texts[index];
        if (isDeleting) {
            currentText = text.substring(0, currentText.length - 1);
        } else {
            currentText = text.substring(0, currentText.length + 1);
        }

        typedText.innerHTML = currentText;
        let typeSpeed = 200;

        if (isDeleting) {
            typeSpeed /= 2;
        }

        if (!isDeleting && currentText === text) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && currentText === '') {
            isDeleting = false;
            index++;
            if (index === texts.length) {
                index = 0;
            }
            typeSpeed = 500;
        }

        setTimeout(() => type(), typeSpeed);
    }

    document.addEventListener('DOMContentLoaded', type);

    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });

});
