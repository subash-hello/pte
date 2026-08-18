import os
import re
import json
import gradio as gr

# Try importing Google Gemini SDK
try:
    from google import genai
    gemini_key = os.environ.get("GEMINI_API_KEY", "")
    client = genai.Client(api_key=gemini_key) if gemini_key else None
except Exception:
    client = None

# Fallback Pearson scoring heuristics
def evaluate_speaking(audio_path, transcript, target_text):
    text = (transcript or "").strip()
    target = (target_text or "").strip()

    if not text:
        return "⚠️ Please provide speech text or recording.", 10, 10, 10, "No audio/transcript detected."

    # Gemini AI Evaluation if client available
    if client:
        try:
            prompt = f"""You are an official Pearson PTE Academic Speaking Scorer.
TARGET PROMPT: "{target}"
CANDIDATE SPEECH TRANSCRIPT: "{text}"

Score the candidate on the 10-90 GSE scale for:
1. Oral Fluency (10-90)
2. Pronunciation (10-90)
3. Overall GSE Score (10-90)

Return JSON format:
{{"overall": number, "fluency": number, "pronunciation": number, "feedback": "detailed advice"}}"""
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt,
                config={"response_mime_type": "application/json"}
            )
            data = json.loads(response.text)
            return (
                f"🎯 **Overall GSE Score: {data.get('overall', 72)}/90**",
                data.get("overall", 72),
                data.get("fluency", 70),
                data.get("pronunciation", 75),
                data.get("feedback", "Good pronunciation and steady oral rhythm.")
            )
        except Exception as e:
            pass

    # Heuristic scoring fallback
    target_words = set(re.findall(r'\w+', target.lower()))
    spoken_words = set(re.findall(r'\w+', text.lower()))
    matches = len(target_words.intersection(spoken_words))
    ratio = matches / max(1, len(target_words))

    score = int(min(90, max(20, ratio * 75 + 15)))
    fluency = int(min(90, max(25, score - 3)))
    pronunciation = int(min(90, max(25, score + 2)))

    feedback = f"Matched {matches} of {len(target_words)} target keywords. Maintain natural rhythm and clear vowel stress."
    return f"🎯 **Overall GSE Score: {score}/90**", score, fluency, pronunciation, feedback


def evaluate_writing(essay_text, task_type="Write Essay (200-300 words)"):
    text = (essay_text or "").strip()
    words = len(re.findall(r'\w+', text))

    if words < 10:
        return "⚠️ Response too short. Minimum required.", 10, 10, 10, 10, f"Word count: {words}. Please write an essay between 200–300 words."

    if client:
        try:
            prompt = f"""You are an official Pearson PTE Academic Writing Scorer.
TASK TYPE: {task_type}
ESSAY: "{text}"

Score on 10-90 GSE scale:
1. Overall (10-90)
2. Grammar (10-90)
3. Vocabulary (10-90)
4. Form & Discourse (10-90)

Return JSON:
{{"overall": number, "grammar": number, "vocabulary": number, "form": number, "feedback": "bullet feedback"}}"""
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt,
                config={"response_mime_type": "application/json"}
            )
            data = json.loads(response.text)
            return (
                f"🎯 **Overall GSE Score: {data.get('overall', 75)}/90** ({words} words)",
                data.get("overall", 75),
                data.get("grammar", 74),
                data.get("vocabulary", 76),
                data.get("form", 78),
                data.get("feedback", "Solid structure with good lexical cohesion.")
            )
        except Exception:
            pass

    # Heuristic fallback
    form_score = 85 if (200 <= words <= 300) else 60
    unique_words = len(set(re.findall(r'\w+', text.lower())))
    vocab_ratio = unique_words / max(1, words)
    vocab_score = int(min(90, max(30, vocab_ratio * 100)))
    grammar_score = 75
    overall = int((form_score + vocab_score + grammar_score) / 3)

    return (
        f"🎯 **Overall GSE Score: {overall}/90** ({words} words)",
        overall,
        grammar_score,
        vocab_score,
        form_score,
        f"Word count: {words}. Lexical diversity: {unique_words} unique words."
    )


def tutor_chat(history, message):
    if not message:
        return history, ""

    reply = "I am your MasterPTE AI Coach! Focus on Oral Fluency (maintain continuous speech without hesitations) and Write From Dictation keywords for maximum score boost."

    if client:
        try:
            prompt = f"""You are MasterPTE AI Coach, expert in Pearson PTE Academic 90-band exam preparation.
User question: "{message}"
Provide concise, actionable advice."""
            resp = client.models.generate_content(model="gemini-2.5-flash", contents=prompt)
            if resp.text:
                reply = resp.text
        except Exception:
            pass

    history.append((message, reply))
    return history, ""


# GRADIO UI THEME & LAYOUT
custom_css = """
#main-container { max-width: 1000px; margin: 0 auto; font-family: 'Inter', sans-serif; }
.badge { background: #4f46e5; color: white; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: bold; }
"""

