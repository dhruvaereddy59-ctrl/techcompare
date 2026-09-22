document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       TECHCOMPARE DATABASE
       ===================================================== */

    const phoneDatabase =
        typeof phones !== "undefined" ? phones : [];


    /* =====================================================
       CURRENT PAGE
       ===================================================== */

    const currentPage =
        window.location.pathname.split("/").pop();


    /* =====================================================
       HELPER FUNCTIONS
       ===================================================== */

    function getPhoneById(id) {
        return phoneDatabase.find(phone => phone.id === id);
    }


    function getBrandInitial(brand) {

        const initials = {
            apple: "A",
            samsung: "S",
            nothing: "N",
            oneplus: "1+"
        };

        return initials[brand] || "TC";
    }


    function formatKey(key) {

        return String(key)
            .replace(/([A-Z])/g, " $1")
            .replace(/[-_]/g, " ")
            .replace(/^./, letter => letter.toUpperCase());
    }


    function formatValue(value) {

        if (value === undefined || value === null || value === "") {
            return "—";
        }

        if (Array.isArray(value)) {
            return value.join(", ");
        }

        if (typeof value === "object") {

            return Object.entries(value)
                .map(([key, val]) => {

                    let formatted = val;

                    if (Array.isArray(val)) {
                        formatted = val.join(", ");
                    }

                    return `${formatKey(key)}: ${formatted}`;

                })
                .join("<br>");
        }

        return value;
    }


    /* =====================================================
       PHONE DATABASE PAGE
       phones.html
       ===================================================== */

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


            const filteredPhones =
                phoneDatabase.filter(phone => {

                    const matchesBrand =
                        activeBrand === "all" ||
                        phone.brand === activeBrand;


                    const searchableText = [

                        phone.name,
                        phone.brand,
                        phone.family,
                        phone.type,
                        phone.tagline,
                        phone.description,

                        ...(phone.highlights || [])

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


                const highlights =
                    phone.highlights &&
                    phone.highlights.length
                        ? phone.highlights.slice(0, 4)
                        : [];


                card.innerHTML = `

                    <div class="phone-card-top">

                        <span class="phone-year">
                            ${phone.year || ""}
                        </span>

                        <span class="phone-type">
                            ${(phone.type || "SMARTPHONE").toUpperCase()}
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

                        ${highlights
                            .map(item => `<span>${item}</span>`)
                            .join("")}

                    </div>


                    <div class="phone-card-arrow">
                        VIEW PHONE →
                    </div>

                `;


                phoneGrid.appendChild(card);

            });


            if (phoneCount) {

                phoneCount.textContent =
                    `${filteredPhones.length} PHONE${
                        filteredPhones.length === 1 ? "" : "S"
                    }`;

            }


            if (noResults) {

                noResults.style.display =
                    filteredPhones.length === 0
                        ? "block"
                        : "none";

            }

        }


        /* SEARCH */

        if (phoneSearch) {

            phoneSearch.addEventListener(
                "input",
                renderPhones
            );

        }


        /* BRAND FILTERS */

        const filterButtons =
            document.querySelectorAll(".filter-button");


        filterButtons.forEach(button => {

            button.addEventListener("click", () => {

                filterButtons.forEach(btn => {
                    btn.classList.remove("active");
                });


                button.classList.add("active");


                activeBrand =
                    button.dataset.brand || "all";


                renderPhones();

            });

        });


        /* URL BRAND FILTER */

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

                filterButtons.forEach(btn => {
                    btn.classList.remove("active");
                });


                matchingButton.classList.add("active");


                activeBrand =
                    urlBrand;

            }

        }


        renderPhones();

    }


    /* =====================================================
       COMPARISON PAGE
       compare.html
       ===================================================== */

    const phoneA =
        document.getElementById("phoneA");

    const phoneB =
        document.getElementById("phoneB");


    if (phoneA && phoneB) {

        populatePhoneSelector(phoneA);
        populatePhoneSelector(phoneB);


        phoneA.addEventListener(
            "change",
            () => updateSelectedPhone(
                phoneA,
                "phoneAInfo"
            )
        );


        phoneB.addEventListener(
            "change",
            () => updateSelectedPhone(
                phoneB,
                "phoneBInfo"
            )
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


    /* =====================================================
       COMPARISON MODE
       ===================================================== */

    const comparisonModes =
        document.querySelectorAll(".compare-mode");


    comparisonModes.forEach(mode => {

        mode.addEventListener("click", () => {

            comparisonModes.forEach(item => {
                item.classList.remove("active");
            });


            mode.classList.add("active");

        });

    });


    /* =====================================================
       PHONE SELECTOR
       ===================================================== */

    function populatePhoneSelector(select) {

        select.innerHTML =
            `<option value="">Select a phone...</option>`;


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


    /* =====================================================
       SELECTED PHONE PREVIEW
       ===================================================== */

    function updateSelectedPhone(select, infoId) {

        const info =
            document.getElementById(infoId);


        if (!info) return;


        const phone =
            getPhoneById(select.value);


        if (!phone) {

            info.innerHTML = `
                <span>?</span>
                <p>Select a phone</p>
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


    /* =====================================================
       RUN COMPARISON
       ===================================================== */

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


        if (resultPhoneA) {
            resultPhoneA.textContent =
                selectedA.name;
        }


        if (resultPhoneB) {
            resultPhoneB.textContent =
                selectedB.name;
        }


        /* CREATE REAL TABLE */

        table.innerHTML = `

            <table class="real-comparison-table">

                <thead>

                    <tr>

                        <th>
                            SPECIFICATION
                        </th>

                        <th>
                            ${selectedA.name}
                        </th>

                        <th>
                            ${selectedB.name}
                        </th>

                    </tr>

                </thead>


                <tbody>

                    ${createComparisonRows(
                        selectedA,
                        selectedB
                    )}

                </tbody>

            </table>

        `;


        results.style.display =
            "block";


        results.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }


    /* =====================================================
       CREATE COMPARISON TABLE ROWS
       ===================================================== */

    function createComparisonRows(
        phoneOne,
        phoneTwo
    ) {

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


        let rows = "";


        categories.forEach(category => {

            const dataOne =
                phoneOne[category.key] || {};


            const dataTwo =
                phoneTwo[category.key] || {};


            const keys =
                new Set([
                    ...Object.keys(dataOne),
                    ...Object.keys(dataTwo)
                ]);


            if (keys.size === 0) {

                rows += `

                    <tr class="comparison-group-row">

                        <td colspan="3">
                            ${category.name}
                        </td>

                    </tr>

                    <tr>

                        <td class="comparison-label">
                            DATA
                        </td>

                        <td>—</td>

                        <td>—</td>

                    </tr>

                `;

                return;

            }


            rows += `

                <tr class="comparison-group-row">

                    <td colspan="3">
                        ${category.name}
                    </td>

                </tr>

            `;


            keys.forEach(key => {

                const valueOne =
                    formatValue(
                        dataOne[key]
                    );


                const valueTwo =
                    formatValue(
                        dataTwo[key]
                    );


                rows += `

                    <tr>

                        <td class="comparison-label">

                            ${formatKey(key)}

                        </td>


                        <td>

                            ${valueOne}

                        </td>


                        <td>

                            ${valueTwo}

                        </td>

                    </tr>

                `;

            });

        });


        return rows;

    }


    /* =====================================================
       OPTIONAL PHONE DETAIL PAGE
       ===================================================== */

    const phonePage =
        document.getElementById("phonePage");


    if (phonePage) {

        loadPhoneDetailPage();

    }


    function loadPhoneDetailPage() {

        const params =
            new URLSearchParams(
                window.location.search
            );


        const phoneId =
            params.get("id");


        const phone =
            getPhoneById(phoneId);


        if (!phone) {

            document.title =
                "Phone Not Found — TechCompare";


            const name =
                document.getElementById(
                    "phoneName"
                );


            if (name) {
                name.textContent =
                    "PHONE NOT FOUND";
            }


            const tagline =
                document.getElementById(
                    "phoneTagline"
                );


            if (tagline) {

                tagline.textContent =
                    "The requested device could not be found in the TechCompare database.";

            }


            return;

        }


        document.title =
            `${phone.name} — TechCompare`;


        setText(
            "phoneBrand",
            (phone.brand || "UNKNOWN").toUpperCase()
        );


        setText(
            "phoneFamily",
            (phone.family || "SMARTPHONE").toUpperCase()
        );


        setText(
            "phoneName",
            phone.name || "Unknown Phone"
        );


        setText(
            "phoneTagline",
            phone.tagline || ""
        );


        setText(
            "phoneYear",
            phone.year || "—"
        );


        setText(
            "phoneType",
            phone.type || "SMARTPHONE"
        );


        setText(
            "phoneFamilyMeta",
            phone.family || "—"
        );


        setText(
            "phoneDescription",
            phone.description ||
            "No description available."
        );


        setText(
            "phoneLogo",
            getBrandInitial(phone.brand)
        );


        /* HIGHLIGHTS */

        const highlightsContainer =
            document.getElementById(
                "phoneHighlights"
            );


        const highlights =
            phone.highlights || [];


        if (highlightsContainer) {

            highlightsContainer.innerHTML =
                highlights.map(
                    (item, index) => `

                        <div class="detail-highlight">

                            <span>
                                ${String(index + 1).padStart(2, "0")}
                            </span>

                            <strong>
                                ${item}
                            </strong>

                        </div>

                    `
                ).join("");

        }


        /* SPECIFICATIONS */

        renderSpecs(
            "displaySpecs",
            phone.display
        );


        renderSpecs(
            "processorSpecs",
            phone.processor
        );


        renderSpecs(
            "memorySpecs",
            phone.memory
        );


        renderSpecs(
            "cameraSpecs",
            phone.camera
        );


        renderSpecs(
            "batterySpecs",
            phone.battery
        );


        renderSpecs(
            "physicalSpecs",
            phone.physical
        );


        renderSpecs(
            "connectivitySpecs",
            phone.connectivity
        );


        renderSpecs(
            "softwareSpecs",
            phone.software
        );


        /* FEATURES */

        const featureContainer =
            document.getElementById(
                "phoneFeatures"
            );


        if (featureContainer) {

            featureContainer.innerHTML =
                highlights.map(
                    (feature, index) => `

                        <div class="feature-row">

                            <span>
                                ${String(index + 1).padStart(2, "0")}
                            </span>

                            <strong>
                                ${feature}
                            </strong>

                            <span>
                                TECHCOMPARE
                            </span>

                        </div>

                    `
                ).join("");

        }

    }


    /* =====================================================
       PHONE SPECIFICATION RENDERER
       ===================================================== */

    function renderSpecs(
        containerId,
        data
    ) {

        const container =
            document.getElementById(
                containerId
            );


        if (!container) return;


        if (
            !data ||
            typeof data !== "object"
        ) {

            container.innerHTML = `

                <div class="spec-card">

                    <span>
                        DATA
                    </span>

                    <strong>
                        Not available
                    </strong>

                </div>

            `;

            return;

        }


        const entries =
            Object.entries(data);


        if (entries.length === 0) {

            container.innerHTML = `

                <div class="spec-card">

                    <span>
                        DATA
                    </span>

                    <strong>
                        Not available
                    </strong>

                </div>

            `;

            return;

        }


        container.innerHTML =
            entries.map(
                ([key, value]) => {

                    return `

                        <div class="spec-card">

                            <span>
                                ${formatKey(key)}
                            </span>

                            <strong>
                                ${formatValue(value)}
                            </strong>

                        </div>

                    `;

                }
            ).join("");

    }


    /* =====================================================
       SAFE TEXT HELPER
       ===================================================== */

    function setText(
        id,
        value
    ) {

        const element =
            document.getElementById(id);


        if (element) {
            element.textContent =
                value;
        }

    }

});
