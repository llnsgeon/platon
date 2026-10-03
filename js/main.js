/* =========================================================
   PLATON UIJEONGBU HOWON
   main.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. 기본 요소
    ===================================================== */

    const header = document.querySelector(".header");
    const nav = document.querySelector("#nav");
    const menuButton = document.querySelector("#menuButton");
    const navLinks = document.querySelectorAll(".nav a");


    /* =====================================================
       2. 모바일 메뉴
    ===================================================== */

    if (menuButton && nav) {

        menuButton.addEventListener("click", () => {

            nav.classList.toggle("active");

            const isOpen = nav.classList.contains("active");

            menuButton.setAttribute("aria-expanded", isOpen);

            menuButton.textContent = isOpen ? "✕" : "☰";

        });

    }


    /* =====================================================
       3. 메뉴 클릭 시 모바일 메뉴 닫기
    ===================================================== */

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            if (nav) {
                nav.classList.remove("active");
            }

            if (menuButton) {
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.textContent = "☰";
            }

        });

    });


    /* =====================================================
       4. 부드러운 스크롤
       고정 헤더 높이까지 계산
    ===================================================== */

    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       5. 스크롤 시 헤더 변화
    ===================================================== */

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });


    /* =====================================================
       6. 현재 섹션에 맞춰 메뉴 활성화
    ===================================================== */

    const sections = document.querySelectorAll(
        "main section[id]"
    );


    function updateActiveMenu() {

        const scrollPosition =
            window.scrollY +
            window.innerHeight * 0.35;


        sections.forEach((section) => {

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");


            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {

                navLinks.forEach((link) => {

                    link.classList.remove("active-link");

                    if (
                        link.getAttribute("href") ===
                        `#${sectionId}`
                    ) {

                        link.classList.add("active-link");

                    }

                });

            }

        });

    }


    updateActiveMenu();

    window.addEventListener(
        "scroll",
        updateActiveMenu,
        { passive: true }
    );


    /* =====================================================
       7. 스크롤 등장 애니메이션
    ===================================================== */

    const revealElements = document.querySelectorAll(
        `
        .feature-card,
        .process-item,
        .grade-card,
        .camp-card,
        .curriculum-grid article,
        .consult-card,
        .location-box
        `
    );


    revealElements.forEach((element) => {

        element.classList.add("reveal");

    });


    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(

            (entries, observerInstance) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observerInstance.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


        revealElements.forEach((element) => {

            observer.observe(element);

        });

    } else {

        /*
           IntersectionObserver를 지원하지 않는
           오래된 브라우저에서는 바로 표시
        */

        revealElements.forEach((element) => {

            element.classList.add("show");

        });

    }


    /* =====================================================
       8. 카드 순차 등장 효과
    ===================================================== */

    const cardGroups = [

        document.querySelectorAll(".feature-card"),

        document.querySelectorAll(".grade-card"),

        document.querySelectorAll(".camp-card"),

        document.querySelectorAll(
            ".curriculum-grid article"
        ),

        document.querySelectorAll(".consult-card")

    ];


    cardGroups.forEach((group) => {

        group.forEach((card, index) => {

            card.style.transitionDelay =
                `${index * 0.06}s`;

        });

    });


    /* =====================================================
       9. TOP 버튼 생성
    ===================================================== */

    const topButton = document.createElement("button");

    topButton.className = "top-button";
    topButton.type = "button";
    topButton.setAttribute(
        "aria-label",
        "페이지 맨 위로 이동"
    );

    topButton.innerHTML = "↑";

    document.body.appendChild(topButton);


    function updateTopButton() {

        if (window.scrollY > 600) {

            topButton.classList.add("visible");

        } else {

            topButton.classList.remove("visible");

        }

    }


    updateTopButton();

    window.addEventListener(
        "scroll",
        updateTopButton,
        { passive: true }
    );


    topButton.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* =====================================================
       10. ESC 키로 모바일 메뉴 닫기
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key !== "Escape") {
            return;
        }

        if (!nav || !menuButton) {
            return;
        }

        nav.classList.remove("active");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.textContent = "☰";

    });


    /* =====================================================
       11. 화면 크기가 커지면 모바일 메뉴 초기화
    ===================================================== */

    window.addEventListener("resize", () => {

        if (
            window.innerWidth > 768 &&
            nav &&
            menuButton
        ) {

            nav.classList.remove("active");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.textContent = "☰";

        }

    });

});
