export default function initMenu(){
  const btn = document.querySelector('.menu-toggle');
  if(!btn) return;
  btn.addEventListener('click', ()=> document.body.classList.toggle('menu-open'));
}
