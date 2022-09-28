(() => {
  const loginApp = {
    openLoginAppBtn: document.querySelector("[login-app-open]"),
    closeLoginAppBtn: document.querySelector("[login-app-close]"),
    modalLoginApp: document.querySelector("[login-app-section]"),
    chooseActionSection: document.querySelector("[choose-action]"),
    modalRegisterApp: document.querySelector("[register-section]"),
    openRegisterAppBtn: document.querySelector("[register-app-open]"),
    closeRegisterAppBtn: document.querySelector("[register-app-close]"),
  };

  loginApp.openLoginAppBtn.addEventListener("click", toggleModalLogin);
  loginApp.closeLoginAppBtn.addEventListener("click", toggleModalLogin);
  loginApp.openRegisterAppBtn.addEventListener("click", toggleModalRegister);
  loginApp.closeRegisterAppBtn.addEventListener("click", toggleModalRegister);

  function toggleModalLogin() {
    loginApp.chooseActionSection.classList.toggle("is-hidden");
    loginApp.modalLoginApp.classList.toggle("is-hidden");
    };

    function toggleModalRegister() {
        loginApp.chooseActionSection.classList.toggle("is-hidden");
        loginApp.modalRegisterApp.classList.toggle("is-hidden");
    };
})();
