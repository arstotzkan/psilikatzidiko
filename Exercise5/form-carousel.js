let counter = 1

function go_back(){
    if (counter > 1)
        go_to_previous_subform()
}

function go_to_previous_subform(){
    let selected_subform = document.querySelector(".displayed");
    let previous_subform =  selected_subform.previousElementSibling;

    if (subform_is_valid(selected_subform)){

        document.getElementById("error-area").classList = "display-none";

        selected_subform.classList.add("display-none");
        selected_subform.classList.remove("displayed");

        previous_subform.classList.add("displayed");
        previous_subform.classList.remove("display-none");

        counter--;
        document.getElementById("counter").innerHTML = `${counter} of 8`;
    }
    else{
        document.getElementById("error-area").classList = "";
        show_errors(selected_subform);
    }
}

function go_forward(){
    (counter < document.getElementById("main-form").childElementCount)
    ? go_to_next_subform()
    : document.querySelector("form").submit();
}

function go_to_next_subform(){
    let selected_subform = document.querySelector(".displayed");
    let next_subform =  selected_subform.nextElementSibling;

    if (subform_is_valid(selected_subform)){
        document.getElementById("error-area").classList = "display-none";

        selected_subform.classList.add("display-none");
        selected_subform.classList.remove("displayed");

        next_subform.classList.add("displayed");
        next_subform.classList.remove("display-none");

        counter++;
        document.getElementById("counter").innerHTML = `${counter} of 8`;
    }
    else{
        document.getElementById("error-area").classList = "";
        show_errors(selected_subform);
    }
}

function subform_is_valid(subform){
    let inputs = subform.querySelectorAll("input");
    let is_valid = true;

    for (let input of inputs){
        is_valid = is_valid && input.checkValidity();

        if (!is_valid)
            return false;
    }
    
    return true;
}

function show_errors(subform){
    let inputs = subform.querySelectorAll("input");
    document.getElementById("error-list").innerHTML = "";
    
    for (let input of inputs){
        if (!input.checkValidity()){
            let error = document.createElement("li");
            error.id = `${input.id}-error`;
            error.innerHTML = `${document.querySelector(`label[for="${input.id}"]`).innerHTML} ${input.validationMessage}`;
                document.getElementById("error-list").appendChild(error);
        }
    }
    
}
