import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(Flip, SplitText);

const animateIn = () => {
    const loaderTitle = document.getElementById('loader-title');
    const title = document.querySelector('#title');
    const h1 = document.querySelector('#loader-title h1');

    const body = document.querySelector('body');
    body.style.overflow = 'hidden';
    body.setAttribute('data-lenis-prevent', '');

    const BlockTitle = () => {
        if(!loaderTitle || !h1) return;
        const split = new SplitText(h1, {
            type: 'words',
            wordsClass: 'word',
            onSplit: (self) => {
                gsap.set(h1, { opacity: 1 });
                self.words.forEach((word) => {
                    const content = word.innerHTML;
                    word.innerHTML = "";

                    const wrap = document.createElement("div");
                    wrap.classList.add("wrap");
                    wrap.innerHTML = content;

                    const overlay = document.createElement("div");
                    overlay.classList.add("overlay");

                    word.append(wrap, overlay);
                });

                const tl = gsap.timeline();

                self.words.forEach((word, i) => {
                const wrap = word.querySelector(".wrap");
                const overlay = word.querySelector(".overlay");

                const wordTl = gsap.timeline({});

                wordTl
                    .to(word, {
                        opacity: 1,
                        duration: 0.1
                    })
                    .to(overlay, {
                        scaleY: 1,
                        ease: "power1.in",
                        duration: 0.33
                    })
                    .set(wrap, { opacity: 1 })
                    .to(
                        overlay,
                        {
                            height: "0%",
                            ease: "power3.out",
                            duration: 0.33
                        },
                        "<=+0.06"
                    );

                    tl.add(wordTl, "<=" + 0.25);
                });
            }
        });
    }

    const FlipTitle = () => {
        if(!loaderTitle || !title || !h1) return;
        const state = Flip.getState(h1, { props: 'font-size,transform' });
        title.appendChild(h1);

        Flip.from(state, {
            duration: 1,
            delay: 0.15,
            ease: 'power3.out',
            absoluteOnLeave: true,
            onComplete: () => {
                gsap.to(['.content', '.meta', '#date',  '#end'], { opacity: 1, duration: 0.33 });
                loaderTitle.style.display = 'none';
                body.style.overflow = 'auto';
                body.removeAttribute('data-lenis-prevent');
            }
        });
    }
    
    BlockTitle();
    setTimeout(() => {
        FlipTitle();
    }, 2000);
}

export { animateIn };