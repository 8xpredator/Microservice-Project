  $(document).ready(function(){

  const reloadBtn = document.querySelector(".refresh");
    
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
      document.getElementById('Captcha').value = randomstring;
      document.getElementById("enteredCaptcha").value = '';
    
    }
    getCaptche(); //calling getCaptcha when the page open
     //calling getCaptcha & removeContent on the reload btn click
    reloadBtn.addEventListener("click", ()=>{
   // removeContent();
    getCaptche();
  });
  $('#Captcha').bind('copy paste cut',function(e) { 
    e.preventDefault();
  });
});

  function captcha_valid(){
    var inputVal = $('[name=enteredCaptcha]').val();
    var inputVal1 = $('[name=Captcha]').val();
    if(inputVal !=  inputVal1){ //if captcha matched
     $("p").text("Captcha not matched. Please try again!");
      removeContent();
      getCaptche();
    }else{
      
    }
   }
   
   function removeContent(){
   enteredCaptcha.value = "";
       }
  
  
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
        document.getElementById('Captcha').value = randomstring;
        document.getElementById("enteredCaptcha").value = '';
      
      }
   