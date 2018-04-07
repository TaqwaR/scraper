const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const axios = require("axios");
const cheerio = require("cheerio");

const db = require("../models");
const app = express();

module.exports = function(app) {

	app.get("/scrape", function (req, res) {
		axios.get("https://www.reddit.com/r/Beekeeping/").then(function(response) {
			const $ = cheerio.load(response.data);

			let results = {};


			$("a.title.may-blank").each(function(i, element) {

				// let results = {};

				results.title = $(this).text();
				results.link = $(this).attr("href");

				console.log("Title: ", results.title);
				console.log("Link: ", results.link);
				console.log("DB: ", db);

				db.Headline.create(results)
				.then(function(dbHeadline) {
					console.log(dbHeadline);
				})
				.catch(function(err) {
					return res.json(err);
				});
			});

			$("p.tagline").each(function(i, element) {
				results.summary = $(this).text();

				console.log("Summary: ", results.summary);
			});


			res.send("boom");
		
		})

	});

	app.get("/api/headlines", function(req, res) {
		db.Headline.find({})
		.then(function(dbHeadline) {
			res.json(dbHeadline);
		})
		.catch(function(err) {
			res.json(err);
		});
	});





}