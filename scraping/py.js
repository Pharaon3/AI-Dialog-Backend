

exec('python getMention.py', (error, stdout, stderr) => {
	console.log("python script is executed.")
	if (error) {
		console.error(`Error executing command: ${error}`);
		reject(`Error executing command: ${error}`);
	}
	resolve(stdout);
});