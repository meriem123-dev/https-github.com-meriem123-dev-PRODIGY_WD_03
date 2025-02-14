let playertext=document.getElementById('playertext');
let restartbtn=document.getElementById('restartbtn');
let boxes=Array.from(document.getElementsByClassName('box'));
let winner_indicator=getComputedStyle(document.body).getPropertyValue('--winning');

console.log(boxes);

const o_text='o';
const x_text='x';

let current=x_text;
let spaces=Array(9).fill(null);

const startGame = ()=>{
   boxes.forEach(box => box.addEventListener('click',boxClicked))
}

function boxClicked(e)
{
    const id =e.target.id;
    if(!spaces[id])
    {
        spaces[id]=current;
        e.target.innerText=current;

        if(playerWon()!==false){
            playertext.innerText=`${current} has won !`;
            let vect_win = playerWon();
           vect_win.map(box =>boxes[box].style.backgroundColor=winner_indicator);
           
           return;
        }

        

        // si le joueur actuel c'est x alors le prochain c'est x snn le contraire
        current=current==x_text ? o_text :x_text;
    }
}

const gagner=[
 [0,1,2],
 [3,4,5],
 [6,7,8],
 [0,3,6],
 [1,4,7],
 [2,5,8],
 [0,4,8],
 [2,4,6]
]

function playerWon()
{
  for(const cond of gagner)
  {
    let [a,b,c]=cond;
    if(spaces[a] && spaces[a]==spaces[b] && spaces[b]==spaces[c]) {
        return [a,b,c];
    }
  }
  return false;
}

restartbtn.addEventListener('click',restart);

function restart()
{
    spaces.fill(null);
    boxes.forEach(box =>{
        box.innerText=''
        box.style.backgroundColor=''
    })

    playertext.innerText='Tic Tac Toe'

    current=x_text;
}

startGame();