const inquirer = require('inquirer');

const fs = require('fs');

const generatePage = require('./dist/page-template');

const pageHTML = generatePage(name, github);

fs.writeFile('./dist/index.html', pageHTML, err =>{
  if(err){
    console.log(err);
    return;
  }
  console.log('Page created! Check out index.html in this directory to see it!');

  fs.copyFile('./src/style.css', './dist/style.css', err => {
    if(err){
      console.log(err);
      return;
    }
    console.log('Style sheet copied successfully!');
  });
});

const promptUser = () => {

    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your name? (Required)',
        validate: nameInput => {
          if(nameInput) {
            return true;
          }else {
            console.log ('Please enter your name!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username (Required)',
        validate: gitHubInput => {
          if(gitHubInput) {
            return true;
          } else {
            console.log('Please enter your GitHub username');
            return false;
          }
        }
      },
     
      {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some information about yourself for an "About" section?',
        default: true
      },

      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:',
        when: ({ confirmAbout }) => {
          if(confirmAbout) {
            return true;
          } else {
            return false;
          }
        }
      }
    ]);
  };

  const promptProject = portfolioData => {
   
    console.log(`
    =================
    Add a New Project
    ================= 
    `);
    //if there's no projects array property, create one
  if(!portfolioData.projects){
   portfolioData.projects = [];
  }
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project? (Required)',
            validate: projectNameInput => {
              if (projectNameInput){
                return true;
              } else {
                console.log('Please enter a project name!');
                return false;
              }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of your project (Required)',
            validate: descInput => {
              if (descInput){
                return true;
              } else {
                console.log('Please enter a description of the project!');
                return false;
              }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: linkInput => {
              if(linkInput) {
                return true;
              } else {
                console.log('Please provide a GitHub link to your project');
                return false;
              }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to add another project?',
            default: false
        }
    ])
    .then(projectData => {
      portfolioData.projects.push(projectData);
      if(projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
 
  };



  promptUser()
  .then(promptProject)
  .then(portfolioData => {
    const pageHTML = generatePage(portfolioData);

    fs.writeFile('./index.html', pageHTML, err => {
      if (err) throw new Error(err);

      console.log('Page created! Check out index.html in this directory to see it!');
    });
  });