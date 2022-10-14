// const fullViewHTML = `
//   <ul class="reported-routes__record-list">
//     <li class="reported-routes__record-item reported-routes__record-item-route">
//       <p class="reported-routes__record-item-description">Trasa&#58;
//         <span class="reported-routes__record-item-content reported-routes__record-item-content-start">Krzeszowice</span>
//         <span class="reported-routes__record-item-content reported-routes__record-item-content-selector">&#8722;</span>
//         <span class="reported-routes__record-item-content reported-routes__record-item-content-end">Leroy Merlin</span>
//       </p>
//     </li>
//     <li class="reported-routes__record-item reported-routes__record-item-data">
//       <p class="reported-routes__record-item-description">Data przejazdu&#58;
//         <span class="reported-routes__record-item-content">15.08.2022</span>
//       </p>
//     </li>
//     <ul class="toggle-view-space">
//       <li class="reported-routes__record-item reported-routes__record-item-time reported-routes__record-item-toggle-view">
//         <p class="reported-routes__record-item-description">Godzina odjazdu&#58;</p>
//         <ul class="reported-routes__record-time-list">
//           <li class="reported-routes__record-time-list description-third">Strefa 1&#58;
//             <span class="reported-routes__record-item-content">13:45</span>
//           </li>
//           <li class="reported-routes__record-time-list description-third">Strefa 2&#58;
//             <span class="reported-routes__record-item-content">14:00</span>
//           </li>
//           <li class="reported-routes__record-time-list description-third">Strefa 3&#58;
//             <span class="reported-routes__record-item-content">14:15</span>
//           </li>
//         </ul>    
//       </li>
//       <li class="reported-routes__record-item reported-routes__record-item-seats-in-car reported-routes__record-item-toggle-view">
//         <p class="reported-routes__record-item-description">Ilość miejsc w aucie&#58;
//           <span class="reported-routes__record-item-content">4</span>
//         </p>
//       </li>
//       <li class="reported-routes__record-item reported-routes__record-item-free-seats-in-car reported-routes__record-item-toggle-view">
//         <p class="reported-routes__record-item-description">Pozostała ilość miejsc w aucie&#58;
//           <span class="reported-routes__record-item-content">4</span>
//         </p>
//       </li>
//       <li class="reported-routes__record-item reported-routes__record-item-price reported-routes__record-item-toggle-view">
//         <p class="reported-routes__record-item-description">Cena dla pasażera&#58;</p>
//         <ul class="reported-routes__record-price-list">
//           <li class="reported-routes__record-price-list description-third">Strefa 1&#58;
//             <span class="reported-routes__record-item-content">3zł</span>
//           </li>
//           <li class="reported-routes__record-price-list description-third">Strefa 2&#58;
//             <span class="reported-routes__record-item-content">5zł</span>
//           </li>
//           <li class="reported-routes__record-price-list description-third">Strefa 3&#58;
//             <span class="reported-routes__record-item-content">7zł</span>
//           </li>
//         </ul>
//       </li>
//       <li class="reported-routes__record-item reported-routes__record-item-towns reported-routes__record-item-toggle-view">
//         <p class="reported-routes__record-item-description">Miejscowości na trasie przejazdu&#58;
//           <span class="reported-routes__record-item-content">Rudawa,Kochanów,Zabierzów</span>
//         </p>
//       </li>
//       <li class="reported-routes__record-item reported-routes__record-item-contact reported-routes__record-item-toggle-view">
//         <p class="reported-routes__record-item-description">Kontakt do kierowcy&#58;
//           <span class="reported-routes__record-item-content">+48 505 145 351</span>
//         </p>
//       </li>
//     </ul>
//   </ul>
// <button class="reported-routes__record-btn-join button-small">
//   <span class="reported-routes__record-btn-title btn-small-title">Dołącz jako pasażer</span>
// </button>
// `;
// const shortViewHTML = `
//   <ul class="reported-routes__record-list">
//     <li class="reported-routes__record-item reported-routes__record-item-route">
//       <p class="reported-routes__record-item-description">Trasa&#58;
//         <span class="reported-routes__record-item-content reported-routes__record-item-content-start">Krzeszowice</span>
//         <span class="reported-routes__record-item-content reported-routes__record-item-content-selector">&#8722;</span>
//         <span class="reported-routes__record-item-content reported-routes__record-item-content-end">Leroy Merlin</span>
//       </p>
//     </li>
//     <li class="reported-routes__record-item reported-routes__record-item-data">
//       <p class="reported-routes__record-item-description">Data przejazdu&#58;
//         <span class="reported-routes__record-item-content">15.08.2022</span>
//       </p>
//     </li>
//   </ul>
// `;

