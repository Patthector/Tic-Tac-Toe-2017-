//let's gonna get the button Inicio
let buttonInicio = document.getElementById('buttonInicio');
function game(){
    this.availableMoveBoolean = [true,true,true,true,true,true,true,true,true];//cuz at the very beginnig of the game all moves are available
    this.moves = [-1,-1,-1,-1,-1,-1,-1,-1,-1];//you'll use the numeric array when you have a computer player
    this.counter = 0;//the first player is ready to move
    this.weHaveaWinner = false;
    this.theWinnerMove = [];
    this.solutions = [//these are all the solutions for winning the game**
        [0,4,8],                  
        [1,4,7],  
        [2,5,8],  
        [0,3,6],  
        [0,1,2],  
        [3,4,5],   
        [6,7,8],   
        [2,4,6],
    ];

};
let newGame;

document.addEventListener('click',function(e){
    let object = e.target;//this is the element has been clicked...
    if(object.tagName === 'A'){
        newGame = new game();
        object.parentElement.parentElement.previousElementSibling.previousElementSibling.setAttribute('class','tutorial');
        let table = object.parentElement.parentElement.previousElementSibling;
        object.parentElement.parentElement.setAttribute('class','hidden');
        Draw(table);        
    }
    else if(object.tagName === 'rect' && newGame.availableMoveBoolean[object.getAttribute('id')]){
        //if we select a div and that Div hasn't been selected before =>avaliableMoveBoolean[id]=false, we can make a move
        let index = parseInt(object.getAttribute('id'),10);
         if(newGame.counter % 2 === 0){
            object.nextElementSibling.setAttribute('class','visible');
        }
        else{
             object.nextElementSibling.nextElementSibling.setAttribute('class','visible');
        }        
        MakeAmove(index,object);
        if(newGame.weHaveaWinner){
            newGame.counter--;
        }
        else if(newGame.counter === 9){//the game has ended and it is a DRAW
         //trigger the modal DIV, this is just for a winner game
            let modalDiv = document.getElementById('modal');
            modalDiv.setAttribute('class','visible');
            modalDiv.firstElementChild.firstElementChild.textContent = 'It\'s a DRAW';//H1
             modalDiv.firstElementChild.firstElementChild.nextElementSibling.textContent = 'Let\'s take a rematch';//p
        }
    }
            
    else if(object.tagName === 'BUTTON'){                
        location.reload();            
    }
    
});

function Draw(table){
    table.setAttribute('class','viewTable');
};//its for SVG for painting the table and the black board...
function Modify(index){//set the variable to make a move
    //modify the boolean array, to say this position is not available anymore
    newGame.availableMoveBoolean[index] = false;
    newGame.moves[index] = newGame.counter;
    newGame.counter++;//changing the player
};
/*
function Eliminator(){//here we are eliminating all the solutions that aren't possible anymore
    for(let i = 0; i < newGame.solutions.length; i++){
            let trues = 0;//positions available
            let evens =0 ;//all the X moves
            let odds = 0;//all the O moves
            for(let j = 0; j< 3; j++){
                //if we JUST found one position which is free => trues go up
                if(newGame.availableMoveBoolean[newGame.solutions[i][j]]){trues++;}
                //if it's taken; let's check if it's evens or odds
                else{
                    if(newGame.moves[newGame.solutions[i][j]] % 2 === 0 ) {//if it's EVEN
                        evens++;
                    }
                    else{
                        odds++;
                    }
                }
            }
            //if even=3 or odds=3 we have a winner
            if(evens === 3 || odds === 3){
                newGame.weHaveaWinner = true;//if we have a winner this one always's gonna be the last player, NOT the current player
                break;
            }
            if(trues>1){//we must keep looking, cuz this one is still a solution

            }
            if((odds ===2 && trues === 1) || (evens ===2 && trues ===1)){

            }
            else{
                //destroy
                newGame.solutionBoolean[i] = false;//this is no longer a winning solution
                //new solution. I am going to delete the array which is no longer a solution
                newGame.solutions.splice(i,1);
                i--;//i think 'i' should decrease cuz in other way I'll jump one position...<=====

            }
        }
    };*/
