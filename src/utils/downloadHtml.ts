/**
 * Downloads the standalone single-file HTML version of Hemakita.
 * Can be opened on iOS, Android, Windows, Mac, or Linux without internet or dev server!
 */

import { playSound } from './audio';

export async function downloadStandaloneHtml() {
  playSound('collect');
  try {
    const res = await fetch('/hemakita-standalone.html');
    if (!res.ok) throw new Error('File not found');
    const html = await res.text();
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hemakita-anemia-remaja.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch {
    // Fallback direct navigation
    window.location.href = '/hemakita-standalone.html';
  }
}
