export default function createCommentsTree(comments) {
    const result = [];
    const map = {}; // id -> { comment, responseCounter }

    comments.forEach(c => {
        const item = { ...c, level: 0 };
        map[c._id] = { comment: item, responseCounter: 0 };

        if (!c.responseTo) {
            // root comment
            result.push(item);
        } else {
            const parent = map[c.responseTo];
            if (parent) {
                const parentIndex = result.indexOf(parent.comment);
                const insertIndex = parentIndex + 1 + parent.responseCounter;

                item.level = parent.comment.level + 1;
                result.splice(insertIndex, 0, item);

                // zwiększamy licznik odpowiedzi nadrzędnego komentarza
                parent.responseCounter++;
            } else {
                // jeśli parent nie istnieje w tablicy (np. usunięty) traktujemy jako root
                result.push(item);
            }
        }
    });

    return result;
}
