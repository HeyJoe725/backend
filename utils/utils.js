// Javascript program to calculate the
// standard deviation of an array
function standardDeviation(arr) {
    const n = arr.length;
    const mean = arr.reduce((a, b) => a + b) / n;
    return Math.sqrt(arr.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
}


function mean(arr) {
    return arr.reduce((a, b) => a + b) / arr.length;
}

// utils/saveToCSV.js

/**
 * Converts separate data objects to a CSV string.
 * @param {Object} cadenceData - Data object for cadence.
 * @param {Object} verticalOscillationData - Data object for vertical oscillation.
 * @param {Object} overstridingData - Data object for overstriding.
 * @returns {string} - The CSV string.
 */
function convertToCSV(cadenceData, verticalOscillationData, overstridingData) {
    const cadenceKeys = Object.keys(cadenceData);
    const overstridingKeys = Object.keys(overstridingData);
    const verticalOscillationKeys = Object.keys(verticalOscillationData);

    const maxRows = Math.max(cadenceKeys.length, overstridingKeys.length, verticalOscillationKeys.length);

    const rows = [];

    // Header row
    rows.push('Cadence time (min), Cadence Value, Overstriding time (min), Overstriding Value, Vertical Oscillation time (min), Vertical Oscillation Value');

    for (let i = 0; i < maxRows; i++) {
        const cadenceRow = cadenceKeys[i] ? `"${cadenceKeys[i]}", "${cadenceData[cadenceKeys[i]]}"` : ',';
        const overstridingRow = overstridingKeys[i] ? `"${overstridingKeys[i]}", "${overstridingData[overstridingKeys[i]]}"` : ',';
        const verticalOscillationRow = verticalOscillationKeys[i] ? `"${verticalOscillationKeys[i]}", "${verticalOscillationData[verticalOscillationKeys[i]]}"` : ',';

        rows.push(`${cadenceRow}, ${overstridingRow}, ${verticalOscillationRow}`);
    }

    return rows.join("\n");
}

// The saveToCSV function remains the same.

/**
 * Triggers a CSV download from separate data objects.
 * @param {Object} cadenceData - Data object for cadence.
 * @param {Object} verticalOscillationData - Data object for vertical oscillation.
 * @param {Object} overstridingData - Data object for overstriding.
 * @param {string} filename - The name of the file.
 */
function saveToCSV(cadenceData, verticalOscillationData, overstridingData, filename) {
    const csvString = convertToCSV(cadenceData, verticalOscillationData, overstridingData);
    const blob = new Blob([csvString], { type: 'text/csv' });
    if (typeof window !== 'undefined') {
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', filename);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    // else block can be used for non-browser environments, if necessary
}




export { standardDeviation, mean, convertToCSV, saveToCSV };


