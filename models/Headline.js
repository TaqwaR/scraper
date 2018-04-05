const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HeadlineSchema = new Schema({

	title: {
		type: String,
		required: true
	},

	link: {
		type: String,
		required: true
	}
});