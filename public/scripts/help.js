const form = document.querySelector("form");

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    const first_name = formData.get("first-name");
    const last_name = formData.get("last-name");
    const number = formData.get("number");
    const needs = formData.get("needs");

    const helpReq = {
        first_name,
        last_name,
        number,
        needs
    }

    let response = await fetch("/help-request", {
        method: "POST",
        body: JSON.stringify(helpReq),
        headers: {
            "content-type": "application/json"
        }
    });
    let data = await response.json();
    if (data.message !== "successful") {
        let message =
            `Invalid Help Request!:\n
            - The Form might have an Empty Field.
            - One of The Names might be longer than 20 characters.
            - The Kind of Need might be longer than 140 characters.
            - Only Numbers are Allowed in The Phone Number Field.
            - One of The Fields might contain a Profanity.`;
        alert(message);
    } else {
        console.log(data.message);
        form.reset();

        let message = `Your Help Request Was Submitted Successfully!`;
        alert(message);
    }
});