document.addEventListener("keydown", function(e){ // Code sers à bouger et imp aussi le collision manager 
    //A OPTIMISER

    if (e.code == "KeyW"){
        rowNum = rowNum -1
        console.log(rowNum, colNum)
        if (mazeArray[rowNum][colNum]===0){
            y = y - roadWidth  
            countSteps++;
            console.log("steps"+countSteps)  
        }
        else{
            rowNum = rowNum + 1
            //console.log("isWall")}
    } } //up 
    
    if (e.code == "KeyS"){
        
        rowNum = rowNum +1
        console.log(rowNum, colNum)
        if (mazeArray[rowNum][colNum]===0){
            y = y + roadWidth
            countSteps++
            console.log("steps"+countSteps)  
        }
        else{
            rowNum = rowNum -1
            //console.log("isWall")}
    }  //down 
    }
    if (e.code == "KeyD"){
        colNum = colNum +1
        console.log(rowNum, colNum)
        if (mazeArray[rowNum][colNum]===0){
            x = x + roadWidth
            countSteps++
            console.log("steps"+countSteps) 
        
        }
            
            //console.log("notWall") }
        else{
            colNum = colNum -1
            //console.log("isWall")
        }
    } // left

    if (e.code == "KeyA"){
        colNum = colNum -1
        console.log(rowNum, colNum)
        if (mazeArray[rowNum][colNum]===0){
            x = x - roadWidth //change display position of yellow square
            countSteps++ //No of steps for stats 
            console.log("steps"+countSteps)   
        }
        else{
            colNum = colNum +1
            //console.log("isWall")
        }
    }
    
        
    })
