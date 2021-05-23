window.onload = function () {
    var inputs = document.getElementsByClassName("input");
    console.log(inputs);

    // Populate email any time a relevant input field is cahnged
    for (var input of inputs) {
        input.onchange = populateEmail;
    }

    //populateList("#body_list", 'https://raw.githubusercontent.com/Personman000/email-populater/master/test.txt');
    populateList("#subject_list", 'https://raw.githubusercontent.com/Personman000/email-populater/master/subject_lines.txt');
    populateList("#body_list", 'https://raw.githubusercontent.com/Personman000/email-populater/master/bodies.txt');
}


// Populate drop-down list with data from files
function populateList(id, filepath) {
    d3.text(filepath).then(function (data, event) {

        var element = d3.select(id);
        
        var list_item;
        var list_items = data.split("\n");
        
        console.log(id)
        console.log(list_items);

        for(var i = 0; i < list_items.length; i++) {

            list_item = list_items[i];

            element.insert("option").attr("value", list_item);

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
    console.log(name.id + ":" + name.value + ", " + email_source.id + ":" + email_source.value + ", " + mp.id + ":" + mp.value + ", " + email_text.id + ":" + email_text.value);

    // Get MP name and email
    var mp_name = "";
    var email_target = "";
    if (mp.value == "ted") { mp_name = "Mr. Ted Tedderson"; email_target = "ted_tedderson@canada.gov"; }
    else if (mp.value == "john") { mp_name = "Mrs. John Johnnerson"; email_target = "jJohn1985@hotmail.gov"; }
    else if (mp.value == "me") { mp_name = "Me, Myself, & I"; email_target = "some_email@some_domain.gov"; }
    else if (mp.value == "you") { mp_name = "You"; email_target = email_source; }
    else if (mp.value == "manal") { mp_name = "Ms. Manal Syeda Irfan Syed Ali Ali"; email_target = "manal@manallama.gov"; }

    console.log("mp_name: " + mp_name);

    // Populate email text
    var email_text = document.getElementById("email_text");
    email_text.value = "";

    if (mp.value != "") {

        // Populate MP name
        email_text.value += "Hello " + mp_name

        if (name.value != "") {

            // Populate sender name
            // Populate email body
            email_text.value += ", \
my name is " + name.value + ", and I have a bone to pick with you.";
        }
    }
}


// Validate form data then submit
function submitForm() {
    var name = document.forms["mainForm"]["name"].value;
    var email_source = document.forms["mainForm"]["email_source"].value;
    var mp = document.forms["mainForm"]["mp"].value;
    var subject = document.forms["mainForm"]["subject"].value;

    if (name == "") {
        alert("Name must be filled out");
        return false;
    }
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email_source) || email_source == "") {
        alert("Please enter a valid email address");
        return false;
    }
    if (mp == "unselected") {
        alert("Please pick an MP");
        return false;
    }

    var email_text = document.getElementById("email_text").value;
    window.open('mailto:'+mp+'@canada.gov?subject='+subject+'&body='+email_text);
}