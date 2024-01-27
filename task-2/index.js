// Handling appearance of navbar

let nav = true;
function navfn(){
    document.getElementById("navbar").style.display = nav ? "block" : "none";
    nav = !nav;
}
window.addEventListener('resize',()=>{
    if(window.screen.availWidth > 767){
        document.getElementById("navbar").style.display = "flex";
        nav = false;
    }else if( window.screen.availWidth < 768){
        document.getElementById("navbar").style.display = "none";
        nav = true;
    }
});

for(element of document.getElementsByClassName('navbarLink')){
    element.addEventListener('click',() => {
        document.getElementById("navbar").style.display = "none";
        nav = !nav;
    })
}


// move to root function from title
function moveroot(){ window.location.assign("/")}

// form handler code 

const form = document.getElementById('form');
form.addEventListener('submit', contacthandler);

function contacthandler(e){
    e.preventDefault();

    function successfn(message){
        document.getElementById('siteLoader').style.display = 'none';
        document.getElementById('siteSuccess').style.display = 'block';
        document.getElementById('siteMessage').innerHTML = message;
        const form = document.forms[0];
        form.elements.email.value = '';
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
    const email = form.elements.email.value;
    const formData = {
        email: email,
    };
    
    if(!email && !emailRegex.test(email)) {
        errorfn("Please Enter Valid Email.");
        return;
    }
    const url = 'https://backend.alcodemy.in/api/v1/contact';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        data.success ? successfn("Contact form submitted successfully") : errorfn(data.message);
    })
    .catch(error => {
        errorfn(error.message);
    });

}

const copyyear = document.getElementById('copyyear');
const date = new Date();
const year = date.getFullYear();
copyyear.innerHTML = `${year} - ${year+1}`