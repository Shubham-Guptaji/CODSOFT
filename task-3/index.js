for(button of document.getElementsByClassName('btn')){
    button.addEventListener('click',btnfn);
}

function btnfn(e){
    const reg = /[CA=]/;
    if(!(reg.test(e.target.value))) display(e.target.value);
    else if(e.target.value === '=') solve();
    else if(e.target.value === 'C') document.getElementById('result').value = '';
    else if(e.target.value === 'AC') delback();
    else alert('wrong input');
}

function display(num) {
    document.getElementById('result').value += num;
    return
}

function solve() {
    let x = document.getElementById('result').value;
    if(!x) return 
    y = eval(x.replace('x','*'));
    document.getElementById('result').value = y;
}

function delback(){
    let x = document.getElementById("result").value;
    if(x) document.getElementById("result").value = x.slice(0,x.length-1);
}