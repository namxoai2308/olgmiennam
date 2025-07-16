// Chờ toàn bộ HTML tải xong rồi mới chạy JavaScript
document.addEventListener('DOMContentLoaded', function() {

    // ==========================================================
    // --- PHẦN 1: XỬ LÝ THANH ĐIỀU HƯỚNG & MENU MOBILE ---
    // ==========================================================
    const mainNav = document.getElementById('main-nav');
    const menuToggle = document.getElementById('menu-toggle');
    if (mainNav && menuToggle) {
        const navContainer = mainNav.querySelector('nav');
        menuToggle.addEventListener('click', () => {
            navContainer.classList.toggle('active');
        });
        // (Thêm các xử lý khác cho menu nếu bạn cần)
    }

    // ==========================================================
    // --- PHẦN 2: XỬ LÝ NÚT CUỘN LÊN ĐẦU TRANG ---
    // ==========================================================
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                scrollTopBtn.style.display = "flex";
            } else {
                scrollTopBtn.style.display = "none";
            }
        });
        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==========================================================
    // --- PHẦN 3: XỬ LÝ HERO SLIDER (PHIÊN BẢN CHỮ TRƯỢT) ---
    // ==========================================================
    const sliderWrapper = document.querySelector('#hero');
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
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
            const dots = dotsContainer.querySelectorAll('.dot');
            
            // Hàm chính để chuyển slide
            function goToSlide(index) {
                slidesContainer.style.transform = `translateX(-${index * (100 / slideCount)}%)`;
                
                slides.forEach(slide => slide.classList.remove('active'));
                dots.forEach(dot => dot.classList.remove('active'));

                slides[index].classList.add('active');
                dots[index].classList.add('active');

                currentIndex = index;
                resetAutoPlay();
            }

            function showNextSlide() {
                const nextIndex = (currentIndex + 1) % slideCount;
                goToSlide(nextIndex);
            }

            function showPrevSlide() {
                const prevIndex = (currentIndex - 1 + slideCount) % slideCount;
                goToSlide(prevIndex);
            }

            function startAutoPlay() {
                autoPlayInterval = setInterval(showNextSlide, 5000);
            }

            function resetAutoPlay() {
                clearInterval(autoPlayInterval);
                startAutoPlay();
            }
            
            // Gán sự kiện cho các nút
            nextBtn.addEventListener('click', showNextSlide);
            prevBtn.addEventListener('click', showPrevSlide);
            
            // Khởi tạo slider
            goToSlide(0);
        }
    }
    
    // ==========================================================
    // --- PHẦN 4: XỬ LÝ FORM LIÊN HỆ ---
    // ==========================================================
// ==========================================================
// --- PHẦN 4: XỬ LÝ FORM LIÊN HỆ BẰNG AJAX ---
// ==========================================================
const contactForm = document.getElementById('contact-form');
const successModal = document.getElementById('success-modal');

if (contactForm && successModal) {
    const closeModalBtn = successModal.querySelector('.modal-close-btn');

    // Hàm để mở modal
    function openModal() {
        successModal.classList.add('active');
    }

    // Hàm để đóng modal
    function closeModal() {
        successModal.classList.remove('active');
    }

    // Gán sự kiện cho nút đóng và lớp phủ
    closeModalBtn.addEventListener('click', closeModal);
    successModal.addEventListener('click', function(event) {
        // Chỉ đóng khi nhấn vào lớp phủ, không phải nội dung modal
        if (event.target === successModal) {
            closeModal();
        }
    });

    // Xử lý khi gửi form
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        
        submitButton.disabled = true;
        submitButton.innerHTML = 'Đang gửi...';

        fetch(this.action, {
            method: this.method,
            body: formData,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                // Gửi thành công: Mở modal và reset form
                openModal();
                this.reset();
            } else {
                // Có lỗi: Hiển thị thông báo lỗi (bạn có thể tạo một modal lỗi riêng nếu muốn)
                alert("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
            }
        }).catch(error => {
            alert("Lỗi mạng! Không thể gửi yêu cầu.");
        }).finally(() => {
            // Kích hoạt lại nút bấm
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        });
    });
}

});