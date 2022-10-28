const lenghtSlider = document.querySelector(".pass-length input");
const generateBtn = document.querySelector(".generate-btn");
const textInput = document.querySelector('.input-box input');
const passIndicator = document.querySelector('.pass-indicator');
const copyItem = document.querySelector('.input-box span');
options = document.querySelectorAll(".option input");


const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_<{}:[];,+_>|~",
};
const generatePassword = () => {
let staticPassword = "";
let randomPass = "";
excludeDuplicate = false;


options.forEach(option => {
    if(option.checked){
        if(option.id !== "exc-duplicate" && option.id !== "spaces"){
            staticPassword += characters[option.id];
        }else if(option.id === "spaces"){
            staticPassword += ` ${staticPassword} `;
        }else{
            excludeDuplicate = true
        }
    }
});

for(i = 0; i < lenghtSlider.value; i++){
    randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if(excludeDuplicate){
        !randomPass.includes(randomChar)?randomPass += randomChar : i--;
    }else{
        randomPass += randomChar;
    }
}

textInput.value = randomPass;
}
 
const PasswordIndicator = () => {
  passIndicator.id = lenghtSlider.value <= 8 ? "weak" : lenghtSlider.value <= 16 ? "medium" : "strong";
  
}


const updateSlider = () => {
 document.querySelector(".pass-length span").innerText = lenghtSlider.value;
 generatePassword();
PasswordIndicator();
}

copyItem.addEventListener('click', ()=> {
    navigator.clipboard.writeText(textInput.value);
    copyItem.innerText = "check";
    setTimeout( () => {
    copyItem.innerText = "copy_all";
    },1500)
    })


updateSlider();

lenghtSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);