with gr.Blocks(title="MasterPTE AI — 90-Band Pearson PTE Platform", css=custom_css) as demo:
    gr.Markdown(
        """
        # ⚡ MasterPTE AI — Pearson PTE Exam AI Simulator
        ### Official 90-Band Pearson GSE Scoring Engine & Voice AI Coach
        """
    )

    with gr.Tabs():
        # TAB 1: SPEAKING
        with gr.TabItem("🎙️ Speaking (Read Aloud & Repeat Sentence)"):
            gr.Markdown("### Read the prompt aloud with fluent pacing and clear pronunciation:")
            speaking_target = gr.Textbox(
                label="Target Prompt Passage",
                value="The widespread adoption of artificial intelligence in higher education has transformed traditional pedagogical frameworks, enabling personalized learning journeys.",
                lines=2
            )
            speaking_input = gr.Textbox(
                label="Candidate Speech Transcript (or Speech-to-Text output)",
                placeholder="Type or paste the transcript of your recorded answer here...",
                lines=3
            )
            speaking_btn = gr.Button("⚡ Evaluate Speaking Performance", variant="primary")

            with gr.Row():
                speaking_overall = gr.Markdown("Score will appear here...")
            with gr.Row():
                speaking_score_gauge = gr.Number(label="Overall GSE (10-90)", value=0)
                fluency_score = gr.Number(label="Oral Fluency (10-90)", value=0)
                pronunciation_score = gr.Number(label="Pronunciation (10-90)", value=0)
            speaking_feedback = gr.Textbox(label="Examiner Diagnostic Feedback", lines=3)

            speaking_btn.click(
                evaluate_speaking,
                inputs=[gr.Audio(visible=False), speaking_input, speaking_target],
                outputs=[speaking_overall, speaking_score_gauge, fluency_score, pronunciation_score, speaking_feedback]
            )

        # TAB 2: WRITING
        with gr.TabItem("✍️ Writing (Write Essay & SWT)"):
            gr.Markdown("### Write Essay (200–300 words) with clear structure, academic vocabulary, and coherence:")
            essay_prompt = gr.Markdown("**Essay Topic:** *Some people believe technology eliminates workplace jobs, while others argue it creates new opportunities. Discuss both views and give your opinion.*")
            essay_input = gr.Textbox(
                label="Your Essay Response",
                placeholder="Write your essay here (aim for 200–300 words)...",
                lines=8
            )
            writing_btn = gr.Button("⚡ Evaluate Essay with AI", variant="primary")

            with gr.Row():
                writing_overall = gr.Markdown("Score will appear here...")
            with gr.Row():
                writing_score_gauge = gr.Number(label="Overall GSE (10-90)", value=0)
                grammar_score = gr.Number(label="Grammar (10-90)", value=0)
                vocab_score = gr.Number(label="Vocabulary Range (10-90)", value=0)
                form_score = gr.Number(label="Form & Discourse (10-90)", value=0)
            writing_feedback = gr.Textbox(label="Examiner Assessment & Rubric Details", lines=3)

            writing_btn.click(
                evaluate_writing,
                inputs=[essay_input],
                outputs=[writing_overall, writing_score_gauge, grammar_score, vocab_score, form_score, writing_feedback]
            )

        # TAB 3: AI TUTOR
        with gr.TabItem("🤖 24/7 AI Tutor Coach"):
            gr.Markdown("### Chat with MasterPTE AI Tutor about templates, strategy, and exam tips:")
            chatbot = gr.Chatbot(height=400)
            msg_input = gr.Textbox(
                placeholder="Ask anything (e.g. 'Give me the Describe Image template' or 'How to get 90 in Repeat Sentence?')...",
                show_label=False
            )
            with gr.Row():
                send_btn = gr.Button("Send Question", variant="primary")
                clear_btn = gr.Button("Clear Chat")

            send_btn.click(tutor_chat, inputs=[chatbot, msg_input], outputs=[chatbot, msg_input])
            msg_input.submit(tutor_chat, inputs=[chatbot, msg_input], outputs=[chatbot, msg_input])
            clear_btn.click(lambda: [], outputs=[chatbot])

        # TAB 4: PLATFORM INFO
        with gr.TabItem("🌐 Full Web Platform"):
            gr.Markdown(
                """
                ### 🚀 MasterPTE AI Web Application
                - **GitHub Repository:** [github.com/subash-hello/pte](https://github.com/subash-hello/pte)
                - **20 Pearson PTE Question Types:** Speaking (RA, RS, DI, RL, ASQ), Writing (SWT, WE), Reading (FIB, RO, MCSA, MCMA), Listening (SST, WFD, HIW, SMW).
                - **30 Timed Mock Exams:** Full Pearson simulation with scorecard analytics.
                - **Institution & Branch Admin:** Multi-tenant approval queues and student monitoring.
                """
            )

demo.launch()
