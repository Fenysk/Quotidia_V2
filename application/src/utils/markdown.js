export const markdownToHtml = (text) => {
    if (!text) {
        return ''; // Retourner une chaîne vide si le texte est indéfini ou vide
    }

    const lines = text.split('\n');
    let inList = false;
    let inOrderedList = false;
    let html = lines.map((line, i) => {
        if (line.startsWith('######')) {
            if (inList) {
                inList = false;
                return `</ul><h6>${line.substring(7)}</h6>`
            }
            if (inOrderedList) {
                inOrderedList = false;
                return `</ol><h6>${line.substring(7)}</h6>`
            }
            return `<h6>${line.substring(7)}</h6>`
        } else if (line.startsWith('#####')) {
            if (inList) {
                inList = false;
                return `</ul><h5>${line.substring(6)}</h5>`
            }
            if (inOrderedList) {
                inOrderedList = false;
                return `</ol><h5>${line.substring(6)}</h5>`
            }
            return `<h5>${line.substring(6)}</h5>`
        } else if (line.startsWith('####')) {
            if (inList) {
                inList = false;
                return `</ul><h4>${line.substring(5)}</h4>`
            }
            if (inOrderedList) {
                inOrderedList = false;
                return `</ol><h4>${line.substring(5)}</h4>`
            }
            return `<h4>${line.substring(5)}</h4>`
        } else if (line.startsWith('###')) {
            if (inList) {
                inList = false;
                return `</ul><h3>${line.substring(4)}</h3>`
            }
            if (inOrderedList) {
                inOrderedList = false;
                return `</ol><h3>${line.substring(4)}</h3>`
            }
            return `<h3>${line.substring(4)}</h3>`
        } else if (line.startsWith('##')) {
            if (inList) {
                inList = false;
                return `</ul><h2>${line.substring(3)}</h2>`
            }
            if (inOrderedList) {
                inOrderedList = false;
                return `</ol><h2>${line.substring(3)}</h2>`
            }
            return `<h2>${line.substring(3)}</h2>`
        } else if (line.startsWith('#')) {
            if (inList) {
                inList = false;
                return `</ul><h1>${line.substring(2)}</h1>`
            }
            if (inOrderedList) {
                inOrderedList = false;
                return `</ol><h1>${line.substring(2)}</h1>`
            }
            return `<h1>${line.substring(2)}</h1>`
        } else if (line.startsWith('* ') || line.startsWith('- ') || line.startsWith('+ ')) {
            if (inList) {
                return `<li>${line.substring(2)}</li>`;
            } else {
                inList = true;
                return `<ul><li>${line.substring(2)}</li>`;
            }
        } else if (/^\d+\.\s/.test(line)) { // Test if line starts with "{number}. "
            if (inOrderedList) {
                return `<li>${line.substring(line.indexOf('. ') + 2)}</li>`;
            } else {
                inOrderedList = true;
                return `<ol><li>${line.substring(line.indexOf('. ') + 2)}</li>`;
            }
        } else {
            if (inList) {
                inList = false;
                return `</ul><p>${line}</p>`;
            } else if (inOrderedList) {
                inOrderedList = false;
                return `</ol><p>${line}</p>`;
            } else {
                return `<p>${line}</p>`;
            }
        }
    }).join('\n');
    // If we're still in a list or ordered list at the end, close it
    if (inList) {
        html += '\n</ul>';
    }
    if (inOrderedList) {
        html += '\n</ol>';
    }
    console.log(html);
    return html;
};









export const markdownToText = (markdownText) => {
    if (!markdownText) {
        return '';
    }

    const lines = markdownText.split('\n');
    const text = lines
        .map(line => line.trim())
        .filter(line => line !== '')
        .map(line => {
            if (line.startsWith('#')) {
                return `${line.substring(2)}`;
            } else if (line.startsWith('##')) {
                return `${line.substring(3)}`;
            } else if (line.startsWith('###')) {
                return `${line.substring(4)}`;
            } else if (line.startsWith('####')) {
                return `${line.substring(5)}`;
            } else if (line.startsWith('#####')) {
                return `${line.substring(6)}`;
            } else if (line.startsWith('######')) {
                return `${line.substring(7)}`;
            } else if (line.startsWith('* ') || line.startsWith('- ') || line.startsWith('+ ')) {
                return `<li>${line.substring(2)}</li>`;
            } else {
                return line;
            }
        })
        .join('\n');

    return text;
};