const showFullViewBtn = document.querySelectorAll(".reported-routes__record-btn-show-full");
const hiddenFullViewBtn = document.querySelectorAll(".reported-routes__record-btn-hidden-full");
const recordsToToggle = document.querySelectorAll(".toggle-view-space");
const joinBtn = document.querySelectorAll(".reported-routes__record-btn-join");
// const spanShowFullViewBtn = document.querySelector("[show-full-view]");
// const spanShowShortViewBtn = document.querySelector("[show-short-view]");
// console.log(spanShowFullViewBtn,spanShowShortViewBtn);


// function createFullViewHTML(evt){
//   if(evt.target.nodeName!=="BUTTON"){
//     // console.log(evt.target);
//     return
//   }
//   console.log(evt.target);
// }

// function createShortViewHTML(evt,pozArray){
//   if(evt.target.nodeName!=="BUTTON"){
//     // console.log(evt.target);
//     return
//   }
//   console.log(evt.target);
//   recordsToToggle[pozArray].innerHTML=fullViewHTML
// }

// showFullViewBtn.forEach((element,index)=>{
//   element.addEventListener("click",function createShortViewHTML(evt,pozArray){
//     if(evt.target.nodeName!=="BUTTON"){
//       // console.log(evt.target);
//       return
//     }
//     console.log(evt.target);
//     recordsToToggle[pozArray].innerHTML=fullViewHTML
//   })})

// hiddenFullViewBtn.forEach((element)=>{
//   element.addEventListener("click",createShortViewHTML)
// })


// function createFullViewHTML(pozArray){
//   const recordsToToggle = document.querySelectorAll(".reported-routes__item");
//   recordsToToggle[pozArray].innerHTML=fullViewHTML;
//   console.log(recordsToToggle[pozArray]);
// };
// function createShortViewHTML(pozArray){
//   const recordsToToggle = document.querySelectorAll(".reported-routes__item");
//   recordsToToggle[pozArray].innerHTML=shortViewHTML;
//   console.log(recordsToToggle[pozArray]);
// };

// showFullViewBtn.forEach((element,index)=>{
//   element.addEventListener("click",()=>{createFullViewHTML(index)})});
// hiddenFullViewBtn.forEach((element,index)=>{
//   element.addEventListener("click",()=>{createShortViewHTML(index)})});




// function toggleViewHTML(pozArray,codeHTML){
//   recordsToToggle[pozArray].innerHTML=codeHTML
// };

// showFullViewBtn.forEach((element,index)=>{
//   element.addEventListener("click",()=>{toggleViewHTML(index,fullViewHTML)});
// });
// hiddenFullViewBtn.forEach((element,index)=>{
//   element.addEventListener("click",()=>{toggleViewHTML(index,shortViewHTML)})
// });



// function addHiddenClass(pozArray){
//   recordsToToggle[pozArray].classList.toggle("visually-hidden")
// };

function removeHiddenClass(pozArray){
  recordsToToggle[pozArray].classList.toggle("visually-hidden");
  joinBtn[pozArray].classList.toggle("visually-hidden");
};

// hiddenFullViewBtn.forEach((element,index)=>{
//   element.addEventListener("click",()=>{addHiddenClass(index)})
// });

showFullViewBtn.forEach((element,index)=>{
  element.addEventListener("click",()=>{removeHiddenClass(index)})
});