//Initializes starting position of black pieces
var startingTilesBlack = document.getElementsByClassName("lowRow gTile")


for(var i = 0; i < startingTilesBlack.length; i++)
{
    startingTilesBlack[i].classList.add("hasPiece");
    
    var newBPiece = document.createElement("div");
    var imageBlack = document.createElement("img");

    newBPiece.classList.add("bPiece");
    newBPiece.appendChild(imageBlack);

    imageBlack.classList.add("bCrown");
    imageBlack.classList.add("invisibleCrown");
    imageBlack.src = "images/blackCrown.png"


    startingTilesBlack[i].appendChild(newBPiece);
}

//Initializes starting position of red pieces
var startingTilesRed = document.getElementsByClassName("highRow gTile");

for(var i = 0; i < startingTilesRed.length; i++)
{
    startingTilesRed[i].classList.add("hasPiece");

    var newRPiece = document.createElement("div");
    var imageRed = document.createElement("img");

    newRPiece.classList.add("rPiece");
    newRPiece.appendChild(imageRed);

    imageRed.classList.add("rCrown");
    imageRed.classList.add("invisibleCrown");
    imageRed.src = "images/redCrown.jpg"


    startingTilesRed[i].appendChild(newRPiece);
}

//Below, gives all the tiles without the "hasPiece" class, the "noPiece" class
var allTiles = document.getElementsByClassName("gTile");
for(var i = 0; i < allTiles.length; i++)
{
    if(!allTiles[i].classList.contains("hasPiece"))
        allTiles[i].classList.add("noPiece");
}



//Everything above this comment is starting conditions


var socket = io();

var theRedPlayer;
var theBlackPlayer;


socket.on("assignPlayers", function(clients)
{
    if(clients[0] == socket.id)
        theRedPlayer = socket.id;
    else 
        theBlackPlayer = socket.id;

    if(theRedPlayer == socket.id)
        playRedTurn();
});



