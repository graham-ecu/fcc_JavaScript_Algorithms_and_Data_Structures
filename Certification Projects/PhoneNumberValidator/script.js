const input = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultsDiv = document.getElementById("results-div");

const validateInput = input => {
    if (input === "") {
        alert("Please provide a phone number");
        return;
    }
    const countryCode = '^(1\\s?)?';
    const areaCode = '(\\([0-9]{3}\\)|[0-9]{3})';
    const spacesDashes = '[\\s\\-]?';
    const phoneNumber = '[0-9]{3}[\\s\\-]?[0-9]{4}$';
    const phoneRegex = new RegExp(
        `${countryCode}${areaCode}${spacesDashes}${phoneNumber}`
    );

    const pLine = document.createElement('p');
    pLine.className = "results-text";
    phoneRegex.test(input)
    ? (pLine.style.color = "blue")
    : (pLine.style.color = "red");
    pLine.appendChild(
        document.createTextNode(
            `${phoneRegex.test(input) ? "Valid" : "Invalid"} US number: ${input}`
        )
    );
    resultsDiv.appendChild(pLine);
};

const clearResults = () => {
    resultsDiv.textContent = "";
};

checkBtn.addEventListener('click', () => {
    validateInput(input.value);
    input.value = "";
});

input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        validateInput(input.value);
        input.value = "";
    }
});

clearBtn.addEventListener('click', clearResults);