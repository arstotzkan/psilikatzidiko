let counter = 1

//CALLBACKS
function go_back(){
    if (counter > 1)
        go_to_previous_subform()
}

function go_forward(){
    (counter < document.getElementById("main-form").childElementCount)
    ? go_to_next_subform()
    : document.querySelector("form").submit();
}

//SUBFORM CHANGE
function go_to_previous_subform(){
    let selected_subform = document.querySelector(".displayed");
    let previous_subform =  selected_subform.previousElementSibling;

    document.getElementById("error-area").classList = "display-none";
    switch_subforms(selected_subform, previous_subform);
    update_counter_widget(counter--);
}

function go_to_next_subform(){
    let selected_subform = document.querySelector(".displayed");
    let next_subform =  selected_subform.nextElementSibling;

    if (subform_is_valid(selected_subform)){
        document.getElementById("error-area").classList = "display-none";
        switch_subforms(selected_subform, next_subform); 
        update_counter_widget(counter++);
    }
    else{
        document.getElementById("error-area").classList = "";
        show_errors(selected_subform);
    }
}

//UTILS
function switch_subforms(selected_subform, other_subform){
    document.getElementById("error-area").classList = "display-none";

    selected_subform.classList.add("display-none");
    selected_subform.classList.remove("displayed");

    other_subform.classList.add("displayed");
    other_subform.classList.remove("display-none");

    (other_subform.querySelector(".small-button-container"))
    ? document.getElementById("button-container").classList.add("d-none")
    : document.getElementById("button-container").classList.remove("d-none")
}

function update_counter_widget(new_value){
    counter = new_value;
    document.getElementById("counter").innerHTML = `${counter} of 8`;
}

function subform_is_valid(subform){
    let inputs = subform.querySelectorAll("[required]");
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