socket.on("blackNkingNcapture", function(boardChanges)
{
    let thePieceToMove = document.getElementById(boardChanges.id1).firstElementChild;
    let theTileToMoveTo = document.getElementById(boardChanges.id2);

    thePieceToMove.parentElement.classList.remove("hasPiece");
    thePieceToMove.parentElement.classList.add("noPiece");
    thePieceToMove.parentElement.removeChild(thePieceToMove);

    theTileToMoveTo.classList.remove("noPiece");
    theTileToMoveTo.classList.add("hasPiece");
    theTileToMoveTo.appendChild(thePieceToMove);

    if(theTileToMoveTo.classList.contains("topRow"))
        thePieceToMove.firstElementChild.classList.remove("invisibleCrown");
    playRedTurn();
});
socket.on("blackNkingCaptureLeft", function(boardChanges)
{
    let thePieceToMove = document.getElementById(boardChanges.id1).firstElementChild;
    let theTileToMoveTo = document.getElementById(boardChanges.id2);
    let IdOfTile = document.getElementById(boardChanges.id3).id;

    document.getElementById(IdOfTile).firstElementChild.remove();
    document.getElementById(IdOfTile).classList.remove("hasPiece");
    document.getElementById(IdOfTile).classList.add("noPiece");

    thePieceToMove.parentElement.classList.remove("hasPiece");
    thePieceToMove.parentElement.classList.add("noPiece");
    thePieceToMove.parentElement.removeChild(thePieceToMove);

    theTileToMoveTo.classList.remove("noPiece");
    theTileToMoveTo.classList.add("hasPiece");
    theTileToMoveTo.appendChild(thePieceToMove);

    if(theTileToMoveTo.classList.contains("topRow"))
        thePieceToMove.firstElementChild.classList.remove("invisibleCrown");

    if(document.getElementsByClassName("rPiece").length < 1)
    {
        var turnInfo = document.getElementsByClassName("gameInstructions")[0];
        turnInfo.textContent = "Black has won!!";

        document.querySelectorAll(".bPiece").forEach(function(piece)
        {
            piece.removeEventListener("click", pieceListenerMethodBlack);
        });
        document.querySelectorAll(".noPiece").forEach(function(tile)
        {
            tile.removeEventListener("click", tileListenerMethodBlack);
        }); 
    }   
    else 
        playRedTurn();
});
socket.on("blackNkingCaptureRight", function(boardChanges)
{
    let thePieceToMove = document.getElementById(boardChanges.id1).firstElementChild;
    let theTileToMoveTo = document.getElementById(boardChanges.id2);
    let IdOfTile = document.getElementById(boardChanges.id3).id;

    document.getElementById(IdOfTile).firstElementChild.remove();
    document.getElementById(IdOfTile).classList.remove("hasPiece");
    document.getElementById(IdOfTile).classList.add("noPiece");

    thePieceToMove.parentElement.classList.remove("hasPiece");
    thePieceToMove.parentElement.classList.add("noPiece");
    thePieceToMove.parentElement.removeChild(thePieceToMove);

    theTileToMoveTo.classList.remove("noPiece");
    theTileToMoveTo.classList.add("hasPiece");
    theTileToMoveTo.appendChild(thePieceToMove);

    if(theTileToMoveTo.classList.contains("topRow"))
        thePieceToMove.firstElementChild.classList.remove("invisibleCrown");

    if(document.getElementsByClassName("rPiece").length < 1)
    {
        var turnInfo = document.getElementsByClassName("gameInstructions")[0];
        turnInfo.textContent = "Black has won!!";

        document.querySelectorAll(".bPiece").forEach(function(piece)
        {
            piece.removeEventListener("click", pieceListenerMethodBlack);
        });
        document.querySelectorAll(".noPiece").forEach(function(tile)
        {
            tile.removeEventListener("click", tileListenerMethodBlack);
        }); 
    } 
    else
        playRedTurn();
});
socket.on("blackKingNcapture", function(boardChanges)
{
    let thePieceToMove = document.getElementById(boardChanges.id1).firstElementChild;
    let theTileToMoveTo = document.getElementById(boardChanges.id2);

    thePieceToMove.parentElement.classList.remove("hasPiece");
    thePieceToMove.parentElement.classList.add("noPiece");
    thePieceToMove.parentElement.removeChild(thePieceToMove);

    theTileToMoveTo.classList.remove("noPiece");
    theTileToMoveTo.classList.add("hasPiece");
    theTileToMoveTo.appendChild(thePieceToMove);

    if(theTileToMoveTo.classList.contains("topRow"))
        thePieceToMove.firstElementChild.classList.remove("invisibleCrown");

    playRedTurn();
});
socket.on("blackKingCaptureUpLeft", function(boardChanges)
{
    let thePieceToMove = document.getElementById(boardChanges.id1).firstElementChild;
    let theTileToMoveTo = document.getElementById(boardChanges.id2);
    let IdOfTile = document.getElementById(boardChanges.id3).id;

    document.getElementById(IdOfTile).firstElementChild.remove();
    document.getElementById(IdOfTile).classList.remove("hasPiece");
    document.getElementById(IdOfTile).classList.add("noPiece");

    thePieceToMove.parentElement.classList.remove("hasPiece");
    thePieceToMove.parentElement.classList.add("noPiece");
    thePieceToMove.parentElement.removeChild(thePieceToMove);

    theTileToMoveTo.classList.remove("noPiece");
    theTileToMoveTo.classList.add("hasPiece");
    theTileToMoveTo.appendChild(thePieceToMove);

    if(theTileToMoveTo.classList.contains("topRow"))
        thePieceToMove.firstElementChild.classList.remove("invisibleCrown");
    
    if(document.getElementsByClassName("rPiece").length < 1)
    {
        var turnInfo = document.getElementsByClassName("gameInstructions")[0];
        turnInfo.textContent = "Black has won!!";

        document.querySelectorAll(".bPiece").forEach(function(piece)
        {
            piece.removeEventListener("click", pieceListenerMethodBlack);
        });
        document.querySelectorAll(".noPiece").forEach(function(tile)
        {
            tile.removeEventListener("click", tileListenerMethodBlack);
        }); 
    }  
    else
        playRedTurn();
});
socket.on("blackKingCaptureUpRight", function(boardChanges)
{
    let thePieceToMove = document.getElementById(boardChanges.id1).firstElementChild;
    let theTileToMoveTo = document.getElementById(boardChanges.id2);
    let IdOfTile = document.getElementById(boardChanges.id3).id;

    document.getElementById(IdOfTile).firstElementChild.remove();
    document.getElementById(IdOfTile).classList.remove("hasPiece");
    document.getElementById(IdOfTile).classList.add("noPiece");

    thePieceToMove.parentElement.classList.remove("hasPiece");
    thePieceToMove.parentElement.classList.add("noPiece");
    thePieceToMove.parentElement.removeChild(thePieceToMove);

    theTileToMoveTo.classList.remove("noPiece");
    theTileToMoveTo.classList.add("hasPiece");
    theTileToMoveTo.appendChild(thePieceToMove);

    if(theTileToMoveTo.classList.contains("topRow"))
        thePieceToMove.firstElementChild.classList.remove("invisibleCrown");
    
    if(document.getElementsByClassName("rPiece").length < 1)
    {
        var turnInfo = document.getElementsByClassName("gameInstructions")[0];
        turnInfo.textContent = "Black has won!!";

        document.querySelectorAll(".bPiece").forEach(function(piece)
        {
            piece.removeEventListener("click", pieceListenerMethodBlack);
        });
        document.querySelectorAll(".noPiece").forEach(function(tile)
        {
            tile.removeEventListener("click", tileListenerMethodBlack);
        }); 
    }  
    else
        playRedTurn();
});
socket.on("blackKingCaptureDownRight", function(boardChanges)
{
    let thePieceToMove = document.getElementById(boardChanges.id1).firstElementChild;
    let theTileToMoveTo = document.getElementById(boardChanges.id2);
    let IdOfTile = document.getElementById(boardChanges.id3).id;

    document.getElementById(IdOfTile).firstElementChild.remove();
    document.getElementById(IdOfTile).classList.remove("hasPiece");
    document.getElementById(IdOfTile).classList.add("noPiece");

    thePieceToMove.parentElement.classList.remove("hasPiece");
    thePieceToMove.parentElement.classList.add("noPiece");
    thePieceToMove.parentElement.removeChild(thePieceToMove);

    theTileToMoveTo.classList.remove("noPiece");
    theTileToMoveTo.classList.add("hasPiece");
    theTileToMoveTo.appendChild(thePieceToMove);

    if(theTileToMoveTo.classList.contains("topRow"))
        thePieceToMove.firstElementChild.classList.remove("invisibleCrown");

    if(document.getElementsByClassName("rPiece").length < 1)
    {
        var turnInfo = document.getElementsByClassName("gameInstructions")[0];
        turnInfo.textContent = "Black has won!!";

        document.querySelectorAll(".bPiece").forEach(function(piece)
        {
            piece.removeEventListener("click", pieceListenerMethodBlack);
        });
        document.querySelectorAll(".noPiece").forEach(function(tile)
        {
            tile.removeEventListener("click", tileListenerMethodBlack);
        }); 
    }   
    else
        playRedTurn();
});
socket.on("blackKingCaptureDownLeft", function(boardChanges)
{
    let thePieceToMove = document.getElementById(boardChanges.id1).firstElementChild;
    let theTileToMoveTo = document.getElementById(boardChanges.id2);
    let IdOfTile = document.getElementById(boardChanges.id3).id;

    document.getElementById(IdOfTile).firstElementChild.remove();
    document.getElementById(IdOfTile).classList.remove("hasPiece");
    document.getElementById(IdOfTile).classList.add("noPiece");

    thePieceToMove.parentElement.classList.remove("hasPiece");
    thePieceToMove.parentElement.classList.add("noPiece");
    thePieceToMove.parentElement.removeChild(thePieceToMove);

    theTileToMoveTo.classList.remove("noPiece");
    theTileToMoveTo.classList.add("hasPiece");
    theTileToMoveTo.appendChild(thePieceToMove);

    if(theTileToMoveTo.classList.contains("topRow"))
        thePieceToMove.firstElementChild.classList.remove("invisibleCrown");
    
    if(document.getElementsByClassName("rPiece").length < 1)
    {
        var turnInfo = document.getElementsByClassName("gameInstructions")[0];
        turnInfo.textContent = "Black has won!!";

        document.querySelectorAll(".bPiece").forEach(function(piece)
        {
            piece.removeEventListener("click", pieceListenerMethodBlack);
        });
        document.querySelectorAll(".noPiece").forEach(function(tile)
        {
            tile.removeEventListener("click", tileListenerMethodBlack);
        }); 
    }
    else
        playRedTurn();
});
socket.on("redNkingNcapture", function(boardChanges)
{
    let thePieceToMove = document.getElementById(boardChanges.id1).firstElementChild;
    let theTileToMoveTo = document.getElementById(boardChanges.id2);

    thePieceToMove.parentElement.classList.remove("hasPiece");
    thePieceToMove.parentElement.classList.add("noPiece");
    thePieceToMove.parentElement.removeChild(thePieceToMove);

    theTileToMoveTo.classList.remove("noPiece");
    theTileToMoveTo.classList.add("hasPiece");
    theTileToMoveTo.appendChild(thePieceToMove);

    thePieceToMove.parentElement.classList.remove("hasPiece");
    thePieceToMove.parentElement.classList.add("noPiece");
    thePieceToMove.parentElement.removeChild(thePieceToMove);

    theTileToMoveTo.classList.remove("noPiece");
    theTileToMoveTo.classList.add("hasPiece");
    theTileToMoveTo.appendChild(thePieceToMove);

    if(theTileToMoveTo.classList.contains("botRow"))
        thePieceToMove.firstElementChild.classList.remove("invisibleCrown");
    playBlackTurn();
});
socket.on("redNkingCaptureLeft", function(boardChanges)
{
    let thePieceToMove = document.getElementById(boardChanges.id1).firstElementChild;
    let theTileToMoveTo = document.getElementById(boardChanges.id2);
    let IdOfTile = document.getElementById(boardChanges.id3).id;

    document.getElementById(IdOfTile).firstElementChild.remove();
    document.getElementById(IdOfTile).classList.remove("hasPiece");
    document.getElementById(IdOfTile).classList.add("noPiece");    

    thePieceToMove.parentElement.classList.remove("hasPiece");
    thePieceToMove.parentElement.classList.add("noPiece");
    thePieceToMove.parentElement.removeChild(thePieceToMove);

    theTileToMoveTo.classList.remove("noPiece");
    theTileToMoveTo.classList.add("hasPiece");
    theTileToMoveTo.appendChild(thePieceToMove);

    if(theTileToMoveTo.classList.contains("topRow"))
        thePieceToMove.firstElementChild.classList.remove("invisibleCrown");
        
    if(document.getElementsByClassName("bPiece").length < 1)
    {
        var turnInfo = document.getElementsByClassName("gameInstructions")[0];
        turnInfo.textContent = "Red has won!!";

        document.querySelectorAll(".rPiece").forEach(function(piece)
        {
            piece.removeEventListener("click", pieceListenerMethodRed);
        });
        document.querySelectorAll(".noPiece").forEach(function(tile)
        {
            tile.removeEventListener("click", tileListenerMethodRed);
        });
    }   
    else
        playBlackTurn();
});
socket.on("redNkingCaptureRight", function(boardChanges)
{
    let thePieceToMove = document.getElementById(boardChanges.id1).firstElementChild;
    let theTileToMoveTo = document.getElementById(boardChanges.id2);
    let IdOfTile = document.getElementById(boardChanges.id3).id;
    document.getElementById(IdOfTile).firstElementChild.remove();
    document.getElementById(IdOfTile).classList.remove("hasPiece");
    document.getElementById(IdOfTile).classList.add("noPiece");

    thePieceToMove.parentElement.classList.remove("hasPiece");
    thePieceToMove.parentElement.classList.add("noPiece");
    thePieceToMove.parentElement.removeChild(thePieceToMove);

    theTileToMoveTo.classList.remove("noPiece");
    theTileToMoveTo.classList.add("hasPiece");
    theTileToMoveTo.appendChild(thePieceToMove);

    if(theTileToMoveTo.classList.contains("botRow"))
        thePieceToMove.firstElementChild.classList.remove("invisibleCrown");
    
    if(document.getElementsByClassName("bPiece").length < 1)
    {
        var turnInfo = document.getElementsByClassName("gameInstructions")[0];
        turnInfo.textContent = "Red has won!!";

        document.querySelectorAll(".rPiece").forEach(function(piece)
        {
            piece.removeEventListener("click", pieceListenerMethodRed);
        });
        document.querySelectorAll(".noPiece").forEach(function(tile)
        {
            tile.removeEventListener("click", tileListenerMethodRed);
        }); 
    }   
    else
        playBlackTurn();
});
socket.on("redKingNcapture", function(boardChanges)
{
    let thePieceToMove = document.getElementById(boardChanges.id1).firstElementChild;
    let theTileToMoveTo = document.getElementById(boardChanges.id2);

    thePieceToMove.parentElement.classList.remove("hasPiece");
    thePieceToMove.parentElement.classList.add("noPiece");
    thePieceToMove.parentElement.removeChild(thePieceToMove);

    theTileToMoveTo.classList.remove("noPiece");
    theTileToMoveTo.classList.add("hasPiece");
    theTileToMoveTo.appendChild(thePieceToMove);

    if(theTileToMoveTo.classList.contains("botRow"))
        thePieceToMove.firstElementChild.classList.remove("invisibleCrown");

    if(document.getElementsByClassName("bPiece").length < 1)
    {
        var turnInfo = document.getElementsByClassName("gameInstructions")[0];
        turnInfo.textContent = "Red has won!!";

        document.querySelectorAll(".rPiece").forEach(function(piece)
        {
            piece.removeEventListener("click", pieceListenerMethodRed);
        });
        document.querySelectorAll(".noPiece").forEach(function(tile)
        {
            tile.removeEventListener("click", tileListenerMethodRed);
        });
    }  
    else
        playBlackTurn();
});
socket.on("redKingCaptureDownLeft", function(boardChanges)
{
    let thePieceToMove = document.getElementById(boardChanges.id1).firstElementChild;
    let theTileToMoveTo = document.getElementById(boardChanges.id2);
    let IdOfTile = document.getElementById(boardChanges.id3).id;

    document.getElementById(IdOfTile).firstElementChild.remove();
    document.getElementById(IdOfTile).classList.remove("hasPiece");
    document.getElementById(IdOfTile).classList.add("noPiece");

    thePieceToMove.parentElement.classList.remove("hasPiece");
    thePieceToMove.parentElement.classList.add("noPiece");
    thePieceToMove.parentElement.removeChild(thePieceToMove);

    theTileToMoveTo.classList.remove("noPiece");
    theTileToMoveTo.classList.add("hasPiece");
    theTileToMoveTo.appendChild(thePieceToMove);

    if(theTileToMoveTo.classList.contains("botRow"))
        thePieceToMove.firstElementChild.classList.remove("invisibleCrown");
    
    if(document.getElementsByClassName("bPiece").length < 1)
    {
        var turnInfo = document.getElementsByClassName("gameInstructions")[0];
        turnInfo.textContent = "Red has won!!";

        document.querySelectorAll(".rPiece").forEach(function(piece)
        {
            piece.removeEventListener("click", pieceListenerMethodRed);
        });
        document.querySelectorAll(".noPiece").forEach(function(tile)
        {
            tile.removeEventListener("click", tileListenerMethodRed);
        });
    }  
    else
        playBlackTurn();
});
socket.on("redKingCaptureDownRight", function(boardChanges)
{
    let thePieceToMove = document.getElementById(boardChanges.id1).firstElementChild;
    let theTileToMoveTo = document.getElementById(boardChanges.id2);
    let IdOfTile = document.getElementById(boardChanges.id3).id;

    document.getElementById(IdOfTile).firstElementChild.remove();
    document.getElementById(IdOfTile).classList.remove("hasPiece");
    document.getElementById(IdOfTile).classList.add("noPiece");

    thePieceToMove.parentElement.classList.remove("hasPiece");
    thePieceToMove.parentElement.classList.add("noPiece");
    thePieceToMove.parentElement.removeChild(thePieceToMove);

    theTileToMoveTo.classList.remove("noPiece");
    theTileToMoveTo.classList.add("hasPiece");
    theTileToMoveTo.appendChild(thePieceToMove);

    if(theTileToMoveTo.classList.contains("botRow"))
        thePieceToMove.firstElementChild.classList.remove("invisibleCrown");
    
    if(document.getElementsByClassName("bPiece").length < 1)
    {
        var turnInfo = document.getElementsByClassName("gameInstructions")[0];
        turnInfo.textContent = "Red has won!!";

        document.querySelectorAll(".rPiece").forEach(function(piece)
        {
            piece.removeEventListener("click", pieceListenerMethodRed);
        });
        document.querySelectorAll(".noPiece").forEach(function(tile)
        {
            tile.removeEventListener("click", tileListenerMethodRed);
        });
    }  
    else
        playBlackTurn();

});
socket.on("redKingCaptureUpLeft", function(boardChanges)
{
    let thePieceToMove = document.getElementById(boardChanges.id1).firstElementChild;
    let theTileToMoveTo = document.getElementById(boardChanges.id2);
    let IdOfTile = document.getElementById(boardChanges.id3).id;

    document.getElementById(IdOfTile).firstElementChild.remove();
    document.getElementById(IdOfTile).classList.remove("hasPiece");
    document.getElementById(IdOfTile).classList.add("noPiece");

    thePieceToMove.parentElement.classList.remove("hasPiece");
    thePieceToMove.parentElement.classList.add("noPiece");
    thePieceToMove.parentElement.removeChild(thePieceToMove);

    theTileToMoveTo.classList.remove("noPiece");
    theTileToMoveTo.classList.add("hasPiece");
    theTileToMoveTo.appendChild(thePieceToMove);

    if(theTileToMoveTo.classList.contains("botRow"))
        thePieceToMove.firstElementChild.classList.remove("invisibleCrown");
    
    if(document.getElementsByClassName("bPiece").length < 1)
    {
        var turnInfo = document.getElementsByClassName("gameInstructions")[0];
        turnInfo.textContent = "Red has won!!";

        document.querySelectorAll(".rPiece").forEach(function(piece)
        {
            piece.removeEventListener("click", pieceListenerMethodRed);
        });
        document.querySelectorAll(".noPiece").forEach(function(tile)
        {
            tile.removeEventListener("click", tileListenerMethodRed);
        });
    } 
    else
        playBlackTurn();
});
socket.on("redKingCaptureUpRight", function(boardChanges)
{
    let thePieceToMove = document.getElementById(boardChanges.id1).firstElementChild;
    let theTileToMoveTo = document.getElementById(boardChanges.id2);
    let IdOfTile = document.getElementById(boardChanges.id3).id;

    document.getElementById(IdOfTile).firstElementChild.remove();
    document.getElementById(IdOfTile).classList.remove("hasPiece");
    document.getElementById(IdOfTile).classList.add("noPiece");

    thePieceToMove.parentElement.classList.remove("hasPiece");
    thePieceToMove.parentElement.classList.add("noPiece");
    thePieceToMove.parentElement.removeChild(thePieceToMove);

    theTileToMoveTo.classList.remove("noPiece");
    theTileToMoveTo.classList.add("hasPiece");
    theTileToMoveTo.appendChild(thePieceToMove);

    if(theTileToMoveTo.classList.contains("botRow"))
        thePieceToMove.firstElementChild.classList.remove("invisibleCrown");
    
    if(document.getElementsByClassName("bPiece").length < 1)
    {
        var turnInfo = document.getElementsByClassName("gameInstructions")[0];
        turnInfo.textContent = "Red has won!!";

        document.querySelectorAll(".rPiece").forEach(function(piece)
        {
            piece.removeEventListener("click", pieceListenerMethodRed);
        });
        document.querySelectorAll(".noPiece").forEach(function(tile)
        {
            tile.removeEventListener("click", tileListenerMethodRed);
        });
    } 
    else
        playBlackTurn();
});

