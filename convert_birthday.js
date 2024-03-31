const authorizeButton = document.getElementById("convert_birthday");

authorizeButton.addEventListener("click", convertBirthday);

function convertBirthday() {
  chrome.identity.getAuthToken({ interactive: true }, function (token) {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError);
      return;
    }

    createSolarBirthdayCalendar(token);
    createBirthdayEvent()
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

function createBirthdayEvent() {
  const sample = require('./birthday2.json');

  for (var i = 0; i < sample.connections.length; i++) {
    var obj = sample.connections[i];
    // check if contact has birthday
    if (obj.hasOwnProperty('birthdays')) {
        // console.log(obj.birthdays[0].date);
        // 1. create sonar date object for each contact
        birthday = farvardin.gregorianToSolar(obj.birthdays[0].date.year, obj.birthdays[0].date.month, obj.birthdays[0].date.day +1)
        console.log(birthday);
        // https://github.com/senior-x-79/farvardin.js/blob/master/src/farvardin.js
        // 2. find current year
        persianYear = new Date().toLocaleDateString('fa-IR-u-nu-latn', { year: 'numeric' });
        // 3. create n event from current year
        n = 50
        for (var j =0; j < n; j++) {
            new_event = farvardin.solarToGregorian(parseInt(persianYear) + j, birthday[1], birthday[2])
        }
    }
}
}
3