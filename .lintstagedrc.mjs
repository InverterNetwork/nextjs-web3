import path from 'path'

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`

export default {
  'src/**/*.{ts,tsx,test.ts}': 'tsc-files --pretty --noEmit',
  'src/**/*.{js,jsx,ts,tsx,test.ts}': [buildEslintCommand],
  '**/*.{js,jsx,ts,tsx,md,json,css,test.ts}': ['prettier --write'],
}
