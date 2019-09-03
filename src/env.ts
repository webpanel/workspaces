interface IENV {
  REACT_APP_API_URL: string;
}

export const ENV: IENV = (window as any).ENV || process.env;

const keysOfENV = ['REACT_APP_API_URL'];
for (const k of keysOfENV) {
  if (!ENV[k]) {
    throw new Error(`${k} is not specified`);
  }
}
