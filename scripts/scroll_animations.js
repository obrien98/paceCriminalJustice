document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

    const observer = new IntersectionObserver((entries, activeObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("active");
                }, 50);

                activeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    reveals.forEach((element) => observer.observe(element));
});
