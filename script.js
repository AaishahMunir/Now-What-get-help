const isGetHelpPage = document.getElementById("guidance-section") !== null;

if(isGetHelpPage)
{
const params = new URLSearchParams(window.location.search);
const situation = params.get("type");

const situations = {
    hacked: {
        title: "Your account was hacked",
        description: "Someone has gained access to your account. Let's work through the steps to secure it."
    },
    scam: {
        title: "You've lost money to a scam",
        description: "You may have transferred money to a scammer. Let's look at the steps you can take."
    },
    threat: {
        title: "Someone is threatening you",
        description: "You deserve support. Let's look at ways to protect yourself and report the situation."
    },
    link: {
        title: "You opened a suspicious link",
        description: "Let's take some precautions to protect your device and accounts."
    }
};

const selectedSituation = situations[situation];

const noSituation = document.getElementById("no-situation");
const guidanceSection = document.getElementById("guidance-section");
const titleElement = document.getElementById("situation-title");
const descriptionElement = document.getElementById("situation-description");

if (selectedSituation) {
    noSituation.hidden = true;
    guidanceSection.hidden = false;

    titleElement.textContent = selectedSituation.title;
    descriptionElement.textContent = selectedSituation.description;
} else {
    noSituation.hidden = false;
    guidanceSection.hidden = true;
}

const questionContainer = document.getElementById("question-container");
const showGuidanceButton = document.getElementById("show-guidance");

const questionSets = {
    hacked: [
        {
            question: "Can you still access your account?",
            options: ["Yes", "No", "I'm not sure"]
        },
        {
            question: "Have your recovery details been changed?",
            options: ["Yes", "No", "I don't know"]
        },
        {
            question: "Are suspicious messages being sent from your account?",
            options: ["Yes", "No", "I don't know"]
        }
    ],

    scam: [
        {
            question: "How did you make the payment?",
            options: ["Bank transfer", "Mobile wallet", "Debit or credit card", "Other"]
        },
        {
            question: "Have you contacted your bank or payment provider?",
            options: ["Yes", "No"]
        },
        {
            question: "Did you share any passwords or OTPs?",
            options: ["Yes", "No", "I'm not sure"]
        }
    ],

    threat: [
        {
            question: "Where are you receiving the threats?",
            options: ["Social media", "Messaging app", "Email", "Other"]
        },
        {
            question: "Have you saved screenshots or other evidence?",
            options: ["Yes", "No"]
        },
        {
            question: "Do you feel unsafe or in immediate danger right now?",
            options: ["Yes", "No", "I'm not sure"]
        }
    ],

    link: [
        {
            question: "What happened after opening the link?",
            options: ["Nothing happened", "A file was downloaded", "A website opened", "I'm not sure"]
        },
        {
            question: "Did you enter any personal or account information?",
            options: ["Yes", "No"]
        },
        {
            question: "Did you install or open a downloaded file?",
            options: ["Yes", "No"]
        }
    ]
};

const currentQuestions = questionSets[situation];

if (currentQuestions && questionContainer) {
    currentQuestions.forEach(function(item, index) {
        const question = document.createElement("div");
        question.className = "question";

        const heading = document.createElement("h4");
        heading.textContent = (index + 1) + ". " + item.question;

        question.appendChild(heading);

        item.options.forEach(function(option) {
            const label = document.createElement("label");
            const radio = document.createElement("input");

            radio.type = "radio";
            radio.name = "question-" + index;
            radio.value = option;

            label.appendChild(radio);
            label.appendChild(document.createTextNode(" " + option));

            question.appendChild(label);
            question.appendChild(document.createElement("br"));
        });

        questionContainer.appendChild(question);
    });
}

if (showGuidanceButton) {
    showGuidanceButton.addEventListener("click", function() {

        if (!currentQuestions) {
            return;
        }

        const answers = [];

        // Collect the visitor's answers
        for (let i = 0; i < currentQuestions.length; i++) {
            const answer = document.querySelector(
                'input[name="question-' + i + '"]:checked'
            );

            if (!answer) {
                alert("Please answer all the questions first.");
                return;
            }

            answers.push(answer.value);
        }

        let selectedSteps = [];

        // HACKED ACCOUNT
        if (situation === "hacked") {

            if (answers[0] === "Yes") {
                selectedSteps.push(
                    "Change your password using the official platform."
                );
                selectedSteps.push(
                    "Log out of unfamiliar active sessions."
                );
            } else {
                selectedSteps.push(
                    "Use the platform's official account recovery process."
                );
            }

            if (answers[1] === "Yes") {
                selectedSteps.push(
                    "Contact platform support about the recovery details changed without your permission."
                );
            } else {
                selectedSteps.push(
                    "Check that your recovery email and phone number are still yours."
                );
            }

            if (answers[2] === "Yes") {
                selectedSteps.push(
                    "Warn your contacts not to trust suspicious messages from your account."
                );
            } else {
                selectedSteps.push(
                    "Check your account activity for unfamiliar messages or changes."
                );
            }

            selectedSteps.push(
                "Secure the email account connected to your social media account."
            );
            selectedSteps.push(
                "Enable two-factor authentication when you regain control."
            );
        }

        // MONEY LOST TO A SCAM
        else if (situation === "scam") {

            selectedSteps.push(
                "Contact your bank or payment provider immediately using its official contact details."
            );

            if (answers[1] === "No") {
                selectedSteps.push(
                    "Explain the transaction and ask whether it can be stopped, reversed, or disputed."
                );
            }

            if (answers[0] === "Bank transfer") {
                selectedSteps.push(
                    "Keep the bank transfer receipt and transaction reference number."
                );
            } else if (answers[0] === "Mobile wallet") {
                selectedSteps.push(
                    "Save your wallet transaction ID and payment receipt."
                );
            } else if (answers[0] === "Debit or credit card") {
                selectedSteps.push(
                    "Ask your card provider about securing or blocking the card."
                );
            } else {
                selectedSteps.push(
                    "Keep all payment receipts and transaction references."
                );
            }

            if (answers[2] === "Yes" || answers[2] === "I'm not sure") {
                selectedSteps.push(
                    "Contact your bank or wallet provider about securing your account. Never share another OTP or password."
                );
            }

            selectedSteps.push(
                "Save screenshots, messages, receipts and other evidence."
            );
            selectedSteps.push(
                "Tell a trusted adult about the incident and report it through an appropriate official channel."
            );
        }

        // THREATS
        else if (situation === "threat") {

            if (answers[2] === "Yes" || answers[2] === "I'm not sure") {
                selectedSteps.push(
                    "If you may be in immediate danger, move to a safer place and contact a trusted adult or local emergency services."
                );
            }

            selectedSteps.push(
                "Do not respond to threats, agree to demands, or send money."
            );

            if (answers[1] === "No") {
                selectedSteps.push(
                    "Preserve available messages, usernames, profile links and dates as evidence."
                );
            } else {
                selectedSteps.push(
                    "Keep your saved screenshots and other evidence somewhere secure."
                );
            }

            selectedSteps.push(
                "Tell a trusted adult or someone you feel safe approaching."
            );
            if (answers[0] === "Social media") {
                selectedSteps.push(
                    "Report the threatening account using the platform's official reporting feature."
                );
            }
            else if (answers[0] === "Messaging app") {
                selectedSteps.push(
                    "Report the threatening conversation through the messaging app."
                );
            }
            else if (answers[0] === "Email") {
                selectedSteps.push(
                    "Report the threatening email using your email provider's reporting option."
                );
            }
            else {
                selectedSteps.push(
                    "Use the official reporting channel of the service where you received the threats."
                );
            }
            selectedSteps.push(
                "Consider reporting the incident to the appropriate authorities."
            );
        }

        // SUSPICIOUS LINK
        else if (situation === "link") {

            selectedSteps.push(
                "Close the suspicious website and do not enter any more information."
            );

            if (answers[0] === "A file was downloaded") {
                if (answers[2] === "Yes") {
                    selectedSteps.push(
                        "Since you opened the downloaded file, stop using it and run a security scan with trusted security software."
                    );
                } else {
                    selectedSteps.push(
                        "Do not open the downloaded file. Delete it only if you can do so safely, and scan your device using trusted security software."
                    );
                }
            }
            else if (answers[0] === "A website opened") {
                selectedSteps.push(
                    "Close the website and avoid interacting with it further."
                );
            }
            else if (answers[0] === "I'm not sure") {
                selectedSteps.push(
                    "Check your device's downloads folder for unfamiliar files and use trusted security software to scan your device."
                );
            }
            else {
                selectedSteps.push(
                    "Continue monitoring your device and accounts for unfamiliar activity."
                );
            }

            if (answers[1] === "Yes") {
                selectedSteps.push(
                    "Change the affected password from a trusted device using the official website or app."
                );
                selectedSteps.push(
                    "If you entered banking details or an OTP, contact your bank immediately."
                );
            } else {
                selectedSteps.push(
                    "Avoid entering passwords, OTPs or personal information on the suspicious website."
                );
            }

            selectedSteps.push(
                "Update your device and browser."
            );
            selectedSteps.push(
                "Check your important accounts for unfamiliar activity."
            );
        }

        renderGuidance(selectedSteps);

        document.getElementById("questions-section").hidden = true;
        document.getElementById("guidance-results").hidden = false;
    });
}




function renderGuidance(steps) {
    const guidanceContainer = document.getElementById("guidance-steps");

    // Clear any old checklist
    guidanceContainer.innerHTML = "";

    steps.forEach(function(step, index) {
        const stepDiv = document.createElement("div");
        stepDiv.className = "guidance-step";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "step-" + index;

        const label = document.createElement("label");
        label.htmlFor = checkbox.id;
        label.textContent = step;

        checkbox.addEventListener("change", function() {
            stepDiv.classList.toggle("completed", checkbox.checked);
            updateProgress();
        });

        stepDiv.appendChild(checkbox);
        stepDiv.appendChild(label);

        guidanceContainer.appendChild(stepDiv);
    });

    updateProgress();
}

function updateProgress()
{
    const progressText = document.getElementById("progress-text");
    const progressBar = document.getElementById("progress-bar");

    if (!progressText || !progressBar) {
        return;
    }

    const checkboxes = document.querySelectorAll(
        "#guidance-steps input[type='checkbox']"
    );

    const completed = document.querySelectorAll(
        "#guidance-steps input[type='checkbox']:checked"
    ).length;

    const total = checkboxes.length;

    progressText.textContent = completed + " / " + total + " steps completed";

    const percentage = total === 0 ? 0 : (completed / total) * 100;

    progressBar.style.width = percentage + "%";
}
updateProgress();
}


