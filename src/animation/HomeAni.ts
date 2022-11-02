import gsap from 'gsap';

export default function HomeAni(state: boolean) {
  if (state) {
    gsap.to('.home .my-info', .3, {
      width: "400px",
    })
  } else {
    gsap.to('.home .my-info', .3, {
      width: "0",
    })
  }
}