document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementsByTagName("footer")[0] != undefined) {
    let footer = document.querySelector("footer");
    document.querySelector("main").setAttribute("style", "--footer :" + footer.clientHeight + "px;");
  }
})