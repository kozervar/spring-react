'use strict';
import path from 'path';
import gaze from 'gaze';
import Promise from 'bluebird';

async function build({watch} = {}){
    const ncp = Promise.promisify(require('ncp'));
    await Promise.all([
        ncp('src/server/static', '../resources/webpack/server')
    ]);


    if (watch) {
        const watcher = await new Promise((resolve, reject) => {
            gaze('src/server/static/**/*.*', (err, val) => err ? reject(err) : resolve(val));
        });

        const cp = async (file) => {
            const relPath = file.substr(path.join(__dirname, '../src/server/static/').length);
            await ncp(`src/server/static/${relPath}`, `../resources/webpack/server/${relPath}`);
        };

        watcher.on('changed', cp);
        watcher.on('added', cp);
    }
}

export default build;