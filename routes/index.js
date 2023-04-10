import express from "express";
import { Form } from "../models/forms.js";
import { sendEmail } from "../utils/email.js";
import Config from "../config.js";
const router = express.Router();

// POST route for submitting a form
router.post("/submit-form", async (req, res) => {
  try {
    const formData = req.body;
    const savedForm = await Form.submitForm(formData);
    // if(savedForm){

    //     let response =
    //     "<p>Mahrukh freelancing website: </p>" +    
    //   await sendEmail("From mahrukh freelancing website", Config.TO, response);
    // }
    res
      .status(201)
      .json({ message: "Form submission successful.", formDetails: savedForm });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while submitting the form." });
  }
});

// GET route for retrieving all forms
router.get("/", async (req, res) => {
  try {
    const forms = await Form.getAllForms();
    res.json(forms);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving forms." });
  }
});

// DELETE route for deleting a form by ID
router.delete("/forms/:formId", async (req, res) => {
  try {
    const deletedForm = await Form.deleteFormById(req.params.formId);
    res.json(deletedForm);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the form." });
  }
});

export default router;
