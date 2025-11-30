async function searchCountry() {
    let name = document.getElementById("search").value;
    let countryCard = document.getElementById("card");
    let mapCard = document.getElementById("mapCard");
    let emptyState = document.getElementById("emptyState");
    let mapEmptyState = document.getElementById("mapEmptyState");
    let citySelector = document.getElementById("citySelect");

    if (!name.trim()) {
        countryCard.classList.add("hidden");
        mapCard.classList.add("hidden");
        emptyState.classList.remove("hidden");
        mapEmptyState.classList.remove("hidden");
        citySelector.disabled = true;
        return;
    }

    try {

        // Country search
        let res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        let data = await res.json();

        data.forEach(country => {
            countryCard.classList.remove("hidden");
            mapCard.classList.remove("hidden");
            emptyState.classList.add("hidden");
            mapEmptyState.classList.add("hidden");
            citySelector.disabled = false;

            const currencyKey = Object.keys(country.currencies)[0];
            const currencySymbol = country.currencies[currencyKey].symbol;

            const nativeKey = Object.keys(country.name.nativeName)[0];
            const nativeSymbol = country.name.nativeName[nativeKey].common;

            document.getElementById("countryName").innerText = country.name.common;
            document.getElementById("nativeName").innerText = nativeSymbol;
            document.getElementById("flag-div").innerHTML = `<img class="card-img-top object-fit-cover" src="${country.flags.png}" alt="Country flag" loading="lazy">`;
            document.getElementById("countryCapital").innerText = country.capital;
            document.getElementById("countryRegion").innerText = country.region;
            document.getElementById("countrySubregion").innerText = country.subregion;
            document.getElementById("population").innerText = country.population;
            document.getElementById("area").innerText = country.area;
            document.getElementById("currency").innerText = currencySymbol;

            const languageKeys = Object.keys(country.languages);
            const languagePairs = [];

            for (let i = 0; i < languageKeys.length; i++) {
                const key = languageKeys[i];
                const name = country.languages[key];
                languagePairs.push(`${name}`);
            }

            if (document.getElementById("languages")) {
                document.getElementById("languages").innerText = languagePairs.join(', ');
            }

            document.getElementById("timezones").innerText = country.timezones;
            document.getElementById("independent").innerText = country.independent;
            document.getElementById("tld").innerText = country.cca2;
        });
        // // Country search end

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}