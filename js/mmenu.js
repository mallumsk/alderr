  const isMobile = () => window.innerWidth < 640;

      // Flicker Fix: Ensure the panel is hidden immediately on load
      document.getElementById("toggleDiv").classList.add("smooth-hide");

      document.addEventListener("DOMContentLoaded", () => {
        const navButtons = document.querySelectorAll(".nav-toggle-btn");
        const closeButton = document.getElementById("closeButton");
        const toggleDiv = document.getElementById("toggleDiv");
        const header = document.getElementById("header");
        const navLinkTitle = document.getElementById("nav-link-title");
        const mobileMenuButton = document.getElementById("mobile-menu-button");
        const mobileMenu = document.getElementById("mobile-menu");

        // New Anchor Point for Desktop Insertion (the full width container)
        const desktopInsertionAnchor = document.getElementById(
          "desktop-page-wrapper"
        );
        // The constraint element used to determine where to place the panel relative to page content
        const mainContentContainer = document.getElementById(
          "main-content-container"
        );

        const aboutContent = document.getElementById("about-content");
        const tabbedContent = document.getElementById("tabbed-content");

        const tabButtons = document.querySelectorAll(".tab-btn");
        const tabPanes = document.querySelectorAll(".tab-pane");
        const tabContentWrapper = document.getElementById("tabContentWrapper");

        let isPanelOpen = false;
        let activeNavButton = null;

        // Define all colors associated with each tab (unchanged)
        const COLORS = {
          tab1: {
            contentBg: "bg-indigo-50",
            buttonBg: "bg-indigo-600",
            contentText: "text-indigo-800",
            titleText: "text-indigo-700",
          },
          tab2: {
            contentBg: "bg-pink-50",
            buttonBg: "bg-pink-600",
            contentText: "text-pink-800",
            titleText: "text-pink-700",
          },
          tab3: {
            contentBg: "bg-amber-50",
            buttonBg: "bg-amber-500",
            contentText: "text-amber-800",
            titleText: "text-amber-700",
          },
        };

        const INACTIVE_HOVER_CLASSES = {
          tab1: "hover:bg-indigo-100",
          tab2: "hover:bg-pink-100",
          tab3: "hover:bg-amber-100",
        };

        const ALL_BG_CLASSES = ["bg-indigo-50", "bg-pink-50", "bg-amber-50"];
        const ALL_BUTTON_BG_CLASSES = [
          "bg-indigo-600",
          "bg-pink-600",
          "bg-amber-500",
        ];
        const ALL_TEXT_CLASSES = [
          "text-indigo-800",
          "text-pink-800",
          "text-amber-800",
          "text-indigo-700",
          "text-pink-700",
          "text-amber-700",
          "text-white",
        ];
        const ALL_INACTIVE_CLASSES = ["text-gray-700", "hover:bg-gray-100"];

        // --- Arrow Helper ---
        const getArrow = (button) => {
          return button.querySelector(".arrow");
        };

        // --- Panel Visibility Functions ---
        const openDiv = (button) => {
          const linkName = button.getAttribute("data-link");
          const isAboutPanel = linkName === "About";

          // 1. Navigation Active State & Arrow Cleanup
          if (activeNavButton) {
            activeNavButton.classList.remove("nav-active");
            const prevArrow = getArrow(activeNavButton);
            if (prevArrow) prevArrow.classList.remove("rotated");
          }

          // 2. Dynamic Panel Movement (Mobile/Desktop) & Class Setup
          if (isMobile()) {
            // Mobile: Panel remains in normal flow (relative) to push content down
            button.parentNode.insertBefore(toggleDiv, button.nextSibling);
            // Ensure relative positioning and mobile styles
            toggleDiv.classList.add("relative", "border-x-0", "border-b-0");
            toggleDiv.classList.remove(
              "absolute",
              "top-0",
              "z-50",
              "mt-4",
              "sm:rounded-none",
              "sm:border-x-0",
              "border"
            );
          } else {
            // Desktop: Panel uses absolute positioning to overlay content
            if (toggleDiv.parentNode !== desktopInsertionAnchor) {
              desktopInsertionAnchor.insertBefore(
                toggleDiv,
                mainContentContainer
              );
            }
            // Apply ABOLUTE positioning to overlay content. top-0 aligns it exactly below the fixed header.
            toggleDiv.classList.add(
              "absolute",
              "top-14",
              "z-50",
              "sm:rounded-none",
              "sm:border-x-0",
              "border"
            );
            toggleDiv.classList.remove(
              "relative",
              "border-x-0",
              "border-b-0",
              "mt-4"
            );
          }

          // 3. Conditional Content Toggle
          if (isAboutPanel) {
            tabbedContent.classList.add("hidden");
            aboutContent.classList.remove("hidden");
          } else {
            aboutContent.classList.add("hidden");
            tabbedContent.classList.remove("hidden");
            openTab("tab1"); // Default to Tab 1 if content is tabbed
          }

          // 4. Navigation Active State & Arrow Update
          navLinkTitle.textContent = linkName;
          button.classList.add("nav-active");
          const currentArrow = getArrow(button);
          if (currentArrow) currentArrow.classList.add("rotated");
          activeNavButton = button;

          // 5. Show Panel
          toggleDiv.classList.add("smooth-show");
          toggleDiv.classList.remove("smooth-hide");
          isPanelOpen = true;
        };

        const closeDiv = (isManualClose = false) => {
          // Remove active state and rotation
          if (activeNavButton) {
            activeNavButton.classList.remove("nav-active");
            const arrow = getArrow(activeNavButton);
            if (arrow) arrow.classList.remove("rotated");
            activeNavButton = null;
          }

          // Hide Panel
          toggleDiv.classList.add("smooth-hide");
          toggleDiv.classList.remove("smooth-show");
          isPanelOpen = false;

          // Only close the mobile menu if the close trigger was NOT the internal close button or manual toggle.
          if (
            isMobile() &&
            !isManualClose &&
            !mobileMenu.classList.contains("hidden")
          ) {
            mobileMenu.classList.add("hidden");
          }
        };

        // --- Tab Switching Function (unchanged) ---
        const openTab = (tabId) => {
          const colorSet = COLORS[tabId];

          // 1. Clean up ALL tab buttons and set INACTIVE colored state
          tabButtons.forEach((btn) => {
            const btnTabId = btn.getAttribute("data-tab");
            const btnColorSet = COLORS[btnTabId];
            const hoverClass = INACTIVE_HOVER_CLASSES[btnTabId];

            // Remove all existing color, size, and active classes, including all hover classes we manage.
            btn.classList.remove(
              "tab-active",
              ...ALL_BUTTON_BG_CLASSES,
              ...ALL_BG_CLASSES,
              ...ALL_TEXT_CLASSES,
              "hover:bg-opacity-80", // Old hover class cleanup
              ...Object.values(INACTIVE_HOVER_CLASSES) // New hover class cleanup
            );

            // Apply the light background and EXPLICIT darker hover for INACTIVE state
            btn.classList.add(
              btnColorSet.contentBg,
              btnColorSet.titleText,
              hoverClass
            );
          });

          // 2. Hide all tab content panes
          tabPanes.forEach((pane) => {
            pane.classList.add("hidden");
          });

          // 3. Clean up content wrapper colors
          tabContentWrapper.classList.remove(...ALL_BG_CLASSES);

          // 4. Apply ACTIVE Button Colors
          const activeBtn = document.querySelector(
            `.tab-btn[data-tab="${tabId}"]`
          );
          if (activeBtn) {
            // Remove all inactive styles, including the hover class
            activeBtn.classList.remove(
              colorSet.contentBg,
              colorSet.titleText,
              INACTIVE_HOVER_CLASSES[tabId]
            );

            // Apply the dark active style. No separate hover class is added,
            // so the button color is constant whether active or hovered.
            activeBtn.classList.add(
              "text-white",
              "tab-active",
              colorSet.buttonBg
            );
          }

          // 5. Apply Content Wrapper Background Color (for the active tab)
          tabContentWrapper.classList.add(colorSet.contentBg);

          // 6. Show active tab pane and set dynamic text colors
          document.getElementById(tabId).classList.remove("hidden");

          // Update text color for content inside the tab pane
          const contentDiv = document.getElementById("tabContent");
          contentDiv.classList.remove(...ALL_TEXT_CLASSES);
          contentDiv.classList.add(colorSet.contentText);

          // Update the title color inside the tab pane
          const titleSpan = document.getElementById("nav-link-title");
          if (titleSpan) {
            titleSpan.classList.remove(...ALL_TEXT_CLASSES);
            titleSpan.classList.add(colorSet.titleText);
          }
        };

        // --- Event Listeners (mostly unchanged) ---
        mobileMenuButton.addEventListener("click", () => {
          mobileMenu.classList.toggle("hidden");
          if (isPanelOpen) {
            closeDiv(true);
          }
        });

        navButtons.forEach((button) => {
          button.addEventListener("click", (event) => {
            event.stopPropagation();

            if (isPanelOpen && activeNavButton === button) {
              closeDiv(true);
              return;
            }
            openDiv(button);
          });
        });

        closeButton.addEventListener("click", () => {
          closeDiv(true);
        });

        document.addEventListener("click", (event) => {
          if (isPanelOpen) {
            // Check if click target is outside the panel AND outside the header
            if (
              !toggleDiv.contains(event.target) &&
              !header.contains(event.target)
            ) {
              closeDiv(false);
            }
          }
        });

        tabButtons.forEach((button) => {
          button.addEventListener("click", () => {
            openTab(button.getAttribute("data-tab"));
          });
        });

        window.addEventListener("resize", () => {
          // Ensure the panel is correctly positioned on resize if changing from mobile to desktop view
          if (!isMobile() && toggleDiv.parentNode !== desktopInsertionAnchor) {
            closeDiv(true);
            desktopInsertionAnchor.insertBefore(
              toggleDiv,
              mainContentContainer
            );
            // Apply desktop overlay classes on resize if it needs to be moved back
            toggleDiv.classList.add(
              "absolute",
              "top-0",
              "z-50",
              "sm:rounded-none",
              "sm:border-x-0",
              "border"
            );
            toggleDiv.classList.remove(
              "relative",
              "border-x-0",
              "border-b-0",
              "mt-4"
            );
          }
        });
      });