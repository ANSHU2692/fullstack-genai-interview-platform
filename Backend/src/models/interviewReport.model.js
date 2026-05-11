const mongoose = require("mongoose");

/**
 * - job discription schema  : string
 * - resume text  :string
 * -Self description  :string
 *
 *
 * matchScore : Number
 *
 * -Technical question  : [{
 *                 question : ""
 *                  answer : ""
 *                  intension : ""
 * }]
 * -Behavioural questions : [{
 *                 question : ""
 *                  answer : ""
 *                  intension : ""
 *
 * }]
 * -Skill gaps : [{
 *          skills:""
 *          severity :{
 *          type: string ,
 *          enum: ["low","medium","High"]
 *
 *
 * }
 *
 *
 * }]
 * -preperation plan : [{
 *
 *                      day: Number;
 *                      focus : String
 *                     tasks:[strings]
 *
 *
 * }]
 */

const technicalQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Technical questions are required"],
    },

    intention: {
      type: String,
      required: [true, "Intention is required"],
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  {
    _id: false,
  },
);

const behavioralQuestionsSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Technical questions are required"],
    },

    intention: {
      type: String,
      required: [true, "Intention is required"],
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  {
    _id: false,
  },
);

const skillGapSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: [true, "Skill is required"],
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: [true, "Severity is required"],
    },
  },
  {
    _id: false,
  },
);

const preparationPlanSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: [true, "Day is required"],
  },
  focus: {
    type: String,
    required: [true, "Focus is required"],
  },
  tasks: [
    {
      type: String,
      required: [true, "Task is required"],
    },
  ],
});

const interviewReportSchema = new mongoose.Schema(
  {
    jobDescription: {
      type: String,
      required: [true, "Job discription is required"],
    },

    resume: {
      type: String,
    },

    selfDescription: {
      type: String,
    },

    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },

    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionsSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  },
);

const interviewReportModel = mongoose.model(
  "InterviewReport",
  interviewReportSchema,
);

module.exports = interviewReportModel;
