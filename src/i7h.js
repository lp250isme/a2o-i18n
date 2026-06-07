export function toI18nFormat(word) {
    if (!word || word.length <= 2) {
        return word; // 不處理兩個字母以下的單字
    }
    const firstLetter = word[0];
    const lastLetter = word[word.length - 1];
    const middleLength = word.length - 2;

    return `${firstLetter}${middleLength}${lastLetter}`;
}

// 保留空格並處理標點符號的轉換函數
export function convertSentenceToI18n(sentence) {
    if (!sentence) {
        return sentence;
    }
    return sentence.replace(/(\b\w+\b)/g, match => toI18nFormat(match));
}