function playRedTurn()
{
    var turnInfo = document.getElementsByClassName("gameInstructions")[0];
    turnInfo.classList.remove("b");
    turnInfo.classList.add("r");
    turnInfo.textContent = "It's red's turn";

    document.querySelectorAll(".bPiece").forEach(function(piece)
    {
        piece.removeEventListener("click", pieceListenerMethodBlack);
    });
    document.querySelectorAll(".noPiece").forEach(function(tile)
    {
        tile.removeEventListener("click", tileListenerMethodBlack);
    });

    if(theRedPlayer == socket.id) // will only add listeners for the correct client
    {
        document.querySelectorAll(".rPiece").forEach(function(piece)
        {
            piece.addEventListener("click", pieceListenerMethodRed)
        });   
    }
}
function playBlackTurn()
{
    var turnInfo = document.getElementsByClassName("gameInstructions")[0];
    turnInfo.classList.remove("r");
    turnInfo.classList.add("b");
    turnInfo.textContent = "It's black's turn";

    document.querySelectorAll(".rPiece").forEach(function(piece)
    {
        piece.removeEventListener("click", pieceListenerMethodRed);
    });
    document.querySelectorAll(".noPiece").forEach(function(tile)
    {
        tile.removeEventListener("click", tileListenerMethodRed);
    });

    if(theBlackPlayer == socket.id)
    {
        document.querySelectorAll(".bPiece").forEach(function(piece)
        {
            piece.addEventListener("click", pieceListenerMethodBlack)
        });
    }
}