function EliminatorII(index,object){
    console.log('I am inside EliminatorII');
    for(let i = 0; i < newGame.solutions.length; i++){
        if(WeArePartOfTheSolution(index,newGame.solutions[i])){
            let trues = 0;
            let evens =0 ;
            let odds = 0;
            for(let j = 0; j< 3; j++){
                //if we found one position which is taken we cannot delete that solution
                if(newGame.availableMoveBoolean[newGame.solutions[i][j]]){trues++;}
                else{
                    if(newGame.moves[newGame.solutions[i][j]] % 2 === 0 ) {//if it's EVEN
                        evens++;
                    }
                    else{
                        odds++;
                    }
                }
                if(odds === 3 || evens === 3){
                    newGame.theWinnerMove = newGame.solutions[i];
                    newGame.weHaveaWinner = true;
                    ShowMeTheWinner(object,newGame.theWinnerMove);
                    break;
                }
                ///we can get the winner move in HERE, the variable will have tha information is gonna be 'i' from the for()
                //and you can place it in a variable.
            }
               //if even=3 or odds=3 we have a winner
            /*if(evens === 3 || odds === 3){
                newGame.weHaveaWinner = true;//if we have a winner this one always's gonna be the last player, NOT the current player
                break;
            }*/
            if(trues>1){//we must keep looking, cuz this one is still a solution
                continue;
            }
            else if((odds ===2 && trues === 1) || (evens ===2 && trues ===1)){
                continue;
            }
            else{
                //DESTROY
                //new solution. I am going to delete the array which is no longer a solution
                newGame.solutions.splice(i,1);
                i--;//i think 'i' should decrease cuz in other way I'll jump one position...<=====

            }
        }
            
        }
        console.log('I left EliminatorII');
    }

function MakeAmove(index,object){
    //here we'll check in which condition we're now, and that information is in the counter variable
    //if counter is les than 4 we are at the beginning of the game, the only thing we can do is call Modifier
    //if counter is equal 4, the posibilities to have a winner are bigger so we Modify(), and we need to check how many posibilities we have lost with Eliminatior()
    //if counter is more than 4 we modify and also check EliminatorII() to delete all the posibilities we have lost and see if we have a winning move    
    if(newGame.counter < 3){
        Modify(index);
    }
    else if(newGame.counter === 3){
        Modify(index);
        EliminatorII(index,object);
    }
    else{
        Modify(index);
        EliminatorII(index,object);
    }
    
};
       
function WeArePartOfTheSolution(index,array){//this function will check if the square clicked is part of one of the possible solutions
    return array.includes(index);
}
function ShowMeTheWinner(object,array){//this function is gonna resize the winner move and also trigger the modal div
    for(let i = 0; i<array.length; i++){
        let aux = document.getElementById(array[i]);
        if((newGame.counter-1) % 2 ===0){
            aux.nextElementSibling.setAttribute('class','winnerSquare');
        }
        else{
            aux.nextElementSibling.nextElementSibling.setAttribute('class','winnerSquare');
        }
    }
    //trigger the modal DIV, this is just for a winner game
    let modalDiv = document.getElementById('modal');
    modalDiv.setAttribute('class','visible');
    modalDiv.firstElementChild.firstElementChild.textContent = 'We have a winner';//H1
    if((newGame.counter-1) % 2 ===0){
        modalDiv.firstElementChild.firstElementChild.nextElementSibling.textContent = 'Congratulation to X\'s, you have won the game.';//p
    }
    else{
        modalDiv.firstElementChild.firstElementChild.nextElementSibling.textContent = 'Congratulation to O\'s, you have won the game.';//p
    }
}
       
       
       
       
       
       