const b2CloudStorage = require("b2-cloud-storage");
const util = require('util');
/*
The object is to download all the files within a directory 
into a temporary working directory (i.e. os.tmpdir())
to work with that match a certain filetype. Thoughts are I need to first
create a list of those files I want to download first.

Example:
fileList = response.filter(file => path.dirname(file.contentType) === 'text/plain');

Then, with that list, run a downloadByFileName function for each filename in the list.

If there's any easier way, let me know. :)
*/

// This auth is for read-only.
const b2 = new b2CloudStorage({
	auth: {
		accountId: '000408261ffd2a20000000004',
		applicationKey: 'K000+9z6dd+YN54i1x7oMsncvGnUoqY'
	}
});

const urlPath = 'files/'

// PROMISIFIED
const authorize = util.promisify(b2.authorize)
const listFileNames = util.promisify(b2.listFileNames)

const listB2Files = async (urlPath) => {
	try {
		"use strict";
		await b2.authorize()
		return await listFileNames({
			bucketId: '042038a226114fbf7d520a12',
			prefix: urlPath,
			delimiter: "/",
		})
	}  catch (err) {
		console.log(err)
	}
}

listB2Files(urlPath)

