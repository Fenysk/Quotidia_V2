export const filteredNotes = (notes, text, sort, contain, tags) => {
    let filtered = [...notes];

    // Filtrer par texte
    if (text) {
        filtered = filtered.filter(note =>
            note.title.toLowerCase().includes(text.toLowerCase()) ||
            note.text.toLowerCase().includes(text.toLowerCase())
        );
    }

    // Trier par date
    if (sort === 'recent') {
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === 'old') {
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    // Filtrer par contenu
    if (contain && contain.length > 0) {
        // on cherche les notes qui contiennent une importance : note.importance
        if (contain.includes('importance')) {
            filtered = filtered.filter(note => note.importance > 1);
            filtered.sort((a, b) => b.importance - a.importance);
        }
        // on cherche les notes qui contiennent une deadline : note.deadlineAt
        if (contain.includes('date')) {
            filtered = filtered.filter(note => note.deadlineAt);
        }
        // on cherche les notes qui contiennent des tâches : note.tasks
        if (contain.includes('tasks')) {
            filtered = filtered.filter(note => note.tasks.length > 0);
        }
        // on cherche les notes qui contiennent une localisation : note.location
        if (contain.includes('location')) {
            filtered = filtered.filter(note => note.location);
        }
    }

    // Filtrer par tags
    if (tags && tags.length > 0) {
        filtered = filtered.filter(note =>
            tags.every(tagLabel =>
                note.tags.some(tag => tag.label === tagLabel)
            )
        );
    }


    return filtered;
}
