 const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const next = document.getElementById('next');
    const prev = document.getElementById('prev');
    let index = 0;

    function showSlide(i) {
      slides.forEach((s, idx) => {
        s.classList.toggle('active', idx === i);
        dots[idx].classList.toggle('bg-pink-600', idx === i);
        dots[idx].classList.toggle('bg-gray-400', idx !== i);
      });
    }

    function nextSlide() {
      index = (index + 1) % slides.length;
      showSlide(index);
    }

    function prevSlide() {
      index = (index - 1 + slides.length) % slides.length;
      showSlide(index);
    }

    next.addEventListener('click', nextSlide);
    prev.addEventListener('click', prevSlide);

    // Auto Slide
    setInterval(nextSlide, 5000);


    