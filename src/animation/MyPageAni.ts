import gsap from "gsap";
export default function MyPageAni(state: boolean) {
  if (state) {
    gsap.to(".delete-page", 0, {
      visibility: "visible",
    });
    gsap.to(".delete-page .inner", 0.3, {
      opacity: 1,
    });
  } else {
    gsap.to(".delete-page", 0, {
      visibility: "hidden",
    });
    gsap.to(".delete-page .inner", 0.3, {
      opacity: 0,
    });
  }
}
