// Utilities
const waitForEvent = (element, event) => {
  return new Promise((resolve) => {
    element.addEventListener(event, function (e){
      resolve(e);
    })
  });
}

function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

const json_array_filter = (json, key) => {
  const hasOwn = (obj, property) =>
    Object.prototype.hasOwnProperty.call(obj, property);
  json.map((x) => {
    if (hasOwn(x, key)) {
      return x[key];
    }
    return [];
  })
}

function download(url, as){
  var link = document.createElement('a');
  link.href = url;
  link.download = as;
  link.click()
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function generateId(){
  var id_chars = 'abcdef0123456789';
  var id = '';
  for (var i = 0; i < 32; i++){
    id = id + id_chars[getRandomInt(id_chars.length)];
  }

  return id
}

const if_then_else_retrun = (condition, then_return, else_return) => {
  if (condition) {
    return then_return;
  } else {
    return else_return;
  }
}

// Select menus
function toggleSelect(select){
  select.children[1].classList.toggle('hidden');
}

function selectOption(option, action = true){
  var select = option.parentElement.parentElement;
  select.children[0].innerText = option.getAttribute('value');
  toggleSelect(select);
  if (option.hasAttribute('onselect') && action) eval(option.getAttribute('onselect'))
}

document.querySelectorAll('.selectmenu').forEach((e) => {
  e.children[0].setAttribute('onclick', 'toggleSelect(this.parentElement);');
});

document.querySelectorAll('.selectmenu .options .option').forEach((e) => {
  e.setAttribute('onclick', 'selectOption(this); this.parentElement.parentElement.children[0].style.fontFamily = "' + e.getAttribute('value') + '";');
});


// Project generation
function generateSpriteJSON(costumes, spacing){
  var data = {"isStage":false,"name":"text_engine","variables":{"H0i3J3-.a*;@[!4ez!Ck":["x",0]},"lists":{},"broadcasts":{},"blocks":{"p}.%sce,qQ!.V@@pW7*.":{"opcode":"procedures_definition","next":"iak3j/GK_A+],?/w5$CQ","parent":null,"inputs":{"custom_block":[1,"%J+!,oEG%xX^}r:Ctwe["]},"fields":{},"shadow":false,"topLevel":true,"x":92,"y":140},"%J+!,oEG%xX^}r:Ctwe[":{"opcode":"procedures_prototype","next":null,"parent":"p}.%sce,qQ!.V@@pW7*.","inputs":{"1I%Mq[T`|9}2Gi!+#gFU":[1,"aAA]MR6!Ai$.Qjz!HKJG"]},"fields":{},"shadow":true,"topLevel":false,"mutation":{"tagName":"mutation","children":[],"proccode":"write %s","argumentids":"[\"1I%Mq[T`|9}2Gi!+#gFU\"]","argumentnames":"[\"number or text\"]","argumentdefaults":"[\"\"]","warp":"false"}},"aAA]MR6!Ai$.Qjz!HKJG":{"opcode":"argument_reporter_string_number","next":null,"parent":"%J+!,oEG%xX^}r:Ctwe[","inputs":{},"fields":{"VALUE":["number or text",null]},"shadow":true,"topLevel":false},"iak3j/GK_A+],?/w5$CQ":{"opcode":"data_setvariableto","next":"xk3;DM8:*wfw+06D7lnQ","parent":"p}.%sce,qQ!.V@@pW7*.","inputs":{"VALUE":[1,[10,"0"]]},"fields":{"VARIABLE":["x","H0i3J3-.a*;@[!4ez!Ck"]},"shadow":false,"topLevel":false},"l|92N3Af|6Wc8EEVEZt3":{"opcode":"operator_length","next":null,"parent":"xk3;DM8:*wfw+06D7lnQ","inputs":{"STRING":[3,"x|BfP=}N1FB^[o5k%/#f",[10,""]]},"fields":{},"shadow":false,"topLevel":false},"x|BfP=}N1FB^[o5k%/#f":{"opcode":"argument_reporter_string_number","next":null,"parent":"l|92N3Af|6Wc8EEVEZt3","inputs":{},"fields":{"VALUE":["number or text",null]},"shadow":false,"topLevel":false},"[)nD9{#@kcVe;8lbf3UV":{"opcode":"data_changevariableby","next":"?^%N[Sat@vq6W*gk3o}G","parent":"xk3;DM8:*wfw+06D7lnQ","inputs":{"VALUE":[1,[4,"1"]]},"fields":{"VARIABLE":["x","H0i3J3-.a*;@[!4ez!Ck"]},"shadow":false,"topLevel":false},"xk3;DM8:*wfw+06D7lnQ":{"opcode":"control_repeat","next":"x{e%IM*]LHcOJ.]U,9-8","parent":"iak3j/GK_A+],?/w5$CQ","inputs":{"TIMES":[3,"l|92N3Af|6Wc8EEVEZt3",[6,""]],"SUBSTACK":[2,"[)nD9{#@kcVe;8lbf3UV"]},"fields":{},"shadow":false,"topLevel":false},"?^%N[Sat@vq6W*gk3o}G":{"opcode":"looks_switchcostumeto","next":"+fBdSK]vtBHyy;NdOj*/","parent":"[)nD9{#@kcVe;8lbf3UV","inputs":{"COSTUME":[3,"Bt`}m5eX}#U`r~1/C0cL","VRjVGv0C5:dh[NB}=gWS"]},"fields":{},"shadow":false,"topLevel":false},"VRjVGv0C5:dh[NB}=gWS":{"opcode":"looks_costume","next":null,"parent":null,"inputs":{},"fields":{"COSTUME":["costume1",null]},"shadow":true,"topLevel":true,"x":245,"y":268},"Bt`}m5eX}#U`r~1/C0cL":{"opcode":"operator_letter_of","next":null,"parent":"?^%N[Sat@vq6W*gk3o}G","inputs":{"LETTER":[3,[12,"x","H0i3J3-.a*;@[!4ez!Ck"],[6,""]],"STRING":[3,"oSg:e2@MMTYcuILWuzC;",[10,""]]},"fields":{},"shadow":false,"topLevel":false},"oSg:e2@MMTYcuILWuzC;":{"opcode":"argument_reporter_string_number","next":null,"parent":"Bt`}m5eX}#U`r~1/C0cL","inputs":{},"fields":{"VALUE":["number or text",null]},"shadow":false,"topLevel":false},"6[_08$W!+]?p7Lz%Tm.V":{"opcode":"operator_divide","next":null,"parent":"si~;}@?8A:IpEHo1w{:@","inputs":{"NUM1":[3,"6S7{|Y`#t~(2+)4hjA__",[4,""]],"NUM2":[1,[4,"100"]]},"fields":{},"shadow":false,"topLevel":false},"6S7{|Y`#t~(2+)4hjA__":{"opcode":"looks_size","next":null,"parent":"6[_08$W!+]?p7Lz%Tm.V","inputs":{},"fields":{},"shadow":false,"topLevel":false},"si~;}@?8A:IpEHo1w{:@":{"opcode":"operator_multiply","next":null,"parent":"C(oEAs_MoZ=1oJe4h]rI","inputs":{"NUM1":[1,[4,"13"]],"NUM2":[3,"6[_08$W!+]?p7Lz%Tm.V",[4,""]]},"fields":{},"shadow":false,"topLevel":false},"C(oEAs_MoZ=1oJe4h]rI":{"opcode":"motion_movesteps","next":null,"parent":"+fBdSK]vtBHyy;NdOj*/","inputs":{"STEPS":[3,"si~;}@?8A:IpEHo1w{:@",[4,""]]},"fields":{},"shadow":false,"topLevel":false},"+fBdSK]vtBHyy;NdOj*/":{"opcode":"pen_stamp","next":"C(oEAs_MoZ=1oJe4h]rI","parent":"?^%N[Sat@vq6W*gk3o}G","inputs":{},"fields":{},"shadow":false,"topLevel":false},"~S`L[O,XmFtYNydlA,a!":{"opcode":"pen_clear","next":null,"parent":"a.-{DAJa#%)~Wb/U`E^9","inputs":{},"fields":{},"shadow":false,"topLevel":false},"a.-{DAJa#%)~Wb/U`E^9":{"opcode":"procedures_definition","next":"~S`L[O,XmFtYNydlA,a!","parent":null,"inputs":{"custom_block":[1,"Ta{Yo4`1;ky;|[kVy?a~"]},"fields":{},"shadow":false,"topLevel":true,"x":539,"y":138},"Ta{Yo4`1;ky;|[kVy?a~":{"opcode":"procedures_prototype","next":null,"parent":"a.-{DAJa#%)~Wb/U`E^9","inputs":{},"fields":{},"shadow":true,"topLevel":false,"mutation":{"tagName":"mutation","children":[],"proccode":"clear text","argumentids":"[]","argumentnames":"[]","argumentdefaults":"[]","warp":"false"}},"x{e%IM*]LHcOJ.]U,9-8":{"opcode":"motion_movesteps","next":null,"parent":"xk3;DM8:*wfw+06D7lnQ","inputs":{"STEPS":[3,"wK:Xh~^7fq5V1h~a^R1Y",[4,""]]},"fields":{},"shadow":false,"topLevel":false},"wK:Xh~^7fq5V1h~a^R1Y":{"opcode":"operator_subtract","next":null,"parent":"x{e%IM*]LHcOJ.]U,9-8","inputs":{"NUM1":[1,[4,""]],"NUM2":[3,"vwR`G8_/wK$rohXW5s~_",[4,""]]},"fields":{},"shadow":false,"topLevel":false},"i];hV)!7)qpVk*R5V!ZH":{"opcode":"operator_multiply","next":null,"parent":"vwR`G8_/wK$rohXW5s~_","inputs":{"NUM1":[1,[4,"13"]],"NUM2":[3,"B|B9Q.]r]jZLG9/q_})c",[4,""]]},"fields":{},"shadow":false,"topLevel":false},"B|B9Q.]r]jZLG9/q_})c":{"opcode":"operator_divide","next":null,"parent":"i];hV)!7)qpVk*R5V!ZH","inputs":{"NUM1":[3,";Az~.*($vFJaJ}%MJ9bS",[4,""]],"NUM2":[1,[4,"100"]]},"fields":{},"shadow":false,"topLevel":false},";Az~.*($vFJaJ}%MJ9bS":{"opcode":"looks_size","next":null,"parent":"B|B9Q.]r]jZLG9/q_})c","inputs":{},"fields":{},"shadow":false,"topLevel":false},"vwR`G8_/wK$rohXW5s~_":{"opcode":"operator_multiply","next":null,"parent":"wK:Xh~^7fq5V1h~a^R1Y","inputs":{"NUM1":[3,[12,"x","H0i3J3-.a*;@[!4ez!Ck"],[4,""]],"NUM2":[3,"i];hV)!7)qpVk*R5V!ZH",[4,""]]},"fields":{},"shadow":false,"topLevel":false}},"comments":{"Ng}*|.fbE@5xjDa3qKDH":{"blockId":null,"x":99.2592592592591,"y":-137.7777777777781,"width":324.4444580078125,"height":198.51849365234375,"minimized":false,"text":"Scratch Text Engine\nv1.0\nby SamuelLouf\n\nhttps://github.com/samuellouf\nhttps://scratch.mit.edu/samuellouf"}},"currentCostume":0,"costumes":[{"name":"costume1","bitmapResolution":2,"dataFormat":"png","assetId":"8d746a3c015bf44fa69bd4598644e36a","md5ext":"8d746a3c015bf44fa69bd4598644e36a.png","rotationCenterX":14,"rotationCenterY":17}],"sounds":[],"volume":100,"visible":true,"x":0,"y":0,"size":100,"direction":90,"draggable":false,"rotationStyle":"all around","extensions":["pen"]}
  /* costume exemple
  {
      "name":"0",
      "bitmapResolution":1,
      "dataFormat":"svg",
      "assetId":"f75f6e3832e78da32d5ab0a20dfb6da1",
      "md5ext":"f75f6e3832e78da32d5ab0a20dfb6da1.svg",
      "rotationCenterX":5.969997406005859,
      "rotationCenterY":15.981249999999989
    }
     */
  data.costumes = costumes;
  data.blocks["si~;}@?8A:IpEHo1w{:@"].inputs.NUM1[1][1] = spacing
  data.blocks["i];hV)!7)qpVk*R5V!ZH"].inputs.NUM1[1][1] = spacing
  return data
}

function generateProjectJSON(costumes, spacing){
  var data = {"targets":[{"isStage":true,"name":"Stage","variables":{"`jEk@4|i[#Fk?(8x)AV.-my variable":["ma variable",0]},"lists":{},"broadcasts":{},"blocks":{},"comments":{},"currentCostume":0,"costumes":[{"name":"arrière-plan1","dataFormat":"svg","assetId":"cd21514d0531fdffb22204e0ec5ed84a","md5ext":"cd21514d0531fdffb22204e0ec5ed84a.svg","rotationCenterX":240,"rotationCenterY":180}],"sounds":[],"volume":100,"layerOrder":0,"tempo":60,"videoTransparency":50,"videoState":"on","textToSpeechLanguage":null},{"isStage":false,"name":"text_engine","variables":{"H0i3J3-.a*;@[!4ez!Ck":["x",0]},"lists":{},"broadcasts":{},"blocks":{"c":{"opcode":"procedures_definition","next":"d","parent":null,"inputs":{"custom_block":[1,"e"]},"fields":{},"shadow":false,"topLevel":true,"x":92,"y":140},"e":{"opcode":"procedures_prototype","next":null,"parent":"c","inputs":{"1I%Mq[T`|9}2Gi!+#gFU":[1,"s"]},"fields":{},"shadow":true,"topLevel":false,"mutation":{"tagName":"mutation","children":[],"proccode":"write %s","argumentids":"[\"1I%Mq[T`|9}2Gi!+#gFU\"]","argumentnames":"[\"number or text\"]","argumentdefaults":"[\"\"]","warp":"false"}},"s":{"opcode":"argument_reporter_string_number","next":null,"parent":"e","inputs":{},"fields":{"VALUE":["number or text",null]},"shadow":true,"topLevel":false},"d":{"opcode":"data_setvariableto","next":"a","parent":"c","inputs":{"VALUE":[1,[10,"0"]]},"fields":{"VARIABLE":["x","H0i3J3-.a*;@[!4ez!Ck"]},"shadow":false,"topLevel":false},"a":{"opcode":"control_repeat","next":"f","parent":"d","inputs":{"TIMES":[3,"g",[6,""]],"SUBSTACK":[2,"h"]},"fields":{},"shadow":false,"topLevel":false},"g":{"opcode":"operator_length","next":null,"parent":"a","inputs":{"STRING":[3,"t",[10,""]]},"fields":{},"shadow":false,"topLevel":false},"t":{"opcode":"argument_reporter_string_number","next":null,"parent":"g","inputs":{},"fields":{"VALUE":["number or text",null]},"shadow":false,"topLevel":false},"h":{"opcode":"data_changevariableby","next":"b","parent":"a","inputs":{"VALUE":[1,[4,"1"]]},"fields":{"VARIABLE":["x","H0i3J3-.a*;@[!4ez!Ck"]},"shadow":false,"topLevel":false},"b":{"opcode":"looks_switchcostumeto","next":"i","parent":"h","inputs":{"COSTUME":[3,"j","u"]},"fields":{},"shadow":false,"topLevel":false},"j":{"opcode":"operator_letter_of","next":null,"parent":"b","inputs":{"LETTER":[3,[12,"x","H0i3J3-.a*;@[!4ez!Ck"],[6,""]],"STRING":[3,"v",[10,""]]},"fields":{},"shadow":false,"topLevel":false},"v":{"opcode":"argument_reporter_string_number","next":null,"parent":"j","inputs":{},"fields":{"VALUE":["number or text",null]},"shadow":false,"topLevel":false},"u":{"opcode":"looks_costume","next":null,"parent":"b","inputs":{},"fields":{"COSTUME":["costume1",null]},"shadow":true,"topLevel":false},"i":{"opcode":"pen_stamp","next":"k","parent":"b","inputs":{},"fields":{},"shadow":false,"topLevel":false},"k":{"opcode":"motion_movesteps","next":null,"parent":"i","inputs":{"STEPS":[3,"l",[4,""]]},"fields":{},"shadow":false,"topLevel":false},"l":{"opcode":"operator_multiply","next":null,"parent":"k","inputs":{"NUM1":[1,[4,"13"]],"NUM2":[3,"m",[4,""]]},"fields":{},"shadow":false,"topLevel":false},"m":{"opcode":"operator_divide","next":null,"parent":"l","inputs":{"NUM1":[3,"w",[4,""]],"NUM2":[1,[4,"100"]]},"fields":{},"shadow":false,"topLevel":false},"w":{"opcode":"looks_size","next":null,"parent":"m","inputs":{},"fields":{},"shadow":false,"topLevel":false},"f":{"opcode":"motion_movesteps","next":null,"parent":"a","inputs":{"STEPS":[3,"n",[4,""]]},"fields":{},"shadow":false,"topLevel":false},"n":{"opcode":"operator_subtract","next":null,"parent":"f","inputs":{"NUM1":[1,[4,""]],"NUM2":[3,"o",[4,""]]},"fields":{},"shadow":false,"topLevel":false},"o":{"opcode":"operator_multiply","next":null,"parent":"n","inputs":{"NUM1":[3,[12,"x","H0i3J3-.a*;@[!4ez!Ck"],[4,""]],"NUM2":[3,"p",[4,""]]},"fields":{},"shadow":false,"topLevel":false},"p":{"opcode":"operator_multiply","next":null,"parent":"o","inputs":{"NUM1":[1,[4,"13"]],"NUM2":[3,"q",[4,""]]},"fields":{},"shadow":false,"topLevel":false},"q":{"opcode":"operator_divide","next":null,"parent":"p","inputs":{"NUM1":[3,"x",[4,""]],"NUM2":[1,[4,"100"]]},"fields":{},"shadow":false,"topLevel":false},"x":{"opcode":"looks_size","next":null,"parent":"q","inputs":{},"fields":{},"shadow":false,"topLevel":false},"r":{"opcode":"procedures_definition","next":"y","parent":null,"inputs":{"custom_block":[1,"z"]},"fields":{},"shadow":false,"topLevel":true,"x":539,"y":138},"z":{"opcode":"procedures_prototype","next":null,"parent":"r","inputs":{},"fields":{},"shadow":true,"topLevel":false,"mutation":{"tagName":"mutation","children":[],"proccode":"clear text","argumentids":"[]","argumentnames":"[]","argumentdefaults":"[]","warp":"false"}},"y":{"opcode":"pen_clear","next":null,"parent":"r","inputs":{},"fields":{},"shadow":false,"topLevel":false}},"comments":{"A":{"blockId":null,"x":99,"y":-137,"width":324,"height":198,"minimized":false,"text":"Scratch Text Engine\nv1.0\nby SamuelLouf\n\nhttps://github.com/samuellouf\nhttps://scratch.mit.edu/samuellouf"}},"currentCostume":0,"costumes":[{"name":"costume1","bitmapResolution":2,"dataFormat":"png","assetId":"8d746a3c015bf44fa69bd4598644e36a","md5ext":"8d746a3c015bf44fa69bd4598644e36a.png","rotationCenterX":14,"rotationCenterY":17}],"sounds":[],"volume":100,"layerOrder":1,"visible":true,"x":36,"y":28,"size":100,"direction":90,"draggable":false,"rotationStyle":"all around"}],"monitors":[],"extensions":["pen"],"meta":{"semver":"3.0.0","vm":"0.2.0","agent":""}}
  /* costume exemple
  {
      "name":"0",
      "bitmapResolution":1,
      "dataFormat":"svg",
      "assetId":"f75f6e3832e78da32d5ab0a20dfb6da1",
      "md5ext":"f75f6e3832e78da32d5ab0a20dfb6da1.svg",
      "rotationCenterX":5.969997406005859,
      "rotationCenterY":15.981249999999989
    }
  */
  data.targets[1].costumes = costumes;
  data.targets[1].blocks.j.inputs.LETTER[1][0] = spacing;
  data.targets[1].blocks.o.inputs.NUM1[1][0] = spacing;
  return data
}

async function generateWithData(data, isSprite){
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  canvas.setAttribute('width', data.font_size);
  canvas.setAttribute('height', data.font_size);
  const ctx = canvas.getContext("2d");
  ctx.font = String(data.font_size) + "px " + data.font;
  var characters = '';
  if (data.majuscules) characters = characters + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (data.minuscules) characters = characters + 'abcdefghijklmnopqrstuvwxyz'
  if (data.numbers) characters = characters + '0123456789'
  if (data.ponctuation) characters = characters + ',;.:!?'
  if (data.mathematics) characters = characters + '+-÷×²'
  characters = characters + data.custom_characters
  var ids = [];
  window.ze = new ZipExt();
  window.ze.createEmpty();
  var chars_data = [];
  for (var letter in characters){
    ctx.fillText(characters[letter], 0, (data.font_size - data.font_size / 5));
    var b64 = canvas.toDataURL('image/png');
    var id = generateId();

    while (ids.includes(id)){
      id = generateId();
    }

    ids.push(id);
    window.ze.writeFile(id + '.png', b64.split(',')[1], 'base64');
    var img = new Image();
    img.src = b64;
    chars_data.push({
      "name": characters[letter],
      "bitmapResolution":2,
      "dataFormat":"png",
      "assetId":id,
      "md5ext":id + ".png",
      "rotationCenterX":16,
      "rotationCenterY":16,
    });
    ctx.clearRect(0, 0, data.font_size, data.font_size);
  }
  var generate_func = if_then_else_retrun(isSprite, generateSpriteJSON, generateProjectJSON);

  window.ze.writeFile(if_then_else_retrun(isSprite, 'sprite', 'project') + '.json', JSON.stringify(generate_func(chars_data, data.spacing)), 'text');
  var output_zip = await window.ze.getZip("data: URL", "6");
  download(output_zip, 'ScratchTextEngine.' + if_then_else_retrun(isSprite, 'sprite3', 'sb3'))
}

function generateSprite(){
  generateWithData({
    font: document.querySelector('form #font.selectmenu.select .selected').innerText,
    minuscules: document.querySelector('form #min_letters').checked,
    majuscules: document.querySelector('form #maj_letters').checked,
    ponctuation: document.querySelector('form #ponctuation').checked,
    numbers: document.querySelector('form #numbers').checked,
    mathematics: document.querySelector('form #mathematics').checked,
    custom_characters: document.querySelector('form #custom_chars').value,
    spacing: 12,
    font_size: 48,
  }, true);
}

function generateProject(){
  generateWithData({
    font: document.querySelector('form #font.selectmenu.select .selected').innerText,
    minuscules: document.querySelector('form #min_letters').checked,
    majuscules: document.querySelector('form #maj_letters').checked,
    ponctuation: document.querySelector('form #ponctuation').checked,
    numbers: document.querySelector('form #numbers').checked,
    mathematics: document.querySelector('form #mathematics').checked,
    custom_characters: document.querySelector('form #custom_chars').value,
    spacing: 12,
    font_size: 48,
  }, false);
}

// Fonts

async function loadCustomFont(importfile = true, font_name = null, url = null){
  if (importfile){
    let input = document.createElement('input');
    input.type = 'file';
    input.click();
    await waitForEvent(input, 'input');
    var file = input.files[0];
    let style = document.createElement('style');
    var b64 = await blobToBase64(file);
    var font_default_name = file.name.split('.')[0][0].toUpperCase() + file.name.split('.')[0].substring(1);
    var font_name = prompt('How do you want to name this font? (default name is "' + font_default_name + '")') || font_default_name;  
  } else {
    var b64 = url;
  }
  
  style.innerText = `@font-face {
  font-family: '${font_name}';
  src: url('${b64}');
}`
  document.querySelector('#custom_fonts').appendChild(style);
  let font = document.createElement('div');
  font.classList.add('option');
  font.setAttribute('value', font_name);
  font.setAttribute('onclick', 'selectOption(this); this.parentElement.parentElement.children[0].style.fontFamily = "' + font.getAttribute('value') + '";');
  let span = document.createElement('span');
  span.style.fontFamily = font_name;
  span.innerText = font_name;
  font.appendChild(span);
  document.querySelector('.selectmenu .options').appendChild(font);
  document.querySelector('.selectmenu .selected').innerText = font_name;
  document.querySelector('.selectmenu .selected').style.fontFamily = font_name;
}

// Generate from params
let params = new URLSearchParams(window.location.search);

if (params.has('generate')){ // Generate with either parameters or default data
  var default_data = {
    font: params.get('font') || 'Sans Serif',
    minuscules: params.get('maj') || true,
    majuscules: params.get('min') || true,
    ponctuation: params.get('ponctuation') || true,
    numbers: params.get('numbers') || true,
    mathematics: params.get('maths') || true,
    custom_characters: params.get('custom_chars') || '',
    spacing: params.get('spacing') || 12,
    font_size: params.get('font_size') || 48,
  };
  if (params.get('generate') == 'sprite'){
    generateWithData(default_data, true);
  } else {
    generateWithData(default_data, false);
  }
}

// Other
document.querySelector('form').addEventListener('submit', function (event){
  event.preventDefault()
});