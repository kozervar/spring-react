import del from 'del';
import fs from './lib/fs';

async function clean() {
    await del(['../../../target/.tmp', '../resources/webpack/*'], { dot: true, force: true });
    await fs.makeDir('../resources/webpack/');
}

export default clean;