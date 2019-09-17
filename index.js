const Abstract = require("abstract-sdk");

const client = new Abstract.Client({
  accessToken: process.env.TOKEN,
  transportMode: "api"
});

async function run() {
  // Query all projects
  const projects = await client.projects.list();

  // Iterate through each project
  for (const project of projects) {
    // Log the number of branches
    client.activities
      .list(
        {
          projectId: project.id
        },
        { limit: 2 }
      )
      .then(e => console.log(e));

    const branches = await client.branches.list({ projectId: project.id });
    console.log(`${project.name}: ${branches.length}`);
  }
}

run();
