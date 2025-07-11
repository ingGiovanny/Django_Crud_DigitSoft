document.addEventListener('DOMContentLoaded', function () {
    // Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');

    menuToggle.addEventListener('click', function () {
        nav.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            if (this.getAttribute('href') === '#') return;

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                }
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Product Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productsGrid = document.querySelector('.products-grid');

    // Sample product data
    const products = [
        {
            id: 1,
            title: 'Laptop HP EliteBook',
            price: 899.99,
            category: 'laptop',
            image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 2,
            title: 'Computadora Dell OptiPlex',
            price: 699.99,
            category: 'desktop',
            image: 'https://images.unsplash.com/photo-1551645120-d70bfe850c07?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 3,
            title: 'Teclado Mecánico RGB',
            price: 89.99,
            category: 'accesorio',
            image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 4,
            title: 'Laptop Lenovo ThinkPad',
            price: 1099.99,
            category: 'laptop',
            image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 5,
            title: 'Monitor 27" 4K',
            price: 349.99,
            category: 'accesorio',
            image: 'https://images.unsplash.com/photo-1546538915-a9e2c8d1dc41?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 6,
            title: 'Computadora All-in-One',
            price: 799.99,
            category: 'desktop',
            image: 'https://images.unsplash.com/photo-1586211082275-c412e00a1d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 7,
            title: 'Mouse Inalámbrico',
            price: 29.99,
            category: 'accesorio',
            image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 8,
            title: 'Laptop ASUS VivoBook',
            price: 749.99,
            category: 'laptop',
            image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        }
    ];

    // Display all products initially
    displayProducts(products);

    // Filter products
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Update active button
            filterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;

            if (filter === 'all') {
                displayProducts(products);
            } else {
                const filteredProducts = products.filter(product => product.category === filter);
                displayProducts(filteredProducts);
            }
        });
    });

    function displayProducts(productsToDisplay) {
        productsGrid.innerHTML = '';

        if (productsToDisplay.length === 0) {
            productsGrid.innerHTML = '<p class="no-products">No hay productos disponibles en esta categoría.</p>';
            return;
        }

        productsToDisplay.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <span class="product-category">${getCategoryName(product.category)}</span>
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <a href="#contacto" class="product-btn">Consultar</a>
                </div>
            `;
            productsGrid.appendChild(productCard);
        });
    }

    function getCategoryName(category) {
        switch (category) {
            case 'laptop': return 'Laptop';
            case 'desktop': return 'Computadora';
            case 'accesorio': return 'Accesorio';
            default: return category;
        }
    }

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }

    // Start counter animation when about section is in view
    const aboutSection = document.querySelector('#nosotros');
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            observer.unobserve(aboutSection);
        }
    }, { threshold: 0.5 });

    observer.observe(aboutSection);

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            // Here you would typically send the data to a server
            // For this example, we'll just show an alert
            alert(`Gracias ${name}, hemos recibido tu mensaje. Nos pondremos en contacto contigo pronto.`);

            // Reset form
            contactForm.reset();
        });
    }




    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = this.querySelector('input').value;

            // Here you would typically send the email to a server
            // For this example, we'll just show an alert
            alert(`Gracias por suscribirte con el email: ${email}`);

            // Reset form
            this.reset();
        });
    }
});