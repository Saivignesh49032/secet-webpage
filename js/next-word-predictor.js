const corpus = [
    "tell me about courses",
    "what are the fees",
    "how to apply for admissions",
    "placement details",
    "hostel facilities",
    "computer science engineering",
    "artificial intelligence machine learning",
    "vlsi design embedded systems",
    "master business administration"
];

const nGrams = {};
const n = 2; // Bigram model

function buildNGrams() {
    corpus.forEach(sentence => {
        const words = sentence.toLowerCase().split(" ");
        for (let i = 0; i < words.length - 1; i++) {
            const current = words.slice(i, i + n - 1).join(" ");
            const next = words[i + n - 1];
            if (!nGrams[current]) {
                nGrams[current] = {};
            }
            nGrams[current][next] = (nGrams[current][next] || 0) + 1;
        }
    });
}

function predictNextWord(input) {
    input = input.toLowerCase().trim();
    const words = input.split(" ");
    const lastWords = words.slice(- (n - 1)).join(" ");
    const predictions = nGrams[lastWords] || {};
    const sorted = Object.entries(predictions)
        .sort((a, b) => b[1] - a[1])
        .map(entry => entry[0]);
    return sorted.slice(0, 3); // Return top 3 predictions
}

buildNGrams();

window.predictNextWord = predictNextWord;