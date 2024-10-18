import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Hash, Lightbulb, Shuffle } from 'lucide-react';
import MemorablePassword from './memorable-pass';
import PinPassword from './pin-pass';
import RandomPassword from './random-pass';

export default function PassGenerator() {
  return (
    <div className="flex-1 bg-white shadow-sm rounded-xl p-5">
      <h1 className="font-medium text-gray-600">Choose Password Type</h1>

      <Tabs className="mt-4" defaultValue="random">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="random">
            <Shuffle className="size-4 mr-1" />
            Random
          </TabsTrigger>

          <TabsTrigger value="memorable">
            <Lightbulb className="size-4 mr-1" />
            Memorable
          </TabsTrigger>

          <TabsTrigger value="pin">
            <Hash className="size-4 mr-1" />
            Pin
          </TabsTrigger>
        </TabsList>

        <TabsContent value="random">
          <RandomPassword />
        </TabsContent>

        <TabsContent value="memorable">
          <MemorablePassword />
        </TabsContent>

        <TabsContent value="pin">
          <PinPassword />
        </TabsContent>
      </Tabs>
    </div>
  );
}
