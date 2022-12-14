// (() => {
//   const loginApp = {
//     openLoginAppBtn: document.querySelector("[login-app-open]"),
//     closeLoginAppBtn: document.querySelector("[login-app-close]"),
//     modalLoginApp: document.querySelector("[login-app-section]"),
//     chooseActionSection: document.querySelector("[choose-action]"),
//     modalRegisterApp: document.querySelector("[register-section]"),
//     openRegisterAppBtn: document.querySelector("[register-app-open]"),
//     closeRegisterAppBtn: document.querySelector("[register-app-close]"),
//   };

//   loginApp.openLoginAppBtn.addEventListener("click", toggleModalLogin);
//   loginApp.closeLoginAppBtn.addEventListener("click", toggleModalLogin);
//   loginApp.openRegisterAppBtn.addEventListener("click", toggleModalRegister);
//   loginApp.closeRegisterAppBtn.addEventListener("click", toggleModalRegister);

//   function toggleModalLogin() {
//     loginApp.chooseActionSection.classList.toggle("is-hidden");
//     loginApp.modalLoginApp.classList.toggle("is-hidden");
//   }

//   function toggleModalRegister() {
//     loginApp.chooseActionSection.classList.toggle("is-hidden");
//     loginApp.modalRegisterApp.classList.toggle("is-hidden");
//   }
// })();

(() => { 
  const registerDriver = {
    formDriverSection: document.querySelector("[register-driver]"),
    closeDriverFormBtn: document.querySelector("[register-driver-close]"),
    openDriverFormBtn: document.querySelector("[register-driver-open]"),
    backdropOnSection: document.querySelector(".backdrop-temp"),
  };

  const messageBox = {
    messageBoxSection: document.querySelector("[message-box]"),
    closeMessageBoxBtn: document.querySelector("[message-box-close]"),
    openMessageBoxBtn: document.querySelector("[message-box-open]"),
    backdropMessageOnSection: document.querySelector(".backdrop-temp-message"),
  };

  registerDriver.openDriverFormBtn.addEventListener("click", toggleDriverForm);
  registerDriver.closeDriverFormBtn.addEventListener("click", toggleDriverForm);

  messageBox.openMessageBoxBtn.addEventListener("click", toggleMessageBox);
  messageBox.closeMessageBoxBtn.addEventListener("click", toggleMessageBox);

  function toggleDriverForm() { 
    registerDriver.formDriverSection.classList.toggle("is-hidden");
    registerDriver.backdropOnSection.classList.toggle("backdrop");
    registerDriver.backdropOnSection.scrollIntoView({behavior: "smooth"});
  }

  function toggleMessageBox(){
    messageBox.messageBoxSection.classList.toggle("is-hidden");
    messageBox.backdropMessageOnSection.classList.toggle("backdrop");
  }
})();