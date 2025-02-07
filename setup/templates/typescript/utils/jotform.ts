import "pretty-print-json/pretty-print-json.css";

import { prettyPrintJson } from "pretty-print-json";
import type { CustomScriptRBAccountUser } from "../types";

const jotForm = {
  getJotFormIFrameSrc: function (user: CustomScriptRBAccountUser | null) {
    if (!user) {
      return `https://redbull.jotform.com/${process.env.JOTFORM_ID}`;
    }
    return (
      `https://redbull.jotform.com/${process.env.JOTFORM_ID}?email=` +
      user.userProfile.email +
      "&name[first]=" +
      user.userProfile.first_name +
      "&name[last]=" +
      user.userProfile.last_name
    );
  },
  getJotFormSubmissionData: async function (userSilodId: string) {
    if (!userSilodId) return;

    try {
      const baseUrl = `https://${process.env.BASE_SSL_URL}`;
      const response = await fetch(`${baseUrl}/cdm/submission/${userSilodId}`);

      return await response.json();
    } catch (err) {
      console.error("Could not fetch submission data", err);
      return "No data found";
    }
  },
  init: function (element: Element, user: CustomScriptRBAccountUser | null) {
    const iFrameSrc = this.getJotFormIFrameSrc(user);
    const jotFormPanel = document.createElement("div");
    jotFormPanel.classList.add("rb-example__panel");

    const jotFormCard = document.createElement("div");
    jotFormCard.innerHTML = `
      <h3>JotForm Example</h3>
      <div>
        <button class="tenant-cta__content" style="color: white; float:left;" id="fetchJotFormSubmission">Fetch Submission Data for logged in user</button>
      </div>
            <div class="clear: both;"></div>
            <div style="float: left; margin-top:10px; width: 100%; border-radius: 20px;">
            <pre id="submissionData"></pre>
            </div>
      <iframe src="${iFrameSrc}" style="border: none !important; padding: 10px; background-color: #efefef; border-radius: 5px; min-height: 800px; width: 100%; margin-top: 10px;"></iframe>
  `;
    jotFormCard.classList.add("rb-example__card");
    jotFormCard.style.width = "100%";
    jotFormCard.style.minHeight = "800px";
    jotFormPanel.appendChild(jotFormCard);
    element.appendChild(jotFormPanel);

    jotFormCard.addEventListener("click", async (ev) => {
      const target = ev.target as HTMLElement;
      if (!target) return;

      if (target.id === "fetchJotFormSubmission") {
        const submissionData = await this.getJotFormSubmissionData(
          user!.userProfile.id
        );

        const html = prettyPrintJson.toHtml(submissionData, {
          quoteKeys: true,
        });

        const submissionDataContainer =
          document.getElementById("submissionData");

        submissionDataContainer!.innerHTML = html;
        submissionDataContainer!.style.display = "block";
      }
    });
  },
};

export default jotForm;
