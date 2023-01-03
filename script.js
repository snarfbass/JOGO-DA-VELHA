//initial date 
let square = {
   a1: '', a2: '', a3: '',
   b1: '', b2: '', b3: '',
   c1: '', c2: '', c3: ''
    
};
let player = '';
let warning = '';
let playing = false;


//events
document.querySelector('.reset').addEventListener('click',reset);
document.querySelectorAll('.item').forEach(item => {
   item.addEventListener('click' , itemClick);
});


//functions

function itemClick(event){
    let item = event.target.getAttribute('data-item');
    if( playing && square[item] === ''){
        square[item] = player;
        renderSquare();
        togglePlayer();
    }
}

function reset(){
    warning = '';

    let randon = Math.floor(Math.random() * 2);
   player = (randon === 0) ? 'x' : '0';

   for(let i in square){
    square[i] = '';
   }
   playing = true;

   renderSquare();
   renderinfo();
}

function renderSquare(){
    for (let i in square) {
      let item = document.querySelector(`div[data-item=${i}]`);
      item.innerHTML = square[i];
    }

    checkGmae();
}

function renderinfo(){
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}

function togglePlayer(){
    player = (player === 'x') ? 'o' : 'x';
    renderInfo();  
}

function checkGmae() {
   if(checkWinnerfor('x')){
    warning = '0 "x" venceu';
    playing = false;
   } else if(checkWinnerfor('o')) {
    warning = '0 "o" venceu';
    playing = false;
   }
   else if(isfull()) {
    warning = 'Deu empate'
    playing = false;
   }
}

function checkWinnerfor(player){
   let pos = [
    'a1.a2,a3',
    'b1,b2,b3',
    'c1,c2,c3',

    'a1,b1,c1',
    'a2,b2,c2',
    'a3,b3,c3',
    
    'a1,b2,c3',
    'a3,b2,c1'
   ];

   for(let w in pos) {
    let pArray = pos[w].split(',');
     let hasWon = pArray.every(option => square[option] === player);
     if (hasWon){
        return true;
     }
   } 
   return false;
   
}

function isfull(){
  for(let i in square) {
    if(square[i] === ''){
        return false;
    }
  }

  return true;
}