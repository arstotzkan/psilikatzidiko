document.addEventListener("keypress", function(event){
    if (event.key === 'Enter'){
        event.preventDefault();
        go_forward()
    }
})

const card = document.querySelector('#debit-credit-card');
const paypal = document.querySelector('#paypal');
const cust_card = document.querySelector('#customer-card');
const cust_paypal = document.querySelector('#customer-paypal');
const com_checkboxes = document.querySelectorAll("input[name='customer-communication']");
const sms = document.querySelector('#sms');
const cust_name = document.querySelector('#customer-name');
const cust_email = document.querySelector('#customer-email');
const cust_address = document.querySelector('#customer-address');
const cust_birthday = document.querySelector('#customer-birthday');
const cust_ship_address = document.querySelector('#customer-shipping-address');
const cust_ll_phone = document.querySelector('#customer-land-line-phone');
const cust_cellphone = document.querySelector('#customer-cellphone');
const cust_card_number = document.querySelector('#customer-card-number');
const cust_card_name = document.querySelector('#customer-card-name');
const cust_card_exp_date = document.querySelector('#customer-card-exp-date');
const cust_card_cvv = document.querySelector('#customer-card-cvv');
const buy_online_other = document.querySelector('#product-other-check-bo');
const buy_online_input = document.querySelector('#product-other-input-bo');
const product_offer_other = document.querySelector('#product-other-check-pof');
const product_offer_input = document.querySelector('#product-other-input-pof');
const cust_pass = document.querySelector('#customer-password');
const cust_pass_repeat = document.querySelector('#customer-password-repeat');

const man = document.getElementById("man");
const woman = document.getElementById("woman");
const other_gender = document.getElementById("gender-other-check");
const other_gender_input = document.getElementById("gender-other-input");

const date = new Date()


//Show fields only if they are selected
card.addEventListener('click', () => {
    cust_card.classList.toggle('hide');
    updateDetails(cust_card);
});
paypal.addEventListener('click', () => {
    cust_paypal.classList.toggle('hide');
    updateDetails(cust_paypal);
});
buy_online_other.addEventListener('click', () => {
    buy_online_input.classList.toggle('hide');
});
product_offer_other.addEventListener('click', () => {
    product_offer_input.classList.toggle('hide');
});

//At least one method of communication has to be selected
let count_checkboxes = 0;
for (let i = 0; i < com_checkboxes.length; i++) {
    com_checkboxes[i].addEventListener('click', () => {
        count_checkboxes = updateCounter(count_checkboxes, com_checkboxes, i, sms, 'Πρέπει να επιλέξετε τουλάχιστον ένα τρόπο επικοινωνίας.');
    });
}

//Rule to validate that user is an adult
cust_birthday.addEventListener('blur', () => {
    let bday = new Date(cust_birthday.value);
    let age_dt = new Date(Date.now() - bday.getTime());
    let age = Math.abs(age_dt.getUTCFullYear() - 1970);
    if (age < 18) {
        cust_birthday.setCustomValidity('Πρέπει να είστε ενήλικας για να κάνετε εγγραφή.');
    } 
    else {
        cust_birthday.setCustomValidity('');
    }
    cust_birthday.checkValidity();
});

//Rule to validate card number
cust_card_number.addEventListener('change', () => {
    let regex = new RegExp('^[0-9]{14,16}$');
    if(!regex.test(cust_card_number.value)){
        cust_card_number.setCustomValidity('Ο αριθμός της κάρτας είναι 14-16 ψηφία χωρίς κενά ή παύλες μεταξύ τους \nπ.χ. 1234567890123456');
    }
    else {
        cust_card_number.setCustomValidity('');
    }
    cust_card_number.checkValidity();
});

//Rule to validate that the card has not expired
cust_card_exp_date.addEventListener('change', () => {
    let regex = new RegExp('^(0[1-9]|1[0-2])\\/([0-9]{2})$');
    if(!regex.test(cust_card_exp_date.value)){
        cust_card_exp_date.setCustomValidity("Η ημερομηνία λήξης πρέπει να είναι στη μορφή MM/YY π.χ. 05/25");
    }
    else if (parseInt(cust_card_exp_date.value.substring(3)) < parseInt(date.getFullYear().toString().substring(2)) ||
        (parseInt(cust_card_exp_date.value.substring(3)) === parseInt(date.getFullYear().toString().substring(2)) && parseInt(cust_card_exp_date.value.substring(0, 2)) < date.getMonth() + 1)) {
        cust_card_exp_date.setCustomValidity('Η κάρτα έχει λήξει.');
    }
    else {
        cust_card_exp_date.setCustomValidity('');
    }
    cust_card_exp_date.checkValidity();
});

//Rule to validate card CVV
cust_card_cvv.addEventListener('change', () => {
    let regex = new RegExp('^[0-9]{3,4}$');
    if(!regex.test(cust_card_cvv.value)){
        cust_card_cvv.setCustomValidity('Ο αριθμός CVV της κάρτας είναι 3-4 ψηφία π.χ. 123 ή 4567');
    }
    else {
        cust_card_cvv.setCustomValidity('');
    }
    cust_card_cvv.checkValidity();
});

//Rule for strong passwords
cust_pass.addEventListener('input', () => {
    let regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$');
    if (!regex.test(cust_pass.value)) {
        cust_pass.setCustomValidity('Λάθος κωδικός, ' + findMissing(cust_pass.value) + '.');
    } 
    else {
        cust_pass.setCustomValidity('');
    }
    cust_pass.checkValidity();

    let event = new Event('input')
    cust_pass_repeat.dispatchEvent(event)
});

