import React from 'react';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import jsdom from 'jsdom-global';

import * as constants from '../src/components/constants.js';
import Announcement from "../src/components/announcement.js";

describe('Announcement', () => {
	before(function () {
		this.jsdom = jsdom();
	})

	after(function () {
		this.jsdom();
	});

	it('should display the announcement without both start/end dates on edit mode', () => {
		// mock data
		var announcementData = {
			title: "BUY ONE DOZEN GET ONE DOZEN FREE",
			content: "<b>October 13 - October 19</b> <br> 8:00 AM - 10:00 PM <br> Exclusions apply. See <a href=\"http:www.krispykreme.com\">here<a> for more details.",
			image: "http://cdn.jamieoliver.com/recipe-database/oldImages/xtra_med/1235_1_1436889055.jpg"
		}

		var mode = constants.EDIT;
		
		const wrapper = shallow(<Announcement data={announcementData} mode={mode}/>);
		expect(wrapper.find('div').at(0).text()).to.not.equal('');
	});

	it('should display the announcement without start date on edit mode', () => {
		// mock data
		var announcementData = {
			title: "BUY ONE DOZEN GET ONE DOZEN FREE",
			content: "<b>October 13 - October 19</b> <br> 8:00 AM - 10:00 PM <br> Exclusions apply. See <a href=\"http:www.krispykreme.com\">here<a> for more details.",
			image: "http://cdn.jamieoliver.com/recipe-database/oldImages/xtra_med/1235_1_1436889055.jpg",
			endDate: "2016-11-05T10:00:00.000Z"
		}

		var mode = constants.EDIT;
		
		const wrapper = shallow(<Announcement data={announcementData} mode={mode}/>);
		expect(wrapper.find('div').at(0).text()).to.not.equal('');
	});

	it('should display the announcement without end date on edit mode', () => {
		// mock data
		var announcementData = {
			title: "BUY ONE DOZEN GET ONE DOZEN FREE",
			content: "<b>October 13 - October 19</b> <br> 8:00 AM - 10:00 PM <br> Exclusions apply. See <a href=\"http:www.krispykreme.com\">here<a> for more details.",
			image: "http://cdn.jamieoliver.com/recipe-database/oldImages/xtra_med/1235_1_1436889055.jpg",
			startDate: "2016-06-27T09:00:00.000Z"
		}

		var mode = constants.EDIT;
		
		const wrapper = shallow(<Announcement data={announcementData} mode={mode}/>);
		expect(wrapper.find('div').at(0).text()).to.not.equal('');
	});

	it('should display the announcement when current date falls within scheduled date on edit mode', () => {
		// mock data
		var announcementData = {
			title: "BUY ONE DOZEN GET ONE DOZEN FREE",
			content: "<b>October 13 - October 19</b> <br> 8:00 AM - 10:00 PM <br> Exclusions apply. See <a href=\"http:www.krispykreme.com\">here<a> for more details.",
			image: "http://cdn.jamieoliver.com/recipe-database/oldImages/xtra_med/1235_1_1436889055.jpg", 
			startDate: "2016-06-27T09:00:00.000Z",
			endDate: "2016-11-05T10:00:00.000Z"
		}

		var mode = constants.EDIT;
		
		const wrapper = shallow(<Announcement data={announcementData} mode={mode}/>);
		expect(wrapper.find('div').at(0).text()).to.not.equal('');
	});

	it('should display the announcement when current date does not fall within scheduled date on edit mode', () => {
		// mock data
		var announcementData = {
			title: "BUY ONE DOZEN GET ONE DOZEN FREE",
			content: "<b>October 13 - October 19</b> <br> 8:00 AM - 10:00 PM <br> Exclusions apply. See <a href=\"http:www.krispykreme.com\">here<a> for more details.",
			image: "http://cdn.jamieoliver.com/recipe-database/oldImages/xtra_med/1235_1_1436889055.jpg", 
			startDate: "2017-06-27T09:00:00.000Z",
			endDate: "2016-11-05T10:00:00.000Z"
		}

		var mode = constants.EDIT;
		
		const wrapper = shallow(<Announcement data={announcementData} mode={mode}/>);
		expect(wrapper.find('div').at(0).text()).to.not.equal('');
	});

	it('should display the announcement without start/end dates on publish mode', () => {
		// mock data
		var announcementData = {
			title: "BUY ONE DOZEN GET ONE DOZEN FREE",
			content: "<b>October 13 - October 19</b> <br> 8:00 AM - 10:00 PM <br> Exclusions apply. See <a href=\"http:www.krispykreme.com\">here<a> for more details.",
			image: "http://cdn.jamieoliver.com/recipe-database/oldImages/xtra_med/1235_1_1436889055.jpg"
		}

		var mode = constants.PUBLISH;
		
		const wrapper = shallow(<Announcement data={announcementData} mode={mode}/>);
		expect(wrapper.find('div').at(0).text()).to.not.equal('');
	});

	it('should display the announcement without start date on publish mode', () => {
		// mock data
		var announcementData = {
			title: "BUY ONE DOZEN GET ONE DOZEN FREE",
			content: "<b>October 13 - October 19</b> <br> 8:00 AM - 10:00 PM <br> Exclusions apply. See <a href=\"http:www.krispykreme.com\">here<a> for more details.",
			image: "http://cdn.jamieoliver.com/recipe-database/oldImages/xtra_med/1235_1_1436889055.jpg",
			endDate: "2017-11-05T10:00:00.000Z"
		}

		var mode = constants.PUBLISH;
		
		const wrapper = shallow(<Announcement data={announcementData} mode={mode}/>);
		expect(wrapper.find('div').at(0).text()).to.not.equal('');
	});

	it('should not display the announcement without start date where end date is out of range on publish mode', () => {
		// mock data
		var announcementData = {
			title: "BUY ONE DOZEN GET ONE DOZEN FREE",
			content: "<b>October 13 - October 19</b> <br> 8:00 AM - 10:00 PM <br> Exclusions apply. See <a href=\"http:www.krispykreme.com\">here<a> for more details.",
			image: "http://cdn.jamieoliver.com/recipe-database/oldImages/xtra_med/1235_1_1436889055.jpg",
			endDate: "2015-11-05T10:00:00.000Z"
		}

		var mode = constants.PUBLISH;
		
		const wrapper = shallow(<Announcement data={announcementData} mode={mode}/>);
		expect(wrapper.find('div').at(0).text()).to.equal('');
	});

	it('should display the announcement without end date on publish mode', () => {
		// mock data
		var announcementData = {
			title: "BUY ONE DOZEN GET ONE DOZEN FREE",
			content: "<b>October 13 - October 19</b> <br> 8:00 AM - 10:00 PM <br> Exclusions apply. See <a href=\"http:www.krispykreme.com\">here<a> for more details.",
			image: "http://cdn.jamieoliver.com/recipe-database/oldImages/xtra_med/1235_1_1436889055.jpg",
			startDate: "2016-06-27T09:00:00.000Z"
		}

		var mode = constants.PUBLISH;
		
		const wrapper = shallow(<Announcement data={announcementData} mode={mode}/>);
		expect(wrapper.find('div').at(0).text()).to.not.equal('');
	});

	it('should not display the announcement without end date where start date is out of range on publish mode', () => {
		// mock data
		var announcementData = {
			title: "BUY ONE DOZEN GET ONE DOZEN FREE",
			content: "<b>October 13 - October 19</b> <br> 8:00 AM - 10:00 PM <br> Exclusions apply. See <a href=\"http:www.krispykreme.com\">here<a> for more details.",
			image: "http://cdn.jamieoliver.com/recipe-database/oldImages/xtra_med/1235_1_1436889055.jpg",
			startDate: "2017-06-27T09:00:00.000Z"
		}

		var mode = constants.PUBLISH;
		
		const wrapper = shallow(<Announcement data={announcementData} mode={mode}/>);
		expect(wrapper.find('div').at(0).text()).to.equal('');
	});

	it('should display the announcement when scheduled on publish mode', () => {
		// mock data
		var announcementData = {
			title: "BUY ONE DOZEN GET ONE DOZEN FREE",
			content: "<b>October 13 - October 19</b> <br> 8:00 AM - 10:00 PM <br> Exclusions apply. See <a href=\"http:www.krispykreme.com\">here<a> for more details.",
			image: "http://cdn.jamieoliver.com/recipe-database/oldImages/xtra_med/1235_1_1436889055.jpg", 
			startDate: "2016-06-27T09:00:00.000Z",
			endDate: "2017-11-05T10:00:00.000Z"
		}

		var mode = constants.PUBLISH;
		
		const wrapper = shallow(<Announcement data={announcementData} mode={mode}/>);
		expect(wrapper.find('div').at(0).text()).to.not.equal('');
	});

	it('should not display the announcement when not scheduled on publish mode', () => {
		// mock data
		var announcementData = {
			title: "BUY ONE DOZEN GET ONE DOZEN FREE",
			content: "<b>October 13 - October 19</b> <br> 8:00 AM - 10:00 PM <br> Exclusions apply. See <a href=\"http:www.krispykreme.com\">here<a> for more details.",
			image: "http://cdn.jamieoliver.com/recipe-database/oldImages/xtra_med/1235_1_1436889055.jpg", 
			startDate: "2017-06-27T09:00:00.000Z",
			endDate: "2016-11-05T10:00:00.000Z"
		}

		var mode = constants.PUBLISH;
		
		const wrapper = shallow(<Announcement data={announcementData} mode={mode}/>);
		expect(wrapper.find('div').at(0).text()).to.equal('');
	});
});