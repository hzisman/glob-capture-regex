const charsToEscape = ['/', '.', '~', '^', '$', '[', ']', '{', '}', '+', '?', '|'];

const globRegEx = /\*\*?/g;
const globPatterns = {
    '*': '[^/]*',
    '**': '.*',
};

function globCuptureRegex(glob) {
    if (!hasBalancedParenthesis(glob)) {
        throw new Error('Glob pattern parenthesis are not balanced.');
    }

    return {
        get glob() { return getGlob(glob) },
        get regex() { return getRegex(glob) },
        parse: () => ({
            glob: getGlob(glob),
            regex: getRegex(glob),
        }),
    };
}

function getGlob(glob) {
    return glob.replace(/[()]/g, '');
}

function getRegex(glob) {
    return new RegExp(`^${charsToEscape
        .reduce((pattern, char) => pattern.replaceAll(char, `\\${char}`), glob)
        .replace(globRegEx, match => globPatterns[match])
        .replace(/\\\(/g, '(')
        .replace(/\\\)/g, ')')
    }$`);
}

function hasBalancedParenthesis(str) {
    let openCount = 0;

    for (const char of str) {
        if (char === '(') openCount++;
        if (char === ')') openCount--;

        if (openCount < 0) return false;
    }

    return openCount === 0;
}

module.exports = globCuptureRegex;
