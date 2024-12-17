const section = document.querySelector('section.vid')
const vid = section.querySelector('video')

vid.pause()

const scroll = () => {
  const distance = window.scrollY - section.offsetTop
  const total = section.clientHeight - window.innerHeight

  let percentage = distance / total
  percentage = Math.max(0, percentage)
  percentage = Math.min(percentage, 1)

  if (vid.duration > 0) {
    vid.currentTime = vid.duration * percentage
  }
}

scroll()
window.addEventListener('scroll', scroll)



// GSAP ScrollTrigger setup
gsap.registerPlugin(ScrollTrigger);

// Select the image element
const dynamicImage = document.getElementById("dynamicImage");

// Select all text elements
const texts = document.querySelectorAll(".text");

// Animate each text element
texts.forEach((text, index) => {
  const nextText = texts[index + 1];
  const imageSrc = text.dataset.image;

  // Change image source as the text scrolls into view
  ScrollTrigger.create({
    trigger: text,
    start: "top 80%", // When the text is 80% from the top of the viewport
    end: nextText ? "top 80%" : "bottom 10%", // End at the next text or bottom of the page
    onEnter: () => {
      dynamicImage.src = imageSrc;
    },
    onEnterBack: () => {
      dynamicImage.src = imageSrc;
    },
  });

  // Animate text appearance
  gsap.fromTo(text,
    {
      opacity: 0,
      transform: "translateY(50px)"
    },
    {
      opacity: 1,
      transform: "translateY(0px)",
      duration: 1,
      scrollTrigger: {
        trigger: text,
        start: "top 80%",
        end: "top 10%",
        scrub: true,
      }
    }
  );

  // Hide text as it scrolls past
  gsap.to(text, {
    opacity: 0,
    transform: "translateY(-50px)",
    scrollTrigger: {
      trigger: text,
      start: "top 10%",
      end: "top 10%",
      scrub: true,
    }
  });
});