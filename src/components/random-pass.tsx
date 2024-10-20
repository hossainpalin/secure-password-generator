import { ChangeEvent } from 'react';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';

interface RandomPasswordProps {
  number: boolean;
  symbol: boolean;
  setNumber: (value: boolean) => void;
  setSymbol: (value: boolean) => void;
  random: number[];
  setRandom: (value: number[]) => void;
  randomPassGenerator: (length: number) => void;
}

export default function RandomPassword({
  number,
  symbol,
  setNumber,
  setSymbol,
  random,
  setRandom,
  randomPassGenerator,
}: RandomPasswordProps) {
  // This function will handle the slider change event
  const handleRandomChange = (e: number[]) => {
    setRandom(e);
    randomPassGenerator(e[0]);
  };

  // This function will handle the input change event
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (isNaN(parseInt(value))) {
      setRandom([8]);
      return;
    } else {
      if (parseInt(value) < 8) {
        setRandom([8]);
        randomPassGenerator(8);
        return;
      } else if (parseInt(value) > 100) {
        setRandom([100]);
        randomPassGenerator(100);
        return;
      } else {
        setRandom([parseInt(value)]);
        randomPassGenerator(parseInt(value));
      }
    }
  };

  // This function will handle the switch change event
  const handleNumberChange = (value: boolean) => {
    setNumber(value);
  };

  // This function will handle the switch change event
  const handleSymbolChange = (value: boolean) => {
    setSymbol(value);
  };

  return (
    <div className="mt-4">
      <h1 className="font-medium text-gray-600 mb-4">
        Customize Your New Password
      </h1>

      <div className="border-y py-4 flex gap-5 items-center justify-between">
        <p className="w-1/4 text-gray-600">Characters</p>

        <div className="flex items-center justify-between w-3/4 gap-5">
          <Slider
            onValueChange={handleRandomChange}
            defaultValue={random}
            value={random}
            min={8}
            max={100}
            step={1}
          />
          <Input
            value={random[0]}
            onChange={handleInputChange}
            className="max-w-14 rounded-xl text-lg font-medium text-gray-700 focus:border-blue-800 focus:outline-none text-center"
            type="text"
          />
        </div>
      </div>

      <div className="mt-4 border-b pb-4 w-full gap-8 flex justify-start items-center">
        <div className="flex items-center justify-start gap-5">
          <p className="text-gray-600">Numbers</p>
          <Switch
            defaultChecked={number}
            onCheckedChange={handleNumberChange}
          />
        </div>

        <div className="flex items-center justify-start gap-5">
          <p className="text-gray-600">Symbols</p>
          <Switch
            defaultChecked={symbol}
            onCheckedChange={handleSymbolChange}
          />
        </div>
      </div>
    </div>
  );
}
