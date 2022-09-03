import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'hark-blog',
  apiKey: process.env.API_KEY,
});