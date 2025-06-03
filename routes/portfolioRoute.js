const router = require('express').Router();
const { Intro, About, Skill, Project, Contact } = require('../models/portfolioModel');



router.post('/update-intro', async (req, res) => {
    try {
        const intro = await Intro.findOneAndUpdate(
            {_id: req.body._id}, 
            req.body,
            { new: true}
        );
        res.status(200).send({data:intro,succes:true, message: 'Intro updated successfully' });
    } catch (error) {
        console.error('Error updating intro:', error);
        res.status(500).send({ message: 'Error updating intro', error });
    }
});


router.post('/update-skill', async (req, res) => {
  try {
    const { _id, databases, programmingLanguages, webDevelopment } = req.body;
    const updatedFields = {};
    if (databases) updatedFields.databases = databases;
    if (programmingLanguages) updatedFields.programmingLanguages = programmingLanguages;
    if (webDevelopment) updatedFields.webDevelopment = webDevelopment;

    const skill = await Skill.findOneAndUpdate(
      { _id },
      { $set: updatedFields },
      { new: true }
    );
    res.status(200).send({ success: true, data: skill, message: 'Skills updated successfully' });
  } catch (error) {
    console.error('Error updating skills:', error);
    res.status(500).send({ success: false, error });
  }
});

router.post('/add-skill', async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(200).send({ success: true, data: skill, message: 'Skill added successfully' });
  } catch (error) {
    console.error('Error adding skill:', error);
    res.status(500).send({ success: false, error });
  }
});

router.post('/add-project', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.send({ success: true });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
});


router.post('/delete-skill', async (req, res) => {
  try {
    const { _id, category, skill } = req.body;
    // Remove the skill from the specified category array
    const update = { $pull: { [category]: skill } };
    const updatedSkill = await Skill.findOneAndUpdate(
      { _id },
      update,
      { new: true }
    );
    res.status(200).send({ success: true, data: updatedSkill, message: 'Skill deleted successfully' });
  } catch (error) {
    console.error('Error deleting skill:', error);
    res.status(500).send({ success: false, error });
  }
});

router.post('/update-project', async (req, res) => {
  try {
    await Project.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true });
    res.send({ success: true });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
});

router.post('/delete-project', async (req, res) => {
  try {
    await Project.findOneAndDelete({ _id: req.body._id });
    res.send({ success: true });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
});


router.post('/update-about', async (req, res) => {
  try {
    const about = await About.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({ success: true, data: about,message: 'About updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error });
  }
});


router.get('/get-portfolio-data', async (req, res) => {
    try {
        const intros = await Intro.find();
        const abouts = await About.find();
        const skills = await Skill.find();
        const projects = await Project.find();
        const contacts = await Contact.find();
console.log({ intros, abouts, skills, projects, contacts });
        res.status(200).send({
            intro: intros[0],
            about: abouts[0],
            skills: skills,
            projects: projects,
            contacts: contacts
        });
    } catch (error) {
        console.error('Error fetching portfolio data:', error); // Add this line
    res.status(500).send({ message: 'Error fetching portfolio data', error });
    }
});

module.exports = router;