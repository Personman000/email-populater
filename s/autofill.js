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
    populateList("#tip_list_1", "li", 'https://raw.githubusercontent.com/Personman000/email-populater/master/lists/tips1.txt');
    populateList("#tip_list_2", "li", 'https://raw.githubusercontent.com/Personman000/email-populater/master/lists/tips2.txt');
    populateListCheckboxes("#call_to_action_list", "input", 'https://raw.githubusercontent.com/Personman000/email-populater/master/lists/calls_to_action.txt');

    // Populate list from previous step
    var step_2_name = document.getElementById("user-input");
    if(step_2_name) {
        step_2_name.onchange = function() {
            document.getElementById("mp").value = step_2_name.value;
            populateEmail();
        }
    }

}

function populateList(id, item_type, filepath) {
    populateListHelper(id, item_type, null, null, null, filepath);
}

function populateListCheckboxes(id, item_type, filepath) {
    populateListHelper(id, item_type, "checkbox", "label", "<br>", filepath);
}

// Populate drop-down list with data from files
function populateListHelper(id, item_type, special_type, after_type, after_html, filepath) {
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
            var child = element.insert(item_type).attr("type", special_type).attr("value", list_item).html(list_item);

            // Specific funtionality, meant only for Call to Action list
            if(after_html != null && after_type != null){
                i += 1;
                var next_item = list_items[i];

                // Re-set checkbox value
                child.attr("value", next_item)

                // Add main label
                element.insert(after_type)
                    .attr("value", next_item)
                    .html(list_item);

                // Add line break
                element.insert("br");

                // Add Expand label
                element.insert("label").html("Expand...")
                    .attr("for", list_item)
                    .attr("onclick", "showHideFromLabel()")
                    .attr("style", "font-style:italic; text-decoration:underline;");

                // Add line break
                element.insert("br");

                // Add second label
                element.insert(after_type).html(next_item + "<br>")
                    .attr("id", list_item)
                    .attr("style", "display:none;");

                // Add line break
                element.insert("br");
            }
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


function showHideFromLabel() {
    // Get list style from label
    var label = event.srcElement;
    var element = document.getElementById(label.getAttribute("for"));
    var display = element.style.display;

    console.log(element);
    console.log(display);

    // If invisible, turn visible
    if(display == "none")
    {
        element.style.display = "";
    }
    // If visible, turn invisible
    else {
        element.style.display = "none";
    }
}