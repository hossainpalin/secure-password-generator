import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Hash, Lightbulb, Shuffle } from 'lucide-react';
import { useState } from 'react';
import MemorablePassword from './memorable-pass';
import PinPassword from './pin-pass';
import RandomPassword from './random-pass';
import { Button } from './ui/button';

export default function PassGenerator() {
  const [password, setPassword] = useState('');

  const [pin, setPin] = useState([6]);

  const pinPassGenerator = (length = 3) => {
    const digits = '0123456789';
    let pin = '';

    for (let i = 1; i <= length; i++) {
      const index = Math.floor(Math.random() * digits.length);
      pin += digits[index];
    }

    return setPassword(pin);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-white shadow-sm rounded-xl p-5">
      <div>
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
            <PinPassword
              pin={pin}
              setPin={setPin}
              pinPassGenerator={pinPassGenerator}
            />
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-4">
        <h1 className="font-medium text-gray-600">Generated Password</h1>

        <div className="mt-4 border rounded-md w-full p-5 font-medium text-xl text-center">
          {password}
        </div>

        <div className="w-full flex justify-between items-center mt-4 gap-3">
          <Button className="flex-1 bg-blue-800 hover:bg-blue-900 transition-colors">
            Copy Password
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-blue-800 text-blue-800 hover:border-blue-800 hover:text-blue-800">
            Refresh Password
          </Button>
        </div>
      </div>
    </div>
  );
}
