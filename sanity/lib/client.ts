import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Disabling CDN for ISR/On-Demand Revalidation ensures we always fetch fresh data from the live API
})
