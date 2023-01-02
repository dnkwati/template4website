//
import fs from 'fs';
import { exec } from 'child_process';
//
const tempDir = 'temp';
const rootDir = 'src';
const repos = {
	[`${rootDir}/scss`]: 'https://github.com/dnkwati/template4sass.git',
	[`${rootDir}/ts`]: 'https://github.com/dnkwati/template4ts.git',
};
// const copyConfigs = ['tsconfig.json'];
// const removeGlobs = ['.*', '*lock*'];
//
for (const [dir, url] of Object.entries(repos)) {
	// const removeCommand = removeGlobs.map((val) => ''.concat('rm -rf ', dir, '/', val)).join(' && ');
	// const copyCommand = copyConfigs.map((val) = 'cp -rf '.concat(dir, '/_/', val, ' ', dir)).join(' && ');
	const log = `[cloning...] ${dir}: ${url}`;
	const commands = [
		// 1. clone repo to temp folder @ ${dir}/_
		`git clone ${url} ${dir}/_`,
		// 2. copy ${dir}/_/src to ${dir}
		`cp -rf ${dir}/_/src/ ${dir}`,
		// 3. remove temp folder
		`rm -rf ${dir}/_`,
	].join(' && ');
	//
	if (!fs.existsSync(dir)) {
		console.log(log);
		// exec(`[ -d "${dir}" ] && echo "Directory ${dir} exists." || echo "${log}"`);
		exec(`if [ ! -d "${dir}" ]; then ${commands}; fi`);
	}
}
