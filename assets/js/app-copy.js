function searchCity() {
    let name = document.getElementById("search").value;
    let cityLat;
    let cityLng;

    if (!name.trim()) {
        document.getElementById("card").classList.add("hidden");
        document.getElementById("mapCard").classList.add("hidden");
        document.getElementById("emptyState").classList.remove("hidden");
        document.getElementById("mapEmptyState").classList.remove("hidden");
        return;
    }

    fetch(`http://api.weatherapi.com/v1/current.json?key=90e86490d94349479e973236251211&q=${name}`)
        .then(res => res.json())
        .then(data => {

            cityLat = data.location.lat;
            cityLng = data.location.lon;

            document.getElementById("temp").innerText = data.current.temp_c;
            document.getElementById("city").innerText = cityName + ", " + data.location.region + ", " + data.location.country;

            try {
                fetch(`https://restcountries.com/v3.1/name/${data.location.country}`)
                    .then(res => res.json())
                    .then(data => {
                        for (let i = 0; i < data.length; i++) {
                            document.getElementById("card").classList.remove("hidden");
                            document.getElementById("mapCard").classList.remove("hidden");
                            document.getElementById("emptyState").classList.add("hidden");
                            document.getElementById("mapEmptyState").classList.add("hidden");

                            const country = data[i];
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

                            searchMaps(cityLat,cityLng);

                        }

                    });
            } catch {
                document.getElementById("card").classList.add("hidden");
            }
        });
}

function searchMaps(lat, lng) {

    const left = lng - margin;
    const bottom = lat - margin;
    const right = lng + margin;
    const top = lat + margin;

    const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${left},${bottom},${right},${top}&layer=mapnik&marker=${lat},${lng}`;
    document.getElementById("mapData").innerHTML = `<iframe width="100%" height="100%" frameborder="0" style="border-radius: 12px;" src="${mapUrl}"></iframe>`;
    
}



// let res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
//         let data = await res.json();

//         const select = document.getElementById("citySelect");
//         select.innerHTML = "<option>Loading...</option>";
//         let countryName = data[0].name.common;

//         async function fetchCities() {

//             const myHeaders = new Headers();
//             myHeaders.append("Content-Type", "application/json");

//             const raw = JSON.stringify({
//                 "country": countryName
//             });

//             const requestOptions = {
//                 method: "POST",
//                 headers: myHeaders,
//                 body: raw,
//                 redirect: "follow"
//             };

//             let response = await fetch("https://countriesnow.space/api/v0.1/countries/cities", requestOptions);
//             let result = response.json();

            

//         }

