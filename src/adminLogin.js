function login() {
  let error = document.getElementById("error");
  let username = document.getElementById("name");
  let password = document.getElementById("password");
  let admin = "admin";
  let pass = "1234";
  if (username.value == admin && password.value == pass) {
    window.location.href = "Admin.htm";
  } else {
    error.innerHTML += `  <div class="bg-red-100 text-red-800 p-4 rounded-lg" role="alert">
        <span class="font-semibold text-[15px] inline-block mr-4">Error!</span>
        <span class="block text-sm font-medium sm:inline max-sm:mt-2">This is a error message that requires your attention.</span>
      </div>`;
  }
}
