document.addEventListener("keydown", function(e){ // Code sers à bouger et imp aussi le collision manager 
    //A OPTIMISER

    if (e.code == "ArrowUp"){
        rowNum = rowNum -1
        firstMovement=true;
        console.log(rowNum, colNum)
        if (mazeArray[rowNum][colNum]===0){
            y = y - roadWidth  
            countSteps++;
            console.log("row"+rowNum) 
            console.log("steps"+colNum)  
        }
        else{
            rowNum = rowNum + 1
            //console.log("isWall")}
    } } //up 
    
    if (e.code == "ArrowDown"){
        
        rowNum = rowNum +1
        firstMovement=true;
        console.log(rowNum, colNum)
        if (mazeArray[rowNum][colNum]===0){
            y = y + roadWidth
            countSteps++
            console.log("row"+rowNum) 
            console.log("steps"+colNum)  
        }
        else{
            rowNum = rowNum -1
            //console.log("isWall")}
    }  //down 
    }
    if (e.code == "ArrowRight"){
        colNum = colNum +1
        firstMovement=true;
        console.log(rowNum, colNum)
        if (mazeArray[rowNum][colNum]===0){
            x = x + roadWidth
            countSteps++
            console.log("row"+rowNum) 
            console.log("steps"+colNum) 
        
        }
            
            //console.log("notWall") }
        else{
            colNum = colNum -1
            //console.log("isWall")
        }
    } // left

    if (e.code == "ArrowLeft"){
        colNum = colNum -1
        firstMovement=true;
        console.log(rowNum, colNum)
        if (mazeArray[rowNum][colNum]===0){
            x = x - roadWidth //change display position of yellow square
            countSteps++ //No of steps for stats 
            console.log("row"+rowNum) 
            console.log("steps"+colNum)  
        }
        else{
            colNum = colNum +1
            //console.log("isWall")
        }
    }
    
        
    })
