import mongoose from "mongoose";

const articleSchema = mongoose.Schema(
{
    name:{
        type: String,
        trim: true,
        required: true
    },
    quantity:{
        type: Number,
        trim: true,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }
},
{
   timestamps: true
});

const Article = mongoose.model('Article', articleSchema)
export default Article;