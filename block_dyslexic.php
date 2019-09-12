<?php
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


defined('MOODLE_INTERNAL') || die();
/**
 * Displays block
 */
class block_dyslexic extends block_base {


    public function init() {
        $this->title = get_string('pluginname', 'block_dyslexic');
        $this->content_type = BLOCK_TYPE_TEXT;
    }


    public function instance_allow_multiple() {
        return false;
    }

    public function hide_header() {
        return false;
    }

    public function get_content() {
        global $CFG, $COURSE;

        if ($this->content !== null) {
            return $this->content;
        }

        // Include Javascript.
        $this->page->requires->js('/blocks/dyslexic/stylechange.js');

        $this->content = new stdClass();

        $this->content->text = get_string("intro", "block_dyslexic");

        // Display Change font button for each case.
        if ($_COOKIE["dyslexic"] == "true") {
            $this->content->text .= '<div align="center"><form>
            <input type="submit" onclick="setCookie(\'dyslexic\', \'false\', 60);return false;" name="theme" value="'.get_string("defaut_font", "block_dyslexic").'" id="off">
            </form>
		<hr/>
		<h6 id="instance-29-header" class="card-title d-inline">Стил</h6>
		<div>
		<div class="form-input form-input-theme-wrapper">
                	<div data-id="1" data-bcg-color="#FFFFFF" onclick="changeColor(\'#FFFFFF\',\'#000000\')" data-color="#000000" class="form-input-theme btn-chg-bkg form-input-theme-1 active">Aa</div>
                	<div data-id="2" data-bcg-color="#111111" onclick="changeColor(\'#111111\',\'#FFFFFF\')" data-color="#FFFFFF" class="form-input-theme btn-chg-bkg form-input-theme-2">Aa</div>
                	<div data-id="3" data-bcg-color="#F9ECFF" onclick="changeColor(\'#F9ECFF\',\'#000000\')" data-color="#000000" class="form-input-theme btn-chg-bkg form-input-theme-3">Aa</div>
                	<div data-id="4" data-bcg-color="#FEFF5C" onclick="changeColor(\'#FEFF5C\',\'#000000\')" data-color="#000000" class="form-input-theme btn-chg-bkg form-input-theme-4">Aa</div>
                	<div data-id="5" data-bcg-color="#87FAFF" onclick="changeColor(\'#87FAFF\',\'#000000\')" data-color="#000000" class="form-input-theme btn-chg-bkg form-input-theme-5">Aa</div>
                	<div data-id="6" data-bcg-color="#91FFA6" onclick="changeColor(\'#91FFA6\',\'#000000\')" data-color="#000000" class="form-input-theme btn-chg-bkg form-input-theme-6">Aa</div>
            	</div>
		</div>
	   </div> ';
        } else {
            $this->content->text .= '<div align="center"><form>
            <input type="submit" onclick="setCookie(\'dyslexic\', \'true\', 60);return false;" name="theme" value="'.get_string("opendyslexic_font", "block_dyslexic").'" id="on">
            </form></div> ';
        }

        $url = new moodle_url($CFG->wwwroot.'/blocks/dyslexic/view.php', array('blockid' => $this->instance->id, 'courseid' => $COURSE->id));
        $this->content->footer = html_writer::link($url, get_string("readmore", "block_dyslexic"));
        return $this->content;
    }
}
