// Get all <div> elements with role="button"
const divsWithRoleButton = document.querySelectorAll('div[role="button"]');

// Simulate clicking on each div
divsWithRoleButton.forEach((div) => {
    div.click();
});

// Wait for a brief moment to ensure any content changes have taken effect
setTimeout(() => {
    // Get all <div> elements with class "content normal"
    const contentDivs = document.querySelectorAll('div.content.normal');

    // Arrays to store extracted data
    const bedrijfsnaam = [];
    const address = [];
    const postcode = [];
    const telefoonNummer = [];
    const urls = [];

    // Iterate through each contentDiv
    contentDivs.forEach((contentDiv) => {
        // Find and store <span> with class "title"
        const titleSpan = contentDiv.querySelector('span.title');
        if (titleSpan) {
            bedrijfsnaam.push(titleSpan.textContent);
        }

        // Find <div> with class "address"
        const addressDiv = contentDiv.querySelector('div.address');
        if (addressDiv) {
            // Find nested <span> elements
            const nestedSpans = addressDiv.querySelectorAll('span');
            if (nestedSpans.length >= 3) {
                address.push(nestedSpans[0].textContent);
                postcode.push(nestedSpans[1].textContent);
                telefoonNummer.push(nestedSpans[2].textContent);
            }
            
            // Find <a> elements and store their href attributes
            const anchorLinks = addressDiv.querySelectorAll('a');
            anchorLinks.forEach((anchor) => {
                urls.push(anchor.href);
            });
        }
    });

    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Bedrijfsnaam,Adres,Postcode,Telefoonnummer,URLs\n";

    for (let i = 0; i < bedrijfsnaam.length; i++) {
        csvContent += `${bedrijfsnaam[i]},${address[i]},${postcode[i]},${telefoonNummer[i]},${urls[i]}\n`;
    }

    // Create a download link for the CSV file
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "extracted_data.csv");
    document.body.appendChild(link);
    link.click();
}, 1000); // You may need to adjust the timeout value based on the behavior of the page
