import { ChangeEvent } from 'react';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';

interface MemorablePasswordProps {
  setUpperCase: (value: boolean) => void;
  memorable: number[];
  setMemorable: (value: number[]) => void;
  memorablePassGenerator: (length: number) => void;
}

export default function MemorablePassword({
  setUpperCase,
  memorable,
  setMemorable,
  memorablePassGenerator,
}: MemorablePasswordProps) {
  // This function will handle the slider change event
  const handleMemorableChange = (e: number[]) => {
    setMemorable(e);
    memorablePassGenerator(e[0]);
  };

  // This function will handle the input change event
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (isNaN(parseInt(value))) {
      setMemorable([4]);
      return;
    } else {
      if (parseInt(value) < 3) {
        setMemorable([4]);
        memorablePassGenerator(4);
        return;
      } else if (parseInt(value) > 10) {
        setMemorable([10]);
        memorablePassGenerator(10);
        return;
      } else {
        setMemorable([parseInt(value)]);
        memorablePassGenerator(parseInt(value));
      }
    }
  };

  // This function will handle the switch change event
  const handleChange = (value: boolean) => {
    setUpperCase(value);
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
            onValueChange={handleMemorableChange}
            defaultValue={memorable}
            value={memorable}
            min={3}
            max={10}
            step={1}
          />
          <Input
            value={memorable[0]}
            onChange={handleInputChange}
            className="max-w-14 rounded-xl text-lg font-medium text-gray-700 focus:border-blue-800 focus:outline-none text-center"
            type="text"
          />
        </div>
      </div>

      <div className="mt-4 border-b pb-4 w-full">
        <div className="flex items-center justify-start gap-5">
          <p className="text-gray-600">Uppercase Letter</p>
          <Switch onCheckedChange={handleChange} className="" />
        </div>
      </div>
    </div>
  );
}
