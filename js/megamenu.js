 
      const tabs = document.querySelectorAll(".tab-btn");
      const specialty = document.getElementById("specialty");
      const outcome = document.getElementById("outcome");
      const articleImg = document.getElementById("article-img");
      const articleTitle = document.getElementById("article-title");
      const articleDesc = document.getElementById("article-desc");

      const tabContent = {
        willow: {
          specialty: ["For Practices", "For Billing Companies", "For Patients"],
          outcome: [
            "Streamline healthcare admin, workflows, financial management using AI.",
            "Optimize Your Healthcare Workflow.",
            "Simplify the way you handle documents, records, and compliance.",
          ],
          img: "images/subpage1/slider_doctor2.PNG",
          title: "Willow in Action: Simplifying Healthcare",
          desc: "Discover how AI transforms everyday healthcare operations.",
        },
        abacus: {
          specialty: ["For Billing Teams", "For Account Managers", "For Providers"],
          outcome: [
            "Automate repetitive billing workflows.",
            "Increase revenue efficiency through smarter analytics.",
            "Track performance and compliance effortlessly.",
          ],
          img: "images/subpage1/slider_doctor.PNG",
          title: "Abacus: Smarter Workflow Automation",
          desc: "Explore how Abacus helps teams accelerate billing processes.",
        },
        sdocs: {
          specialty: ["For Records Team", "For Compliance Officers"],
          outcome: [
            "Digitize, store, and secure documents with ease.",
            "Stay audit-ready and compliant effortlessly.",
            "Reduce paperwork and manual effort.",
          ],
          img: "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?auto=format&fit=crop&w=400&q=80",
          title: "sDocs: The Future of Document Management",
          desc: "Simplify documentation and compliance with sDocs AI.",
        },
      };

      tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          tabs.forEach((t) => t.classList.remove("text-teal-700"));
          tab.classList.add("text-teal-700");

          const data = tabContent[tab.dataset.tab];

          specialty.innerHTML = data.specialty
            .map((s) => `<p class=" font-medium">${s}</p>`)
            .join("");
          outcome.innerHTML = data.outcome
            .map((o) => `<p class="text-sm text-gray-700">${o}</p>`)
            .join("");
          articleImg.src = data.img;
          articleTitle.textContent = data.title;
          articleDesc.textContent = data.desc;
        });
      });

      // Set default active tab
      tabs[0].click();
   