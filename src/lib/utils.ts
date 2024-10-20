import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function passwordContentHighlighter(password: string) {
  const hyphen = /-/g;
  const digits = /[0-9]/g;
  const symbols = /[^a-zA-Z0-9]/g;

  let hightLighterPass = password;

  if (password.match(digits) && password.match(symbols)) {
    hightLighterPass = hightLighterPass.replace(
      symbols,
      (match) => `<span class="red">${match}</span>`,
    );

    hightLighterPass = hightLighterPass.replace(
      digits,
      (match) => `<span class="blue">${match}</span>`,
    );

    return hightLighterPass;
  }

  if (password.match(hyphen)) {
    hightLighterPass = hightLighterPass.replace(
      hyphen,
      (match) => `<span class="red">${match}</span>`,
    );

    return hightLighterPass;
  }

  if (password.match(digits)) {
    hightLighterPass = hightLighterPass.replace(
      digits,
      (match) => `<span class="blue">${match}</span>`,
    );

    return hightLighterPass;
  }

  if (password.match(symbols)) {
    hightLighterPass = hightLighterPass.replace(
      symbols,
      (match) => `<span class="red">${match}</span>`,
    );

    return hightLighterPass;
  }
}
