// Chờ toàn bộ HTML tải xong rồi mới chạy JavaScript để tránh lỗi
document.addEventListener('DOMContentLoaded', function() {

    // ==========================================================
    // --- PHẦN 1: XỬ LÝ THANH ĐIỀU HƯỚNG & MENU MOBILE ---
    // ==========================================================
    const mainNav = document.getElementById('main-nav');
    const menuToggle = document.getElementById('menu-toggle');
    
    if (mainNav && menuToggle) {
        const navContainer = mainNav.querySelector('nav');
        const navLinks = navContainer.querySelectorAll('a');
        const sections = document.querySelectorAll('section[id]');

        // 1.1: Xử lý bật/tắt Menu trên Mobile
        menuToggle.addEventListener('click', () => {
            navContainer.classList.toggle('active');
        });

        // 1.2: Xử lý Cuộn Mượt (Smooth Scrolling) khi nhấn vào link menu
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                // Chỉ xử lý với các link nội bộ (bắt đầu bằng #)
                if (targetId && targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - mainNav.offsetHeight;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                        // Tự động đóng menu sau khi chọn trên mobile
                        if (navContainer.classList.contains('active')) {
                            navContainer.classList.remove('active');
                        }
                    }
                }
            });
        });

        // 1.3: Đánh dấu link active khi cuộn trang
        const activateNavLinkOnScroll = () => {
            let currentSectionId = '';
            const navHeight = mainNav.offsetHeight;

            sections.forEach(section => {
                const sectionTop = section.offsetTop - navHeight - 50; // Thêm 50px offset cho chính xác hơn
                if (window.pageYOffset >= sectionTop) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + currentSectionId) {
                    link.classList.add('active');
                }
            });
        };
        // Lắng nghe sự kiện cuộn trang
        window.addEventListener('scroll', activateNavLinkOnScroll);
    }

    // ==========================================================
    // --- PHẦN 2: XỬ LÝ NÚT CUỘN LÊN ĐẦU TRANG ---
    // ==========================================================
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        // Hiện/ẩn nút khi cuộn
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                scrollTopBtn.style.display = "flex";
            } else {
                scrollTopBtn.style.display = "none";
            }
        });

        // Cuộn mượt lên đầu trang khi nhấn
        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==========================================================
    // --- PHẦN 3: XỬ LÝ HERO SLIDER (BANNER) ---
    // ==========================================================
    const sliderWrapper = document.querySelector('#hero'); // Tìm đến khối lớn nhất của slider
    if (sliderWrapper) {
        const slidesContainer = sliderWrapper.querySelector('.slides-container');
        const nextBtn = sliderWrapper.querySelector('.slider-nav.next');
        const prevBtn = sliderWrapper.querySelector('.slider-nav.prev');
        const dotsContainer = sliderWrapper.querySelector('.slider-dots');
        const slides = sliderWrapper.querySelectorAll('.slide');

        if (slides.length > 1 && slidesContainer && nextBtn && prevBtn && dotsContainer) {
            let currentIndex = 0;
            const slideCount = slides.length;
            let autoPlayInterval;

            // Tạo các chấm điều hướng
            for (let i = 0; i < slideCount; i++) {
                const dot = document.createElement('button');
                dot.classList.add('dot');
                dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                dot.addEventListener('click', () => {
                    goToSlide(i);
                    resetAutoPlay();
                });
                dotsContainer.appendChild(dot);
            }
            const dots = dotsContainer.querySelectorAll('.dot');
            
            // Hàm chính để chuyển slide
            function goToSlide(index) {
                slidesContainer.style.transform = `translateX(-${index * (100 / slideCount)}%)`;
                dots.forEach(dot => dot.classList.remove('active'));
                dots[index].classList.add('active');
                currentIndex = index;
            }

            // Hàm tự động chạy
            function startAutoPlay() {
                autoPlayInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % slideCount;
                    goToSlide(currentIndex);
                }, 5000); // Chuyển slide mỗi 5 giây
            }

            // Hàm reset tự động chạy khi người dùng tương tác
            function resetAutoPlay() {
                clearInterval(autoPlayInterval);
                startAutoPlay();
            }
            
            // Gán sự kiện cho các nút
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % slideCount;
                goToSlide(currentIndex);
                resetAutoPlay();
            });

            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + slideCount) % slideCount;
                goToSlide(currentIndex);
                resetAutoPlay();
            });
            
            // Khởi tạo slider
            goToSlide(0);
            startAutoPlay();
        }
    }
    
    // ==========================================================
    // --- PHẦN 4: XỬ LÝ FORM LIÊN HỆ ---
    // ==========================================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Ngăn trình duyệt tải lại trang
            // Bạn có thể thay thế alert bằng một thông báo đẹp hơn
            alert('Cảm ơn bạn! Yêu cầu của bạn đã được gửi. Chúng tôi sẽ liên hệ lại sớm nhất có thể.');
            contactForm.reset(); // Xóa các nội dung đã nhập trong form
        });
    }

});