const searchInput = document.getElementById("glossary-search");
const glossaryCards = document.querySelectorAll(".glossary-card");
const filterButtons = document.querySelectorAll(".filter-btn");

let selectedCategory = "all";

function filterGlossary() {

    if (!searchInput) {
        return;
    }

    const searchText = searchInput.value.toLowerCase().trim();

    glossaryCards.forEach(function(card) {

        const cardText = card.textContent.toLowerCase();
        const cardCategory = card.dataset.category;

        const matchesSearch = cardText.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            cardCategory === selectedCategory;

        card.hidden = !(matchesSearch && matchesCategory);
    });
}

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        selectedCategory = button.dataset.filter;

        filterButtons.forEach(function(item) {
            item.classList.remove("active");
        });

        button.classList.add("active");

        filterGlossary();
    });
});

if (searchInput) {
    searchInput.addEventListener("input", filterGlossary);
}

const feedbackForm = document.getElementById("feedback-form");
const feedbackSuccess = document.getElementById("feedback-success");

if (feedbackForm && feedbackSuccess) {

    feedbackForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("feedback-name").value.trim();
        const email = document.getElementById("feedback-email").value.trim();
        const message = document.getElementById("feedback-message").value.trim();

        const nameError = document.getElementById("name-error");
        const emailError = document.getElementById("email-error");
        const messageError = document.getElementById("message-error");
        const formError = document.getElementById("feedback-error");

        // Clear previous error messages
        nameError.textContent = "";
        emailError.textContent = "";
        messageError.textContent = "";
        formError.hidden = true;

        let isValid = true;

        // Name validation
        if (name === "") {
            nameError.textContent = "Please enter your name.";
            isValid = false;
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {
            emailError.textContent = "Please enter your email address.";
            isValid = false;
        }
        else if (!emailPattern.test(email)) {
            emailError.textContent = "Please enter a valid email address.";
            isValid = false;
        }

        // Message validation
        if (message.length < 10) {
            messageError.textContent = "Your message must contain at least 10 characters.";
            isValid = false;
        }

        if (!isValid) {
            formError.textContent = "Please correct the errors above.";
            formError.hidden = false;
            return;
        }

        feedbackForm.hidden = true;
        feedbackSuccess.hidden = false;
    });
}