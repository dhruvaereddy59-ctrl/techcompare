// ============================================
// TECHCOMPARE — MAIN APPLICATION
// ============================================

document.addEventListener("DOMContentLoaded", () => {

    // --------------------------------------------
    // PHONE DATABASE
    // --------------------------------------------

    const phoneDatabase =
        typeof phones !== "undefined" ? phones : [];


    // --------------------------------------------
    // CURRENT PAGE
    // --------------------------------------------

    const currentPage =
        window.location.pathname.split("/").pop();


    // --------------------------------------------
    // PHONE DATABASE PAGE
    // --------------------------------------------

    const phoneGrid =
        document.getElementById("phoneGrid");

    const phoneSearch =
        document.getElementById("phoneSearch");

    const phoneCount =
        document.getElementById("phoneCount");

    const noResults =
        document.getElementById("noResults");


    if (phoneGrid) {

        let activeBrand = "all";


        function renderPhones() {

            const searchTerm =
                phoneSearch
                    ? phoneSearch.value.toLowerCase().trim()
                    : "";


            const filteredPhones = phoneDatabase.filter(phone => {

                const matchesBrand =
                    activeBrand === "all" ||
                    phone.brand === activeBrand;


                const searchableText = [

                    phone.name,
                    phone.brand,
                    phone.family,
                    phone.type,
                    phone.tagline,
                    phone.description

                ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();


                const matchesSearch =
                    searchableText.includes(searchTerm);


                return matchesBrand && matchesSearch;

            });


            phoneGrid.innerHTML = "";


            filteredPhones.forEach(phone => {

                const card =
                    document.createElement("a");


                card.href =
                    `phone.html?id=${encodeURIComponent(phone.id)}`;


                card.className =
                    "phone-card";


                const highlight =
                    phone.highlights &&
                    phone.highlights.length
                        ? phone.highlights.slice(0, 3)
                        : [];


                card.innerHTML = `

                    <div class="phone-card-top">

                        <span class="phone-year">
                            ${phone.year || ""}
                        </span>

                        <span class="phone-type">
                            ${phone.type || "SMARTPHONE"}
                        </span>

                    </div>


                    <div class="phone-visual">

                        <div class="mini-phone">

                            <div class="mini-phone-screen">

                                <span>
                                    ${getBrandInitial(phone.brand)}
                                </span>

                            </div>

                        </div>

                    </div>


                    <div class="phone-card-info">

                        <span class="phone-family">
                            ${(phone.family || "").toUpperCase()}
                        </span>

                        <h3>
                            ${phone.name}
                        </h3>

                        <p>
                            ${phone.tagline || ""}
                        </p>

                    </div>


                    <div class="phone-highlights">

                        ${highlight.map(item => `
                            <span>${item}</span>
                        `).join("")}

                    </div>


                    <div class="phone-card-arrow">
                        VIEW PHONE →
                    </div>

                `;


                phoneGrid.appendChild(card);

            });


            if (phoneCount) {

                phoneCount.textContent =
                    `${filteredPhones.length} PHONE${filteredPhones.length === 1 ? "" : "S"}`;

            }


            if (noResults) {

                noResults.style.display =
                    filteredPhones.length === 0
                        ? "block"
                        : "none";

            }

        }


        // ----------------------------------------
        // SEARCH
        // ----------------------------------------

        if (phoneSearch) {

            phoneSearch.addEventListener(
                "input",
                renderPhones
            );

        }


        // ----------------------------------------
        // BRAND FILTERS
        // ----------------------------------------

        const filterButtons =
            document.querySelectorAll(".filter-button");


        filterButtons.forEach(button => {

            button.addEventListener("click", () => {

                filterButtons.forEach(btn =>
                    btn.classList.remove("active")
                );


                button.classList.add("active");


                activeBrand =
                    button.dataset.brand || "all";


                renderPhones();

            });

        });


        // ----------------------------------------
        // URL BRAND FILTER
        // ----------------------------------------

        const urlParams =
            new URLSearchParams(window.location.search);


        const urlBrand =
            urlParams.get("brand");


        if (urlBrand) {

            const matchingButton =
                document.querySelector(
                    `.filter-button[data-brand="${urlBrand}"]`
                );


            if (matchingButton) {

                filterButtons.forEach(btn =>
                    btn.classList.remove("active")
                );


                matchingButton.classList.add("active");


                activeBrand =
                    urlBrand;

            }

        }


        renderPhones();

    }


    // --------------------------------------------
    // COMPARISON ENGINE
    // --------------------------------------------

    const phoneA =
        document.getElementById("phoneA");

    const phoneB =
        document.getElementById("phoneB");


    if (phoneA && phoneB) {

        populatePhoneSelector(phoneA);
        populatePhoneSelector(phoneB);


        phoneA.addEventListener(
            "change",
            () => updateSelectedPhone(phoneA, "phoneAInfo")
        );


        phoneB.addEventListener(
            "change",
            () => updateSelectedPhone(phoneB, "phoneBInfo")
        );


        const runComparison =
            document.getElementById("runComparison");


        if (runComparison) {

            runComparison.addEventListener(
                "click",
                runPhoneComparison
            );

        }

    }


    // --------------------------------------------
    // COMPARISON MODE
    // --------------------------------------------

    const comparisonModes =
        document.querySelectorAll(".compare-mode");


    comparisonModes.forEach(mode => {

        mode.addEventListener("click", () => {

            comparisonModes.forEach(item =>
                item.classList.remove("active")
            );


            mode.classList.add("active");

        });

    });


    // --------------------------------------------
    // HELPERS
    // --------------------------------------------

    function getBrandInitial(brand) {

        const initials = {

            apple: "A",
            samsung: "S",
            nothing: "N",
            oneplus: "1+"

        };


        return initials[brand] || "TC";

    }


    function populatePhoneSelector(select) {

        phoneDatabase.forEach(phone => {

            const option =
                document.createElement("option");


            option.value =
                phone.id;


            option.textContent =
                phone.name;


            select.appendChild(option);

        });

    }


    function getPhoneById(id) {

        return phoneDatabase.find(
            phone => phone.id === id
        );

    }


    function updateSelectedPhone(select, infoId) {

        const info =
            document.getElementById(infoId);


        if (!info) return;


        const phone =
            getPhoneById(select.value);


        if (!phone) {

            info.innerHTML = `

                <span>?</span>

                <p>
                    Select a phone
                </p>

            `;

            return;

        }


        info.innerHTML = `

            <span>
                ${getBrandInitial(phone.brand)}
            </span>

            <p>
                ${phone.name}
            </p>

        `;

    }


    // --------------------------------------------
    // RUN COMPARISON
    // --------------------------------------------

    function runPhoneComparison() {

        const selectedA =
            getPhoneById(phoneA.value);


        const selectedB =
            getPhoneById(phoneB.value);


        if (!selectedA || !selectedB) {

            alert(
                "Please select two phones first."
            );

            return;

        }


        if (selectedA.id === selectedB.id) {

            alert(
                "Please select two different phones."
            );

            return;

        }


        const results =
            document.getElementById(
                "comparisonResults"
            );


        const table =
            document.getElementById(
                "comparisonTable"
            );


        const resultPhoneA =
            document.getElementById(
                "resultPhoneA"
            );


        const resultPhoneB =
            document.getElementById(
                "resultPhoneB"
            );


        if (!results || !table) return;


        resultPhoneA.textContent =
            selectedA.name;


        resultPhoneB.textContent =
            selectedB.name;


        table.innerHTML = "";


        const categories = [

            {
                name: "DISPLAY",
                key: "display"
            },

            {
                name: "PROCESSOR",
                key: "processor"
            },

            {
                name: "MEMORY",
                key: "memory"
            },

            {
                name: "CAMERA",
                key: "camera"
            },

            {
                name: "BATTERY",
                key: "battery"
            },

            {
                name: "PHYSICAL",
                key: "physical"
            },

            {
                name: "CONNECTIVITY",
                key: "connectivity"
            },

            {
                name: "SOFTWARE",
                key: "software"
            }

        ];


        categories.forEach(category => {

            const valueA =
                formatComparisonValue(
                    selectedA[category.key]
                );


            const valueB =
                formatComparisonValue(
                    selectedB[category.key]
                );


            table.innerHTML += `

                <div class="comparison-category">

                    <div class="comparison-category-title">
                        ${category.name}
                    </div>

                    <div class="comparison-row">

                        <div>
                            ${valueA}
                        </div>

                        <div class="comparison-vs">
                            VS
                        </div>

                        <div>
                            ${valueB}
                        </div>

                    </div>

                </div>

            `;

        });


        results.style.display =
            "block";


        results.scrollIntoView({
            behavior: "smooth"
        });

    }


    // --------------------------------------------
    // FORMAT COMPARISON DATA
    // --------------------------------------------

    function formatComparisonValue(value) {

        if (value === undefined ||
            value === null) {

            return "—";

        }


        if (Array.isArray(value)) {

            return value.join("<br>");

        }


        if (typeof value === "object") {

            return Object.entries(value)
                .map(([key, val]) => {

                    let formatted = val;


                    if (Array.isArray(val)) {

                        formatted =
                            val.join(", ");

                    }


                    return `
                        <strong>
                            ${formatKey(key)}
                        </strong>: ${formatted}
                    `;

                })
                .join("<br>");

        }


        return value;

    }


    function formatKey(key) {

        return key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, letter =>
                letter.toUpperCase()
            );

    }


});
