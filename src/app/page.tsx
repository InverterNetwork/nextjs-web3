import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Propose } from '@/screens/propose'

export default function Page() {
  return (
    <Tabs defaultValue="view" className="flex-grow">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="view">View</TabsTrigger>
        <TabsTrigger value="propose">Propose</TabsTrigger>
      </TabsList>
      <TabsContent value="view"></TabsContent>
      <TabsContent value="propose" className="h-full">
        <Propose />
      </TabsContent>
    </Tabs>
  )
}
