import multiEntry from 'rollup-plugin-multi-entry';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

export default {
    input: ['./out-tsc/src/**/*.js'],
    output: {
        dir: '../../Springboot_App/src/main/resources/static/js/dist',
        format: 'esm',
        entryFileNames: '[name].bundle.js',
        chunkFileNames: '[name]-[hash].js',
        preserveModules: true,
        sourcemap: true
    },
    plugins: [
        replace({ 'Reflect.decorate': 'undefined', preventAssignment: true }),
        multiEntry(),
        terser({
            ecma: 2017,
            module: true,
            warnings: true,
            mangle: {
                properties: {
                    regex: /^__/,
                },
            },
        }), resolve()],
    onwarn: function (warning, rollupWarn)
    {
        if (warning.code === 'THIS_IS_UNDEFINED')
        {
            return;
        }
        rollupWarn(warning);
    }
};

