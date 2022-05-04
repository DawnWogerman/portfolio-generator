const profileDataArgs = process.argv.slice(2);

const [name, gitHub] = profileDataArgs;


// const generatePage = (userName, gitHubName) => {
//     return `
//     Name: ${userName}
//     GitHub: ${gitHubName}`;
// };

const generatePage = (name, gitHub) => {
    return `
    <!DOCTYPE html>
    <html lang ="en"
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Portfolio Demo</title>
    </head>
    
    <body>
        <h1>${name}</h1>
        <h2><a href="https://github.com/${gitHub}">GitHub</a><h2>
    </body>
    </html>
    `;
};
console.log(name,gitHub);
console.log(generatePage(name, gitHub));



// const printProfileData = profileDataArr => {
//   // This...
//   for (let i = 0; i < profileDataArr.length; i += 1) {
//     console.log(profileDataArr[i]);
//   }

//   console.log('================');

//   // Is the same as this...
//   profileDataArr.forEach(profileItem => console.log(profileItem));
// };

// printProfileData(profileDataArgs);

//9.2.4


// const generatePage = () => 'Name: Jane, GitHub: janehub';
// console.log(generatePage());

// const generatePage = (userName, gitHubName) => `Name: ${userName}, GitHub: ${gitHubName}`;
// console.log(generatePage('Jane', 'JaneHub'));

