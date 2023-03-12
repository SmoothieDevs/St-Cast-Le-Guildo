window.onload = function () {
    document.querySelector(".loader").classList.add("hide");
    document.body.style.position = "";
    setTimeout(() => {
        document.querySelector(".loader").remove();
    }, 2000);
}