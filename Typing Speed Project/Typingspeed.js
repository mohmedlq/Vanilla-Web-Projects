const langToggle = document.getElementById('langToggle');
const buttons = langToggle.querySelectorAll('.lang-btn');
let RandomText="";
let LastRecord = Number(localStorage.getItem("Record")) || Infinity;const myDialog = document.getElementById('myDialog');
const dialogMessage = document.getElementById('dialogMessage');
const dialogNumber = document.getElementById('dialogNumber');
const showText = document.getElementById("Display");
const InputText = document.getElementById("TextErea");
const startBtn = document.getElementById('startBtn');
const Timer=document.getElementById("timerDisplay");
let count = 0;
let timerInterval = null;
const samples = {
    ar: ["محمد", "موسى", "عيسى"],
    en: ["Mohamed", "Mousa", "Issa"]
};

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.getAttribute('data-lang');
    
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    if (lang === 'ar') {
      langToggle.classList.add('ar');
    } else {
      langToggle.classList.remove('ar');
    }
  });
});

startBtn.addEventListener('click', () => {
    if (timerInterval !== null) return;
    buttons.forEach(btn => btn.disabled = true);
    RandomText = generateRandomWord();
    showText.textContent = RandomText;

    timerInterval = setInterval(() => {
        count++;
        Timer.textContent = count;
    }, 1000);


});

function generateRandomWord()
{
 const language = langToggle.classList.contains("ar") ? "ar" : "en";
 
 const word=samples[language];
const randomIndex = Math.floor(Math.random() * word.length);
return word[randomIndex];

}
function openDialog(message, number) {
    dialogMessage.textContent = message; 
    dialogNumber.textContent = number;   
    myDialog.showModal();               
}
function closeDialog() {
    myDialog.close();
}

function StoreRecord(Time)
{
    localStorage.setItem("Record",Time);
}
function checkRecord()
{
if (LastRecord>count) {
      StoreRecord(count);
        openDialog("🎉 New Record!", count);
      }else
   {
     openDialog("Record ",count);
   }
}
function resetGame() {

    clearInterval(timerInterval);
    timerInterval = null;

    count = 0;
    Timer.textContent = count;

   InputText.value = "";
   InputText.focus();

    RandomText = generateRandomWord();
    showText.textContent = randomText;

    buttons.forEach(btn => btn.disabled = false);

}
InputText.addEventListener('input',(val)=>{
if (val.target.value.trim()===RandomText) {
   checkRecord();
setTimeout(() => {
    resetGame();

}, 3000);    
}
})