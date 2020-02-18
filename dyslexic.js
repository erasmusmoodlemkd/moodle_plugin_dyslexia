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

/**
 * Script for explaining effect of dyslexic
 *
 * @package    block_dyslexic
 * @copyright  2016 onwards Geon {@link https://geon.github.io/programming/2016/03/03/dsxyliea}
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author     Geon
 */

$(function(){

    var getTextNodesIn = function(el) {
        return $(el).find(":not(iframe,script)").addBack().contents().filter(function() {
            return this.nodeType == 3;
        });
    };

    var textNodes = getTextNodesIn($("p, h1, h2, h3"));
    // var textNodes = getTextNodesIn($("*"));

    function isLetter(char) {
        return /^[\d]$/.test(char);
    }

    var wordsInTextNodes = [];
    for (var i = 0; i < textNodes.length; i++) {
        var node = textNodes[i];

        var words = [];

        var re = /\w+/g;
        var match;
        while ((match = re.exec(node.nodeValue)) !== null) {

            var word = match[0];
            var position = match.index;

            words.push({
                length: word.length,
                position: position
            });
        }

        wordsInTextNodes[i] = words;
    }

    function messUpWords () {

        for (var i = 0; i < textNodes.length; i++) {

            var node = textNodes[i];

            for (var j = 0; j < wordsInTextNodes[i].length; j++) {

                // Only change a tenth of the words each round.
                if (Math.random() > 1 / 10) {
                    continue;
                }

                var wordMeta = wordsInTextNodes[i][j];
                var word = node.nodeValue.slice(wordMeta.position, wordMeta.position + wordMeta.length);
                var before = node.nodeValue.slice(0, wordMeta.position);
                var after  = node.nodeValue.slice(wordMeta.position + wordMeta.length);

                node.nodeValue = before + messUpWord(word) + after;
            }
        }
    }

    function messUpWord (word) {

        if (word.length < 3) {

            return word;
        }

        return word[0] + messUpMessyPart(word.slice(1, -1)) + word[word.length - 1];
    }

    function messUpMessyPart (messyPart) {

        if (messyPart.length < 2) {

            return messyPart;
        }

        var a, b;
        while (!(a < b)) {

            a = getRandomInt(0, messyPart.length - 1);
            b = getRandomInt(0, messyPart.length - 1);
        }

        return messyPart.slice(0, a) + messyPart[b] + messyPart.slice(a + 1, b) + messyPart[a] + messyPart.slice(b + 1);
    }

    // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random .
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    setInterval(messUpWords, 50);
});
