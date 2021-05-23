window.onload = function () {
    var inputs = document.getElementsByClassName("input");
    console.log(inputs);

    // Populate email any time a relevant input field is cahnged
    for (var input of inputs) {
        input.onchange = populateEmail;
    }

    populateList("#subject_list", "option", 'https://raw.githubusercontent.com/Personman000/email-populater/master/lists/subject_lines.txt');
    populateList("#body_list", "option", 'https://raw.githubusercontent.com/Personman000/email-populater/master/lists/bodies.txt');
    populateList("#mp_list", "option", 'https://raw.githubusercontent.com/Personman000/email-populater/master/lists/mps.txt');
    populateList("#tip_list", "li", 'https://raw.githubusercontent.com/Personman000/email-populater/master/lists/tips.txt');
}


// Populate drop-down list with data from files
function populateList(id, item_type, filepath) {
    // Get file
    d3.text(filepath).then(function (data, event) {

        // Get list object
        var element = d3.select(id);
        
        var list_item;
        var list_items = data.split("\n");
        
        console.log(id)
        console.log(list_items);

        // Loop through each line in txt file
        for(var i = 0; i < list_items.length; i++) {

            list_item = list_items[i];

            // Add line as option to list
            element.insert(item_type).attr("value", list_item).html(list_item);

        }
    })
}


// Populate email with form data
function populateEmail() {

    // Get form data
    var name = document.forms["mainForm"]["name"];
    var email_source = document.forms["mainForm"]["email_source"];
    var mp = document.forms["mainForm"]["mp"];
    var email_text = document.forms["mainForm"]["email_text"];
    var body = document.forms["mainForm"]["body"];
    console.log(name.id + ":" + name.value + ", " + email_source.id + ":" + email_source.value + ", " + mp.id + ":" + mp.value + ", " + email_text.id + ":" + email_text.value);

    // Get MP name and email
    var mp_name = mp.value;
    var email_target = mp.value.replace(/\s/g, '');

    // Populate email text
    var email_text = document.getElementById("email_text");
    email_text.value = "";

    // Populate MP name
    if (mp.value != "") {

        email_text.value += "Hello " + mp_name + ",\n\n";
    }
    // Or just say Hello if no MP name
    else
    {
        email_text.value += "Hello, "
    }

    // Populate sender name
    if (name.value != "" & mp.value != "") {
        email_text.value += "My name is " + name.value + ". ";
    }
    else if (name.value != "") {

        email_text.value += "my name is " + name.value + ". ";
    }

    // Populate email body
    if (body.value != "") {

        email_text.value += body.value;
    }
}


// Validate form data then submit
function submitForm() {

    // Get form data
    var name = document.forms["mainForm"]["name"].value;
    var email_source = document.forms["mainForm"]["email_source"].value;
    var mp = document.forms["mainForm"]["mp"].value;
    var subject = document.forms["mainForm"]["subject"].value;

    // Validate name
    if (name == "") {
        alert("Name must be filled out");
        return false;
    }
    // Validate source email
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email_source) || email_source == "") {
        alert("Please enter a valid email address");
        return false;
    }
    // Validate mp name
    if (mp == "") {
        alert("Please pick an MP");
        return false;
    }
    // Validate subject line
    if (subject == "") {
        alert("Please input a subject line");
        return false;
    }

    // Send email
    var email_text = document.getElementById("email_text").value;
    window.open('mailto:'+mp+'@canada.gov?subject='+subject+'&body='+email_text);
}


function showList() {
    // Get list style from label
    var label = document.getElementById(event.srcElement.id);
    var list = document.getElementById(label.getAttribute("for"));
    var display = list.style.display;

    console.log(list);
    console.log(display);

    // If invisible, turn visible
    if(display == "none")
    {
        list.style.display = "";
    }
    // If visible, turn invisible
    else {
        list.style.display = "none";
    }
}