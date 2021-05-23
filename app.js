window.onload = function () {
    var inputs = document.getElementsByClassName("input");
    console.log(inputs);

    for (var input of inputs) {
        input.onchange = function () {

            var name = document.forms["mainForm"]["name"];
            var email_addr = document.forms["mainForm"]["email_addr"];
            var mp = document.forms["mainForm"]["mp"];
            var email_text = document.forms["mainForm"]["email_text"];
            console.log(name.id + ":" + name.value + ", " + email_addr.id + ":" + email_addr.value + ", " + mp.id + ":" + mp.value + ", " + email_text.id + ":" + email_text.value);

            var mp_text = "";
            var email_target = "";
            if (mp.value == "ted") { mp_text = "Mr. Ted Tedderson"; email_target = "ted_tedderson@canada.gov"; }
            else if (mp.value == "john") { mp_text = "Mrs. John Johnnerson"; email_target = "jJohn1985@hotmail.gov"; }
            else if (mp.value == "me") { mp_text = "Me, Myself, & I"; email_target = "some_email@some_domain.gov"; }
            else if (mp.value == "you") { mp_text = "You"; email_target = email_addr; }
            else if (mp.value == "manal") { mp_text = "Ms. Manal Syeda Irfan Syed Ali Ali"; email_target = "manal@manallama.gov"; }

            console.log("mp_text: " + mp_text);
            var email_text = document.getElementById("email_text");

            email_text.value = "";
            if (mp.value != "unselected") {
                email_text.value += "Hello " + mp_text

                if (name.value != "") {
                    email_text.value += ", \
my name is " + name.value + ", and I have a bone to pick with you.";
                }
            }
        }
    }
}

function submitForm() {
    var name = document.forms["mainForm"]["name"].value;
    var email_addr = document.forms["mainForm"]["email_addr"].value;
    var mp = document.forms["mainForm"]["mp"].value;
    var subject = document.forms["mainForm"]["subject"].value;

    if (name == "") {
        alert("Name must be filled out");
        return false;
    }
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email_addr) || email_addr == "") {
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