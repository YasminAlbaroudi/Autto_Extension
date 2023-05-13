const backgroundDs_functions = {
  Browser: {
    12: async function () {
      return window.location.href;
    },
    1: function (params) {
      params[0].value ||= params[0].default;
      params[0].value = params[0].value.replace("https://", "");
      let win = window.open(`https://${params[0].value}`, "_blank");
      win.focus();
      return true;
    },
    2: async function (params) {
      //close current tab
      window.close();
    },
    14: async function (params) {
      switch (params[0].value) {
        case "prev":
        //move to previous tab

        case "url":
          chrome.tabs.query(
            { currentWindow: true, url: params[1].value },
            function (tabs) {
              if (tabs.length > 0) {
                chrome.tabs.update(tabs[0].id, { active: true });
              }
            }
          );
          break;
        case "next":
          chrome.tabs.query({ currentWindow: true }, function (tabs) {
            var activeTab = tabs.filter(function (tab) {
              return tab.active;
            })[0];
            var index = activeTab.index + 1;
            if (index >= tabs.length) {
              index = 0;
            }
            chrome.tabs.update(tabs[index].id, { active: true });
          });
          break;
        case "index":
          chrome.tabs.query({ currentWindow: true }, function (tabs) {
            if (params[1].value < tabs.length) {
              chrome.tabs.update(tabs[params[1].value].id, { active: true });
            }
          });
          break;
      }
    },
    19: async function (params) {
      alert(params[0].value);
      return true;
    },
  },
  Web: {
    10: async function (params, tries = 0) {
      //get input with placeholder or aria-label = params[0].value
      let input = document.querySelector(
        `input[placeholder="${params[0].value}" i]`
      );
      if (!input) {
        input = document.querySelector(
          `div[placeholder="${params[0].value}" i]`
        );
      }
      if (!input) {
        input = document.querySelector(`p[placeholder="${params[0].value}" i]`);
      }
      if (!input) {
        input = document.querySelector(
          `p[data-placeholder="${params[0].value}" i]`
        );
      }
      if (!input) {
        input = document.querySelector(
          `input[aria-label="${params[0].value}" i]`
        );
      }
      if (!input) {
        input = document.querySelector(
          `div[aria-label="${params[0].value}" i]`
        );
      }
      if (!input) {
        input = document.querySelector(`p[aria-label="${params[0].value}" i]`);
      }
      if (!input) {
        input = document.querySelector(
          `input[aria-labelledby="${params[0].value}" i]`
        );
      }
      if (!input) {
        input = document.querySelector(
          `div[aria-labelledby="${params[0].value}" i]`
        );
      }
      if (!input) {
        input = document.querySelector(
          `p[aria-labelledby="${params[0].value}" i]`
        );
      }
      if (!input) {
        input = document.querySelector(
          `input[aria-describedby="${params[0].value}" i]`
        );
      }
      if (!input) {
        input = document.querySelector(
          `div[aria-describedby="${params[0].value}" i]`
        );
      }
      if (!input) {
        input = document.querySelector(
          `p[aria-describedby="${params[0].value}" i]`
        );
      }
      if (!input) {
        input = document.querySelector(`input[title="${params[0].value}" i]`);
      }
      if (!input) {
        input = document.querySelector(`div[title="${params[0].value}" i]`);
      }
      if (!input) {
        input = document.querySelector(`p[title="${params[0].value}" i]`);
      }
      if (!input) {
        input = document.querySelector(`input[name="${params[0].value}" i]`);
      }
      if (!input) {
        input = document.querySelector(`div[name="${params[0].value}" i]`);
      }
      if (!input) {
        input = document.querySelector(`p[name="${params[0].value}" i]`);
      }
      if (!input) {
        input = document.querySelector(`input[id="${params[0].value}" i]`);
      }
      if (!input) {
        input = document.querySelector(`div[id="${params[0].value}" i]`);
      }
      if (!input) {
        input = document.querySelector(`p[id="${params[0].value}" i]`);
      }
      if (input) {
        // alert("Input found");
        if (input.tagName == "DIV" || input.tagName == "P") {
          input.innerHTML = params[1].value;
        } else {
          input.value = params[1].value;
        }
        let event = new Event("input", {
          bubbles: true,
          cancelable: true,
        });

        input.dispatchEvent(event);
        return true;
      }
      if (tries < 5) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        return this[10](params, tries + 1);
      }
      // alert("Input not found");
      return false;
    },
    13: async function (params) {
      //focus input with placeholder or aria-label = params[0].value
      let input = document.querySelector(
        `input[placeholder="${params[0].value}" i]`
      );
      if (!input) {
        input = document.querySelector(
          `div[placeholder="${params[0].value}" i]`
        );
      }
      if (!input) {
        input = document.querySelector(
          `input[aria-label="${params[0].value}" i]`
        );
      }
      if (!input) {
        input = document.querySelector(
          `div[aria-label="${params[0].value}" i]`
        );
      }
      if (!input) {
        input = document.querySelector(
          `input[aria-labelledby="${params[0].value}" i]`
        );
      }
      if (!input) {
        input = document.querySelector(
          `div[aria-labelledby="${params[0].value}" i]`
        );
      }
      if (!input) {
        input = document.querySelector(
          `input[aria-describedby="${params[0].value}" i]`
        );
      }
      if (!input) {
        input = document.querySelector(
          `div[aria-describedby="${params[0].value}" i]`
        );
      }
      if (!input) {
        input = document.querySelector(`input[title="${params[0].value}" i]`);
      }
      if (!input) {
        input = document.querySelector(`div[title="${params[0].value}" i]`);
      }
      if (!input) {
        input = document.querySelector(`input[name="${params[0].value}" i]`);
      }
      if (!input) {
        input = document.querySelector(`div[name="${params[0].value}" i]`);
      }
      if (!input) {
        input = document.querySelector(`input[id="${params[0].value}" i]`);
      }
      if (!input) {
        input = document.querySelector(`div[id="${params[0].value}" i]`);
      }
      if (input) {
        // alert("Input found");
        input.focus();
        return true;
      } else {
        // alert("Input not found");
        return false;
      }
    },
    20: async function (params, timesRun = 0) {
      //click element that contains text
      const clickableElements = document.querySelectorAll(
        "a, button,span, input[type='submit'], [role='button'], [onclick],h5"
      );
      console.log("clickableElements", clickableElements);
      // Loop through each clickable element and check if it contains the text
      for (let i = 0; i < clickableElements.length; i++) {
        const element = clickableElements[i];
        if (
          element.innerHTML == params[0].value ||
          element.value == params[0].value ||
          element["aria-label"] == params[0].value ||
          element["aria-labelledby"] == params[0].value ||
          element["aria-describedby"] == params[0].value ||
          element["title"] == params[0].value ||
          element["name"] == params[0].value ||
          element["id"] == params[0].value ||
          element["placeholder"] == params[0].value
        ) {
          // Found the element, click on it and return true
          console.log("Found element with text: ", element);
          element.click();
          return true;
        }
      }
      if (
        timesRun < 10 ||
        document.body.textContent.includes("loading") ||
        document.body.textContent.includes("Loading")
      ) {
        //set time out for 3 seconds and try again
        await new Promise((resolve) => setTimeout(resolve, 5000));
        return backgroundDs_functions.Web[20](params, timesRun++);
      }

      // Did not find any clickable element with the given text, return false
      return false;
    },
    11: async function (params) {
      robot.setKeyboardDelay(500);
      robot.keyTap("enter");
      robot.typeString(params[0].value);

      const enterKeyCode = 13;
      robot.keyTap(enterKeyCode);

      targetInput.value = params[0].value;
    },
    12: async function (params) {
      console.log("params IN TYPING BY ID", params);
      let input = document.getElementById(params[0].value);
      console.log("input", input);
      input.value = params[1].value;
      return true;
    },
  },
  Data: {
    1: async function (params) {
      //get any data from the page that containes the text params[0].value
      const value = params[0].value.toLowerCase();
      const elements = document.querySelectorAll(`p, span, div, a`);
      const uniqueLines = new Set();
      Array.from(elements)
        .filter(
          (element) =>
            element.innerHTML.toLowerCase().includes(value) ||
            element.innerText.toLowerCase().includes(value)
        )
        .forEach((element) => {
          const lines = element.innerHTML.split("\n");
          lines.forEach((line) => {
            if (line.toLowerCase().includes(value) && line.trim().length > 0) {
              const textOnlyLine = line
                .replace(/<[^>]*>/g, "")
                .replace(/,/g, "")
                .replace(/\n/g, "")
                .trim();
              if (textOnlyLine.length > 0) {
                uniqueLines.add(textOnlyLine);
              }
            }
          });
        });
      const matchingLines = Array.from(uniqueLines).join("\n");

      console.warn("lines", matchingLines);
      return matchingLines;
    },
    2: async function (params) {
      //generate CSV from fetched data with the name of params[0].value or default if not provided and data is in params[1].value
      const blob = new Blob([params[1].value], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${params[0].value || params[0].default}.csv`
      );
      link.setAttribute("display", "none");
      document.body.appendChild(link);
      link.click();
      link.remove();
    },
  },
};

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse,
  options
) {
  console.log("request", request);
  console.log("sender", sender);
  console.log("options", options);
  console.log("sendResponse", sendResponse);

  let value = await backgroundDs_functions[request.data.category][
    request.data.id
  ](request.data.params);
  value ||= true;
  //5 seconds buffer

  sendResponse({ value: value });
});

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     if (request.message === "fetchData") {
//       // perform some data fetching logic here
//       let data = "sample data";
//       sendResponse({ message: "dataFetched", data: data });
//     }
//   });
