import gsap from "gsap";

export default function PostViewPageAni(toggle: boolean) {
  if (toggle) {
    gsap.to(".post-page-view .edit-success", 0, {
      visibility: "visible"
    });
    gsap.to(".post-page-view .edit", 0, {
      visibility: "hidden"
    });
    gsap.to(".post-page-view .post-container .content textarea", 0, {
      border: "1px solid #000",
    });
  } else {
    gsap.to(".post-page-view .edit-success", 0, {
      visibility: "hidden"
    });
    gsap.to(".post-page-view .edit", 0, {
      visibility: "visible"
    });
    gsap.to(".post-page-view .post-container .content textarea", 0, {
      border: "none",
    });
  }
}