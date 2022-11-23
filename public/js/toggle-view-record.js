const showFullViewBtn = document.querySelectorAll(".reported-routes__record-btn-show-full");
const hiddenFullViewBtn = document.querySelectorAll(".reported-routes__record-btn-hidden-full");
const recordsToToggle = document.querySelectorAll(".toggle-view-space");
const joinBtn = document.querySelectorAll(".reported-routes__record-btn-join");


console.log(showFullViewBtn);
console.log(joinBtn);
function removeHiddenClass(pozArray){
  recordsToToggle[pozArray].classList.toggle("visually-hidden");

  if(joinBtn[pozArray]){
    joinBtn[pozArray].classList.toggle("visually-hidden");
  }
};

// hiddenFullViewBtn.forEach((element,index)=>{
//   element.addEventListener("click",()=>{addHiddenClass(index)})
// });

showFullViewBtn.forEach((element,index)=>{
  element.addEventListener("click",()=>{removeHiddenClass(index)})
});