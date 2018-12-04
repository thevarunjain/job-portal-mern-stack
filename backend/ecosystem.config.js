module.exports = {
  apps : [{
    name: "backend",
    script: "./src/index.js",
    cwd: "/home/ec2-user/linkedin/current/backend",
    log_date_format: "DD-MM-YYYY",
    "env": {
      "NODE_ENV": "production",
    }
  }],
  deploy: {
    production: {
      key: "~/.ssh/id_rsa",
      user: "ec2-user",
      host: ["54.153.22.140", "54.241.139.118", "52.53.212.84"],
      ssh_options: "StrictHostKeyChecking=no",
      ref: "origin/master",
      repo: "git@github.com:saketthakare/cmpe-273-group-project.git",
      path: "/home/ec2-user/linkedin",
      "pre-deploy-local": "./deploy_env",
      "post-deploy": "cd backend && npm install && pm2 startOrRestart ecosystem.config.js"
    }
  }
}
