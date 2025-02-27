import { useState } from 'react';

// Usage:
// const [copy, copiedText] = useCopyToClipboard()
// <button onClick={() => copyToClipboard('dataString')}>Copy</button>

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>; // Return success

/**
 * A React hook to copy text to the clipboard using the Clipboard API.
 *
 * @returns A tuple containing:
 * - `copy`: An async function that copies text to the clipboard and returns `true` on success, `false` on failure.
 * - `copiedText`: The most recently copied text, or `null` if no text has been copied or the last attempt failed.
 * - `isSupported`: A boolean value.
 * @example
 * const [copy, copiedText, isSupported] = useCopyToClipboard();
 * copy('Hello, world!').then(success => console.log(success ? 'Copied!' : 'Failed'));
 */
function useCopyToClipboard(): [CopyFn, CopiedValue, boolean] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);
  const isSupported = !!navigator?.clipboard;

  const copy: CopyFn = async (text) => {
    if (!isSupported) {
      console.warn('Clipboard not supported');
      return false;
    }
    if (text === '') {
      console.warn('Attempted to copy empty string');
      return false; // Or allow it, depending on intent
    }

    // Try to save to clipboard then save it in the state
    try {
      // Check the permissions
      const permission = await navigator.permissions.query({
        name: 'clipboard-write' as PermissionName,
      });
      if (permission.state === 'denied') {
        console.warn('Clipboard permission denied');
        return false;
      }

      // Copy text to clipboard
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch (error) {
      console.warn(`useCopyToClipboard: Copy failed`, error);
      setCopiedText(null);
      return false;
    }
  };

  return [copy, copiedText, isSupported];
}

export default useCopyToClipboard;
