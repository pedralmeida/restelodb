import { createFileRoute } from '@tanstack/react-router'
import { ContractorDirectory } from '@/components/ContractorDirectory'

export const Route = createFileRoute('/')({
  component: ContractorDirectory,
})
