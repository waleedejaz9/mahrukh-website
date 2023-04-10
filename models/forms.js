import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

// Define a method to save a new form submission to the database
formSchema.statics.submitForm = async function (formData) {
  const form = new this(formData);
  const savedForm = await form.save();
  return savedForm;
};

// Define a static method to retrieve all forms from the database
formSchema.statics.getAllForms = async function () {
  const forms = await this.find();
  return forms;
};

// Define a static method to delete a form by ID
formSchema.statics.deleteFormById = async function (formId) {
  const deletedForm = await this.findByIdAndDelete(formId);
  return deletedForm;
};

export const Form = mongoose.model("Form", formSchema);
