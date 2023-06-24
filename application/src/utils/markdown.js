export const markdownToHtml = (text) => {
    if (!text) {
        return ''; // Retourner une chaîne vide si le texte est indéfini ou vide
    }

    const lines = text.split('\n')
    const html = lines.map(line => {
        if (line.startsWith('#')) {
            return `<h1>${line.substring(2)}</h1>`
        } else if (line.startsWith('##')) {
            return `<h2>${line.substring(3)}</h2>`
        } else if (line.startsWith('###')) {
            return `<h3>${line.substring(4)}</h3>`
        } else if (line.startsWith('####')) {
            return `<h4>${line.substring(5)}</h4>`
        } else if (line.startsWith('#####')) {
            return `<h5>${line.substring(6)}</h5>`
        } else if (line.startsWith('######')) {
            return `<h6>${line.substring(7)}</h6>`
        } else if (line.startsWith('* ')) {
            return `<li>${line.substring(2)}</li>`
        } else if (line.startsWith('- ')) {
            return `<li>${line.substring(2)}</li>`
        } else if (line.startsWith('+ ')) {
            return `<li>${line.substring(2)}</li>`
        } else {
            return '<p>' + line + '</p>'
        }
    }).join('\n')
    console.log(html)
    return html
};

export const markdownToText = (text) => {
    if (!text) {
        return '';
    }

    const lines = text.split('\n');
    const html = lines
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
            } else if (line.startsWith('* ')) {
                return `${line.substring(2)}`;
            } else if (line.startsWith('- ')) {
                return `${line.substring(2)}`;
            } else if (line.startsWith('+ ')) {
                return `${line.substring(2)}`;
            } else {
                return line;
            }
        })
        .join('\n');

    return html;
};
