const transformUrl = (url) => {
    if (url.startsWith("/content")) {
        if (import.meta.env.DEV) {
            return `${url}`;
        } else {
            return `https://github.com/fbn-org/hudson-blog/blob/main${url}?raw=true`;
        }
    } else {
        return url;
    }
};

function mdTableJson(markdown) {
    // Split input into lines
    const lines = markdown.trim().split("\n");

    // Validate that the table has at least 3 rows (header, separator, at least 1 data row)
    if (lines.length < 3) {
        throw new Error("Invalid markdown table. Must have at least 3 rows (header, separator, and one data row).");
    }

    // Extract and parse the header row
    const headerLine = lines[0].trim();
    const headers = headerLine
        .split("|")
        .map((header) => header.trim())
        .filter(Boolean);

    // Remove the separator row (second row)
    const dataLines = lines.slice(2);

    // Parse each data row into JSON objects
    const jsonObjects = dataLines.map((line) => {
        const values = line
            .split("|")
            .map((value) => value.trim())
            .filter(Boolean);
        if (values.length !== headers.length) {
            throw new Error("Row data does not match the number of headers.");
        }
        // Combine headers and values into a JSON object
        return headers.reduce((obj, header, index) => {
            obj[header] = values[index];
            return obj;
        }, {});
    });

    return jsonObjects[0];
}

export { mdTableJson, transformUrl };
