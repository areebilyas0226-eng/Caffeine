import React from 'react';

/**
 * Controlled Compiler Test Element
 * Verifies that the Tailwind v4 compiler pipeline processes candidates
 * for core utilities: flex, absolute, grid, relative, w-full, min-h-screen.
 */
export function TailwindControlledTest() {
  return (
    <div
      id="tailwind-controlled-test"
      className="flex absolute grid relative w-full min-h-screen"
      style={{ display: 'none' }}
      aria-hidden="true"
    />
  );
}
