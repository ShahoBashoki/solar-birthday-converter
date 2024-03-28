const authorizeButton = document.getElementById("convert_birthday");

authorizeButton.addEventListener("click", convertBirthday);

function convertBirthday() {
  chrome.identity.getAuthToken({ interactive: true }, function (token) {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError);
      return;
    }

    createSolarBirthdayCalendar(token);
  });
}

function createSolarBirthdayCalendar(token) {
  const url = env.GOOGLE_CALENDAR_CALENDARS_URL + "?key=" + env.GOOGLE_API_KEY;

  const data = {
    summary: "solar-birthday",
  };

  const options = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
