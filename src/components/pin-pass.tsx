import { ChangeEvent } from 'react';
import { Input } from './ui/input';
import { Slider } from './ui/slider';

interface PinPasswordProps {
  pin: number[];
  setPin: (pin: number[]) => void;
  pinPassGenerator: (length: number) => void;
}

export default function PinPassword({
  pin,
  setPin,
  pinPassGenerator,
}: PinPasswordProps) {
  // This function will handle the slider change event
  const handlePinChange = (e: number[]) => {
    setPin(e);
    pinPassGenerator(e[0]);
  };

  // This function will handle the input change event
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (isNaN(parseInt(value))) {
      setPin([6]);
      return;
    } else {
      if (parseInt(value) < 3) {
        setPin([6]);
        pinPassGenerator(6);
        return;
      } else if (parseInt(value) > 9) {
        setPin([16]);
        pinPassGenerator(16);
        return;
      } else {
        setPin([parseInt(value)]);
        pinPassGenerator(parseInt(value));
      }
    }
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
            onValueChange={handlePinChange}
            defaultValue={pin}
            value={pin}
            min={3}
            max={16}
            step={1}
          />
          <Input
            value={pin[0]}
            onChange={handleInputChange}
            className="max-w-14 rounded-xl text-lg font-medium text-gray-700 focus:border-blue-800 focus:outline-none text-center"
            type="text"
          />
        </div>
      </div>
    </div>
  );
}
