window.onload = function () {
    var inputs = document.getElementsByClassName("input");
    

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

    // integration functionality
    var step_2_button = document.getElementById("button");
    var step_2_results = document.getElementById("results-table");

    if(step_2_button && step_2_results) {

        // On step 2 button click
        step_2_button.onclick = function() {

            // Populate mp name using step 2 input
            var step_2_name = document.getElementById("user-input");
            document.getElementById("mp").value = step_2_name.value;
            populateEmail();
        }

        // Load acknowledge menu when mousing over form (janky workaround)
        document.getElementById("autofillForm").onmouseenter = function() {

            // Populate acknowledgement list using step 2 results
            var step_2_values = step_2_results.getElementsByTagName("td");
            var step_2_value;

            var has_red = false;
            var has_green = false;

            console.log(step_2_values);
            console.log(step_2_values.length);

            // Loop through results list
            for(var i = 0; i < step_2_values.length; i++) {

                step_2_value = step_2_values[i];

                // Check if red values exist
                if(step_2_value.style.backgroundColor == "darkred") {
                    has_red = true;
                }
                // Check if green values exist
                else if(step_2_value.style.backgroundColor == "green") {
                    has_green = true;
                }

                console.log(step_2_value);
                console.log(step_2_value.style.backgroundColor);
            }

            console.log(has_red);
            console.log(has_green);

            // Populate acknowledgement list using the colors found
            if(has_red == true && has_green == true) {
                populateList("#acknowledge_list", "option", 'https://raw.githubusercontent.com/Personman000/email-populater/master/lists/double_acknowledgements.txt');
            }
            else if(has_red == true) {
                populateList("#acknowledge_list", "option", 'https://raw.githubusercontent.com/Personman000/email-populater/master/lists/red_acknowledgements.txt');
            }
            else if(has_green == true) {
                populateList("#acknowledge_list", "option", 'https://raw.githubusercontent.com/Personman000/email-populater/master/lists/green_acknowledgements.txt');
            }
            else {
                document.getElementById("acknowledge_list").innerHTML = "";
            }
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
        var element = d3.select(id).html("");
        
        var list_item;
        var list_items = data.split("\n");
        

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
                    .attr("onchange", "populateEmail()")

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
    var name = document.forms["autofillForm"]["name"];
    var email_source = document.forms["autofillForm"]["email_source"];
    var mp = document.forms["autofillForm"]["mp"];
    var email_text = document.forms["autofillForm"]["email_text"];
    var body = document.forms["autofillForm"]["body"];
    var acknowledge = document.forms["autofillForm"]["acknowledge"]
    var cta_list = document.getElementById("call_to_action_list")
    

    // Get MP name and email
    var mp_name = mp.value;
    var email_target = mp.value.replace(/\s/g, '');

    // Populate email text
    var email_text = document.getElementById("email_text");
    email_text.value = "";

    // Populate MP name
    if (mp.value != "") {

        email_text.value += "Hello " + mp_name + ",";
    }
    // Or just say Hello if no MP name
    else
    {
        email_text.value += "Hello, "
    }

    // Populate sender name
    if (name.value != "" & mp.value != "") {
        email_text.value += "\n\nMy name is " + name.value + ".";
    }
    else if (name.value != "") {

        email_text.value += "my name is " + name.value + ".";
    }

    // Populate email body
    if (body.value != "") {

        email_text.value += " " + body.value;
    }

    // Populate acknowledgement
    // Populate email body
    if (acknowledge.value != "") {

        email_text.value += "\n\n" + acknowledge.value;
    }

    // Populate call to action
    var cta_list_items = cta_list.childNodes;
    for(var i = 0; i < cta_list_items.length; i++) {

        var cta_list_item = cta_list_items[i];

        // If item is checkbox...
        if(cta_list_item.type == "checkbox") {

            // And checkbox is checked...
            if(cta_list_item.checked) {

                // Then add checked value to email
                email_text.value += "\n\n" + cta_list_item.value;
            }
        }
    }

}


// Validate form data then submit
function submitForm() {

    // Get form data
    var name = document.forms["autofillForm"]["name"].value;
    var email_source = document.forms["autofillForm"]["email_source"].value;
    var mp = document.forms["autofillForm"]["mp"].value;
    var subject = document.forms["autofillForm"]["subject"].value;

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