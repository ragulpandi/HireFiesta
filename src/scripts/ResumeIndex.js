var personal_info_details = {};
var profile_info_details = {};
var skills_list = [];
var education_list = [];
var experience_list = [];
var achievements_list = [];

export function changeMainDivContent(divIdDetails) {
  var id_name = divIdDetails.target.getAttribute("value");
  document
    .querySelectorAll(`[data-name='resume-internal-div']`)
    .forEach((div_details) => {
      if (div_details.id === id_name) {
        div_details.classList.remove("hide");
      } else {
        div_details.classList.add("hide");
      }
    });
}

export function fillResumeTemplet() {
  personal_info_details = {};
  profile_info_details = {};
  skills_list = [];
  education_list = [];
  experience_list = [];
  achievements_list = [];

  var personal_info = document.getElementById(
    "personal-input-container"
  ).children;
  for (var i = 0; i < personal_info.length; i++) {
    if (personal_info[i].name !== undefined && personal_info[i].name !== "") {
      personal_info_details[personal_info[i].name] = personal_info[i].value;
    }
  }

  var profile_info = document.getElementById(
    "profile-input-container"
  ).children;
  for (var i = 0; i < profile_info.length; i++) {
    if (profile_info[i].name !== undefined && profile_info[i].name !== "") {
      profile_info_details[profile_info[i].name] = profile_info[i].value;
    }
  }

  getDetailsFromContainer(education_list, "education-input-container"); // education related details
  getDetailsFromContainer(experience_list, "experience-input-container"); // experience related details

  document.getElementsByName("skills[]").forEach((skills) => {
    if (skills.value !== "") {
      skills_list.push(skills.value);
    }
  });

  document.getElementsByName("achievements[]").forEach((achievements) => {
    if (achievements.value !== "") {
      achievements_list.push(achievements.value);
    }
  });

  console.log(personal_info_details);
  console.log(profile_info_details);
  console.log(skills_list);
  console.log(achievements_list);
  console.log(experience_list);
  console.log(education_list);

  document.querySelector(`[data-name='resumer-name']`).textContent =
    personal_info_details["first-name"];
  document.querySelector(`[data-name='resumer-about-you']`).textContent =
    personal_info_details["about-you"];
  document.querySelector(`[data-name='resumer-email']`).textContent =
    personal_info_details["email"];
  document.querySelector(`[data-name='resumer-mobile-number']`).textContent =
    personal_info_details["mobile-number"];
  document.querySelector(`[data-name='resumer-city']`).textContent =
    personal_info_details["city"];

  document.querySelector(`[data-name='resumer-profile-details']`).textContent =
    profile_info_details["profile-details"];

  jobInsertionInResume();

  educationInsertionInResume();

  skillsInsertionInResume();

  achievementInsertionInResume();

  showPreview();
}

export function skillsInsertionInResume() {
  var e = document.querySelector(`[data-name='resumer-skills-details']`);
  var child = e.lastElementChild;
  while (child) {
    e.removeChild(child);
    child = e.lastElementChild;
  }
  var i = 0;
  var skillLength = skills_list.length - 1;
  // var noOfElementsToAddLastClass = (skillLength % 3) == 0 ? 3 : (skillLength % 3);
  while (i <= skillLength) {
    const skillDiv = document.createElement("div");
    var j = i;
    const skillUl = document.createElement("ul");
    skillUl.classList = "talent";
    while (j < i + 3) {
      const skillLi = document.createElement("li");
      skillLi.innerHTML = skills_list[j];
      if (j === i + 2) {
        skillLi.classList = "last";
      }
      skillUl.appendChild(skillLi);
      j++;
    }
    i = j;
    skillDiv.appendChild(skillUl);
    e.appendChild(skillDiv);
  }
}

export function achievementInsertionInResume() {
  var e = document.querySelector(`[data-name='resumer-achievements-details']`);
  var child = e.lastElementChild;
  while (child) {
    e.removeChild(child);
    child = e.lastElementChild;
  }
  for (var i = 0; i < achievements_list.length; i++) {
    const achievementDiv = document.createElement("div");
    if (i === achievements_list.length - 1) {
      achievementDiv.classList = "job last";
    } else {
      achievementDiv.classList = "job";
    }
    const achievementDetails = document.createElement("h2");
    achievementDetails.innerHTML = achievements_list[i];
    achievementDiv.appendChild(achievementDetails);
    e.appendChild(achievementDiv);
  }
}

