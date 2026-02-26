// Get element references

//form
const form = document.getElementById('registrationForm');
//input fields
const fullNameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const courseInput = document.getElementById('course');

//button
const registerButton = document.getElementById('submitBtn');

//helper text elements
const nameHelper = document.getElementById('nameHelper');
const emailHelper = document.getElementById('emailHelper');
const courseHelper = document.getElementById('courseHelper');

//error 
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const courseError = document.getElementById('courseError');

//name counter
const nameCounter = document.getElementById('nameCounter');

//success message
const successMessage = document.getElementById('successMessage');

//Add mouseover event listener to the button
registerButton.addEventListener('mouseover', function(){
    //change button color
    registerButton.style.backgroundColor = 'blue';

    //slightly enlarge the button
    registerButton.style.transform = 'scale(1.1)';

    registerButton.style.transition = 'transform 0.2s';
});

//Add mouseout event listener to the button
registerButton.addEventListener('mouseout', function(){

    //return to original color
    registerButton.style.backgroundColor = 'white';

    //return to original size
    registerButton.style.transform = 'scale(1)';
});

//click event listener to the button
//temporarily change text to processing

registerButton.addEventListener('click', function(event){

    //only show processing if not processed yet
    if(registerButton.innerText !== 'Processing...'){
        registerButton.innerText = 'Processing...';

        //simulate processing time with setTimeout
        setTimeout(function(){
            registerButton.innerText = 'Register';
        }, 2000); //2 seconds
    }
});

//Add focus event listener to the input fields

//Full Name - focus

fullNameInput.addEventListener('focus', function(){
    fullNameInput.style.border = '2px solid blue'; 
    fullNameInput.style.outline = 'none';

    nameHelper.textContent = 'Enter your full name (minimum 3 characters)';
    nameHelper.style.color = 'blue';
});

//Email - focus

emailInput.addEventListener('focus', function(){
    emailInput.style.border = '2px solid blue'; 
    emailInput.style.outline = 'none'; 

    emailHelper.textContent = 'Enter a valid email address (e.g., user@example.com)';
    emailHelper.style.color = 'blue';
});

//Course - focus

courseInput.addEventListener('focus', function(){
    courseInput.style.border = '2px solid blue'; 
    courseInput.style.outline = 'none'; 

    courseHelper.textContent = 'Enter your course of study (e.g., Computer Science)';
    courseHelper.style.color = 'blue';
});

//Add blur event listener to the input fields

//Full Name - blur
fullNameInput.addEventListener('blur', function(){
    fullNameInput.style.border = '1px solid black';//reset border
    nameHelper.textContent = '';//clear helper

    if(fullNameInput.value.trim()=== ''){
        fullNameInput.classList.add('error');
        fullNameInput.classList.remove('valid');
        nameError.textContent = 'Full name is required';
    }else if(fullNameInput.value.trim().length < 3){
        fullNameInput.classList.add('error');
        fullNameInput.classList.remove('valid');
        nameError.textContent = 'Full name must be at least 3 characters';
    }else{
        fullNameInput.classList.remove('error');
        fullNameInput.classList.add('valid');
        nameError.textContent = '';
    }

});    

//Email -blur
emailInput.addEventListener('blur', function(){
    emailInput.style.border = '1px solid black';
    emailHelper.textContent = '';

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValue = emailInput.value.trim();

    if(emailValue === ''){
        emailInput.classList.add('error');
        emailInput.classList.remove('valid');
        emailError.textContent = 'Email is required';
    }else if(!emailPattern.test(emailValue)){
        emailInput.classList.add('error');
        emailInput.classList.remove('valid');
        emailError.textContent = 'Please enter a valid Email';
    }else{
        emailInput.classList.remove('error');
        emailInput.classList.add('valid');
        emailError.textContent = '';
    }
});

//Course - blur
courseInput.addEventListener('blur', function(){
    courseInput.style.border = '1px solid black';
    courseHelper.textContent = '';

    if(courseInput.value.trim() === ''){
        courseInput.classList.add('error');
        courseInput.classList.remove('valid');
        courseError.textContent = 'Course of study is required';
    }else{
        courseInput.classList.remove('error');
        courseInput.classList.add('valid');
        courseError.textContent = '';
    }
});

//Add Input event listener 

//live character counter for full name

fullNameInput.addEventListener('input', function(){
    const currentLength = fullNameInput.value.length;
    const maxLength = fullNameInput.getAttribute('maxlength') || 50;

    //updae counter
    nameCounter.textContent = `${currentLength}/${maxLength}`;

    //change counter based on length
    if(currentLength>= maxLength){
        nameCounter.style.color = 'red';
    }else if(currentLength >= maxLength * 0.8){
        nameCounter.style.color = 'orange';
    }else{
        nameCounter.style.color = 'green';
    }

    //clear error while typing
    fullNameInput.classList.remove('error');
    nameError.textContent = '';

});

//Add submit event listener to the form
//validate all fields

form.addEventListener('submit', function(e){
    e.preventDefault(); //prevent default form submission

    //trigger blur event on all fields to validate
    fullNameInput.dispatchEvent(new Event('blur'));
    emailInput.dispatchEvent(new Event('blur'));
    courseInput.dispatchEvent(new Event('blur'));

    //check if all fields are valid
    const isNameValid = fullNameInput.value.trim() !== '' && fullNameInput.value.trim().length >= 3;
    const isEmailValid = emailInput.value.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
    const isCourseValid = courseInput.value.trim() !== '';

    //check for error classes(double-check)
    const hasNoErrors = !fullNameInput.classList.contains('error') && !emailInput.classList.contains('error') && !courseInput.classList.contains('error');

    if(isNameValid && isEmailValid && isCourseValid && hasNoErrors){
        //show success message
        
        successMessage.textContent = 'Registration successful!';
        successMessage.style.color = 'green';
        successMessage.classList.add('show');

        //update button
        registerButton.textContent = 'Registered';
        registerButton.classList.add('success');
        registerButton.style.background = 'green';

        //Reset form after 1 seconds
        setTimeout(() => {
            form.reset();
            successMessage.textContent = '';
            successMessage.classList.remove('show');
            registerButton.textContent = 'Register';
            registerButton.classList.remove('success','processing');
            registerButton.style.background = 'white';

        //reset character counter
        nameCounter.textContent = '0/50';
        nameCounter.style.color = 'green';

        //remove validation classes
        [fullNameInput, emailInput, courseInput].forEach(input => {
            input.classList.remove('valid', 'error');
            input.style.border = '1px solid black';
        });
        }, 1000);
    }else {
        //show error message
        successMessage.textContent = 'Please fix the errors in the form';
        successMessage.style.color = 'red';
        successMessage.classList.add('show');

        //reset button if it was changed
        registerButton.textContent = 'Register';
        registerButton.classList.remove('success','processing');
        registerButton.style.background = 'white';

        //hide error message after 3 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 3000);

        //scroll to first error
        const firstError = document.querySelector('.error');
        if(firstError){
            firstError.scrollIntoView({behavior: 'smooth', block: 'center'});

            firstError.focus();
        }
    }
});

