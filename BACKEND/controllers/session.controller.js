import Session from "../models/session.js";
import groq from "../config/groq.js"
import pdfParse from "pdf-parse-fork";

const startSession = async (req, res) => {
    try {
        const { role, numberOfQuestions } = req.body;

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "user",
                    content: `You are the interviewer. Generate first interview question for a ${role} position. Return only the question as a plain string, nothing else.`
                }
            ]
        });

        const question = completion.choices[0].message.content;

        const session = await Session.create({
            role,
            numberOfQuestions,
            questions: [question],
            answers: []
        });

        res.status(201).json({
            success: true,
            sessionId: session._id,
            questions: question
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message });
    }
};

const startSessionWithResume = async (req, res) => {
    try {
        const { role, numberOfQuestions } = req.body;

        let resumeText = "";
        if (req.file) {
            const pdfData = await pdfParse(req.file.buffer);
            resumeText = pdfData.text;
        }

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "user",
                    content: `You are an interviewer for a ${role} position. 
                    Here is the candidate's resume: ${resumeText}. 
                    Ask the first interview question based on their resume. Return only the question as a plain string.`
                }
            ]
        });

        const question = completion.choices[0].message.content;

        const session = await Session.create({
            role,
            numberOfQuestions,
            questions: [question],
            answers: []
        });

        res.status(201).json({
            success: true,
            sessionId: session._id,
            questions: question
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message });
    }
};

const submitAnswer = async (req, res) => {
    try {
        const { answer } = req.body;
        const { sessionId } = req.params;

        const session = await Session.findById(sessionId);

        if (!session) {
            return res.status(400).json({ success: false, message: "session not found" });
        }

        session.answers.push(answer);

        if (session.answers.length >= session.numberOfQuestions) {
            const reportCompletion = await groq.chat.completions.create({
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "user",
                        content: `You are an expert interviewer. Here is a completed interview for a ${session.role} position.
                        Questions and Answers:
                        ${session.questions.map((q, i) => `Q${i+1}: ${q}\nA${i+1}: ${session.answers[i]}`).join("\n\n")}
                        
                        Please provide a detailed feedback report with:
                        1. Feedback on each answer
                        2. Overall strengths
                        3. Areas to improve
                        4. Final score out of 10
                        
                        Be constructive and specific. Do not give long report`
                    }
                ]
            });

            session.report = reportCompletion.choices[0].message.content;
            await session.save();

            return res.status(200).json({
                success: true,
                message: "Interview complete",
                report: session.report
            });
        }

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "user",
                    content: `You are an interviewer for a ${session.role} position. So far these questions were asked: ${session.questions.join(", ")}. The candidate answered: ${answer}. Generate the next interview question. Return only the question as a plain string.`
                }
            ]
        });

        const nextQuestion = completion.choices[0].message.content;
        session.questions.push(nextQuestion);
        await session.save();

        res.status(200).json({ success: true, question: nextQuestion });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export { startSession, submitAnswer, startSessionWithResume };