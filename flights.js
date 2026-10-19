// Load flights from the Supabase database
async function loadFlights() {
const container = document.getElementById("flight-list");

if (!container) {
    console.error('Add an HTML element with id="flight-list" to flights.html');
    return;
}

container.textContent = "Loading flights...";

const { data, error } = await window.aviationDB
    .from("flights")
    .select("*")
    .order("id", { ascending: true });

if (error) {
    console.error("Error loading flights:", error);
    container.textContent = "Unable to load flights. Please try again.";
    return;
}

if (!data || data.length === 0) {
    container.textContent = "No flights available.";
    return;
}

container.replaceChildren();

data.forEach((flight) => {
    const card = document.createElement("div");
    card.className = "flight-card";

    // Airline name
    const title = document.createElement("h3");
    title.textContent = flight.airline;
    title.style.color = "#ffffff";
    title.style.fontSize = "23px";
    title.style.marginBottom = "16px";

    // Flight route
    const route = document.createElement("p");
    route.textContent = `${flight.departure} → ${flight.destination}`;
    route.style.color = "#e0eaf7";
    route.style.fontSize = "17px";

    // Flight date
    const date = document.createElement("p");
    date.textContent = flight.departure_date
        ? `Departure Date: ${flight.departure_date}`
        : "Departure Date: Not specified";
    date.style.color = "#d0dced";

    // Highlighted price
    const priceBox = document.createElement("div");
    priceBox.style.background = "#102c4d";
    priceBox.style.border = "1px solid #41658a";
    priceBox.style.borderRadius = "10px";
    priceBox.style.padding = "14px 18px";
    priceBox.style.margin = "18px 0";
    priceBox.style.display = "flex";
    priceBox.style.justifyContent = "space-between";
    priceBox.style.alignItems = "center";
    priceBox.style.flexWrap = "wrap";
    priceBox.style.gap = "8px";

    const priceLabel = document.createElement("span");
    priceLabel.textContent = "TICKET PRICE";
    priceLabel.style.color = "#d0dced";
    priceLabel.style.fontSize = "12px";
    priceLabel.style.fontWeight = "bold";
    priceLabel.style.letterSpacing = "1.5px";

    const price = document.createElement("strong");
    price.textContent =
        `₹${Number(flight.price).toLocaleString("en-IN")}`;
    price.style.color = "#ffc857";
    price.style.fontSize = "28px";
    price.style.fontWeight = "800";

    priceBox.append(priceLabel, price);

    // Highlighted Book Now button
    const bookButton = document.createElement("button");
    bookButton.textContent = "✈  BOOK NOW";
    bookButton.className = "book-btn";

    bookButton.style.display = "block";
    bookButton.style.width = "100%";
    bookButton.style.background =
        "linear-gradient(135deg, #ffc857, #f4a900)";
    bookButton.style.color = "#071a33";
    bookButton.style.border = "none";
    bookButton.style.padding = "15px 20px";
    bookButton.style.borderRadius = "10px";
    bookButton.style.fontSize = "16px";
    bookButton.style.fontWeight = "800";
    bookButton.style.letterSpacing = "1px";
    bookButton.style.cursor = "pointer";
    bookButton.style.boxShadow =
        "0 5px 15px rgba(244, 169, 0, 0.25)";
    bookButton.style.transition = "0.2s";

    bookButton.addEventListener("mouseenter", () => {
        bookButton.style.background = "#ffffff";
        bookButton.style.transform = "translateY(-2px)";
    });

    bookButton.addEventListener("mouseleave", () => {
        bookButton.style.background =
            "linear-gradient(135deg, #ffc857, #f4a900)";
        bookButton.style.transform = "translateY(0)";
    });

    // Open booking page with selected flight details
    bookButton.addEventListener("click", () => {
        const params = new URLSearchParams({
            from: flight.departure || "",
            to: flight.destination || "",
            date: flight.departure_date || "",
            flightId: flight.id || ""
        });

        window.location.href = `booking.html?${params.toString()}`;
    });

    // Add all elements to the card
    card.append(title, route, date, priceBox, bookButton);
    container.appendChild(card);
});

}

document.addEventListener("DOMContentLoaded", loadFlights);