export function jobInsertionInResume() {
  var e = document.querySelector(`[data-name='resumer-experience-details']`);
  var child = e.lastElementChild;
  while (child) {
    e.removeChild(child);
    child = e.lastElementChild;
  }
  for (var i = 0; i < experience_list.length; i++) {
    const jobDiv = document.createElement("div");
    if (i === experience_list.length - 1) {
      jobDiv.classList = "job last";
    } else {
      jobDiv.classList = "job";
    }
    const jobName = document.createElement("h2");
    jobName.innerText = experience_list[i]["company-name"];
    const jobTitle = document.createElement("h3");
    jobTitle.innerText = experience_list[i]["job-title"];
    const jobStartAndEndDate = document.createElement("h4");
    jobStartAndEndDate.innerText =
      experience_list[i]["start-date"] + "-" + experience_list[i]["end-date"];
    const jobDescription = document.createElement("h3");
    jobDescription.innerText = experience_list[i]["job-description"];

    jobDiv.append(jobName, jobTitle, jobStartAndEndDate, jobDescription);

    document
      .querySelector(`[data-name='resumer-experience-details']`)
      .appendChild(jobDiv);
  }
}

export function educationInsertionInResume() {
  var e = document.querySelector(`[data-name='resumer-education-details']`);
  var child = e.lastElementChild;
  while (child) {
    e.removeChild(child);
    child = e.lastElementChild;
  }
  for (var i = 0; i < education_list.length; i++) {
    const educationDiv = document.createElement("div");
    if (i === education_list.length - 1) {
      educationDiv.classList = "job last";
    } else {
      educationDiv.classList = "job";
    }
    const educationName = document.createElement("h2");
    educationName.innerText = education_list[i]["institute-name"];
    const educationAddress = document.createElement("h3");
    educationAddress.innerText =
      education_list[i]["institute-city"] +
      ", " +
      education_list[i]["institute-state"];
    const educationStartAndEndDate = document.createElement("h4");
    educationStartAndEndDate.innerText =
      education_list[i]["education-start-date"] +
      "-" +
      education_list[i]["education-end-date"];
    const educationDescription = document.createElement("h3");
    educationDescription.innerText =
      education_list[i]["degree"] +
      ", " +
      education_list[i]["branch"] +
      " - " +
      education_list[i]["percentage"] +
      " CGPA";

    educationDiv.append(
      educationName,
      educationAddress,
      educationStartAndEndDate,
      educationDescription
    );

    document
      .querySelector(`[data-name='resumer-education-details']`)
      .appendChild(educationDiv);
  }
}

export function getDetailsFromContainer(
  listNameOfWhereToStore,
  idNameOfTheContainer
) {
  var childElementList = document.getElementById(idNameOfTheContainer).children;
  for (var i = 0; i < childElementList.length; i++) {
    var child_info = childElementList[i].children;
    var childObj = {};
    for (var j = 0; j < child_info.length; j++) {
      var child_internal_div = child_info[j].children;
      for (var k = 0; k < child_internal_div.length; k++) {
        if (child_internal_div[k].name !== undefined) {
          childObj[child_internal_div[k].name] = child_internal_div[k].value;
        }
      }
    }
    listNameOfWhereToStore.push(childObj);
  }
}

export function downloadResume() {
  fillResumeTemplet();
  window.print();
  window.onafterprint = function () {
    window.location.reload(true);
  };
  window.matchMedia("print").addListener(function (media) {
    if (media.matches) {
    } else {
      window.location.reload(true);
    }
  });
}

export function showPreview() {
  document
    .querySelector(`[data-name='resume-templet1']`)
    .classList.remove("hide");
}

export function hidePreview() {
  document.querySelector(`[data-name='resume-templet1']`).classList.add("hide");
}

export function input_field_generator(
  nameOfElementToBeCreated,
  nameOfTheBlock,
  BlockSpecificPlaceholder
) {
  console.log("asdfasdfasdfasdf");
  const input_container = document.getElementById(
    nameOfTheBlock + "-input-container"
  );
  const divForInput = document.createElement("div");
  var new_input_field_no =
    parseInt(document.getElementById("total_" + nameOfTheBlock).value) + 1;
  divForInput.dataset.name = nameOfTheBlock + "_" + new_input_field_no;
  const fieldToBeCreated = document.createElement(nameOfElementToBeCreated);
  fieldToBeCreated.type = "text";
  fieldToBeCreated.name = nameOfTheBlock + "[]";
  fieldToBeCreated.placeholder = BlockSpecificPlaceholder;
  document.getElementById("total_" + nameOfTheBlock).value = new_input_field_no;

  const removeBtn = document.createElement("button");
  removeBtn.innerText = "remove";
  removeBtn.addEventListener("click", input_field_remover);
  removeBtn.dataset.name = nameOfTheBlock + "_" + new_input_field_no;

  divForInput.appendChild(fieldToBeCreated);
  divForInput.appendChild(removeBtn);

  input_container.appendChild(divForInput);
}

