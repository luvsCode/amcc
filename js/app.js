const containers = document.querySelectorAll(".inputContainer");
const form = document.querySelector('form');
const tl = gsap.timeline({defaults: {duration: 1}})



containers.forEach((container) =>{

const input = container.querySelector('.input');
const line = container.querySelector(".elastic-line");
const placeholder = container.querySelector('.placeHolder');
    //check for text input
    input.addEventListener('focus', ()=>{

        if(!input.value){
            //placeholder shift
            tl.to(placeholder,
                {top: -15, 
                    left:0, 
                    scale:0.9, 
                    duration: 0.5, 
                    ease: "Power2.easeOut"},
                     "<15%")
        }

    })
})


//revert back
form.addEventListener('click', ()=>
{
    containers.forEach((container) =>
    {
        const input = container.querySelector('.input');
        const line = container.querySelector(".elastic-line");
        const placeholder = container.querySelector('.placeHolder');

        if(document.activeElement !== input)
        {
            if(!input.value)
            {
                gsap.to(placeholder,
                    {
                        top:0,
                        left:0,
                        scale:1,
                        duration:0.5,
                        ease: 'Power2.easeOut',
                    })
            }
        }

        //validation

    //Name Validation
    input.addEventListener("input", (e) => {
        if (e.target.type === "text") {
          let inputText = e.target.value;
          if (inputText.length > 2) {
            colorize("#6391E8", line, placeholder);
          } else {
            colorize("#FE8C99", line, placeholder);
          }
        }
        //Validate Email
        if (e.target.type === "email") {
          let valid = validateEmail(e.target.value);
          if (valid) {
            colorize("#6391E8", line, placeholder);
          } else {
            colorize("#FE8C99", line, placeholder);
          }
        }
        //Validate Phone
        if (e.target.type === "tel") {
          let valid = validatePhone(e.target.value);
          if (valid) {
            colorize("#6391E8", line, placeholder);
          } else {
            colorize("#FE8C99", line, placeholder);
          }
        }
      })
    })
})

// checking email validation

function validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  function validatePhone(phone) {
    let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(phone);
  }
  
  //COLORIZE FUNCTION
  function colorize(color, line, placeholder) {
    gsap.to(line, { stroke: color, duration: 0.75 });
    gsap.to(placeholder, { color: color, duration: 0.75 });
  }
  
  //Checkbox animation fill
  const checkbox = document.querySelector(".checkbox");
  const tl2 = gsap.timeline({
    defaults: { duration: 0.5, ease: "Power2.easeOut" },
  });
  const tickMarkPath = document.querySelector(".tick-mark path");
  const pathLength = tickMarkPath.getTotalLength();
  
  gsap.set(tickMarkPath, {
    strokeDashoffset: pathLength,
    strokeDasharray: pathLength,
  });
  
  checkbox.addEventListener("click", () => {
    if (checkbox.checked) {
      tl2.to(".checkboxFill", { top: "0%" });
      tl2.fromTo(
        tickMarkPath,
        { strokeDashoffset: pathLength },
        { strokeDashoffset: 0 },
        "<50%"
      );
      tl2.to(".checkboxLabel", { color: "#6391e8" }, "<");
    } else {
      tl2.to(".checkboxFill", { top: "100%" });
      tl2.fromTo(
        tickMarkPath,
        { strokeDashoffset: 0 },
        { strokeDashoffset: pathLength },
        "<50%"
      );
      tl2.to(".checkboxLabel", { color: "#c5c5c5" }, "<");
    }
  });