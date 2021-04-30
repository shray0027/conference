const detailsBtn = document.querySelector("#detail");
const helpBtn = document.querySelector("#help");
const mDetails = document.querySelector(".options-main-container-right-details").style;
const mHelp = document.querySelector(".options-main-container-right-help").style;
detailsBtn.addEventListener("click", ()=>{
        mDetails.display="flex";
        mHelp.display="none";
        detailsBtn.classList.add("active");
        helpBtn.classList.remove("active");
});
helpBtn.addEventListener("click",()=>{
    mHelp.display="flex";
    mDetails.display="none";
    helpBtn.classList.add("active");
    detailsBtn.classList.remove("active");
})
