import gsap from 'gsap';

export default function SignUp(name: string, state: boolean) {
  // 비밀번호
  if (name === "pw") {
    if (state) {
      gsap.to(`.notice.${name} h1`, 0, {
        opacity: 0
      })
      gsap.to(`.notice.${name} h2`, 0, {
        opacity: 1
      })
    } else {
      gsap.to(`.notice.${name} h1`, 0, {
        opacity: 1
      })
      gsap.to(`.notice.${name} h2`, 0, {
        opacity: 0
      })
    }
  }
  // 비밀번호 재확인
  if (name === "pw-check") {
    if (state) {
      gsap.to(`.notice.${name} h1`, 0, {
        opacity: 0
      })
      gsap.to(`.notice.${name} h2`, 0, {
        opacity: 1
      })
    } else {
      gsap.to(`.notice.${name} h1`, 0, {
        opacity: 1
      })
      gsap.to(`.notice.${name} h2`, 0, {
        opacity: 0
      })
    }
  }

  // 핸드폰 입력
  if (name === "phone") {
    if (state) {
      gsap.to(`.notice.${name} h1`, 0, {
        opacity: 0
      })
      gsap.to(`.notice.${name} h2`, 0, {
        opacity: 1
      })
    } else {
      gsap.to(`.notice.${name} h1`, 0, {
        opacity: 1
      })
      gsap.to(`.notice.${name} h2`, 0, {
        opacity: 0
      })
    }
  }
}