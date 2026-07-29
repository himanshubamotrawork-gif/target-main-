/* ==========================================
   Target Rewards
   Testimonial Slider
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const slider = document.querySelector(".testimonial-slider");

    if (!slider) return;

    // Smooth mouse wheel horizontal scrolling
    slider.addEventListener("wheel", function(e){

        if(Math.abs(e.deltaY) > Math.abs(e.deltaX)){

            e.preventDefault();

            slider.scrollLeft += e.deltaY;

        }

    }, { passive:false });

    // Drag with mouse (desktop)

    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener("mousedown", (e)=>{

        isDown = true;

        slider.classList.add("dragging");

        startX = e.pageX - slider.offsetLeft;

        scrollLeft = slider.scrollLeft;

    });

    slider.addEventListener("mouseleave", ()=>{

        isDown = false;

        slider.classList.remove("dragging");

    });

    slider.addEventListener("mouseup", ()=>{

        isDown = false;

        slider.classList.remove("dragging");

    });

    slider.addEventListener("mousemove",(e)=>{

        if(!isDown) return;

        e.preventDefault();

        const x = e.pageX - slider.offsetLeft;

        const walk = (x - startX) * 1.2;

        slider.scrollLeft = scrollLeft - walk;

    });

    // Auto snap after scrolling

    let scrollTimeout;

    slider.addEventListener("scroll", ()=>{

        clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(()=>{

            const cards = slider.querySelectorAll(".review-card");

            if(cards.length === 0) return;

            const cardWidth = cards[0].offsetWidth + 22;

            const index = Math.round(slider.scrollLeft / cardWidth);

            slider.scrollTo({

                left:index * cardWidth,

                behavior:"smooth"

            });

        },120);

    });

});


/* ==========================================
   Button Ripple Effect
========================================== */

document.querySelectorAll(".cta").forEach(button=>{

    button.addEventListener("click",(e)=>{

        const circle=document.createElement("span");

        const diameter=Math.max(button.clientWidth,button.clientHeight);

        circle.style.width=diameter+"px";

        circle.style.height=diameter+"px";

        circle.style.left=e.offsetX-diameter/2+"px";

        circle.style.top=e.offsetY-diameter/2+"px";

        circle.classList.add("ripple");

        const ripple=button.getElementsByClassName("ripple")[0];

        if(ripple){

            ripple.remove();

        }

        button.appendChild(circle);

    });

});


/* ==========================================
   Reveal Animation
========================================== */

const observer=new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{threshold:0.15});

document.querySelectorAll(".step,.review-card,.card").forEach(el=>{

    el.classList.add("hidden");

    observer.observe(el);

});