function tileListenerMethodBlack()
{
    theTileToMoveTo = this; 


    var colOfTile = parseInt(theTileToMoveTo.id.substring(0,1));
    var rowofTile = parseInt(theTileToMoveTo.id.substring(1));
    var colOfPiece = parseInt(thePieceToMove.parentElement.id.substring(0,1));
    var rowOfPiece = parseInt(thePieceToMove.parentElement.id.substring(1));

    var style = getComputedStyle(thePieceToMove.firstElementChild);
    if(style.visibility === "hidden")
    {
        switch((rowofTile - rowOfPiece))
        {
            case -1:
                {
                    if((colOfTile === (colOfPiece - 1) || colOfTile === (colOfPiece + 1)) && theTileToMoveTo.classList.contains("noPiece"))
                    {
                        let boardChanges = {
                            id1: thePieceToMove.parentElement.id,
                            id2: theTileToMoveTo.id
                        }
                        socket.emit("blackNkingNcapture", boardChanges);
                    }
                    break;
                }
                
            case -2:
                {
                    if((colOfTile === (colOfPiece - 2)) && theTileToMoveTo.classList.contains("noPiece"))
                    {   
                        var rowOfPotentialRed = rowOfPiece - 1;
                        var colOfPotentialRed = colOfPiece - 1;
                        var IdOfTile = colOfPotentialRed.toString() + rowOfPotentialRed.toString();
                        if(document.getElementById(IdOfTile).firstElementChild.classList.contains("rPiece"))
                        {
                            let boardChanges = {
                                id1: thePieceToMove.parentElement.id,
                                id2: theTileToMoveTo.id,
                                id3: IdOfTile
                            }
                            socket.emit("blackNkingCaptureLeft", boardChanges);
                        }
                        break;
                    }
                    //else if((colOfTile === (colOfPiece + 2))) //&& check if the tile in between has a black piece)
                    else if((colOfTile === (colOfPiece + 2)))
                    {
                        var rowOfPotentialRed = rowOfPiece - 1;
                        var colOfPotentialRed = colOfPiece + 1;
                        var IdOfTile = colOfPotentialRed.toString() + rowOfPotentialRed.toString();
                        if(document.getElementById(IdOfTile).firstElementChild.classList.contains("rPiece"))
                        {
                            let boardChanges = {
                                id1: thePieceToMove.parentElement.id,
                                id2: theTileToMoveTo.id,
                                id3: IdOfTile
                            }
                            socket.emit("blackNkingCaptureRight", boardChanges);
                        }
                        break;
                    }
                    break;
                } 
        }
    }
    else
    {
        switch((rowofTile - rowOfPiece))
        {
            case 1:
                {
                    if((colOfTile === (colOfPiece - 1) || colOfTile === (colOfPiece + 1)) && theTileToMoveTo.classList.contains("noPiece"))
                    {
                        let boardChanges = {
                            id1: thePieceToMove.parentElement.id,
                            id2: theTileToMoveTo.id,
                            id3: IdOfTile
                        }
                        socket.emit("blackKingNcapture", boardChanges);
                    }
                    break;
                }
            case -1:
            {
                if((colOfTile === (colOfPiece - 1) || colOfTile === (colOfPiece + 1)) && theTileToMoveTo.classList.contains("noPiece"))
                {
                    let boardChanges = {
                        id1: thePieceToMove.parentElement.id,
                        id2: theTileToMoveTo.id,
                        id3: IdOfTile
                    }
                    socket.emit("blackKingNcapture", boardChanges);
                }
                break;
            }
            case 2:
                {
                    if((colOfTile === (colOfPiece - 2)) && theTileToMoveTo.classList.contains("noPiece"))
                    {
                        var rowOfPotentialRed = rowOfPiece + 1;
                        var colOfPotentialRed = colOfPiece - 1;
                        var IdOfTile = colOfPotentialRed.toString() + rowOfPotentialRed.toString();
                        if(document.getElementById(IdOfTile).firstElementChild.classList.contains("rPiece"))
                        {
                            let boardChanges = {
                                id1: thePieceToMove.parentElement.id,
                                id2: theTileToMoveTo.id,
                                id3: IdOfTile
                            }
                            socket.emit("blackKingCaptureUpLeft", boardChanges);
                        }
                        break;
                    }
                    //else if((colOfTile === (colOfPiece + 2))) //&& check if the tile in between has a black piece)
                    else if((colOfTile === (colOfPiece + 2)))
                    {
                        var rowOfPotentialRed = rowOfPiece + 1;
                        var colOfPotentialRed = colOfPiece + 1;
                        var IdOfTile = colOfPotentialRed.toString() + rowOfPotentialRed.toString();
                        if(document.getElementById(IdOfTile).firstElementChild.classList.contains("rPiece"))
                        {
                            let boardChanges = {
                                id1: thePieceToMove.parentElement.id,
                                id2: theTileToMoveTo.id,
                                id3: IdOfTile
                            }
                            socket.emit("blackKingCaptureUpRight", boardChanges);
                        }
                        break;
                    }
                    
                }
            case -2:
                {
                    if((colOfTile === (colOfPiece - 2)))
                    {
                        var rowOfPotentialRed = rowOfPiece - 1;
                        var colOfPotentialRed = colOfPiece - 1;
                        var IdOfTile = colOfPotentialRed.toString() + rowOfPotentialRed.toString();
                        if(document.getElementById(IdOfTile).firstElementChild.classList.contains("rPiece"))
                        {
                            let boardChanges = {
                                id1: thePieceToMove.parentElement.id,
                                id2: theTileToMoveTo.id,
                                id3: IdOfTile
                            }
                            socket.emit("blackKingCaptureDownLeft", boardChanges);
                        }
                        break;
                    }
                    else if((colOfTile === (colOfPiece + 2)))
                    {
                        var rowOfPotentialRed = rowOfPiece - 1;
                        var colOfPotentialRed = colOfPiece + 1;
                        var IdOfTile = colOfPotentialRed.toString() + rowOfPotentialRed.toString();
                        if(document.getElementById(IdOfTile).firstElementChild.classList.contains("rPiece"))
                        {
                            let boardChanges = {
                                id1: thePieceToMove.parentElement.id,
                                id2: theTileToMoveTo.id,
                                id3: IdOfTile
                            }
                            socket.emit("blackKingCaptureDownRight", boardChanges);
                        }
                        break;
                    }
                    break;   
                }
        }
    }
}
function tileListenerMethodRed()
{
    theTileToMoveTo = this; 


    var colOfTile = parseInt(theTileToMoveTo.id.substring(0,1));
    var rowofTile = parseInt(theTileToMoveTo.id.substring(1));
    var colOfPiece = parseInt(thePieceToMove.parentElement.id.substring(0,1));
    var rowOfPiece = parseInt(thePieceToMove.parentElement.id.substring(1));

    var style = getComputedStyle(thePieceToMove.firstElementChild);
    if(style.visibility === "hidden")
    {
        switch((rowofTile - rowOfPiece))
        {
            case 1:
                {
                    if((colOfTile === (colOfPiece - 1) || colOfTile === (colOfPiece + 1)) && theTileToMoveTo.classList.contains("noPiece"))
                    {
                        let boardChanges = {
                            id1: thePieceToMove.parentElement.id,
                            id2: theTileToMoveTo.id
                        }
                        socket.emit("redNkingNcapture", boardChanges);              
                    }
                    break;
                }
                case 2:
                {
                    if((colOfTile === (colOfPiece - 2)) && theTileToMoveTo.classList.contains("noPiece"))
                    {
                        var rowOfPotentialRed = rowOfPiece + 1;
                        var colOfPotentialRed = colOfPiece - 1;
                        var IdOfTile = colOfPotentialRed.toString() + rowOfPotentialRed.toString();
                        if(document.getElementById(IdOfTile).firstElementChild.classList.contains("bPiece"))
                        {
                            let boardChanges = {
                                id1: thePieceToMove.parentElement.id,
                                id2: theTileToMoveTo.id,
                                id3: IdOfTile
                            }
                            socket.emit("redNkingCaptureLeft", boardChanges);  
                        }
                        break;
                    }
                        //else if((colOfTile === (colOfPiece + 2))) //&& check if the tile in between has a black piece)
                    else if((colOfTile === (colOfPiece + 2)))
                    {
                        var rowOfPotentialRed = rowOfPiece + 1;
                        var colOfPotentialRed = colOfPiece + 1;
                        var IdOfTile = colOfPotentialRed.toString() + rowOfPotentialRed.toString();
                        if(document.getElementById(IdOfTile).firstElementChild.classList.contains("bPiece"))
                        {
                            let boardChanges = {
                                id1: thePieceToMove.parentElement.id,
                                id2: theTileToMoveTo.id,
                                id3: IdOfTile
                            }
                            socket.emit("redNkingCaptureRight", boardChanges);
                        }
                        break;
                    }
                }
        }   
    }    
    else
    {
        switch((rowofTile - rowOfPiece))
        {
            case 1:
                {
                    if((colOfTile === (colOfPiece - 1) || colOfTile === (colOfPiece + 1)) && theTileToMoveTo.classList.contains("noPiece"))
                    {
                        let boardChanges = {
                            id1: thePieceToMove.parentElement.id,
                            id2: theTileToMoveTo.id
                        }
                        socket.emit("redKingNcapture", boardChanges);
                    }
                    break;
                }
            case -1:
            {
                if((colOfTile === (colOfPiece - 1) || colOfTile === (colOfPiece + 1)) && theTileToMoveTo.classList.contains("noPiece"))
                    {
                        let boardChanges = {
                            id1: thePieceToMove.parentElement.id,
                            id2: theTileToMoveTo.id
                        }
                        socket.emit("redKingNcapture", boardChanges);
                    }
                    break;
            }
            case 2:
                {
                    //if((colOfTile === (colOfPiece - 2))) //&& check if the tile in between has a black piece)
                    if((colOfTile === (colOfPiece - 2)) && theTileToMoveTo.classList.contains("noPiece"))
                    {
                        var rowOfPotentialBlack = rowOfPiece + 1;
                        var colOfPotentialBlack = colOfPiece - 1;
                        var IdOfTile = colOfPotentialBlack.toString() + rowOfPotentialBlack.toString();
                        if(document.getElementById(IdOfTile).firstElementChild.classList.contains("bPiece"))
                        {
                            let boardChanges = {
                                id1: thePieceToMove.parentElement.id,
                                id2: theTileToMoveTo.id,
                                id3: IdOfTile
                            }
                            socket.emit("redKingCaptureDownLeft", boardChanges);
                        }
                        break;
                    }
                    //else if((colOfTile === (colOfPiece + 2))) //&& check if the tile in between has a black piece)
                    else if((colOfTile === (colOfPiece + 2)))
                    {
                        var rowOfPotentialBlack = rowOfPiece + 1;
                        var colOfPotentialBlack = colOfPiece + 1;
                        var IdOfTile = colOfPotentialBlack.toString() + rowOfPotentialBlack.toString();
                        if(document.getElementById(IdOfTile).firstElementChild.classList.contains("bPiece"))
                        {
                            let boardChanges = {
                                id1: thePieceToMove.parentElement.id,
                                id2: theTileToMoveTo.id,
                                id3: IdOfTile
                            }
                            socket.emit("redKingCaptureDownRight", boardChanges);
                        }
                        break;
                    }
                    
                } 
                case -2:
                {
                    if((colOfTile === (colOfPiece - 2)))
                    {
                        var rowOfPotentialBlack = rowOfPiece - 1;
                        var colOfPotentialBlack = colOfPiece - 1;
                        var IdOfTile = colOfPotentialBlack.toString() + rowOfPotentialBlack.toString();
                        if(document.getElementById(IdOfTile).firstElementChild.classList.contains("bPiece"))
                        {
                            let boardChanges = {
                                id1: thePieceToMove.parentElement.id,
                                id2: theTileToMoveTo.id,
                                id3: IdOfTile
                            }
                            socket.emit("redKingCaptureUpLeft", boardChanges);
                        }
                        break;
                    }
                    else if((colOfTile === (colOfPiece + 2)))
                    {
                        var rowOfPotentialBlack = rowOfPiece - 1;
                        var colOfPotentialBlack = colOfPiece + 1;
                        var IdOfTile = colOfPotentialBlack.toString() + rowOfPotentialBlack.toString();
                        if(document.getElementById(IdOfTile).firstElementChild.classList.contains("bPiece"))
                        {
                            let boardChanges = {
                                id1: thePieceToMove.parentElement.id,
                                id2: theTileToMoveTo.id,
                                id3: IdOfTile
                            }
                            socket.emit("redKingCaptureUpRight", boardChanges);
                        }
                        break;
                    }
                    break;
                }
            }

        }
    }    
function pieceListenerMethodRed()
{
    thePieceToMove = this;
    document.querySelectorAll(".noPiece").forEach(function(tile)
    {
        tile.addEventListener("click", tileListenerMethodRed)
    });
}
function pieceListenerMethodBlack()
{
    thePieceToMove = this;
    document.querySelectorAll(".noPiece").forEach(function(tile)
    {
        tile.addEventListener("click", tileListenerMethodBlack);
    });
}
