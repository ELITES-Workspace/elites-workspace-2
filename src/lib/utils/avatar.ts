// IMPORTED DEP-MODULES
import { createAvatar } from '@dicebear/core';
import { bottts } from '@dicebear/collection';

// -- FUNCTIONS -- //

export const getAvatar = (seed: string) => createAvatar(bottts, { seed }).toDataUri();
