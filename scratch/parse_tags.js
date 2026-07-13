const fs = require('fs');

const content = fs.readFileSync('Z:/QECore/qecore.github.io/src/pages/Docs.tsx', 'utf8');

// Parse simple JSX/HTML tags
// Let's strip strings, comments, and JavaScript expressions first to focus on JSX
let clean = content;

// Remove imports and setup code up to const mainContent
const mainContentIdx = clean.indexOf('const mainContent =');
if (mainContentIdx !== -1) {
  clean = clean.substring(mainContentIdx);
}

// Regex to find tags: <TagName ...> or </TagName>
// Avoid matches inside template literals, strings, or JS expressions
const tags = [];
const regex = /<(\/?[a-zA-Z0-9\-]+)(?:\s+[^>]*?)?(\/?)>/g;
let match;
while ((match = regex.exec(clean)) !== null) {
  const full = match[0];
  const name = match[1];
  const self = match[2] === '/';
  
  if (self) continue;
  
  if (name.startsWith('/')) {
    tags.push({ type: 'close', name: name.substring(1), index: match.index, line: getLineNumber(clean, match.index) });
  } else {
    tags.push({ type: 'open', name: name, index: match.index, line: getLineNumber(clean, match.index) });
  }
}

function getLineNumber(str, index) {
  return str.substring(0, index).split('\n').length;
}

const stack = [];
for (const tag of tags) {
  if (tag.name.toLowerCase() === 'img' || tag.name.toLowerCase() === 'br' || tag.name.toLowerCase() === 'hr' || tag.name.toLowerCase() === 'input') {
    continue;
  }
  if (tag.type === 'open') {
    stack.push(tag);
  } else {
    if (stack.length === 0) {
      console.log(`Unmatched close tag </${tag.name}> at line ${tag.line}`);
    } else {
      const top = stack.pop();
      if (top.name !== tag.name) {
        console.log(`Mismatch: open <${top.name}> at line ${top.line} closed by </${tag.name}> at line ${tag.line}`);
      }
    }
  }
}

console.log('Final Stack size:', stack.length);
stack.forEach(t => console.log(`Unclosed <${t.name}> at line ${t.line}`));
