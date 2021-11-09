function MostrarSenha() {
  const x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}


async function login() {
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value



  const body = { email, password }

  fetch("http://localhost:3333/v1/login", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  }
).then(function(res) {
    res.json().then(async data => {
      // Erros
      if(res.status === 422) {
        data.errors.forEach(element => {
          if(element.param === "email") {
            document.getElementById("error").innerText = element.msg
          }

          if(element.param === "password") {
            document.getElementById("error").innerText = element.msg
          }
        })
      }      
      else if(res.status === 401) {
        document.getElementById("error").innerText = data.error
      }
      else {
        document.getElementById("error").innerText = null
        await localStorage.setItem("token",data.token)
      }
      
    })
  })
}


  // fetch('http://localhost:3333/v1/login', {
  //   method: 'POST',
  //   body: JSON.stringify(body),
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json'
  //   },
  // }).then(function(res) {
  //   console.log(res.status)
  //   const response = res.json().then(data => {
  //     console.log(data)

  //     if(res.status === 422) {

  //       data.errors.forEach(element => {

  //         if(element.param === 'email') {
  //           document.getElementById('error_pass').innerText = element.msg
  //         }

  //       });
  //     }

  //   })
