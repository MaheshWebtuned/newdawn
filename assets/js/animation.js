// index.js
(function () {
    const observer = new IntersectionObserver(
        (entries) => {
            const groups = {}; // Group by animation type

            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const animationType = Array.from(el.classList).find((cls) =>
                        cls.startsWith("reveal-")
                    );

                    if (!groups[animationType]) groups[animationType] = [];
                    groups[animationType].push(el);

                    observer.unobserve(el); // Animate only once
                }
            });

            // Apply stagger per animation group
            Object.values(groups).forEach((group) => {
                group.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add("reveal-visible");
                    }, index * 250); // delay between elements
                });
            });
        },
        { threshold: 0.2 }
    );

    // Observe all reveal elements
    document.querySelectorAll('[class*="reveal-"]').forEach((el) => {
        observer.observe(el);
    });
})();