//Rule for matching passwords
cust_pass_repeat.addEventListener('input', () => {
    if (cust_pass.value === cust_pass_repeat.value) {
        cust_pass_repeat.setCustomValidity('');
    } 
    else {
        cust_pass_repeat.setCustomValidity('Οι κωδικοί δεν ταιριάζουν');
    }
    cust_pass_repeat.checkValidity();
});


man.addEventListener("check", function(){
    other_gender_input.parentElement.classList.add("display-none");
})

woman.addEventListener("click", function(){
    other_gender_input.parentElement.classList.add("display-none");
})

other_gender.addEventListener("click", function(){
    other_gender_input.parentElement.classList.remove("display-none");
})

//Show custom error messages
errorMessage(cust_name, "Γράψτε Όνομα Επώνυμο π.χ. 'Μάριος Δημητριάδης'");
errorMessage(cust_email, "π.χ. psilikatzidiko@gmail.com");
errorMessage(cust_address, "Λάθος διεύθυνση");
errorMessage(cust_ship_address, "Προσοχή στα κενά πριν και μετά το ',' \nπ.χ. το 'Κωνσταντινουπόλεως 17, Νέα Σμύρνη, Αθήνα, 17121' είναι σωστό, \nενώ το 'Κωνσταντινουπόλεως 17 , Νέα Σμύρνη, Αθήνα  ,17121' είναι λάθος.");
errorMessage(cust_ll_phone, "Το σταθερό τηλέφωνο πρέπει να ξεκινάει με 2, μετά ακολουθεί ένα ψηφίο από το 1 έως το 8 και να έχει 10 ψηφία στο σύνολο π.χ. 2101234567");
errorMessage(cust_cellphone, "Το κινητό τηλέφωνο πρέπει να ξεκινάει με 69 και να έχει 10 ψηφία στο σύνολο π.χ. 6912345678");
errorMessage(cust_card_name, "Το ονοματεπώνυμο κατόχου πρέπει να γραφτεί με κεφαλαίους λατινικούς χαρακτήρες όπως αναγράφεται στη κάρτα \nπ.χ. 'KOSTAS PAPADOPOULOS' ή 'KOSTAS M. PAPADOPOULOS' ή 'K. PAPADOPOULOS'");
// errorMessage(cust_card_number, "Ο αριθμός της κάρτας είναι 14-16 ψηφία χωρίς κενά ή παύλες μεταξύ τους \nπ.χ. 1234567890123456");
// errorMessage(cust_card_cvv, "Ο αριθμός CVV της κάρτας είναι 3-4 ψηφία π.χ. 123 ή 4567");


/**
 * When element is visible makes all inputs required.
 * When element is hidden clears the inputs and removes attribute required.
 * @param el element of details to update
 */
function updateDetails(el) {
    if (el.classList.contains('hide')) {
        el.toggleAttribute('open');
        for (let i of el.querySelectorAll('input')) {
            i.toggleAttribute('required');
            i.value = "";
        }
    }
    else {
        el.toggleAttribute('open');
        for (let i of el.querySelectorAll('input')) {
            i.toggleAttribute('required');
        }
    }
}

/**
 * A function that updates a counter and shows an error message if counter is smaller than 1.
 * @param n counter
 * @param l list consisting of elements with "checked" attribute
 * @param k position in list
 * @param el element to change its error message
 * @param msg message to show
 * @return the new value of the counters
 */
function updateCounter(n, l, k, el, msg) {
    n += l[k].checked ? 1 : -1;
    let errorMessage = n < 1 ? msg : '';
    el.setCustomValidity(errorMessage);
    el.checkValidity();
    return n;
}

/**
 * Specifies an error message for an input element and displays it when input is invalid.
 * @param el input element
 * @param emsg error message
 */
function errorMessage(el, emsg) {
    el.addEventListener("input", () => {
        el.setCustomValidity("");
    });
    el.addEventListener("invalid", () => {
        el.setCustomValidity(emsg);
    });
}

/**
 * Finds what is missing from the password to be strong
 * @param pass the password in string format
 * @returns A string with what is missing
 */
function findMissing(pass) {
    let not_strong = [];
    let miss_str = '';

    //Checks for numbers
    for (let i = 48; i < 58; i++) {
        if (pass.includes(String.fromCharCode(i))) {
            not_strong[0] = '';
            break;
        } else {
            not_strong[0] = 'χρειάζεται τουλάχιστον ένα αριθμό';
        }
    }

    // Checks for capital
    for (let i = 65; i < 91; i++) {
        if (pass.includes(String.fromCharCode(i))) {
            not_strong[1] = '';
            break;
        } else {
            not_strong[1] = 'χρειάζεται τουλάχιστον ένα κεφαλαίο χαρακτήρα';
        }
    }

    // Checks for lowercase
    for (let i = 97; i < 123; i++) {
        if (pass.includes(String.fromCharCode(i))) {
            not_strong[2] = '';
            break;
        } else {
            not_strong[2] = 'χρειάζεται τουλάχιστον ένα πεζό χαρακτήρα';
        }
    }

    //Checks for special characters 
    for (let i of [33, 35, 36, 37, 38, 42, 45, 63, 64, 94]) {
        if (pass.includes(String.fromCharCode(i))) {
            not_strong[3] = '';
            break;
        } else {
            not_strong[3] = 'χρειάζεται τουλάχιστον ένα ειδικό χαρακτήρα';
        }
    }

    if (pass.length < 10) {
        not_strong[4] = 'πρέπει να είναι τουλάχιστον 8 χαρακτήρες';
    } else {
        not_strong[4] = '';
    }

    for (let i of not_strong) {
        if (i === '')
            continue;
        miss_str += i + ', ';
    }

    return miss_str.substring(0, miss_str.length - 2);
}
