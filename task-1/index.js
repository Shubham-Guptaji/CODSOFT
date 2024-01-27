// Handling appearance of navbar

let nav = true;
function navfn(){
    document.getElementById("navbar").style.display = nav ? "block" : "none";
    nav = !nav;
}
window.addEventListener('resize',()=>{
    if(window.screen.availWidth > 639){
        document.getElementById("navbar").style.display = "flex";
        nav = false;
    }else if( window.screen.availWidth < 640){
        document.getElementById("navbar").style.display = "none";
        nav = true;
    }
});

// move to root function from title
function moveroot(){ window.location.assign("/")}

// Handling appearance of skills

const skills = ["Full Stack Developer", "Front End Developer", "Backend Developer"];
const maintxt = document.getElementById("maintext");

async function showSkills(maintxt, skills) {
    for (const skill of skills) {
        await showSkill(maintxt, skill);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    showSkills(maintxt, skills);
}

async function showSkill(maintxt, skill) {
    maintxt.innerHTML = "";
    for (let i = 0; i < skill.length; i++) {
        maintxt.innerHTML += skill[i];
        await new Promise(resolve => setTimeout(resolve, 150));
    }
}

showSkills(maintxt, skills);

// About us blinker text

const about = document.getElementById("abouttxt");
showSkills(about, skills)

// contact form handler

const form = document.getElementById('form');
form.addEventListener('submit', contacthandler);
function contacthandler(e){
    e.preventDefault();

    function successfn(message){
        document.getElementById('siteLoader').style.display = 'none';
        document.getElementById('siteSuccess').style.display = 'block';
        document.getElementById('siteMessage').innerHTML = message;
        const form = document.forms[0];
        form.elements.name.value = '';
        form.elements.email.value = '';
        form.elements.subject.value = '';
        form.elements.message.value = '';
        new Promise(resolve => setTimeout(()=>{
            document.getElementById('siteInfo').style.display = 'none';
            document.getElementById('siteSuccess').style.display = 'none';
        }, 1500));
    }
    function errorfn(message){
        document.getElementById('siteLoader').style.display = 'none';
        document.getElementById('siteError').style.display = 'block';
        document.getElementById('siteMessage').innerHTML = message;
        new Promise(resolve => setTimeout(()=>{
            document.getElementById('siteInfo').style.display = 'none';
            document.getElementById('siteError').style.display = 'none';
        }, 1500));
    }
    function loadfn(){
        document.getElementById('siteInfo').style.display = 'flex';
        document.getElementById('siteLoader').style.display = 'block';
        document.getElementById('siteMessage').innerHTML = 'Submitting Contact form'
    }

    loadfn();
    const form = document.forms[0];
    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const subject = form.elements.subject.value;
    const message = form.elements.message.value;
    const formData = {
        name: name,
        email: email,
        subject: subject,
        message: message
    };
    
    if(!name || !email || !subject || !message) {
        errorfn('All fields are Mandatory.');
        return;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
    if(!emailRegex.test(email)) {
        errorfn("Please Enter Valid Email.");
        return;
    }
    const url = 'http://localhost:5000/api/v1/contact';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        data.success ? successfn(data.message) : errorfn(data.message);
    })
    .catch(error => {
        errorfn(error.message);
    });


}

// footer year

const date = new Date();
const year = date.getFullYear();

document.getElementById("year").innerHTML = `${year} - ${year + 1}`