export function input_field_remover(event) {
  var buttonDataName = event.target.dataset.name;
  document
    .querySelectorAll(`[data-name="${buttonDataName}"]`)
    .forEach((removeButton) => {
      removeButton.remove();
    });
}

export function experience_input_field_generator() {
  const experience_input_container = document.getElementById(
    "experience-input-container"
  );

  const divIdDetails = document.createElement("div");
  var new_experience_no =
    parseInt(document.getElementById("total_experience").value) + 1;
  divIdDetails.dataset.name = "experience_" + new_experience_no;
  var companyName = field_specific_generator(
    "Company name",
    "input",
    "company-name",
    "Enter your Company name",
    "text"
  );
  var jobTitle = field_specific_generator(
    "Enter your job title",
    "input",
    "job-title",
    "Ex: Senior Web Developer",
    "text"
  );
  var jobDescription = field_specific_generator(
    "Enter your job description",
    "input",
    "job-description",
    "Enter about your Experience",
    "text",
    "textarea"
  );
  var startDate = field_specific_generator(
    "Start date",
    "input",
    "start-date",
    "",
    "date"
  );
  var endDate = field_specific_generator(
    "End date",
    "input",
    "end-date",
    "",
    "date"
  );

  const removeBtn = document.createElement("button");
  removeBtn.innerText = "remove";
  removeBtn.addEventListener("click", input_field_remover);
  removeBtn.dataset.name = "experience_" + new_experience_no;

  document.getElementById("total_experience").value = new_experience_no;

  divIdDetails.appendChild(companyName);
  divIdDetails.appendChild(jobTitle);
  divIdDetails.appendChild(jobDescription);
  divIdDetails.appendChild(startDate);
  divIdDetails.appendChild(endDate);
  divIdDetails.appendChild(removeBtn);

  experience_input_container.appendChild(divIdDetails);
}

export function education_input_field_generator() {
  const education_input_container = document.getElementById(
    "education-input-container"
  );
  const divIdDetails = document.createElement("div");
  var new_education_no =
    parseInt(document.getElementById("total_education").value) + 1;
  divIdDetails.dataset.name = "education_" + new_education_no;
  var instituteName = field_specific_generator(
    "Enter name of your institute",
    "input",
    "institute-name",
    "Ex: Bannari Amman Institute of Tech",
    "text"
  );
  var instituteCity = field_specific_generator(
    "Enter the city",
    "input",
    "institute-city",
    "Ex: Sathyamangalam",
    "text"
  );
  var instituteState = field_specific_generator(
    "Enter the state",
    "input",
    "institute-state",
    "Ex: Tamilnadu",
    "text"
  );
  var degree = field_specific_generator(
    "Enter your Degree",
    "input",
    "degree",
    "Ex: BE,BTech",
    "text"
  );
  var fieldOfStudy = field_specific_generator(
    "Enter your field of study",
    "input",
    "branch",
    "Ex: ECE,CSE,..",
    "text"
  );
  var percentage = field_specific_generator(
    "Enter your percentage",
    "input",
    "percentage",
    "Ex: 95",
    "number"
  );
  var startDate = field_specific_generator(
    "Start year of education",
    "input",
    "education-start-date",
    "",
    "date"
  );
  var endDate = field_specific_generator(
    "Select graducation year",
    "input",
    "education-end-date",
    "",
    "date"
  );

  const removeBtn = document.createElement("button");
  removeBtn.innerText = "remove";
  removeBtn.addEventListener("click", input_field_remover);
  removeBtn.dataset.name = "education_" + new_education_no;

  document.getElementById("total_education").value = new_education_no;

  divIdDetails.appendChild(instituteName);
  divIdDetails.appendChild(instituteCity);
  divIdDetails.appendChild(instituteState);
  divIdDetails.appendChild(degree);
  divIdDetails.appendChild(fieldOfStudy);
  divIdDetails.appendChild(percentage);
  divIdDetails.appendChild(startDate);
  divIdDetails.appendChild(endDate);
  divIdDetails.appendChild(removeBtn);

  education_input_container.appendChild(divIdDetails);
}

export function field_specific_generator(
  lableForField,
  nameOfElementToBeCreated,
  nameForField,
  BlockSpecificPlaceholder,
  type1,
  className = ""
) {
  const divIdDetails = document.createElement("div");
  const lable = document.createElement("lable");
  lable.innerHTML = lableForField;
  const inputField = document.createElement(nameOfElementToBeCreated);
  if (className !== "") inputField.classList.add("textarea");
  inputField.type = type1;
  inputField.name = nameForField;
  inputField.placeholder = BlockSpecificPlaceholder;
  divIdDetails.appendChild(lable);
  divIdDetails.appendChild(inputField);
  return divIdDetails;
}