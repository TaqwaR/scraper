const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HeadlineSchema = new Schema({

	title: {
		type: String,
		required: true
	},

	summary: {
		type: String,
		required: true
	},

	link: {
		type: String,
		required: true
	},

	note: {
		type: Schema.Types.ObjectId,
		ref: "Note"
	}
});

const Headline = mongoose.model("Headline", HeadlineSchema);

module.exports = Headline;