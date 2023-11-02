document.addEventListener("keydown", function(e){

    if (e.code == "KeyW") 
    
        y = y - roadWidth    
    if (e.code == "KeyS")
        y = y + roadWidth
    if (e.code == "KeyD") 
        x = x + roadWidth
    if (e.code == "KeyA")
        x = x - roadWidth 

})



///you can split the code, but it still works when
//all the code is in one file