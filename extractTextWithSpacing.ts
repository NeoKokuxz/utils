export function extractTextFromHTML(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const text = extractTextWithSpacing(doc.body);
  return text.replace(/^\n+/g, '').trim();
}

function extractTextWithSpacing(element: HTMLElement): string {
  let text = '';

  for (const node of element.childNodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent?.trim() + ' ';
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      switch ((node as HTMLElement).tagName) {
        case 'P':
        case 'DIV':
        case 'BR':
        case 'SECTION':
        case 'ARTICLE':
        case 'ASIDE':
        case 'HEADER':
        case 'FOOTER':
        case 'NAV':
          text += '\n';
          break;
        default:
          text += ' '; // empty space
          break;
      }
      text += extractTextWithSpacing(node as HTMLElement);
    }
  }

  return text
    .replace(/\s+/g, (match) => (match.includes('\n') ? '\n' : ' '))
    .replace(/\\r\\n/g, '\n')
}
