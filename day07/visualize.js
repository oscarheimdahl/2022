const decoder = new TextDecoder('utf-8');
const data = Deno.readFileSync('tree2.json');
const treeString = decoder.decode(data);
const tree = JSON.parse(treeString);

function traverseNode(node, depth) {
  let indent = '';
  if (depth > 0) indent = '├─' + '  '.repeat((depth - 1) * 2) + '├─ ';
  Object.entries(node).forEach(([dir, children], i) => {
    const folderStyle = `text-decoration: ${typeof children === 'string' ? '' : 'underline'}`;
    console.log('%c' + indent + '%c' + dir, '', folderStyle);

    if (typeof children === 'object') traverseNode(children, depth + 1);
  });
}

traverseNode(tree, 0);

// .
// ├── day01
// │   ├── Dockerfile
// │   ├── index.test.ts
// │   ├── index.ts
// │   └── input.txt
