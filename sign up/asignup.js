 
function Click(sign){
    let SignUp,Login;
    let headsignin = document.querySelector(".ak-sign-in")
    let headcreateaccount = document.querySelector(".ak-create-account")

    if(sign=='signIn'){
        Login = document.querySelector(".login")
        Login.style.display="block";
        SignUp = document.querySelector(".signup")
        SignUp.style.display="none"
        
        headsignin.style.borderBottom= "3px solid black";
        headcreateaccount.style.borderBottom="none";
        
    } else{
        Login = document.querySelector(".login");
        Login.style.display="none"; 
        SignUp = document.querySelector(".signup");
        SignUp.style.display="block";
        
        headcreateaccount.style.borderBottom= "3px solid black";
        headsignin.style.borderBottom="none";
    }
//console.log(sign)
 }

document.querySelector(".signup").addEventListener("submit", signup);
 
async function signup(e) {
    
    let register_data;
    try {
        e.preventDefault();
       
        var first_name = document.querySelector(".first_name").value
        var last_name = document.querySelector(".last_name").value
        var email = document.querySelector(".ak-email").value
        var password = document.querySelector(".ak-pass").value
           

        

        if (first_name == "" || last_name == "" || email == "" || password == "") {
            alert("Please fill all info")
        }
        else {
            register_data = {
                first_name,
                last_name,
                email,
                password,
            }
        }

        register_data = JSON.stringify(register_data);
        console.log("register_data:", register_data);


    }
    catch (er) {
        console.log(er);
    }

    let reg_api = "http://localhost:4005/register";

    let response = await fetch(reg_api, {

        method: "POST",
        body: register_data,

        headers: {
            "Content-Type": "application/json",

        },

    });
    let data = await response.json();
    // alert(data.error.message)
    console.log("data:", data);

    let first_name_err = document.getElementById("first_name");
    let last_name_err = document.getElementById("last_name");
    let email_err = document.getElementById("email");
    let password_err = document.getElementById("password");

            first_name_err.textContent = "";
            last_name_err.textContent = "";
            email_err.textContent = "";
            password_err.textContent = "";

    if (data.errors != undefined) {

       console.log(data.message)
       
        data.errors.forEach((el) => {
            console.log(el.message, el.key);

           
               
                
            if (el.key == "first_name") {
                   
                first_name_err.textContent = el.message
            }
            if (el.key == "last_name") {
                   
                last_name_err.textContent = el.message
            }
            if (el.key == "email") {
                   
                email_err.textContent = el.message
            }
            if (el.key == "password") {
                   
                password_err.textContent = el.message
            }
        })
        
    }
   

      else if (data.status === "ok") {
        
        alert("Registration Successfull");
        
        
            Login = document.querySelector(".login")
            Login.style.display = "block";
            SignUp = document.querySelector(".signup")
            SignUp.style.display = "none";

            let headsignin = document.querySelector(".ak-sign-in")
            let headcreateaccount = document.querySelector(".ak-create-account")
            headsignin.style.borderBottom = "3px solid black";
            headcreateaccount.style.borderBottom = "none";
           
        }

        else {
            alert(data.message);
        }
    
}

document.querySelector(".login").addEventListener("submit",signIn);

async function signIn(e){

    e.preventDefault();
    let login_data = {
        email:document.querySelector(".ak-login-email").value,
        password:document.querySelector(".ak-login-pass").value

    }

    login_data = JSON.stringify(login_data);

    let login_url = `http://localhost:4005/login`;
    let response = await fetch(login_url,{

        method:"POST",
        body:login_data,

        headers: {
            "Content-Type": "application/json",

        },

    })
    let data = await response.json();
   // console.log("data:", data);
    if (data.status === "ok") {
        
        alert("Login Successfully");

        let username = document.querySelector(".ak-login-email").value;

        // console.log(username);
        // console.log(data.token);
        getUser(username, data.token);
        

        setTimeout(function () {
            window.location.href = "/";
        }, 1000);
        
        
    }

    else {
        alert(data.message);
    }
  
   
}



let getUser = async(user,token) => {
    let url = `http://localhost:4005/users?email=${user}`;
    try{
        let responce = await fetch(url, {
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            }
        })
        let data = await responce.json();

        console.log(data);
        let obj = {
           data: data.first_name,
            token,
        }
        localStorage.setItem("loginData", JSON.stringify(obj));
    }
    catch(err){
        console.log(err);
    }
}









