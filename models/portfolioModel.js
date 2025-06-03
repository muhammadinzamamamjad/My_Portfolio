const mongoose = require('mongoose');
const introductionSchema = new mongoose.Schema({
    welcomeText: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});


const aboutSchema = new mongoose.Schema({
    description1: {
        type: String,
        required: true
    },
    description2: {
        type: String,
        required: true
    },
    lottieUrl: {
        type: String,
        required: true
    }
});

const skillSchema = new mongoose.Schema({
    programmingLanguages: {
        type: Array,
        required: true
    },
    webDevelopment: {
        type: Array,
        required: true
    },
    databases: {
        type: Array,
        required: true
    }
}); 

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    projectUrl: {
        type: String,
        required: true
    }
});
const contactSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
});


module.exports={
    Intro : mongoose.model("intros",introductionSchema),
    About : mongoose.model("abouts",aboutSchema),
    Skill : mongoose.model("skills",skillSchema),
    Project : mongoose.model("projects",projectSchema),
    Contact : mongoose.model("contacts",contactSchema),
    User : mongoose.model("users",userSchema)
}