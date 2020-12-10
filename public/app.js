function copyUrl(e) {


  let copyUrl = e.target.value;
  console.log(e.target.value);






  navigator.clipboard.writeText(copyUrl);
  e.target.style.backgroundColor = '#3A2E4C'
  e.target.innerHTML = 'Copied !'

}