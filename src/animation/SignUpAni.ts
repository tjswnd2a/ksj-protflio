import gsap from 'gsap';

export default function SignUp(name: string, state: number) {

  switch (state) {
    case 1:
      gsap.to(`.notice.${name} h1`, 0, {
        opacity: 0
      })
      gsap.to(`.notice.${name} h2`, 0, {
        opacity: 1
      })
      break;
    case 2:
      gsap.to(`.notice.${name} h1`, 0, {
        opacity: 1
      })
      gsap.to(`.notice.${name} h2`, 0, {
        opacity: 0
      })
      break;

    // ID
    case 3: // 잘못된 이메일 입니다.
      gsap.to(`.notice.${name} h1`, 0, {
        opacity: 1
      })
      gsap.to(`.notice.${name} h2`, 0, {
        opacity: 0
      })
      gsap.to(`.notice.${name} h3`, 0, {
        opacity: 0
      })
      break;
    case 4: // 사용가능
      gsap.to(`.notice.${name} h1`, 0, {
        opacity: 0
      })
      gsap.to(`.notice.${name} h2`, 0, {
        opacity: 1
      })
      gsap.to(`.notice.${name} h3`, 0, {
        opacity: 0
      })
      break;
    case 5: // 이미 사용중인 이메일 입니다.
      gsap.to(`.notice.${name} h1`, 0, {
        opacity: 0
      })
      gsap.to(`.notice.${name} h2`, 0, {
        opacity: 0
      })
      gsap.to(`.notice.${name} h3`, 0, {
        opacity: 1
      })
      break;
  }

}