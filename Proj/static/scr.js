const w = document.getElementById("app");
console.log(w);
const newdiv = document.createElement("div");
console.log(newdiv);
newdiv.style.borderColor = "red";
newdiv.style.borderStyle = "solid";
newdiv.style.width = "300px";
newdiv.style.height = "300px";
w.appendChild(newdiv);
//const s = `<div style = "height: 200px; width: 200px; background-color:pink"><div\>`


p={
    x:15,
    y:10,
    color:["pink","black","green","white","orange","blue"]
}


function main(elem,p){
    vector = 1;
    cr = 0;
    setInterval(()=>{
    let h = Number(elem.style.height.replace("px",""))
    let w = Number(elem.style.width.replace("px",""))
    elem.style.width = String(h+p.x*vector)+"px";
    elem.style.height = String(h+p.y*vector)+"px";
    if (h >= 400){
        vector = -1;
    }
    if (h < 70){
        vector = 1;
    }
    cr++;
    elem.style.backgroundColor = p.color[cr%4]
    },50)
}

async function ahtung(){
    let response = await fetch('/getparam');

if (response.ok) { // если HTTP-статус в диапазоне 200-299
  // получаем тело ответа (см. про этот метод ниже)
  let json = await response.json();
  main(newdiv,json)
} else {
  alert("Ошибка HTTP: " + response.status);
}
}

async function new2(){
    let response = await fetch('/getkus');

if (response.ok) { // если HTTP-статус в диапазоне 200-299
  // получаем тело ответа (см. про этот метод ниже)
  let json = await response.json();
  newdiv.innerHTML = json
} else {
  alert("Ошибка HTTP: " + response.status);
}
}

async function POST(){
    let response = await fetch('/getparam',{
        method:'POST',
        headers:{
            'content-type': 'application/'
        }
    });

if (response.ok) { // если HTTP-статус в диапазоне 200-299
  // получаем тело ответа (см. про этот метод ниже)
  let json = await response.json();
  newdiv.innerHTML = json
} else {
  alert("Ошибка HTTP: " + response.status);
}
}


//main(newdiv,p);
console.log(newdiv.style.height);

//newdiv.innerHTML = s;



