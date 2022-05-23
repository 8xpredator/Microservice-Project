function getCaptche(){
      var characters = "ABCDEFGHIJKLMNOPQRSTUVWXTZ0123456789abcdefghiklmnopqrstuvwxyz";       
      //specify the length for the new string  
      var lenString = 5;  
      var randomstring = '';  
  
      //loop to select a new character in each iteration  
      for (var i=0; i<lenString; i++) {  
      var rnum = Math.floor(Math.random() * characters.length);  
      randomstring += characters.substring(rnum, rnum+1);
    }
	return randomstring;
}