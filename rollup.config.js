import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';

export default {
    input: 'src/main.ts',
    output: [
        {
            file: 'dist/main.cjs',
            format: 'cjs',
        },
        {
            file: 'dist/main.js',
            format: 'esm',
        },
    ],
    plugins: [
        resolve({
            extensions: ['.ts'],
        }),
        typescript(),
    ],
};
