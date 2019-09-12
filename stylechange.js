// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.




	// Set values to cookies.
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + '=' + cvalue + '; ' + expires + '; path=/ ';
    javascript:window.location.reload();
}


// Get value from cookies.
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}



var dys = getCookie("dyslexic");
var bkg = getCookie("dyslexis-bkg");
var txt = getCookie("dyslexis-txt");
// Check if OpenDysexic font is needed.
if (dys == 'true') {
    // If needed, change CSS to apply OpenDyslexic font.
    var x = document.createElement("STYLE");
    /*jshint multistr: true */
    var t = document.createTextNode("\
            body,h1,h2,h3,h4,h5,h6,p,ul,ol,dl,input,textarea \
                {font-family: opendyslexic;} \
            select \
                {font-family: opendyslexic; \
                box-sizing: content-box;} \
            \
            ");
    x.appendChild(t);
    document.head.appendChild(x);

	changeColorAtt(bkg,txt);

} else {
    // Else, nothing to do, but I keep it for test.
}


function changeColor(bkg,txt) {
	debugger;
    // If needed, change CSS to apply OpenDyslexic font.
	setCookie('dyslexis-bkg',bkg,100);
	setCookie('dyslexis-txt',txt,100);

	changeColorAtt(bkg,txt);
}	

function changeColorAtt(bkg,txt) {

	 // If needed, change CSS to apply OpenDyslexic font.
    var x = document.createElement("STYLE");
    /*jshint multistr: true */
    var t = document.createTextNode("\
            .card, #page-enrol-users #filterform, .que .history, .userprofile .profile_tree section, .groupinfobox, .well \
                {background-color: "+bkg+" !important;} \
            body { color: "+txt+" !important}\
            ");
    x.appendChild(t);
    document.head.appendChild(x);

}

