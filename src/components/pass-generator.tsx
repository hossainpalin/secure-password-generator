import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { memorableList } from '@/data/memorable';
import {
  lettersAndBoth,
  lettersAndDigits,
  lettersAndSymbols,
  lettersOnly,
} from '@/data/random';
import { passwordContentHighlighter } from '@/lib/utils';
import { Hash, Lightbulb, Shuffle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import MemorablePassword from './memorable-pass';
import PinPassword from './pin-pass';
import RandomPassword from './random-pass';
import { Button } from './ui/button';

export default function PassGenerator() {
  const [tab, setTab] = useState('random');
  const [copySuccess, setCopySuccess] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef<HTMLDivElement>(null);
  const [upperCase, setUpperCase] = useState(false);
  const [number, setNumber] = useState(true);
  const [symbol, setSymbol] = useState(false);

  // State for password
  const [random, setRandom] = useState([8]);
  const [memorable, setMemorable] = useState([4]);
  const [pin, setPin] = useState([6]);

  // This function will copy the password
  const copyPassword = () => {
    if (password) {
      setCopySuccess(true);
      navigator.clipboard.writeText(password);
    }
  };

  // This function will refresh the password
  const refreshPassword = () => {
    if (tab === 'random') {
      randomPassGenerator(random[0]);
    } else if (tab === 'memorable') {
      memorablePassGenerator(memorable[0]);
    } else if (tab === 'pin') {
      pinPassGenerator(pin[0]);
    }
  };

  const randomPassGenerator = (length: number) => {
    const lettersWithDigits = lettersAndDigits;
    const lettersWithSymbols = lettersAndSymbols;
    const lettersWithAll = lettersAndBoth;
    const letters = lettersOnly;

    let randomPass = '';

    if (number && symbol) {
      for (let i = 1; i <= length; i++) {
        const index = Math.floor(Math.random() * lettersWithAll.length);
        randomPass += lettersWithAll[index];
      }

      return setPassword(randomPass);
    }

    if (number) {
      for (let i = 1; i <= length; i++) {
        const index = Math.floor(Math.random() * lettersWithDigits.length);
        randomPass += lettersWithDigits[index];
      }

      return setPassword(randomPass);
    }

    if (symbol) {
      for (let i = 1; i <= length; i++) {
        const index = Math.floor(Math.random() * lettersWithSymbols.length);
        randomPass += lettersWithSymbols[index];
      }

      return setPassword(randomPass);
    }

    if (!number && !symbol) {
      for (let i = 1; i <= length; i++) {
        const index = Math.floor(Math.random() * letters.length);
        randomPass += letters[index];
      }

      return setPassword(randomPass);
    }
  };

  // This function will generate a memorable password
  const memorablePassGenerator = (length: number) => {
    const memorableWords = memorableList;
    let memorablePass = '';

    for (let i = 1; i <= length; i++) {
      const index = Math.floor(Math.random() * memorableWords.length);
      let wordWithHyphen;

      if (i === 1) {
        wordWithHyphen = memorableWords[index];
      } else {
        wordWithHyphen = '-' + memorableWords[index];
      }

      memorablePass += wordWithHyphen;
    }

    // If the upperCase state is true, convert the password to uppercase
    if (upperCase) {
      memorablePass = memorablePass.toUpperCase();
    }

    return setPassword(memorablePass);
  };

  // This function will generate a random pin password
  const pinPassGenerator = (length: number) => {
    const digits = '0123456789';
    let pinPass = '';

    for (let i = 1; i <= length; i++) {
      const index = Math.floor(Math.random() * digits.length);
      pinPass += digits[index];
    }

    return setPassword(pinPass);
  };

  // This function will handle the tab change event
  const handleTabChange = (value: string) => {
    setTab(value);
  };

  // This effect will false the copy success state
  useEffect(() => {
    if (copySuccess) {
      setTimeout(() => {
        setCopySuccess(false);
      }, 500);
    }
  }, [copySuccess]);

  // This effect will generate colorized random password
  useEffect(() => {
    if (password) {
      const colorizedPassword = passwordContentHighlighter(password);

      if (passwordRef.current && colorizedPassword) {
        passwordRef.current.innerHTML = colorizedPassword;
      }
    }
  }, [password]);

  // This effect will generate a memorable password with uppercase
  useEffect(() => {
    if (upperCase && tab === 'memorable') {
      memorablePassGenerator(memorable[0]);
    } else {
      memorablePassGenerator(memorable[0]);
    }
  }, [upperCase]);

  // This effect will generate a random password  with number and symbol
  useEffect(() => {
    if (number || symbol) {
      randomPassGenerator(random[0]);
    }

    if (number && symbol) {
      randomPassGenerator(random[0]);
    }

    if (!number && !symbol) {
      randomPassGenerator(random[0]);
    }
  }, [number, symbol]);

  // This effect will generate the password based on the tab
  useEffect(() => {
    if (tab === 'random') {
      randomPassGenerator(random[0]);
    } else if (tab === 'memorable') {
      memorablePassGenerator(memorable[0]);
    } else if (tab === 'pin') {
      pinPassGenerator(pin[0]);
    } else {
      randomPassGenerator(random[0]);
    }
  }, [tab]);

  return (
    <div className="flex-1 flex flex-col justify-between bg-white shadow-sm rounded-xl p-5">
      <div>
        <h1 className="font-medium text-gray-600">Choose Password Type</h1>

        <Tabs
          onValueChange={handleTabChange}
          className="mt-4"
          defaultValue="random">
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
            <RandomPassword
              number={number}
              symbol={symbol}
              setNumber={setNumber}
              setSymbol={setSymbol}
              random={random}
              setRandom={setRandom}
              randomPassGenerator={randomPassGenerator}
            />
          </TabsContent>

          <TabsContent value="memorable">
            <MemorablePassword
              setUpperCase={setUpperCase}
              memorable={memorable}
              setMemorable={setMemorable}
              memorablePassGenerator={memorablePassGenerator}
            />
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

        <div
          ref={passwordRef}
          className="mt-4 border rounded-md w-full p-5 font-medium text-2xl text-center overflow-x-hidden break-words">
          {password}
        </div>

        <div className="w-full flex justify-between items-center mt-4 gap-3">
          <Button
            onClick={copyPassword}
            disabled={!password || copySuccess}
            className="flex-1 bg-blue-800 hover:bg-blue-900 transition-colors disabled:opacity-100">
            {copySuccess ? 'Copied!' : 'Copy Password'}
          </Button>
          <Button
            onClick={refreshPassword}
            variant="outline"
            className="flex-1 border-blue-800 text-blue-800 hover:border-blue-800 hover:text-blue-800">
            Refresh Password
          </Button>
        </div>
      </div>
    </div>
  );
}
