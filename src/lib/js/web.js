export function loadInit() {
    document.addEventListener("DOMContentLoaded", function () {
        // set fullheight
        function setFullHeight() {
            const height = window.innerHeight;
            document.body.style.setProperty('--window_height', `${height}px`);
        }
        window.addEventListener('resize', setFullHeight);
        window.addEventListener('orientationchange', setFullHeight);
        window.addEventListener('load', setFullHeight);
        setFullHeight();
    
        // Menu
        // closeSidebar
        
        // splide
        // initSlide
    
        // var splide_comment = null;
        // function initializeSplide() {
        //     if (window.innerWidth < 991) {
        //         splide_comment = new Splide("#splide_withus", {
        //             type: "loop",
        //             perPage: 1,
        //             autoplay: true,
        //             gap: '20px',
        //             breakpoints: {
        //                 1024: {
        //                     perPage: 2,
        //                 },
        //                 768: {
        //                     perPage: 1,
        //                     gap: '0px',
        //                 }
        //             }
        //         }).mount();
        //     }
        // }
    
        // function toggleSplide() {
        //     if (window.innerWidth >= 991) {
        //         if (splide_comment) {
        //             splide_comment.destroy();
        //             splide_comment = null;
        //         }
        //     } else {
        //         if (!splide_comment) {
        //             initializeSplide();
        //         }
        //     }
        // }
    
        // toggleSplide();
        // window.addEventListener("resize", toggleSplide);
    
        var sections = document.querySelectorAll('section[id]');
        var nav_links_all = document.querySelectorAll('.menu>.menu-item>a');
        var nav_links = [];
        nav_links_all.forEach(item => {
            var href = item.getAttribute('href');
            if (href != '#' || item.title === 'Home') {
                if (!href.includes('pubpower.io')) {
                    nav_links.push(item);
                }
            }
        })
        function changeActiveLink() {
            let index = sections.length;
    
            // Find index
            while (--index && window.scrollY + 50 < sections[index].offsetTop) {}
    
            const currentActiveLink = document.querySelector('#navbar a.active');
    
            if (nav_links[index] && !nav_links[index].classList.contains('active')) {
                nav_links.forEach((link) => link.classList.remove('active'));
                nav_links[index].classList.add('active');
            }
        }
        // changeActiveLink();
        // window.addEventListener('scroll', changeActiveLink);
    
        // nav_links_all.forEach(item => {
        //     item.addEventListener('click', function(e) {
        //         if (!item.href.includes('pubpower.io')) {
        //             nav_links_all.forEach((link) => link.classList.remove('active'));
        //             item.classList.add('active');
        //         }
        //     })
        // })
    
    
        // animation
        // loadInitAnimation
    
    });
    
}

export function loadInitAnimation() {
    function getRandomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }
    document.querySelectorAll('.a_dot').forEach(_a_item => {
        if (_a_item) {
            _a_item.querySelectorAll('path').forEach(item => {
                if (!item.classList.contains('blinking')) {
                    var time = getRandomInRange(2.5, 9);
                    item.style.cssText = `
                        --blinking-duraton: ${time}s;
                    `;
                    item.classList.add('blinking');
                }
            })
        }
    })
    document.querySelectorAll('.a_triangle').forEach(svg => {
        svg.querySelectorAll('path').forEach(item => {
            if (!item.classList.contains('blinking')) {
                var time = getRandomInRange(2.5, 9);
                item.style.cssText = `
                    --blinking-duraton: ${time}s;
                `;
                item.classList.add('blinking');
            }
        })
    })
}